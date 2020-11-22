const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema ({
    email: {type: String, required: true, unique: true, lowercase:true},
    //Select: false for don´t receive password on select
    password: {type: String, required: true, unique: true, select:false},
    //Date.now for dont need to receive date, just use the current date.
    created : {type: Date, default: Date.now}


});

UserSchema.pre('save', function(next){

    let user = this;
    if(!user.isModified('password')) return next();
    bcrypt.hash(user.password, 10, (err, encrypted)=>{
        user.password=encrypted;
        return next();
    })
})


module.exports = mongoose.model('User', UserSchema);