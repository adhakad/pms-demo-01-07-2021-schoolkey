var express = require('express');
var router = express.Router();
var adminUserModule=require('../../../modules/adminUser');

router.get('/', function(req, res, next) {
 if(req.session.auth_email){
  res.redirect('/dashboard');
 }else{
  res.render('admin/admin-auth/admin-auth', { title: 'Password Management System'});
 }
});

function checkKey(req,res,next){
  var key=req.body.key;
  var check=adminUserModule.findOne({key:key});
  check.exec((err,data)=>{
    if(err) throw err;
    if(data==null){
      return res.send({redirectTo: 'Invalid Product Key'});
    }
   next();
  });
}

router.post('/post',checkKey,function(req, res, next) {
  var key=req.body.key;
  var school_key = req.body.school_key;
  var check=adminUserModule.findOne({key:key});
  check.exec((err,data)=>{
    if(err) throw err;
    if(data){
      var email = data.email;
      var obj_id = data._id;
      var school_key2 = data.school_key;
      
        if(school_key2=="$2a$10$787pS7KmgBDMUDzANMdBh.k2creKQ6BJHn/M7Uf61W8DbzYdPLag"){
          var update=adminUserModule.findByIdAndUpdate(obj_id,{school_key:school_key});
          update.exec((err,data)=>{
            req.session.auth_email = email;
            req.session.school_session_key = school_key;
            res.send({redirect:'/dashboard'});
          });
        }else{
          req.session.auth_email = email;
          req.session.school_session_key = school_key2;
          res.send({redirect:'/dashboard'});
        }
    }
  })
});

module.exports = router;