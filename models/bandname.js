import mongoose from "mongoose"

const Schema = mongoose.Schema

const ratingSchema = new Schema ({
  rating: {type: Number, min: 1, max: 5, default: 5},
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
},{ 
  timestamps: true
})

const bandNameSchema = new Schema({
  name: { 
    type: String,
  },
  bio: {
    type: String,
    maxLength: 200,
  },
  ratings: [ratingSchema],
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
}, {
  timestamps: true,
})

const Bandname = mongoose.model("Bandname", bandNameSchema)
const Rating = mongoose.model("Rating", ratingSchema)

export {
  Bandname,
  Rating
}