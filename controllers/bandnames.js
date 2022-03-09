import { Bandname } from "../models/bandname.js"

function index(req, res) {
  Bandname.find({})
  .then(bandnames => {
    bandnames.forEach(name => {
      name.avg = getAvgRating(name.ratings)
    })
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

function getAvgRating(ratings) {
  if(!ratings.length) return 0;
  console.log(ratings)
  const avg = ratings.reduce((total, r) => 
    total + parseInt(r.rating), 0) 
  console.log('avg', avg)
  return Math.round(avg / ratings.length);
}

function newBandname(req, res) {
  res.render('bandnames/new', {
    title: "Add Bandname"
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  console.log(req.body)
  Bandname.create(req.body)
  .then(bandname => {
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
    const avg = getAvgRating(bandname.ratings)
    res.render("bandnames/show", {
      bandname,
      title: "Show Awful Bandname",
      avgRating: avg,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/bandnames")
  })
}

function addRating(req, res) {
  Bandname.findById(req.params.id)
  .then(bandname => {
    bandname.ratings.push(req.body)
    //round off
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

function editRating(req, res) {

}

function edit(req, res) {
  Bandname.findById(req.params.id)
  .then(bandname => {
    res.render("bandnames/edit", {
      title: "Edit",
      bandname,
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
        bandname.updateOne(req.body, {new: true})
      .then(() => {
        res.redirect(`/bandnames/${bandname._id}`)
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
  editRating,
  edit,
  update,
  deleteBandname as delete
}