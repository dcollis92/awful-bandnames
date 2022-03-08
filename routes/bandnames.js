import { Router } from 'express'
import * as bandnamesCtrl from "../controllers/bandnames.js"
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET - localhost:3000/bandnames
router.get('/', bandnamesCtrl.index)
// GET - localhost:3000/bandnames/new
router.get('/new', bandnamesCtrl.new)
// GET - localhost:3000/bandnames/:id
router.get("/:id", bandnamesCtrl.show)
// GET - localhost:3000/bandnames/:id/edit
router.get("/:id/edit", isLoggedIn, bandnamesCtrl.edit)
// POST - localhost:3000/bandnames
router.post("/", isLoggedIn, bandnamesCtrl.create)
// POST - localhost:3000/bandnames/:id/ratings
router.post("/:id/ratings", isLoggedIn, bandnamesCtrl.addRating)
// PUT- localhost:3000/bandnames/:id
router.put("/:id", isLoggedIn, bandnamesCtrl.update)
// DELTE - localhost:3000/bandnames/:id
router.delete("/:id", isLoggedIn, bandnamesCtrl.delete)


export {
  router
}