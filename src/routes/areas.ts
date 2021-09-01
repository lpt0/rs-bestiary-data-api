import { Router } from "express";
import Area from "../models/area";
import { api } from "@lpt0/rs-bestiary-api-wrapper";

const AreaRouter = Router();
let areaNames: string[] = [];

/** Get all area names */
AreaRouter.get("/", async (req, res) => {
  try {
    let areas = await Area.find({}, { _id: 0, name: 1 });

    // Areas not present; fetch and cache their names
    if (areas.length === 0) {
      areas = [];

      areaNames = await api.areaNames();
      for (const area of areaNames) {
        const areaDoc = await new Area({ name: area }).save();
        delete areaDoc._id;
        areas.push(areaDoc);
      }
    }

    // Cache the area names
    if (areaNames.length === 0) {
      for (const area of areas) {
        areaNames.push(area.name);
      }
    }

    res.send(areas);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e || "Unknown error" });
  }
});

/** Get IDs and names of monsters in a specific area */
AreaRouter.get("/:area", async (req, res) => {
  const { area } = req.params;
  if (areaNames.length === 0) {
    return res.status(400).send({
      message: `Please visit ${req.originalUrl.replace(area, "")} first.`
    });
  }

  try {
    if (areaNames.indexOf(area) !== -1) {
      const areaDoc = await Area.findOne({ name: area }, { monsters: 1 });
      let monsters = areaDoc?.monsters;

      // Cache monsters in area if it doesn't exist
      if (!monsters || monsters.length === 0) {
        monsters = await api.areaBeasts(area);
        await Area.findOneAndUpdate({ name: area }, { monsters });
      }

      res.send(monsters);
    } else {
      res.status(404).send({ message: `Area ${area} not found.` });
    }
  } catch (e) {
    res.status(500).send({ message: e || "Unknown error" });
  }
});

export default AreaRouter;