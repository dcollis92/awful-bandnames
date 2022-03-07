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
  req.body.owner = req.user.profile._id
  Bandname.create(req.body)
  .then(taco => {
    res.redirect("/bandnames")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/bandnames")
  })
}

// function create(req, res) {
//   console.log("req.body before", req.body)
//   req.body.nowShowing = !!req.body.nowShowing
//   for (let key in req.body) {
//     if(req.body[key] === "") delete req.body[key]
//   }
//   console.log("req.body after", req.body)
//   // New
//   const movie = new Movie(req.body)
//   console.log(movie)
//   movie.save(function(err) {
//     if (err) return res.redirect('/movies/new')
//     res.redirect(`/movies/${movie._id}`)
//   })
// }

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
  
      // req.body.tasty = !!req.body.tasty
      bandname.updateOne(req.body, {new: true})
      .then(() => {
        res.redirect(`/bandnames/${taco._id}`)
      })
    } else {
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