const express= require('express');
const app= express()
const cors= require('cors');
const port= 3000
const routes= require('./routers/index');

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/',routes)

app.listen(port,()=>{
    console.log(`CONNECTED PORT ${port}`);
})