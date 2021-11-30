const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use((req, res, next) => {
    next({
        status: 404,
        msg: 'Not Found',
    });
});

app.use(function(err,req,res,next){
    const msg = err.msg
    const status = err.status
    return res.status(status).json({
        error: {msg,status}
    })
})

module.exports = app;