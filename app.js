const express = require('express');
const app = express();
const cors = require('cors')
const Image = require('./models/image');
const Admin = require('./models/admin');
const authenticateJWT = require('./helpers/auth');
const createToken = require('./helpers/token');

app.use(cors())
app.use(express.json());

app.post('/admin/login',async (req,res,next)=>{
    try {
        const admin = await Admin.login(req.body);
        const token = createToken(admin.email);
        return res.status(200).json({msg:token});
    } catch(err){
        return next(err);
    }
})

app.get('/admin/images', authenticateJWT, async (req, res, next) => {
    try{
        const images = await Image.allImages();
        return res.status(200).json({images})
    } catch(err){
        return next(err)
    }
})

app.get('/images',async(req,res,next)=>{
    try{
        const images = await Image.allImages();
        return res.status(200).json({images})
    } catch(err){
        return next(err)
    }
})

app.get('/admin/images/:id', authenticateJWT, async (req, res, next) => {
    try{
        const image = await Image.getImage(+req.params.id);
        return res.status(200).json({image})
    } catch(err){
        return next(err)
    }
})

app.post('/admin/images', authenticateJWT, async (req, res, next) => {
    try{
        const msg = await Image.postImage(req.body);
        return res.status(201).json(msg)
    } catch(err){
        return next(err)
    }
})

app.put('/admin/images/:id', authenticateJWT, async (req, res, next) => {
    try{
        const msg = await Image.updateImage(req.body,+req.params.id);
        return res.status(201).json(msg)
    } catch(err){
        return next(err)
    }
})

app.delete('/admin/images/:id', authenticateJWT, async (req, res, next) => {
    try{
        const msg = await Image.deleteImage(+req.params.id);
        return res.status(200).json(msg)
    } catch(err){
        return next(err)
    }
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