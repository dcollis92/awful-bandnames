import { Router } from 'express'
import * as bandnamesCtrl from "../controllers/bandnames.js"
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET - localhost:3000/bandnames
router.get('/', bandnamesCtrl.index)


export {
  router
}