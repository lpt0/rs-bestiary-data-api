import { Router } from "express";

const WeaknessRouter = Router();

/** Get all weakness categories and their IDs */
WeaknessRouter.get("/", async (req, res) => {

});

/** Get IDs and names of monsters that have a certain weakness */
WeaknessRouter.get("/:id", async (req, res) => {

});

export default WeaknessRouter;