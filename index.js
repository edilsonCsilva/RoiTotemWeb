const express = require("express")
const cors    =require("cors")
const bodyParser = require("body-parser")
const PdfKit = require('pdfkit');
const JsBarcode = require('jsbarcode');
const fs = require('fs');
 







const swig  = require('swig');
const  app = express()
const pdf = new PdfKit();
 

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
  
app.get("/fontawesome/css/:style", function(req,res){
    res.sendFile(__dirname + "/fontawesome/css/"+req.params.style )
})

app.get("/fontawesome/fonts/:style", function(req,res){
    res.sendFile(__dirname + "/fontawesome/fonts/"+req.params.style )
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

     

app.get("/p",function(req,res){


    try{
        var data={
            "name":'Still Distribuidora . LTDA',
            "address" : "Avenida Alto Sucuriu , 32 , Jd.Antarttica ,SP",
            "infoCnpj"   :"CNPJ:00.090.476/0001-60 ",
            "infoIe"   :"IE:825.872.620.713",
    
        }
    
        var x=0,y=0
        const { createCanvas } = require("canvas");
        const canvas = createCanvas();
        JsBarcode(canvas, "1234567890128",x,100, {format: "ean13",height:10});
        pdf.fontSize('9')
        x=50
        pdf.text(data.name, x, y+=50)
        pdf.text(data.address, x, y+=15)
        pdf.text(data.infoCnpj, x, y+=15)
        pdf.text(data.infoIe, x, y+=15)
    
        pdf.text('****************************************************************', x, y+=30)
        pdf.text('                       Cupom Fiscal Eletronico-SAT              ', x, y+=20)
        pdf.text('****************************************************************', x, y+=25)
    
        pdf
            .fontSize('18')
            .fillColor('#6155a4')
            .text('lembre-se:',x,y+=25, {
                align: 'left'
            })
        
        pdf
            .fontSize('10')
            .fillColor('#6155a4')
            .text('cada cupom só pode ser usado uma única vez.',x,y+=25, {
                align: 'left'
            })
    
      
    
        pdf.fillColor('#000')

        
        pdf.text('*********************************************************** ', x, y+=25)
        // Adiciona uma imagem na posição X: 300 e Y: 300
        pdf.image(canvas.toDataURL('image/png'),x+35,y+=10,{scale: 0.45})
        pdf.pipe(fs.createWriteStream('output.pdf'))
        .on('finish', function () {
            console.log('PDF closed');
            
        });

        pdf.end();
        


        
        
        

        setTimeout(function(){
         //  const {exec} = require("child_process")
         //  exec('sh print.sh').unref()

        
         


                
       
        },3000)
      
    
    }catch(e){
        console.log(e)
    }
    res.send("O")
})
             

           
   


    
 
         
    
 
 
    
    


    
 

//Fim rotas do site 

app.listen(8089,function(){
    console.log("Rodando...")  
})            
    
