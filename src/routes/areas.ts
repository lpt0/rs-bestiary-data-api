import { Router } from "express";

const AreaRouter = Router();

/** Get all area names */
AreaRouter.get("/", async (req, res) => {

});

/** Get IDs and names of monsters in a specific area */
AreaRouter.get("/:area", async (req, res) => {

});

export default AreaRouter;