function getState(request, response) {
  response.status(200).json({ database: "online" });
}

export default getState;
