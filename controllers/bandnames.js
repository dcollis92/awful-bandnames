import { Bandname } from "../models/bandname.js"

function index(req, res) {
  Bandname.find({})
  .then(bandnames => {
    res.render("bandnames/index", {
      title: "Awful Bandnames",
      bandnames,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/bandnames")
  })
}

function newBandname(req, res) {
  res.render('bandnames/new', {
    title: "Add Bandname"
  })
}


function create(req, res) {
  // req.body.owner = req.user.profile._id
  // req.body.tasty = !!req.body.tasty
  Bandname.create(req.body)
  .then(taco => {
    res.redirect("/bandnames")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/bandnames")
  })
}

function show(req, res) {
  Bandname.findById(req.params.id)
  .populate("owner")
  .then(bandname => {
    res.render("bandnames/show", {
      bandname,
      title: "Show Awful Bandname"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/bandnames")
  })
}

function addRating(req, res) {
  bandname.findById(req.params.id)
  .then(bandname => {
    bandname.tasty = !bandname.tasty
    bandname.save()
    .then(() => {
      res.redirect(`/bandnames/${bandname._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/bandnames")
  })
}

// ADJUST TO ADD RATING

function edit(req, res) {
  Taco.findById(req.params.id)
  .then(taco => {
    res.render("bandnames/edit", {
      title: "Edit 🌮",
      taco,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/bandnames")
  })
}

function update(req, res) {
  Bandname.findById(req.params.id)
  .then(bandname => {
    if (bandname.owner.equals(req.user.profile._id)) {
      // the person that created the bandname is trying to edit the bandname
      req.body.tasty = !!req.body.tasty
      bandname.updateOne(req.body, {new: true})
      .then(() => {
        res.redirect(`/bandnames/${taco._id}`)
      })
    } else {
      // the person that created the taco is NOT the person trying to edit the taco
      throw new Error ("🚫 Not Authorized! 🚫")
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect("/bandnames")
  })
}

function deleteBandname(req, res) {
  Bandname.findById(req.params.id)
  .then(bandname => {
    if (bandname.owner.equals(req.user.profile._id)) {
      // the person that created the bandname is trying to delete the bandname
      bandname.delete()
      .then(() => {
        res.redirect("/bandnames")
      })
    } else {
      // the person that created the taco is NOT the person trying to delete the taco
      throw new Error ("🚫 Not Authorized! 🚫")
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect("/bandnames")
  })
}

export {
  index,
  newBandname as new,
  create,
  show,
  addRating,
  edit,
  update,
  deleteBandname as delete
}