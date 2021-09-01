import { Document, Schema, model } from "mongoose";
import { MonsterLookupSchema } from "./monsterlookup";
import { MonsterLookup } from "@lpt0/rs-bestiary-api-wrapper/interfaces";

interface AreaDoc extends Document {
  name: string,
  monsters: MonsterLookup[]
};

const AreaSchema = new Schema(
  {
    name: { type: String, unique: true },
    monsters: [ MonsterLookupSchema ]
  }, 
  {
    id: false,
    timestamps: false
  }
);

const AreaModel = model<AreaDoc>("area", AreaSchema);

export default AreaModel;