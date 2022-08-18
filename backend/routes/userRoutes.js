import express from 'express'
import { authUser,registerUser ,updateUserProfile,getAllUsers,deleteUser,updateUser,getUserById} from '../controllers/userController.js'
import { protect ,admin} from '../middleware/authMiddleware.js'

const router=express.Router()

router.post('/abonnez',authUser)
router.post('/register',registerUser)
router.put('/profile',protect,updateUserProfile)
router.get('/',protect,admin,getAllUsers)
router.delete('/:id',protect,admin,deleteUser)
router.put('/:id',protect,admin,updateUser)
router.get('/:id',protect,admin,getUserById)



export default router