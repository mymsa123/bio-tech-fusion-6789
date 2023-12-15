const express = require("express");
const {connection } = require("./db");
const { userRouter } = require("./routes/user.routes");

const app = express()
app.use(express.json())
app.use("/users",userRouter)

app.listen(8080,async()=>{
    try{
        await connection
        console.log("connected to db")
        console.log("server running at port 8080")
    }catch(err){
        console.log(err)
    }
})