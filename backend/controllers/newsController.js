import News from "../models/newsModel.js";
import asyncHandler from 'express-async-handler'

//get all news
export const getallNews=asyncHandler(async(req,resp)=>{
     //list the news in search
    const keyword=(req.query.keyword) ?{//query is how u can get a query string(? , = ...)
        titre:new RegExp(req.query.keyword,'i')
    } : {} //in this case we return everything
    const news=await News.find({...keyword}).sort({createdAt:-1}).populate('auteur','id nom')  //on ajouter lid et le nom de l'auteur
    resp.json(news)
})

//get a single news
export const getSingleNews=asyncHandler(async(req,resp)=>{
    const Singlenews=await News.findById(req.params.id).populate('auteur','id nom')
    if(Singlenews){
    resp.json(Singlenews)
    }
    else {
           // resp.status(404).json({message:'News not found'}) this old
       // now we have the error handler from express
       resp.status(404)
       throw Error('News n\'a pas été trouvé')
    }
})

//@desc Create a news
//@route POST /api/news/ajouterNews
//@access Private/Admin/auteurs
export const addNews=asyncHandler(async(req,resp)=>{
    const news=new News({
      auteur: req.body.user,
      titre: req.body.titre,
       image: req.body.image,
        description: req.body.description,
       plusInformation: req.body.plusInformation,
       category: req.body.category,
       isVideo: req.body.isVideo,
       video: req.body.video,
 
       publié:req.body.publié
    })

    const createdNews=await news.save()
    resp.status(201).json({message:'News Created'})
})


//@desc Update a news
//@route PUt /api/news/:id
//@access Private/Admin
export const updateNews=asyncHandler(async(req,resp)=>{
    const {
        titre,
         image,
          description,
         plusInformation,
         category,
         isVideo,
         video,
         publié,
         ajoutéInterface,
   
    }=req.body

    const news=await News.findById(req.params.id)
    if(news){
     news.titre=titre
     news.image=image
     news.description=description
     news.plusInformation=plusInformation
     news.category=category
     news.isVideo=isVideo
     news.video=video
    news.publié=publié
    news.ajoutéInterface=ajoutéInterface


     const updatedNews=await news.save()
     resp.json({message:'modification terminé'})
    }
    else{
     resp.status(404)
     throw new Error('News not found')
    }
})


//@desc Remove a news
//@route delete /api/news/:id
//@access Private/Admin
export const deleteNews=asyncHandler(async(req,resp)=>{
    const  news =await News.findById(req.params.id)
    if(news){
        await news.remove()
        resp.json({message:('News a été suprimer')})
    }else{
        resp.status(404)
        throw new Error('News Not found')
    }
})



//@desc add like
//@route POST /api/news/:id/like
//@access Private
export const addLike=asyncHandler(async(req,resp)=>{
  

    const news=await News.findById(req.params.id)
    if(news){
    const alreadyLikeIndex=news.likes.findIndex(d=>d.toString()===req.user._id.toString())
    if(alreadyLikeIndex !==-1){
      news.likes.splice(alreadyLikeIndex,1)
    }
    else{
    const findIndex=news.disLikes.findIndex(d=>d.toString()===req.user._id.toString())
    if(findIndex!==-1){
       news.disLikes.splice(findIndex,1)
    }
    
    news.likes.push(req.user._id)
    }
    await news.save()
    resp.status(201).json(news)
    
}
    else{
     resp.status(404)
     throw new Error('news n\'existe pas')
    }
})


//@desc add disLike
//@route POST /api/news/:id/disLike
//@access Private
export const addDislike=asyncHandler(async(req,resp)=>{
  

    const news=await News.findById(req.params.id)
    if(news){
    const alreadyDisLikeIndex=news.disLikes.findIndex(d=>d.toString()===req.user._id.toString())
    if(alreadyDisLikeIndex !==-1){
        news.disLikes.splice(alreadyDisLikeIndex,1)
    }
    else{
    const findIndex=news.likes.findIndex(d=>d.toString()===req.user._id.toString())
    if(findIndex!==-1){
       news.likes.splice(findIndex,1)
    }

    news.disLikes.push(req.user._id)
    }
    await news.save()
    resp.status(201).json(news)
    }
    else{
     resp.status(404)
     throw new Error('news n\'existe pas')
    }
})


//@desc get news in carousel
//@route GET /api/news/carousel
//@access Public
export const getNewsCrousel=asyncHandler(async(req,resp)=>{
    const  news =await News.find({ajoutéInterface:true})
   resp.json(news)
})

//@desc get news of the day
//@route GET /api/news/day
//@access Public
export const getDayNews=asyncHandler(async(req,resp)=>{
    const d=new Date()
    const  news =await News.find({})
    const  DayNews=news.filter((n)=>(d.getTime()-n.createdAt.getTime())/1000<86400)

resp.json(news ) //just remmember to put in here DayNews

})


//@desc add commnent  
//@route POST /api/news/:id/comments
//@access Private
export const AddComment=asyncHandler(async(req,resp)=>{
    const {comment}=req.body

    const news=await News.findById(req.params.id)
    if(news){
    const alreadyCommented=news.comments.find(c=>c.user.toString()===req.user._id.toString())
    if(alreadyCommented){
        resp.status(400)
        throw new Error('Cet utiliasteur déja commenté cet Article')
    }

    const Thecomment={
        nom:req.user.nom,
        comment,
        user:req.user._id
    }

    news.comments.push(Thecomment)
    await news.save()
    resp.status(201).json({message:'Commantaire ajouter'})
    }
    else{
     resp.status(404)
     throw new Error('Article n\'est pas trouvé')
    }
})





