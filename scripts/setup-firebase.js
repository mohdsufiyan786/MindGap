const auth = require("firebase-tools/lib/auth");

const PROJECT = "mindgap-70a13";

async function token() {
  const account = auth.getGlobalDefaultAccount();
  if (!account?.tokens?.refresh_token) {
    throw new Error("Firebase CLI is not logged in.");
  }
  const data = await auth.getAccessToken(account.tokens.refresh_token, []);
  return data.access_token;
}

async function api(access, method, url, payload) {
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });
  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text };
  }
  return { ok: res.ok, status: res.status, json };
}

async function wait(access, name, prefix) {
  if (!name) return;
  for (let i = 0; i < 40; i++) {
    const r = await api(access, "GET", `${prefix}${name}`);
    if (r.json?.done) return r.json;
    if (r.status === 404) return r.json;
    await new Promise((ok) => setTimeout(ok, 4000));
  }
}

async function main() {
  const access = await token();

  for (const svc of [
    "serviceusage.googleapis.com",
    "firestore.googleapis.com",
    "identitytoolkit.googleapis.com",
    "securetoken.googleapis.com",
  ]) {
    console.log("Enable", svc);
    const r = await api(
      access,
      "POST",
      `https://serviceusage.googleapis.com/v1/projects/${PROJECT}/services/${svc}:enable`
    );
    console.log(" ", r.status, r.json?.error?.message || r.json?.name || "ok");
    if (r.json?.name) {
      await wait(access, r.json.name, "https://serviceusage.googleapis.com/v1/");
    }
  }

  console.log("Create Firestore asia-south1");
  const db = await api(
    access,
    "POST",
    `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases?databaseId=(default)`,
    { type: "FIRESTORE_NATIVE", locationId: "asia-south1" }
  );
  console.log(" ", db.status, db.json?.error?.message || db.json?.name || "created");
  if (db.json?.name && !db.json.error) {
    await wait(access, db.json.name, "https://firestore.googleapis.com/v1/");
    console.log(" Firestore ready");
  }

  console.log("Init Auth");
  const initAuth = await api(
    access,
    "POST",
    `https://identitytoolkit.googleapis.com/v2/projects/${PROJECT}/identityPlatform:initializeAuth`,
    {}
  );
  console.log(" ", initAuth.status, initAuth.json?.error?.message || "ok");

  console.log("Enable email/password");
  const email = await api(
    access,
    "PATCH",
    `https://identitytoolkit.googleapis.com/admin/v2/projects/${PROJECT}/config?updateMask=signIn.email`,
    { signIn: { email: { enabled: true, passwordRequired: true } } }
  );
  console.log(" ", email.status, email.json?.error?.message || "email on");

  const cfg = await api(
    access,
    "GET",
    `https://identitytoolkit.googleapis.com/admin/v2/projects/${PROJECT}/config`
  );
  const clientId = cfg.json?.client?.apiKey ? null : cfg.json?.authorizedDomains;
  console.log(" Auth domains", (cfg.json?.authorizedDomains || []).join(", "));
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
