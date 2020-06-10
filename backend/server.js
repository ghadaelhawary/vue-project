let express=require("express"),
    express_session=require("express-session"),
    connect_flash=require("connect-flash"),
    mongoose=require("mongoose"),
    path=require("path"),
    body_parser=require("body-parser"),
     productRouter =  require("./Routes/productsRouter"),
     authRouter =  require("./Routes/authRouter"),
     userRouter =  require("./Routes/userRouter");
     const multer = require('multer');


 
     var cors = require('cors')
   



//open server
let server=express();

 let connection = mongoose.connect("mongodb://localhost:27017/onlineShoppingDB",{ useUnifiedTopology: true,useNewUrlParser: true })
        .then(()=>{
            console.log("DB Connected ...")
        })
        .catch((error)=>{
            console.log(error);
        })
        console.log(connection)



// all view is in this dir name 
server.set("views",path.join(__dirname,"views"));

//static //
server.use(express.static(path.join(__dirname,"public")));
server.use(express.static(path.join(__dirname,"node_modules","jquery","dist")));
server.use(express.static(path.join(__dirname,"node_modules","bootstrap","dist")));
server.use(body_parser.urlencoded( {extended:false}));
server.use(body_parser.json());
server.use(cors());



server.use((request,response,next)=>{
  console.log(request.url,request.method);
  next()
})

server.use("/user",authRouter);

server.use("/products",productRouter);
server.use("/userproduct",userRouter);





let port=process.env.port||8080;
server.listen(port,()=>{
    console.log("I am Listening ..........");
});