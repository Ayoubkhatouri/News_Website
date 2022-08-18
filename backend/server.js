import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import colors from 'colors'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import newsRoutes from './routes/newsRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'


dotenv.config()

connectDB()

const app=express()

app.use(express.json())//just to accept json data in the body postmen

app.get('/',(req,resp)=>{
    resp.send('API is running...')
})

app.use('/api/news',newsRoutes)

app.use('/api/users',userRoutes)

app.use('/api/upload',uploadRoutes)


 //making the upload file static to be acessible
 const __dirname=path.resolve()   //this not available in ES module we shoud add this line
 app.use('/uploads',express.static(path.join(path.join(__dirname, '/uploads'))))//__dirname pointe to the current directory

 //lets have a fallback for 404(not found error) using middleware
app.use(notFound)

 //where gonna use this middleware to override a error handler so we don't get a html file but a json file
 app.use(errorHandler)

const PORT=process.env.PORT || 5000
app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))