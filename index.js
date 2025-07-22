const express = require("express");
const app = express();
const path = require("path");
app.use(express.static("public")); 

const ejs=require("ejs");
const collection=require("./mongodb")
 


app.set("view engine","ejs")
app.set('views', __dirname + '/templates');
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.get("/",(req,res)=>{
    res.render("login", { error: null });
})
app.get("/signup",(req,res)=>{
    res.render("signup", { error: null });
})
app.get('/home', (req, res) => {
  res.render('home');
});
app.post("/signup",async(req,res)=>{
    const data={
        name:req.body.name,
        password:req.body.password
    }
    
    await collection.create(data) 

    res.render("home")

})
app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.name });

    if (!check) {
      return res.render("login", { error: "User not found" });
    }

    if (check.password !== req.body.password) {
      return res.render("login", { error: "Wrong password" });
    }

    res.render("home");
  } catch (err) {
    console.log(err);
    res.render("login", { error: "An error occurred" });
  }
});
app.post("/logout", (req, res) => {
res.redirect("/");
});



app.listen(3000, () => {
console.log("port connected");
console.log("server connect at http://localhost:3000/")


});
