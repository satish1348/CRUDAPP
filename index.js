const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const db = mysql.createPool(
    {
        host:'localhost',
        user:'root',
        password:"mysql123",
        database:"mydb"
    }
)

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get",(req,res)=>
{
    const sqlselect = 'select * from contactdetails';
    db.query(sqlselect,(error,result)=>
    {
        res.send(result);
    })
})

app.post("/api/post",(req,res)=>
{
    const {name,email,mobile} =req.body;
    const sqlinsert = "insert into contactdetails(name,email,mobile) values(?,?,?);"
    db.query(sqlinsert,[name,email,mobile],(error,result)=>
    {
        console.log("error",error);
        console.log("result",result)
    })
})
app.delete("/api/remove/:id",(req,res)=>
{
    const {id} = req.params;
    const sqlRemove = "delete from contactdetails where id = ?";
    db.query(sqlRemove,id,(error,result)=>
    {
        if(error)
        {
             console.log(error);
        }

    })
})

app.get("/api/get/:id",(req,res)=>
{
    const {id} = req.params;
    const sqlselect = 'select * from contactdetails where id = ?';
    db.query(sqlselect,id,(error,result)=>
    {
       
        res.send(result);
    })
})
app.put("/api/put/:id",(req,res)=>
{
    const {id} = req.params
    const {name,email,mobile} =req.body;
    const sqlinsert = "update contactdetails set name = ?,email=?,mobile=? where id=?;"
    db.query(sqlinsert,[name,email,mobile,id],(error,result)=>
    {
        console.log("error",error);
        console.log("result",result)
        res.send(result);
    })
})

app.get("/",(req,res)=>
{
    // const sqlinsert = "insert into contact(name,email,mobile) values('nobhitha','nobhi143@gmail.com','9494343434');"
    // db.query(sqlinsert,(error,result)=>
    // {
    //     console.log("error",error);
    //     console.log("result",result)
    // })
    // res.send("Hello express");
})

app.listen(3333,()=>
{
    console.log("server is running ");
})