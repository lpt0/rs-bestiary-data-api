import { Application, application, Router } from "express";
import Beast from "../models/beast";
import { api } from "@lpt0/rs-bestiary-api-wrapper";

const BeastRouter = Router();

/** Get IDs of all cached monsters */
BeastRouter.get("/", async (req, res) => {
  try {
    const beastIds = await Beast.find({}, { _id: 0, id: 1 });
    res.send(beastIds);
  } catch (e) {
    res.status(500).send({ message: e || "Unknown error" });
  }
});

/** Get a monster by its ID */
BeastRouter.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send({ message: `ID must be a number (was ${id})` });
  }
  
  try {
    let beast = await Beast.findOne({ id }, { _id: 0 });

    // Try and fetch beast if it hasn't been cached in database
    if (!beast) {
      const beastData = await api.beastData(id);
      beast = await new Beast(beastData).save();
      delete beast._id;
    }

    if (beast) {
      res.send(beast);
    } else {
      res.status(404).send({ message: `Beast ${id} not found` });
    }
  } catch (e) {
    res.status(500).send({ message: e || "Unknown error" });
  }
});

/** Search for monsters */
BeastRouter.get("/search/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const beastsWithName = (
      await Beast.find({ name: new RegExp(name, "i") }, { id: 1, name: 1 })
    );
    res.send(beastsWithName);
  } catch (e) {
    res.status(500).send({ message: e || "Unknown error" });
  }
});

/** Search for monsters starting with `letter` */
BeastRouter.get("/search/by-letter/:letter", async (req, res) => {
  const { letter } = req.params;
  try {
    if (letter.length === 1) {
      const regex = new RegExp("^" + letter, "i");
      const beastsWithLetter = (
        await Beast.find({ name: regex }, { id: 1, name: 1 })
      );
      res.send(beastsWithLetter);
    } else {
        res.status(400).send({ message: "Letter must be a single character!" });
    }
  } catch (e) {
    res.status(500).send({ message: e || "Unknown error" });
  }
});

export default BeastRouter;