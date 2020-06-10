let mongoose=require("mongoose"),

autoIncrement = require('mongoose-auto-increment');
 
var connection = mongoose.createConnection("mongodb://localhost:27017/onlineShoppingDB");
 
autoIncrement.initialize(connection);

let usersShema = new mongoose.Schema({
    _id:Number,
    fName:String,
    lName:String,
    email:String,
    Password:String,
    cart:[
        
        {
        "productId":{type:Number,ref:"products"},
        "productQuentity":{type:Number}
        }
    ]
        
    },{_id:false}
)
usersShema.plugin(autoIncrement.plugin,"Users")
mongoose.model("Users",usersShema)