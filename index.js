const express = require("express")
 

const cors    =require("cors")
const bodyParser = require("body-parser")
const swig  = require('swig');
const  app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('views'));
app.set('view cache', false);

 
 

const title="Still, Roi!"
 
//Inicio rotas do site 
app.get("/css/:style", function(req,res){
    res.sendFile(__dirname + "/css/"+req.params.style )
})
  
app.get("/js/:js", function(req,res){
    res.sendFile(__dirname + "/js/"+req.params.js)
})
  
app.get("/js/qr/:js", function(req,res){
    res.sendFile(__dirname + "/js/qr/"+req.params.js)
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
    res.send(swig.renderFile(__dirname+'/views/consultcampaign.html', {
        title: title
    }))
  })



app.get("/selectaccess", function(req,res){
    res.send(swig.renderFile(__dirname+'/views/selectaccess.html', {
        title: title
    }))
  })

app.get("/useralreadyregistered", function(req,res){
    res.send(swig.renderFile(__dirname+'/views/useralreadyregistered.html', {
        title: title
    }))
})

app.get("/printcupom", function(req,res){
    res.send(swig.renderFile(__dirname+'/views/printcupom.html', {
        title: title
    }))
}) 
  

app.get("/newrecord", function(req,res){
    res.send(swig.renderFile(__dirname+'/views/newrecord.html', {
        title: title
    }))
}) 

     

                
           
   


    
 
         
    
 
 
    
   



 

//Fim rotas do site 

app.listen(8089,function(){
    console.log("Rodando...")  
})            
 


   

       
              

               

        


     

                                                         
                                  


                             
  

 

