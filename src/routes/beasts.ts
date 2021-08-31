import { Router } from "express";

const BeastRouter = Router();

/** Get IDs of all cached monsters */
BeastRouter.get("/", async (req, res) => {

});

/** Get a monster by its ID */
BeastRouter.get("/:id", async (req, res) => {

});

/** Search for monsters  */
BeastRouter.get("/search/:name", async (req, res) => {

});

/** Search for monsters starting with `letter` */
BeastRouter.get("/search/by-letter/:letter", async (req, res) => {

});

export default BeastRouter;