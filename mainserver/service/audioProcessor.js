//serivce to take audio file directory and form a text of that audio 
const express=require('express');
const router=express.Router();
const { spawn } = require('child_process');

function  speechtoText(audioPath) {
    return new Promise((resolve, reject) => {
        console.log("speech to text audio processor code");
        console.log(audioPath,"audiopath");

        const pythonProcess = spawn('python', ['transcribe.py', audioPath]);
        let output = '';
        let errorOutput = '';
        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
        });
      
        pythonProcess.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                resolve(output.trim());
                //data=output
                
            } else {
                reject(new Error(`Python process exited with code ${code}: ${errorOutput}`));
            }
        });
    });
}

module.exports = { speechtoText };
