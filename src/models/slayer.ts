import { Schema, model, Document } from "mongoose";
import { MonsterLookupSchema } from "./monsterlookup";
import { MonsterLookup } from "@lpt0/rs-bestiary-api-wrapper/interfaces";

interface SlayerDoc extends Document {
  id: number,
  name: string,
  monsters: MonsterLookup[]
};

const SlayerSchema = new Schema(
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

const SlayerModel = model<SlayerDoc>("slayer", SlayerSchema, "slayer");

export default SlayerModel;