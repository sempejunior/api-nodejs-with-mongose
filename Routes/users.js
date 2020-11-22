const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    return res.send({message : 'everything is ok in get users'});
})

router.post('/', (req, res)=>{
    return res.send({message : 'everything is ok in post users'});
})

module.exports = router;