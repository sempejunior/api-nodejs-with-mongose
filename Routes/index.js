const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res)=>{
    console.log(res.locals.auth_data);
    return res.send({message : 'everything is ok in get'});
})

router.post('/', auth, (req, res)=>{
    return res.send({message : 'everything is ok in post'});
})

module.exports = router;