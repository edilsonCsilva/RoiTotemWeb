const express = require("express")
const cors    =require("cors")
const bodyParser = require("body-parser")
const PdfKit = require('pdfkit');
const JsBarcode = require('jsbarcode');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


 







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

     

app.post("/printcupom",function(req,res){
    var pdf = new PdfKit();
    try{
       var x=0,y=0
       const { createCanvas } = require("canvas");
       const canvas = createCanvas();
       var dataBodyPosts=req.body
       var customers=dataBodyPosts.customers
       var data={
            "name":dataBodyPosts.companyName,
            "address" : dataBodyPosts.companysadress,
            "infoCnpj"   :dataBodyPosts.cnpj,
            "infoIe"   :dataBodyPosts.ie,
        }
        JsBarcode(canvas, dataBodyPosts.barcode,x,100, {format: "ean13",height:10});
        pdf.fontSize('9')
        x=15
        pdf.text(data.name, x, y+=15)
        pdf.text(data.address, x, y+=15)
        pdf.text(data.infoCnpj, x, y+=15)
        pdf.text(data.infoIe, x, y+=15)
        pdf.text('*******************************************************', x, y+=30)
        pdf.text('             Cupom Fiscal Eletronico-SAT               ', x, y+=20)
        pdf.text('*******************************************************', x, y+=25)
    
        pdf
            .fontSize('18')
            .fillColor('#0000')
            .text('lembre-se:',x,y+=25, {
                align: 'left'
            })
        
        pdf
            .fontSize('10')
            .fillColor('#000')
            .text('cada cupom só pode ser usado uma \n\                  única vez.',x,y+=25, {
                align: 'left'
            })
    
        pdf.fillColor('#000')
        pdf.text('*************************************************', x, y+=25)
        // Adiciona uma imagem na posição X: 300 e Y: 300
        pdf.image(canvas.toDataURL('image/png'),x+35,y+=10,{scale: 0.45})
        pdf
            .fontSize('10')
            .fillColor('#000')
            .text('             Seja Bem Vindo :) \n',x,y+=80, {
                align: 'left'
            })

        var arquivos=uuidv4()+'.pdf'

        pdf.pipe(fs.createWriteStream(arquivos))
        .on('finish', function () {
            console.log('PDF closed');

                //java -jar output.pdf Samsung_M262x_282x_Series
                var spawn = require('child_process').spawn;

                

                var prc = spawn('java',  ['-jar', '-Xmx512M', '-Dfile.encoding=utf8', 'PdfPrintCmd.jar',arquivos+'|Epson_Stylus_TX230']);



                //var prc = spawn('java',  ['-jar', '-Xmx512M', '-Dfile.encoding=utf8', 'PdfPrintCmd.jar']);

              //  var prc = spawn('java',  ['-jar', '-Xmx512M', '-Dfile.encoding=utf8', 'PdfPrintCmd.jar',arquivos+'|CUSTOM VKP80 II']);

              //  var prc = spawn('java',  ['-jar', '-Xmx512M', '-Dfile.encoding=utf8', 'PdfPrintCmd.jar',arquivos+'|Samsung_M262x_282x_Series']);
                //noinspection JSUnresolvedFunction

                //var prc = spawn('java',  ['-jar', '-Xmx512M', '-Dfile.encoding=utf8', 'PdfPrintCmd.jar',"output.pdf Samsung_M262x_282x_Series"]);
              
                //CUSTOM VKP80 II
               // var prc = spawn('java',  ['-jar', '-Xmx512M', '-Dfile.encoding=utf8', 'PdfPrintCmd.jar',"output.pdf CUSTOM VKP80 II"]);
                prc.stdout.setEncoding('utf8');
                prc.stdout.on('data', function (data) {
                    var str = data.toString()
                    var lines = str.split(/(\r?\n)/g);
                    console.log(lines.join(""));
                });
                prc.on('close', function (code) {
                    console.log('process exit code ' + code);
                    fs.unlinkSync(arquivos);

                });


            
        });

      


      
    }catch(e){
        console.log(e)
    }
    pdf.end();
    res.send("")
})
             




app.get("/p",function(req,res){
    var pdf = new PdfKit();
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
        x=15
        pdf.text(data.name, x, y+=15)
        pdf.text(data.address, x, y+=15)
        pdf.text(data.infoCnpj, x, y+=15)
        pdf.text(data.infoIe, x, y+=15)
        pdf.text('****************************************************************', x, y+=30)
        pdf.text('               Cupom Fiscal Eletronico-SAT              ', x, y+=20)
        pdf.text('****************************************************************', x, y+=25)
    
        pdf
            .fontSize('18')
            .fillColor('#0000')
            .text('lembre-se:',x,y+=25, {
                align: 'left'
            })
        
        pdf
            .fontSize('10')
            .fillColor('#000')
            .text('cada cupom só pode ser usado uma \núnica vez.',x,y+=25, {
                align: 'left'
            })
    
        pdf.fillColor('#000')
        pdf.text('*********************************************************** ', x, y+=25)
        // Adiciona uma imagem na posição X: 300 e Y: 300
        pdf.image(canvas.toDataURL('image/png'),x+35,y+=10,{scale: 0.45})
           
        pdf.pipe(fs.createWriteStream('output.pdf'))
        .on('finish', function () {
            console.log('PDF closed s');


            var spawn = require('child_process').spawn;
            var prc = spawn('java',  ['-jar', '-Xmx512M', '-Dfile.encoding=utf8', 'PdfPrintCmd.jar',"output.pdf Samsung_M262x_282x_Series"]);


            //var prc = spawn('java',  ['-jar', '-Xmx512M', '-Dfile.encoding=utf8', 'PdfPrintCmd.jar']);
        //  var prc = spawn('java',  ['-jar', '-Xmx512M', '-Dfile.encoding=utf8', 'PdfPrintCmd.jar']);

            //noinspection JSUnresolvedFunction
            prc.stdout.setEncoding('utf8');
            prc.stdout.on('data', function (data) {
                var str = data.toString()
                var lines = str.split(/(\r?\n)/g);
                console.log(lines.join("")+" dsdasdas");
            });

            prc.on('close', function (code) {
                console.log('process exit code sss' + code);
            });


         
        });

        
       

        





      
    }catch(e){
        console.log(e)
    }

    pdf.end();



    res.send("")
})
             

           
   


    
 
         
    
 
 
    
    


    
 

//Fim rotas do site 

app.listen(8089,function(){
    console.log("Rodando...")  
})            
    
