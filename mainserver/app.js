const http=require('http');
const express=require('express');
const cors=require('cors');
const app=express();

//middleware

app.use(express.json());
app.use(cors());

const uploadRoutes=require('./routes/uploadRoutes');
//const userRoutes=require('./routes/userRoutes');
//middlware for routing

//app.use('/',userRoutes);
app.use('/upload',uploadRoutes);

const PORT=5000;
http.createServer(app).listen(PORT,()=>{
    console.log("server listening and also you can callback the nextservices functions here")
})
