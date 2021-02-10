const express = require("express")
const cors    =require("cors")
const bodyParser = require("body-parser")
const swig  = require('swig');
const  app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


const title="Still, Roi!"
 
//Inicio rotas do site 
app.get("/css/:style", function(req,res){
    res.sendFile(__dirname + "/css/"+req.params.style )
})
  
app.get("/js/:js", function(req,res){
    res.sendFile(__dirname + "/js/"+req.params.js)
})
  
app.get("/img/:img", function(req,res){
    res.sendFile(__dirname + "/img/"+req.params.img)
})


app.get("/", function(req,res){
    res.send(swig.renderFile(__dirname+'/views/index.html', {
        title: title
    }))
  })


app.get("/start", function(req,res){
    res.send(swig.renderFile(__dirname+'/views/start.html', {
        title: title
    }))
  })


//Fim rotas do site 

app.listen(8089,function(){
    console.log("Rodando...")
})
 
