const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs")
let productRouter = express.Router();
const multer = require('multer');
// const upload = multer({ dest: "uploads/"});
   
const storage1 =  multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');

    },
    filename:function(req,file,cb){
        cb(null,  file.originalname)
    }
})
const upload = multer({storage:storage1 })
require("../Models/productsModel");
let productSchema = mongoose.model("products");
console.log("helllllllllllllo")


// const storage = multer.diskStorage({
//     destination: function (req, res, cb) {
//         cb(null, 'images/')
//     }
// });
// const upload = multer({ storage: storage });
// router.route('/img_data')
// .post(upload.single('file'), function(req, res) {
productRouter.post("/add",upload.single("productImage"),(request,response)=>{

    console.log(request.body)
    console.log(request.file)

         let product = new productSchema({
             
             name :request.body.name,
             description :request.body.description,
            
             inStock :request.body.inStock,
                  price :request.body.price,
                  
         });
         product.img.data = fs.readFileSync(request.file.path)
product.img.contentType =  request.file.mimetype;
        //  product.img.data = fs.readFileSync(request.body.imgpath);
        //  product.img.contentType="image/png"
         console.log(product)
         product.save().then(()=>{
             console.log("dddddddddd")
             response.send(product)
         }).catch(()=>{
            console.log("notsaved")

            response.send("notsaved")
         }) 
});

productRouter.get("/list",(request,response)=>{
    productSchema.find({}).then((data)=>{
        response.send(data);
    }).catch(()=>{
        response.send("eroorr");

    })
})


productRouter.get("/edit/:id",(request,response)=>{
    productSchema.findOne({_id:request.params.id},{
      
    }).then((data)=>{
        response.send(data);
    }).catch(()=>{
        response.send("eroorr");

    })
})
productRouter.post("/edit/:id",(request,response)=>{
    productSchema.updateOne({_id:request.params.id},{
        $set:{
           name:request.body.name,
           description:request.body.description,
           inStock:request.body.inStock,
           price:request.body.price,
           

        }
    }).then((data)=>{
        response.send(data);
    }).catch(()=>{
        response.send("eroorr");

    })
})

productRouter.post("/delete/:id",(request,response)=>{
    productSchema.deleteOne({_id:request.params.id}).then((data)=>{
        response.send(data);
    }).catch(()=>{
        response.send("eroorr");

    })
})
module.exports = productRouter ;