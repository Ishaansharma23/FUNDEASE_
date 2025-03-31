const express = require("express");
const app = express();
const path = require('path')
require("./db/conn.js");
const Register = require("./models/userregisters.js");
const { emitWarning } = require("process");
const bcrypt = require("bcryptjs")
require('dotenv').config();

const port = process.env.PORT || 3000;
// kasjdfls
console.log(__dirname);


const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const view_path = path.join(__dirname, "../views");
app.set("views", view_path);
app.set("view engine", "hbs");

console.log(process.env.SECRET)

app.get("/", (req, res) => {
    res.render("index");
})
app.get("/start",(req , res) =>{
    res.render("start")
})

app.get("/inv" , (req , res)=>{
    res.render("inv")
})

app.get("/community" , (req, res)=>{
    res.render("community")
})

app.get("/login.html", (req, res) => {
    res.render("login");
})
app.get("/form_startup.html", (req, res) => {
    res.render("form2");
})
app.get("/form.html", (req, res) => {
    res.render("form");
})
app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/register", async (req, res) => {
    try {
        const registerEmployee = new Register({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        
        const token = await registerEmployee.generateAuthtoken();
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
            httpOnly: true, //  Makes the cookie accessible only by the web server
        });
        // registerEmployee.password = await bcrypt.hash(req.body.password, 10);


        const registered = await registerEmployee.save()
        
        res.status(201).render("investor")
    } catch (error) {
        res.status(400).send(error)
    }
})

// // login check

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        
        const useremail = await Register.findOne({ email: email })

        const isMatch =  await bcrypt.compare(password, useremail.password);
        console.log(password , useremail.password)

        const token = await useremail.generateAuthtoken();

        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
            httpOnly: true, //  Makes the cookie accessible only by the web server
        });

        if (isMatch) {const express = require("express");
const app = express();
const path = require('path')
require("./db/conn.js");
const Register = require("./models/userregisters.js");
const bcrypt = require("bcryptjs")
require('dotenv').config();

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const view_path = path.join(__dirname, "../views");
app.set("views", view_path);
app.set("view engine", "hbs");

console.log(process.env.SECRET)

app.get("/", (req, res) => {
    res.render("index");
})
app.get("/start",(req , res) =>{
    res.render("start")
})

app.get("/inv" , (req , res)=>{
    res.render("inv")
})

app.get("/community" , (req, res)=>{
    res.render("community")
})

app.get("/login.html", (req, res) => {
    res.render("login");
})
app.get("/form_startup.html", (req, res) => {
    res.render("form2");
})
app.get("/form.html", (req, res) => {
    res.render("form");
})
app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const registerEmployee = new Register({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        
        const token = await registerEmployee.generateAuthtoken();
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
            httpOnly: true, //  Makes the cookie accessible only by the web server
        });

        const registered = await registerEmployee.save()
        
        res.status(201).render("investor")
    } catch (error) {
        res.status(400).send(error)
    }
})

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        
        const useremail = await Register.findOne({ email: email })

        const isMatch =  await bcrypt.compare(password, useremail.password);
        console.log(password , useremail.password)

        const token = await useremail.generateAuthtoken();

        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
            httpOnly: true, //  Makes the cookie accessible only by the web server
        });

        if (isMatch) {
            res.status(201).render("investor")
        } else {
            res.send("Invalid Login Details");
        }

    } catch (error) {
        res.status(400).send("Invalid Login Details")
    }
})

app.post("/registerstartup", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const registerEmployee = new Register({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        
        const token = await registerEmployee.generateAuthtoken();
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
            httpOnly: true, //  Makes the cookie accessible only by the web server
        });

        const registered = await registerEmployee.save()
        
        res.status(201).render("startup")
    } catch (error) {
        res.status(400).send(error)
    }
})

app.post("/loginstartup", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        
        const useremail = await Register.findOne({ email: email })

        const isMatch =  await bcrypt.compare(password, useremail.password);
        console.log(password , useremail.password)

        const token = await useremail.generateAuthtoken();

        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
            httpOnly: true, //  Makes the cookie accessible only by the web server
        });

        if (isMatch) {
            res.status(201).render("startup")
        } else {
            res.send("Invalid Login Details");
        }

    } catch (error) {
        res.status(400).send("Invalid Login Details")
    }
})

app.post("/LogOut" , (req,res)=>{
    res.clearCookie("jwt");
    res.render("index")
})

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})
            res.status(201).render("investor")
        } else {
            res.send("Invalid Login Details");
        }

    } catch (error) {
        res.status(400).send("Invalid Login Details")
    }
})

// for startup section
app.post("/registerstartup", async (req, res) => {
    try {
        const registerEmployee = new Register({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        
        const token = await registerEmployee.generateAuthtoken();
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
            httpOnly: true, //  Makes the cookie accessible only by the web server
        });

        const registered = await registerEmployee.save()
        
        res.status(201).render("startup")
    } catch (error) {
        res.status(400).send(error)
    }
})

// // login check

app.post("/loginstartup", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        
        const useremail = await Register.findOne({ email: email })

        const isMatch =  await bcrypt.compare(password, useremail.password);
        console.log(password , useremail.password)

        const token = await useremail.generateAuthtoken();

        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
            httpOnly: true, //  Makes the cookie accessible only by the web server
        });

        if (isMatch) {
            res.status(201).render("startup")
        } else {
            res.send("Invalid Login Details");
        }

    } catch (error) {
        res.status(400).send("Invalid Login Details")
    }
})

app.post("/LogOut" , (req,res)=>{
    res.render("index")
})

// hashing / encryption

// const bcrypt = require("bcryptjs");
// const { hash } = require("crypto");

// const securePassword =  async (password)=>{
//     const hashedPassword = await bcrypt.hash(password , 10)
//     console.log(hashedPassword)

//     const passwordCompare = await bcrypt.compare(password , hashedPassword)
//     console.log(passwordCompare)
// }
// securePassword("123456")



// how to crreaate a token jwt

// const createToken =  async () =>{
//   const token = await jwt.sign({_id : "67d58e73419e91eb5b41b75b"} , "mynameisishaansharmahowdoyoudoiamgood"
//     , {expiresIn : "2 seconds"}
//   );
//   console.log(token)

//   const userVerify = await jwt.verify(token , "mynameisishaansharmahowdoyoudoiamgood")
//   console.log(userVerify)
// }

// createToken();

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})