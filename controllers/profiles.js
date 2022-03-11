import { Profile } from "../models/profile.js"
import { Bandname } from "../models/bandname.js"


function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render("profiles/index", {
      profiles,
      title: "Profile"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    Profile.findById(req.user.profile._id)
    .then(self => {
      const isSelf = self._id.equals(profile._id)
      Bandname.find({})
      .then(bandnames => {
        const nameArr = []
        bandnames.forEach(name => {
          name.avg = getAvgRating(name.ratings)
          nameArr.push(name)
        })
        const sorted = rankRating(nameArr)
        res.render("profiles/show", {
          profile,
          title: `${profile.name}'s profile`,
          self,
          isSelf,
          bandnames: sorted,
        })
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

/* Show helper functions */
function getAvgRating(ratings) {
  if(!ratings.length) return 0;
  console.log(ratings)
  const avg = ratings.reduce((total, r) => 
    total + parseInt(r.rating), 0) 
  return Math.round(avg / ratings.length);
}

/* Show helper functions */
function rankRating(arr) {
  return arr.sort((ratingA, ratingB) => 
  ratingB.avg - ratingA.avg) 
}


export {
  index,
  show,
}