import { Profile } from "../models/profile.js"

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
      res.render("profiles/show", {
        profile,
        title: `${profile.name}'s profile`,
        self,
        isSelf,
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

// function createCat(req, res) {
//   Profile.findById(req.user.profile._id)
//   .then(profile => {
//     profile.cats.push(req.body)
//     profile.save()
//     .then(() => {
//       res.redirect(`/profiles/${req.user.profile._id}`)
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect(`/profiles/${req.user.profile._id}`)
//   })
// }

// function deleteCat(req, res) {
//   Profile.findById(req.user.profile._id)
//   .then(profile => {
//     profile.cats.remove({_id: req.params.id})
//     profile.save()
//     .then(() => {
//       res.redirect(`/profiles/${req.user.profile._id}`)
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect(`/profiles/${req.user.profile._id}`)
//   })
// }

export {
  index,
  show,
  // createCat,
  // deleteCat,
}