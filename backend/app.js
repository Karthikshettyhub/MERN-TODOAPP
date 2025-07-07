const express = require('express');
const app = express();
const auth = require("./routers/auth");
const list = require("./routers/list");

require("./connection/mongoDB")

app.use(express.json())

app.get('/',(req,res) =>{
    res.send('hello user')
})
app.use("/api/v1",auth);
app.use("/api/v2", list);


app.listen(1000,()=>{
    console.log('server is running on port 1000');
});