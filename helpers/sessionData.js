const fs = require('fs');
const path = require('path');
const { TEST_DATA, SESSION_DATA, DYNAMIC_KEYS } = require('./paths');
const { generateDynamicFields } = require('./dynamicData');

function ensureSessionDir() {
  fs.mkdirSync(path.dirname(SESSION_DATA), { recursive: true });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
}

/** Stable config only — strips any leftover dynamic keys. */
function readStaticData() {
  const data = readJson(TEST_DATA);
  for (const key of DYNAMIC_KEYS) {
    delete data[key];
  }
  return data;
}

function hasSession() {
  if (!fs.existsSync(SESSION_DATA)) {
    return false;
  }
  const session = readJson(SESSION_DATA);
  return Boolean(session.nameRequired);
}

/**
 * Writes key/value pairs into the session store (kept across runs).
 */
function saveSession(data) {
  ensureSessionDir();
  const next = { ...loadSession(), ...data };
  writeJson(SESSION_DATA, next);
  syncSessionToTestData(next);
  return next;
}

/**
 * Reads session values from data/session-data.json.
 */
function loadSession() {
  if (!fs.existsSync(SESSION_DATA)) {
    return {};
  }
  return readJson(SESSION_DATA);
}

/**
 * Clears session-data.json (manual use only — not called on teardown).
 */
function clearSession() {
  if (fs.existsSync(SESSION_DATA)) {
    fs.unlinkSync(SESSION_DATA);
  }
}

/**
 * Maps session fields into test-data.json keys used by recorded scripts.
 */
function syncSessionToTestData(sessionData = loadSession()) {
  const staticData = readStaticData();
  const dynamic = {};
  for (const key of DYNAMIC_KEYS) {
    if (sessionData[key] != null) {
      dynamic[key] = sessionData[key];
    }
  }
  writeJson(TEST_DATA, {
    ...staticData,
    ...dynamic,
  });
}

/**
 * Prepares session data for the run.
 * @param {{ force?: boolean }} options
 * - force: true  → generate new values and override session (Create Draft RFP)
 * - force: false → reuse existing session if present; generate only when missing
 */
function prepareSession({ force = false } = {}) {
  ensureSessionDir();

  let sessionData;
  if (!force && hasSession()) {
    sessionData = loadSession();
    // Backfill any new dynamic keys added after the session was created
    const generated = generateDynamicFields();
    let updated = false;
    for (const key of DYNAMIC_KEYS) {
      if (sessionData[key] == null || sessionData[key] === '') {
        sessionData[key] = generated[key];
        updated = true;
      }
    }
    if (updated) {
      writeJson(SESSION_DATA, sessionData);
    }
  } else {
    sessionData = generateDynamicFields();
    writeJson(SESSION_DATA, sessionData);
  }

  syncSessionToTestData(sessionData);
  return sessionData;
}

/**
 * After a run: keep data/session-data.json and mirror into test-data.json.
 * Cleared/overridden only when Create Draft RFP runs again with force: true.
 */
function endSession() {
  if (hasSession()) {
    syncSessionToTestData();
  } else {
    writeJson(TEST_DATA, readStaticData());
  }
}

module.exports = {
  saveSession,
  loadSession,
  clearSession,
  hasSession,
  prepareSession,
  endSession,
  syncSessionToTestData,
};
