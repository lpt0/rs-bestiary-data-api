import { Router } from "express";

const SlayerRouter = Router();

/** Get all slayer categories and their IDs */
SlayerRouter.get("/", async (req, res) => {

});

/** Get IDs and names of monsters belonging to a category */
SlayerRouter.get("/:id", async (req, res) => {

});

export default SlayerRouter;