//#region Imports
import express from "express";
import mongoose from "mongoose";
//#endregion

//#region Router imports
import BeastRouter from "./routes/beasts";
import AreaRouter from "./routes/areas";
import SlayerRouter from "./routes/slayer";
import WeaknessRouter from "./routes/weakness";
//#endregion

//#region Setup
const server = express();
const PORT = process.env["PORT"] || 8080;

mongoose.connect(process.env["MONGO_URI"] || "mongodb://localhost:27017/bestiary")
  .then(({ connection: { host, port, db } }) => 
    console.log(`Connected to ${host}:${port}/${db.databaseName}`)
  );

// CORS middleware
server.use((req, res, next) => {
  // Normally, the CORS headers would be more restrictive.
  // However, as this is not a private API, and is only for learning purposes,
  // allowing everything is fine.
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
//#endregion

//#region Route declarations
/*
  All requests to /api/beasts/* will be sent to BeastRouter to handle,
  and so on for every other router.
  For example:
    /api/beasts/1 gets sent to BeastRouter, with the "/api/beasts" portion stripped.
    BeastRouter receives /1, and handles that in its "/:id" route handler.
*/
server.use("/api/beasts", BeastRouter);
server.use("/api/areas", AreaRouter);
server.use("/api/slayer", SlayerRouter);
server.use("/api/weaknesses", WeaknessRouter);
//#endregion

server.listen(process.env["PORT"] || 8080, () => {
  console.log(`Listening on port ${PORT}`)
});