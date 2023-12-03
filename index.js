const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const Stripe = require('stripe')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json({limit : "10mb"}))


//STATIC Folder
app.use(express.static(path.join(__dirname,'./frontend/build')))

//STATIC ROUTES
app.get('*', function(req,res){
  res.sendFile(path.join(__dirname, './frontend/build/index.html'))
})

//port
const PORT = process.env.PORT || 8080


//MONGODB CONNECTION
mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log("Connected to database"))
.catch((err)=>console.log("err"))



//schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    confirmPassword: String,
    image : String,
});


//MODEL
const userModel = mongoose.model("student",userSchema)



//API
app.get("/",(req,res)=>{
    res.send("server is running by abhishek")
})
//SIGNUP API
app.post("/signup", async (req, res) => {
    try {
      const { email } = req.body;
      const existingUser = await userModel.findOne({ email: email });
  
      if (existingUser) {
        res.status(400).json({ message: "Email id is already registered",alert: false });
      } else {
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).json({ message: "Successfully signed up", alert: true });
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  //LOGIN API
  app.post("/login", async (req, res) => {
    try {
      const { email } = req.body;
      const result = await userModel.findOne({ email: email }).exec(); // Use .exec() to return a Promise
  
      if (result) {
        
        const dataSend = {
          _id:result._id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          image: result.image,
        };
        console.log(dataSend);
        res.json({ message: "Login is successful", alert: true,data : dataSend });
      } else {
        res.status(401).json({ message: "Login failed. User not found", alert : false });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


  //product section




  const schemaProduct = mongoose.Schema({
    name : String,
    category :  String,
    image :  String,
    price :  String,
    description : String,
  });
  const productModel = mongoose.model("product", schemaProduct)


  //save product in database
  //api
  app.post("/uploadProduct",async(req,res)=>{
    //console.log(req.body);
    const data = await productModel(req.body)
    const datasave = await data.save()
    res.send({message : "upload successfully"})
  })

  //
  app.get("/product", async(req,res)=>{
    const data =await productModel.find({})
    res.send(JSON.stringify(data))
  })


  /**payment gateway */
  console.log(process.env.STRIPE_SECRET_KEY);

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  app.post("/checkout-payment", async (req, res) => {
    
  
    try {
      const params = {
        submit_type: 'pay',
        mode: "payment",
        payment_method_types: ['card'],
        billing_address_collection: "auto", // Corrected parameter name
        shipping_options: [{ shipping_rate: "shr_1O041oSGqANieHqIfukKGE3t" }],
  
        line_items: req.body.map((item) => {
          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.name,
                // images: [item.image]
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.qty,
          };
        }),
        success_url: `${process.env.FRONTEND_URL}/success`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      };
  
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session.id);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message); // Corrected status code
    }
  });
  

 //server is running 
app.listen(PORT,()=>console.log("server is running at port :" + PORT))