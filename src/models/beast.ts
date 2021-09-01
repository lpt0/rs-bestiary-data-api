import { Schema, model, Document } from "mongoose";

export interface BeastDoc extends Document {
  name: string,
  id: number,
  members: boolean,
  weakness: string,
  level: number,
  lifepoints: number,
  defence: number,
  attack: number,
  magic: number,
  ranged: number,
  xp: number,
  slayerlevel: number,
  slayercat: string,
  size: number,
  attackable: boolean,
  aggressive: boolean,
  poisonous: boolean,
  description: string,
  area: [ string ],
  animations: Object
}

const BeastSchema = new Schema(
  {
    /** The monster's name. */
    name: String,
  
    /** The monster's ID. */
    id: { type: Number, unique: true },
  
    /** Whether or not the monster is a member's only monster. */
    members: Boolean,
  
    /** The monster's [weakness](https://runescape.wiki/w/Weakness). */
    weakness: String,
  
    /** The monster's combat level. */
    level: Number,
  
    /** The amount of lifepoints the monster has. */
    lifepoints: Number,
  
    /** The monster's Defence level. */
    defence: Number,
  
    /** The monster's Attack level. */
    attack: Number,
  
    /** The monster's Magic level. */
    magic: Number,
  
    /** The monster's Ranged level. */
    ranged: Number,
  
    /** The experience received for killing the monster. */
    xp: Number,
  
    /** If the monster requires a Slayer level to damage, the level required. */
    slayerlevel: Number,
  
    /** The Slayer category to which the monster belongs. */
    slayercat: String,
  
    /** The size of the monster. */
    size: Number,
  
    /** Whether or not the monster can be attacked. */
    attackable: Boolean,
  
    /** Whether or not the monster is [aggressive](https://runescape.wiki/w/Aggressive). */
    aggressive: Boolean,
  
    /** Whether or not the monster can inflict poison. */
    poisonous: Boolean,
  
    /** The monster's [examine](https://runescape.wiki/w/Examine) text. */
    description: String,
  
    /** Areas where the monster may be found. */
    area: [ String ],
  
    /** Animations used by the official bestiary when viewing. */
    animations: Object
  },
  {
    id: false,
    timestamps: false
  }
);

const BeastModel = model<BeastDoc>("beast", BeastSchema);

export default BeastModel;