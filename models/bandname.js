import mongoose from "mongoose"

const Schema = mongoose.Schema

const bandNameSchema = new Schema({
  name: { 
    type: String,
  },
  bio: {
    type: String,
    maxLength: 50,
  },
  owner: {
    type: Schema.Types.ObjectId, 
    ref: "Profile",
  },
}, {
  timestamps: true,
  required: [true, "Can't leave blank!"]
})

const Bandname = mongoose.model("Bandname", bandNameSchema)

export {
  Bandname
}