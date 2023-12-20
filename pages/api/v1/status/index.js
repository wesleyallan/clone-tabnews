import database from "infra/database.js";

async function getState(request, response) {
  const updateAt = new Date().toISOString();
  const dbVersion = (await database.query("SHOW server_version"))?.rows[0].server_version;
  const maxConnections = (await database.query("SHOW max_connections;"))?.rows[0].max_connections;
  const databaseName = process.env.POSTGRES_DB;
  const openedConnections = (await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName]
  }))?.rows[0].count;

  response.status(200).json({ 
    update_at: updateAt,
    dependencies: {
      database: {
        version: dbVersion,
        opened_connections: openedConnections,
        max_connections: parseInt(maxConnections)
      }
    },
   });
}

export default getState;
