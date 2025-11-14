import Dexie from "dexie";

// Define your IndexedDB schema
export const db = new Dexie("SIF_Database");

db.version(1).stores({
  statements: "id, date, images, tags, title, updated_at, savedAt, etag", // your statement fields
  images: "++id, statementId, url, blob",
  policies:
    "id, title_eng, title_bur, date, organizations, logos, content_eng, content_bur, updated_at, savedAt, etag",
  policiesLogo: "++id, policyId, url, blob",
  interviews:
    "id, tags, persons, type, date, videoFile, quote, created_at, updated_at",
  interviewFile: "++id, interviewId, url, blob",
  courses: "id, title_eng, title_bur, cover_url, type, created_at, updated_at",
  coursesAssets: "++id, fileURL, ownerId, blob, type, course_id",
  sessions:
    "id, number, course_id, title_eng, title_bur, content_eng, content_bur",
  subsessions:
    "id, session_id, number, title_eng, title_bur, content_eng, content_bur",
  musics: "id, title, file_url, date, links, tags",
  musicFile: "++id, musicId, url, blob",
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

export async function saveInterviews(dataArray) {
  await db.interviews.clear(); // optional, overwrite old cache
  await db.interviews.bulkPut(dataArray);
}

// Statements
export async function getAllInterviews() {
  return await db.interviews.toArray();
}

// Course
export async function saveCourse(dataArray) {
  await db.courses.clear(); // optional, overwrite old cache
  await db.courses.bulkPut(dataArray);
}

export async function getAllCourse() {
  return await db.courses.toArray();
}

// Sessions
export async function saveSessions(dataArray) {
  await db.sessions.clear(); // optional, overwrite old cache
  await db.sessions.bulkPut(dataArray);
}

export async function getAllSession() {
  return await db.sessions.toArray();
}

// SubSessions
export async function saveSubsession(dataArray) {
  await db.subsessions.clear(); // optional, overwrite old cache
  await db.subsessions.bulkPut(dataArray);
}

export async function getAllSubSession() {
  return await db.subsessions.toArray();
}

export async function getAllSessionsByCourseId(courseId) {
  return await db.sessions
    .where("course_id")
    .equals(parseInt(courseId))
    .sortBy("number");
}

export async function getSessionById(sessionId) {
  const session = await db.sessions.get(parseInt(sessionId));
  console.log(`Session ${sessionId} data: `, session);

  return session;
}

export async function getSubsessionsBySessionId(sessionId) {
  return await db.subsessions
    .where("session_id")
    .equals(parseInt(sessionId))
    .sortBy("number"); // keep natural ordering like backend
}

export async function getSubsessionById(subsessionId) {
  return await db.subsessions.get(parseInt(subsessionId));
}

export async function getAllMusics() {
  return await db.musics.toArray();
}

export async function saveMusics(dataArray) {
  await db.musics.clear(); // optional, overwrite old cache
  await db.musics.bulkPut(dataArray);
}
