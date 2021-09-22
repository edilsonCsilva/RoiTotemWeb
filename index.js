const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const PdfKit = require('pdfkit');
const JsBarcode = require('jsbarcode');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const swig = require('swig');
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('views'));
app.set('view cache', false);




const title = "Still, Roi!"

//Inicio rotas do site 
app.get("/css/:style", function (req, res) {
    res.sendFile(__dirname + "/css/" + req.params.style)
})

app.get("/fontawesome/css/:style", function (req, res) {
    res.sendFile(__dirname + "/fontawesome/css/" + req.params.style)
})

app.get("/fontawesome/fonts/:style", function (req, res) {
    res.sendFile(__dirname + "/fontawesome/fonts/" + req.params.style)
})


app.get("/js/:js", function (req, res) {
    res.sendFile(__dirname + "/js/" + req.params.js)
})

app.get("/js/qr/:js", function (req, res) {
    res.sendFile(__dirname + "/js/qr/" + req.params.js)
})


app.get("/img/:img", function (req, res) {
    res.sendFile(__dirname + "/img/" + req.params.img)
})



app.get("/", function (req, res) {
    res.send(swig.renderFile(__dirname + '/views/indexx.html', {
        title: title
    }))
})


app.get("/start", function (req, res) {
    res.send(swig.renderFile(__dirname + '/views/consultcampaign.html', {
        title: title
    }))
})



app.get("/selectaccess", function (req, res) {
    res.send(swig.renderFile(__dirname + '/views/selectaccess.html', {
        title: title
    }))
})

app.get("/useralreadyregistered", function (req, res) {
    res.send(swig.renderFile(__dirname + '/views/useralreadyregistered.html', {
        title: title
    }))
})

app.get("/printcupom", function (req, res) {
    res.send(swig.renderFile(__dirname + '/views/printcupom.html', {
        title: title
    }))
})


app.get("/newrecord", function (req, res) {
    res.send(swig.renderFile(__dirname + '/views/newrecord.html', {
        title: title
    }))
})



app.post("/printcupom", function (req, res) {
    var pdf = new PdfKit();
    var arquivos = uuidv4() + '.pdf'
    var print_disp = ["Epson_Stylus_TX230", "CUSTOM VKP80 II", "Samsung_M262x_282x_Series"]
    var defaultprint =1

    try {
        var x = 0, y = 0
        const { createCanvas } = require("canvas");
        const canvas = createCanvas();
        var dataBodyPosts = req.body
        var customers = dataBodyPosts.customers
        var data = {
            "name": dataBodyPosts.companyName,
            "address": dataBodyPosts.companysadress,
            "infoCnpj": dataBodyPosts.cnpj,
            "infoIe": dataBodyPosts.ie,
            "descricao": dataBodyPosts.description
            
        }
        JsBarcode(canvas, dataBodyPosts.barcode, x, 100, { format: "ean13", height: 10 });
        pdf.fontSize('9')
        x = 15
        pdf.text(data.name, x, y += 15)
        pdf.text(data.address, x, y += 15)
        pdf.text(data.infoCnpj, x, y += 15)
        pdf.text(data.infoIe, x, y += 15)
        pdf.text('*******************************************************', x, y += 30)
        pdf.text('             Cupom Fiscal Eletronico-SAT               ', x, y += 20)
        pdf.text('*******************************************************', x, y += 25)

        pdf
        .fontSize('9')
        .fillColor('#0000')
        .text('Itens:', x, y += 15, {
            align: 'left'
        })


        for(i=0;i < 25;i++){

            pdf
            .fontSize('9')
            .fillColor('#0000')
            .text(dataBodyPosts.description, x, y += 15, {
                align: 'left'
            })

        }

        pdf
            .fontSize('18')
            .fillColor('#0000')
            .text('lembre-se:', x, y += 25, {
                align: 'left'
            })

        





        pdf
            .fontSize('10')
            .fillColor('#000')
            .text('cada cupom só pode ser usado uma \n\                  única vez.', x, y += 25, {
                align: 'left'
            })

        pdf.fillColor('#000')
        pdf.text('*************************************************', x, y += 25)
        // Adiciona uma imagem na posição X: 300 e Y: 300
        pdf.image(canvas.toDataURL('image/png'), x + 35, y += 10, { scale: 0.45 })
        pdf
            .fontSize('10')
            .fillColor('#000')
            .text('             Seja Bem Vindo :) \n', x, y += 80, {
                align: 'left'
            })

            

        pdf.pipe(fs.createWriteStream(arquivos))
            .on('finish', function () {
                console.log('PDF closed');

                //java -jar output.pdf Samsung_M262x_282x_Series
                var spawn = require('child_process').spawn;
                var prc = spawn('java', ['-jar', '-Xmx512M', '-Dfile.encoding=utf8', 'PdfPrintCmd.jar', arquivos + '|' + print_disp[defaultprint]]);
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

    } catch (e) {
        console.log(e)
    }
    pdf.end();
    res.send("")
})





//Fim rotas do site 

app.listen(8089, function () {
    console.log("Rodando...")
})

