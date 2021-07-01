const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/abc', {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true,useFindAndModify:false,});
var conn =mongoose.Collection;
var adminUserSchema =new mongoose.Schema({
    email:
    {
        type:String,
    },
    key:
    {
        type:String,
    },
    school_key:
    {
        type:String,
        default:"$2a$10$787pS7KmgBDMUDzANMdBh.k2creKQ6BJHn/M7Uf61W8DbzYdPLag",
    },
    pin:
    {
        type:Number,
        default:121212,
    },
    password: 
    {
        type:String, 
    },
    date:{
        type: Date, 
        default: Date.now }
});

var adminUserModel = mongoose.model('adminUsers',adminUserSchema);
module.exports=adminUserModel;


//mongodb+srv://pms-demo:@Aa1Bb2Hh3@@cluster0.ngu0t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority