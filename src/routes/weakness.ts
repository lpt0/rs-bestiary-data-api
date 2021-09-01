import { Router } from "express";
import Weakness from "../models/weakness";
import { api } from "@lpt0/rs-bestiary-api-wrapper";

const WeaknessRouter = Router();
const weaknessesById: { [id: number]: string } = {};
let weaknessesByIdSet = false;

/** Get all slayer categories and their IDs */
WeaknessRouter.get("/", async (req, res) => {
  try {
    let weaknesses = await Weakness.find({}, { _id: 0, id: 1, name: 1 });

    // Slayer categories not present; fetch and cache
    if (weaknesses.length === 0) {
      weaknesses = [];

      const weaknessMap = await api.weaknessNames();
      for (const category in weaknessMap) {
        const id = weaknessMap[category];
        const weaknessDoc = await new Weakness({ name: category, id }).save();
        weaknesses.push(weaknessDoc);
      }
    }

    // Map IDs to category names
    if (!weaknessesByIdSet) {
      for (const weakness of weaknesses) {
        weaknessesById[weakness.id] = weakness.name;
      }
      weaknessesByIdSet = true;
    }

    res.send(weaknesses);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e || "Unknown error" });
  }
});

/** Get IDs and names of monsters belonging to a category */
WeaknessRouter.get("/:id", async (req, res) => {
  if (!weaknessesByIdSet) {
    return res.status(400).send({ 
      message: `Please visit ${req.originalUrl.replace(req.params.id, "")} first`
    });
  }
  
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send({ message: `ID must be a number (was ${id})` });
  }

  try {
    const weakness = weaknessesById[id];
    if (weakness) {
      const weaknessDoc = await Weakness.findOne({ id }, { monsters: 1 });
      let monsters = weaknessDoc?.monsters;
      
      // Cache monsters for category if empty
      if (!monsters || monsters.length === 0) {
        monsters = await api.weaknessBeasts(id);
        if (monsters[0] as unknown as string === "none") {
          return res.status(404).send({ message: `ID ${id} does not have any beasts` });
        }
        await Weakness.findOneAndUpdate({ id }, { monsters });
      }

      res.send(monsters);
    } else {
      res.status(404).send({ message: `Slayer category ${id} not found.` });
    }
  } catch (e) {
    res.status(500).send({ message: e || "Unknown error" });
  }
});

export default WeaknessRouter;