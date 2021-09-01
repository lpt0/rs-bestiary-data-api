import { Router } from "express";
import Slayer from "../models/slayer";
import { api } from "@lpt0/rs-bestiary-api-wrapper";

const SlayerRouter = Router();
const slayerIdCategories: { [id: number]: string } = {};
let slayerIdCategoriesSet = false;

/** Get all slayer categories and their IDs */
SlayerRouter.get("/", async (req, res) => {
  try {
    let slayerCategories = await Slayer.find({}, { _id: 0, id: 1, name: 1 });

    // Slayer categories not present; fetch and cache
    if (slayerCategories.length === 0) {
      slayerCategories = [];

      const slayerCategoryMap = await api.slayerCatNames();
      for (const category in slayerCategoryMap) {
        const id = slayerCategoryMap[category];
        const slayerDoc = await new Slayer({ name: category, id }).save();
        slayerCategories.push(slayerDoc);
      }
    }

    // Map IDs to category names
    if (!slayerIdCategoriesSet) {
      for (const category of slayerCategories) {
        slayerIdCategories[category.id] = category.name;
      }
      slayerIdCategoriesSet = true;
    }

    res.send(slayerCategories);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e || "Unknown error" });
  }
});

/** Get IDs and names of monsters belonging to a category */
SlayerRouter.get("/:id", async (req, res) => {
  if (!slayerIdCategoriesSet) {
    return res.status(400).send({ 
      message: `Please visit ${req.originalUrl.replace(req.params.id, "")} first`
    });
  }
  
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send({ message: `ID must be a number (was ${id})` });
  }

  try {
    const slayercat = slayerIdCategories[id];
    if (slayercat) {
      const slayerCatDoc = await Slayer.findOne({ id }, { monsters: 1 });
      let monsters = slayerCatDoc?.monsters;
      
      // Cache monsters for category if empty
      if (!monsters || monsters.length === 0) {
        monsters = await api.slayerBeasts(id);
        if (monsters[0] as unknown as string === "none") {
          return res.status(404).send({ message: `ID ${id} does not have any beasts` });
        }
        await Slayer.findOneAndUpdate({ id }, { monsters });
      }

      res.send(monsters);
    } else {
      res.status(404).send({ message: `Slayer category ${id} not found.` });
    }
  } catch (e) {
    res.status(500).send({ message: e || "Unknown error" });
  }
});

export default SlayerRouter;