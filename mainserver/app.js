const http=require('http');
const express=require('express');
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(cors());

const uploadRoutes=require('./routes/uploadRoutes');
const summarizeRoutes=require('./routes/summarizeRoutes');
const questionRoutes=require('./routes/questionRoutes');
app.use('/upload',uploadRoutes);
app.use('/',summarizeRoutes);
app.use('/question',questionRoutes);
const PORT=5000;
http.createServer(app).listen(PORT,()=>{
    console.log("server listening and also you can callback the nextservices functions here")
})
