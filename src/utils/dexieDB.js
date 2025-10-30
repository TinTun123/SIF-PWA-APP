import Dexie from "dexie";

// Define your IndexedDB schema
export const db = new Dexie("SIF_Database");

db.version(1).stores({
  statements: "id, date, images, tags, title, updated_at, savedAt, etag", // your statement fields
  images: "++id, statementId, url, blob",
  policies:
    "id, title_eng, title_bur, date, organizations, logos, content_eng, content_bur, updated_at, savedAt, etag",
  policiesLogo: "++id, policyId, url, blob",
});

export async function saveStatements(dataArray) {
  await db.statements.clear(); // optional, overwrite old cache
  await db.statements.bulkPut(dataArray);
}

// Statements
export async function getAllStatements() {
  return await db.statements.toArray();
}

export async function saveStatementToDB(statement) {
  return db.statements.put(statement);
}

// Policies
export async function getAllPolicies() {
  return await db.policies.toArray();
}

export async function savePolicies(dataArray) {
  await db.policies.clear(); // optional, overwrite old cache
  await db.policies.bulkPut(dataArray);
}
