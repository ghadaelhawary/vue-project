const express = require("express");
const mongoose = require("mongoose");

let userRouter = express.Router();
require("../Models/usersModel");
let userSchema = mongoose.model("Users");
require("../Models/productsModel");
let productSchema = mongoose.model("products");


// add product
userRouter.post("/addtoCart", (request, response) => {
    console.log(request.body)
    checkExistaice(request.body.id, request.body.productId).then((x) => {
        if (x != -1) {
            var updated = {};
            updated[`cart.${x}.productQuentity`] = 1;
            console.log(updated)
            //   y = `cart.${x}.productQuentity`
            userSchema.updateOne({ _id: request.body.id }, {
                $inc: updated
            }
            ).then((data) => {
                productSchema.updateOne({ _id: request.body.productId }, {
                    $inc: {
                        inStock: -1
                    }
                }).then((product) => {
                    console.log(data)
                    console.log(product)

                    response.send(data)
                })


            })
        } else {
            userSchema.updateOne({ _id: request.body.id }, {
                $push: {
                    "cart": {
                        productId: request.body.productId,
                        productQuentity: 1
                    }

                }
            }).then((updated) => {
                response.send(updated)
            })
        }

    })

})
//increase product
userRouter.put("/incrementProduct", (request, response) => {
    console.log(request.body)
    checkExistaice(request.body.userId, request.body.productId).then((x) => {

        var updated = {};
        updated[`cart.${x}.productQuentity`] = 1;
        console.log(updated)
        userSchema.updateOne({ _id: request.body.userId }, {
            $inc: updated
        }).then((data) => {
            console.log(data)
            response.send(data)
        }).catch(() => {

        })
    })
})
// decreament product
userRouter.put("/decrmentProduct", (request, response) => {
    checkExistaice(request.body.userId, request.body.productId).then((x) => {

        var updated = {};
        updated[`cart.${x}.productQuentity`] = -1;
        console.log(updated)
        userSchema.updateOne({ _id: request.body.userId }, {
            $inc: updated
        }).then((data) => {
            response.send(data)
        }).catch(() => {

        })
    })
})
/// delete product from userCart
userRouter.post("/delete", (request, response) => {
    console.log(request.body)
    userSchema.updateOne({ _id: request.body.id }, {
        $pull: {
            "cart": { "productId": request.body.productId }
        }
    }).then((data) => {
        response.send(data)
    }).catch(() => {
        response.send("gggggggggggg")
    })
})

async function checkExistaice(userId, productId) {
    //  console.log(userId)
    //  console.log(productId)

    indexe = -1;
    await userSchema.findOne({ _id: userId }).then((data) => {

        data.cart.forEach((element, index) => {
            console.log(element.productId)
            console.log(productId)


            if (element.productId == productId) {
                indexe = index
                // console.log(index+"gggggggggg")
            }

        })
    })
    //  console.log("hellllllllllllllo")
    return indexe;

}
userRouter.get("/list/:id", (request, response) => {

    userSchema.findOne({ _id: request.params.id }).populate("cart.productId").then((user) => {
        response.send(user)
    })
})
userRouter.post("/instock", (request, response) => {
    productSchema.findOne({ _id: request.body.productId }).then((product) => {
        response.send(product)
    })
})
userRouter.put("/increaseStock", (request, response) => {
    productSchema.updateOne({ _id: request.body.productId }, {
        $inc: {
            inStock: 1
        }
    })
        .then((product) => {
            response.send(product)
        })
})
/// decreaseing product in stock 
userRouter.put("/decreaseStock", (request, response) => {
    productSchema.updateOne({ _id: request.body.productId }, {
        $inc: {
            inStock: -1
        }
    })
        .then((product) => {
            response.send(product)
        })
})


module.exports = userRouter;