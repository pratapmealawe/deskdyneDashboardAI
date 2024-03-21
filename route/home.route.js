const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/*',async (req, res)=>{
    try{
        res.render(path.join(__dirname, '../dist/dashboard-admin/index'));

    }catch(e){
        console.log(e);
        res.status(500).send({ error: 'Please retry after some time!' });    
    }
});

module.exports = router;