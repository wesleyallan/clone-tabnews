import database from "infra/database.js";

async function getState(request, response) {
  const result = await database.query("SELECT 1+1 as sum;");
  console.log(result);
  response.status(200).json({ database: "online" });
}

export default getState;
