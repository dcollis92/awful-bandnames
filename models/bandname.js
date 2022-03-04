import mongoose from "mongoose"

const Schema = mongoose.Schema

const bandNameSchema = new Schema({
  name: String,
  bio: {
    type: String,
    maxLength: 50,
  },
  owner: {
    type: Schema.Types.ObjectId, 
    ref: "Profile"
  },
})

const Bandname = mongoose.model("Bandname", bandNameSchema)

export {
  Bandname
}