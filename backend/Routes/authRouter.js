const express = require("express");
const mongoose = require("mongoose");

let userRouter = express.Router();
require("../Models/usersModel");
let usersSchema = mongoose.model("Users");
userRouter.post("/register",(request,response)=>{
    console.log(request.body)
       let user = new usersSchema({
        
        fName:request.body.fName,
        lName:request.body.lName,
        email:request.body.email,
        Password:request.body.Password,
       })   

    //    usersSchema.findOne({email:request.body.email}).then((data)=>{
    //        response.send("gggggggggggggggg")
    //    }).catch(()=>{

        user.save().then((user)=>{
            response.send(user)
         }).catch(()=>{
      response.send("user didnet svaed")
              })
    //    })

})

userRouter.post("/login",(request,response)=>{
    usersSchema.findOne({email:request.body.email}).then(()=>{
        response.send("sucesss")
    }).catch(()=>{
        response.redirect("/user/register")
    })
})
module.exports = userRouter;



