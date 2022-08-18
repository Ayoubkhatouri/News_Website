import mongoose from "mongoose";
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import news from "./data/news.js";
import User from './models/userModel.js'
import News from './models/newsModel.js'
import connectDB  from "./config/db.js";

dotenv.config()

connectDB()

const importData= async ()=>{//this actually replacing the data
    try {
     
       await News.deleteMany()
       await User.deleteMany()

      const createdUsers= await User.insertMany(users)

   
      const auteur1=createdUsers[1].id
      const auteur2=createdUsers[3].id
     const sampleNews=[]
     //l'ets add les auteur de chaque news
     for(let i=0;i<news.length;i++){
        if(i%2===0)
        sampleNews.push({...news[i],auteur:auteur1})
        else
        sampleNews.push({...news[i],auteur:auteur2})
     }
      await News.insertMany(sampleNews)
      
      console.log('Data Imported!'.green.inverse)
      process.exit()

    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1) //exit with 1 means exit with failure
    }
}

const destroyData= async ()=>{
    try {
       await News.deleteMany()
       await User.deleteMany()

      console.log('Data Destroyed!'.red.inverse)
      process.exit()

    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1) //exit with 1 means exit with failure
    }
}

if(process.argv[2] === '-d'){ //cause we wanna do "node backend/seeder -d " and -d is the 3th argument 
    destroyData()               //look in packege.json
}
else{
    importData()
}