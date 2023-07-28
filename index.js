const express=require("express")
const app=express()
app.use(express.json())
const mongoose=require("mongoose")
const nodemailer=require("nodemailer")
const MailGen=require("mailgen")
const connect=mongoose.connect("mongodb://localhost:27017/mail").then((res)=>console.log("Connect to mongoose")).catch((err)=>console.log("Error connecting"))
const userSchema=new mongoose.Schema({
    "email":{type:String, required:true},
    "subject":{type:String, required:true},
    "text":{type:String, required:true},
    // "html":{type:String, required:true},
    
},{
    versionKey:false,
    timestamps:true
})
app.post("/sendmail",async (req,res)=>{
    let testAccount=await nodemailer.createTestAccount()

    const trasporter=await nodemailer.createTransport({
        host:"",
        port:587,
                secure:false,
                auth:{
                    user: 'ross.kirlin5@ethereal.email',
                    pass: 'nswhUGTcA9eWPmEqUv'

                }

    })
    
    const info=await trasporter.sendMail({
        from:'"vishal"  <Vishal@1307>',
        to:req.body.email,
        subject:req.body.subject,
        text:req.body.text,
        html:"<b>hello this is html</b>"

    })
    console.log(info)

   


    res.send(info)

    
    


})
app.post("/sendGmail", async (req,res)=>{
    let config={
        service:'gmail',
        auth:{
            user:"gaurav.raj459@gmail.com",
            pass:"twibiqacskdsmvzq"
        

        }
    }
    let trasporter=await nodemailer.createTransport(config)

    let mailGenerator=new MailGen({
        theme:'default',
                product:{
                    name:'masai school',
                    link:'https://mailgen.js.org'
                }
    })

    let response={
        body:{
           
            intro:"you bill is arrrived",
            table:{
                data:[
                    {
                        item:"NodeMailer Stack Book",
                        description:"A bacckend application",
                        price:"10"
                    }

                ]
            },
            outro:"lokking fowwar to bussiness"
        }
    }
    let mail=mailGenerator.generate(response)

    let message={
        from:"gaurav.raj459@gmail.com",
        to:req.body.email,
        subject:req.body.subject,
        text:req.body.text,
        html:mail
    }
    const info=await trasporter.sendMail(message)
    console.log(info)

    return res.send(info)


})
const User=mongoose.model("User",userSchema)

















app.listen(3000,async (req,res)=>{
    await connect
    console.log("Server is running")
})

