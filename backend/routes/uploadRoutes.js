import express from 'express'
import multer from  'multer'//npm i multer
import path from 'path'

const router =express.Router()

const storage=multer.diskStorage({
    destination(req,file,cb){
        cb(null,'uploads/')//this call back function take two params the first is for errors and second is the path 
                                //where we wanna upload ower files      
    },
    filename(req,file,cb){
        cb(null,`${file.fieldname }-${Date.now()}${path.extname(file.originalname)}`)//we add the date to the file name so tha the names of files is 
                                                                                        //diffrents
                                                                                        //then we wanna get the extension
    }
})
//we gonna filter some files
function checkFileType(file,cb){
    const fileTypes=/jpg|jpeg|png/
    const extname=fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype=fileTypes.test(file.mimetype)

    if(extname && mimetype){
        return cb(null,true)
    }
    else{
        cb('Images nly !')
    }
}

const upload=multer({
    storage,
    fileFilter:function(req,file,cb){
        checkFileType(file,cb)
    }
})

router.post('/',upload.single('image'), (req,resp)=>{
    resp.send(`/${req.file.path}`)
})


export default router