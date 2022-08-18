import mongoose from "mongoose";

const commentSchema=mongoose.Schema({
    nom:{type:String,required:true},
    comment:{type:String,required:true},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'   
    },
},{timestamps:true})

const newsSchema=mongoose.Schema({
    likes:[    
       { type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'}
    ],
    disLikes:[    
        { type:mongoose.Schema.Types.ObjectId,
         required:true,
         ref:'User'}
     ],
    auteur:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    comments:[commentSchema],
    titre:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    plusInformation:{
        type:String,
        default:''
    },
    category:{
        type:String,
        required:true
    },
    isVideo:{
        type:Boolean,
        required:true,
        default:0
    },
    video:{
        type:String,
        default:''
    },
    publié:{
        type:Boolean,
        required:true,
        default:false,
    },
    ajoutéInterface:{
        type:Boolean,
        required:true,
        default:false,
    }

},{timestamps:true}
)

const News=mongoose.model('News',newsSchema)

export default News