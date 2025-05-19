// backend/server.js
const express = require('express');
const { spawn } = require('child_process');
const router=express.Router();



router.post('/generate', (req, res) => {
  const {text} = req.body;

  const python = spawn('python', ['question.py'], {
    cwd: __dirname
  });

  python.stdin.write(JSON.stringify({ text }));
  python.stdin.end();

  let result = '';
  python.stdout.on('data', (data) => {
    result += data.toString();
  });

  python.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  python.on('close', (code) => {
    try {
      const response = JSON.parse(result);
      console.log(response,"question response")
      res.json({result:response});

    } catch (err) {
      res.status(500).json({ error: "Failed to parse response" });
    }
  });
});

module.exports=router
