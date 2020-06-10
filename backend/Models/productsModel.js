let mongoose=require("mongoose"),

autoIncrement = require('mongoose-auto-increment');
 
var connection = mongoose.createConnection("mongodb://localhost:27017/onlineShoppingDB");
 
autoIncrement.initialize(connection);



let productSchema= new mongoose.Schema({
    _id:Number,
    name:String,
    description:String,
          price:Number,
     img:{data:Buffer,contentType:String},

    inStock:Number,

},{_id:false})
productSchema.plugin(autoIncrement.plugin, 'products');

mongoose.model("products",productSchema)


