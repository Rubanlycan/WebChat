class SessionStore {
    findSession(id) {}
    saveSession(id, session) {}
    findAllSessions() {}
  }
  
  class InMemorySessionStore extends SessionStore {
  }
  
  const SESSION_TTL = 24 * 60 * 60;
  const mapSession = ([userID, username, connected]) =>
    userID ? { userID, username, connected: connected === "true" } : undefined;
  
  class RedisSessionStore extends SessionStore {
  }
  module.exports = {
    InMemorySessionStore,
    RedisSessionStore,
  };