const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/*',async (req, res)=>{
    try{
        const filePath = path.join(__dirname, '../dist/dashboard-deskdyne/index');
        console.log('filePath',filePath);
        res.render(filePath);
    }catch(e){
        console.log(e);
        res.status(500).send({ error: 'Please retry after some time!' });    
    }
});

router.get('/server',async (req, res)=>{
    try{
        console.log('server path called');
        res.jsonp({status:'yes'});
    }catch(e){
        console.log(e);
        res.status(500).send({ error: 'Please retry after some time!' });    
    }
});

module.exports = router;