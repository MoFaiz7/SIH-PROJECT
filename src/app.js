const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/register");

const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) =>{
    res.render("index");
});

app.get("/register", (req, res)=>{
    res.render("register");
});

app.get("/login", (req, res)=>{
    res.render("login");
});

app.get("/about", (req, res)=>{
    res.render("about");
});

app.get("/contact", (req, res)=>{
    res.render("contact");
});

app.get("/afterLog", (req, res)=>{
    res.render("afterLog");
});

app.get("/products", (req, res)=>{
    res.render("products");
});

app.get("/location", (req, res)=>{
    res.render("location");
});

// create a new user in database
app.post("/register", async (req, res)=>{
    try{
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if(password === confirmPassword){
            const registerTraveler = new Register({
                firstname : req.body.firstname,
                middlename : req.body.middlename,
                lastname : req.body.lastname,
                email : req.body.email,
                phone : req.body.phone,
                gender : req.body.gender,
                DLNumber : req.body.DLNumber,
                issueDate : req.body.issueDate,
                validity : req.body.validity,
                password : req.body.password,
                confirmPassword : req.body.confirmPassword
            })

            const registered = await registerTraveler.save();
            res.status(201).render("index");
        }
        else{
            res.send("password is not matching");
        }
    }catch(e){
        res.status(400).send(e);
    }
})

//login verification

app.post("/login", async(req, res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const usermail = await Register.findOne({email:email});
        // res.send(usermail);
        if(password === usermail.password){
            res.status(201).render("afterLog");
        }else{
            res.send("invalid credentials");
            // res.render("invalid")
        }
    }catch(e){
        res.status(400).send("invalid credentials");
        // res.render("invalid")
    }
});

app.listen(port, ()=>{
    console.log(`server is running at port ${port}`);
})