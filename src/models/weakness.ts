import { Schema, model, Document } from "mongoose";
import { MonsterLookupSchema } from "./monsterlookup";
import { MonsterLookup } from "@lpt0/rs-bestiary-api-wrapper/interfaces";

interface WeaknessDoc extends Document {
  id: number,
  name: string,
  monsters: MonsterLookup[]
};

const WeaknessSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    monsters: [ MonsterLookupSchema ]
  }, 
  {
    id: false,
    timestamps: false
  }
);

const WeaknessModel = model<WeaknessDoc>("weakness", WeaknessSchema, "weaknesses");

export default WeaknessModel;