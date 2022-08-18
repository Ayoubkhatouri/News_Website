import express from 'express'
import {getallNews,getSingleNews,addNews,updateNews,deleteNews,addLike,addDislike,getNewsCrousel,getDayNews,AddComment} from '../controllers/newsController.js'
import { protect,admin,adminOrAuthor } from '../middleware/authMiddleware.js'

const router=express.Router()

router.get('/',getallNews)
router.get('/carousel',getNewsCrousel)
router.get('/day',getDayNews)
router.get('/:id',getSingleNews)
router.post('/',protect,adminOrAuthor,addNews)
router.put('/:id',protect,admin,updateNews)
router.delete('/:id',protect,admin,deleteNews)
router.post('/:id/like',protect,addLike)
router.post('/:id/disLike',protect,addDislike)
router.post('/:id/comments',protect,AddComment)




export default router