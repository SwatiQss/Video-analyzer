const ffmpeg=require("fluent-ffmpeg");

function extractAudioFromVideo(videoPath,outputAudioPath){
    
    return new Promise((resolve,reject)=>{
        ffmpeg(videoPath)
        .output(outputAudioPath)
        .audioCodec('libmp3lame')
        .on('end',()=>resolve())
        .on('error',(err)=>reject(err))
        .run();
    });
}

module.exports={extractAudioFromVideo};