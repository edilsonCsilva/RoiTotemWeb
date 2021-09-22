var bodyDocumentHeight=document.body.clientHeight
var localStorger = new LocalStorger()
var token = localStorger.getToObject("token")
var campaign = localStorger.getToObject("campaign")
var modal = $("#msn")
var boxProcess = $("#box-process")
var containerTerms=""
var waitingTime= new Date()
var timesClicksPagers=80
var timesContexSetInteval=null
var limitTime=100
var context=`<div id="containerstillkeyboard" class="still-keyboard-close fluid-screen"></div>`
var contextSon1=$("#context-son-1")
var contextThis=$("#context-this")
var contextActive="undefined"







if (token == null || token.data.length == 0 || campaign == null) {
    location.href = "/"
}
 

$(document).ready(function () {
    containerTerms=$("#containerTerms")



    $(".seachAddress").on("click",function(){
        var inputparent=$(this).attr("inputparent")
        searchByAddress(inputparent)
    })

    $(".onclickTerms").on("click",function(){
        var configs = Api();
        try{
            var config = {
                validateStatus:false,
				headers: {
					'Authorization': 'Bearer ' + token.data.token
				}
			}
			var apiUrl = configs.url + configs.routes.totemcorporationscontract 
			axios.get(apiUrl, config)
				.then(function (response) {
                    console.log(response)
                    openTerms(response.data.contract)
				}).then(data => {
					console.log("1 ", data)
				}).catch(error => {

                })
        }catch(e){}
    })




    timesContexSetInteval=setInterval(function () {
        timesClicksPagers--
        if(timesClicksPagers==0){
             
           window.location.href = "/"
            return
        }
       // console.log("click",timesClicksPagers)

    },12*100)

    $("body").mousemove(function(){
        //sconsole.log("add ")
        if(timesClicksPagers < limitTime){
            timesClicksPagers++
        }
        
    });
    $(window).bind('beforeunload', function(){
        clearInterval(timesContexSetInteval)
    });



    $("#input_address").focus(function () {
        //this.value = ""
       // $("#input_zipcode").click();
      //  $("#input_zipcode").focus();
        
    })
    $("#input_zipcode").change(function () {
        $(this).keyup()
    })
    $("#input_zipcode").keyup(function () {
        waitingTime= new Date()
        getBoxProcess(boxProcess, true)
        setTimeout(function (el) {
            var zipcode = $(el).val().replace(/[^\d]+/g,'')
            var configs = Api();
            var configRequestsAxios = {
                validateStatus:false,
                headers: {
                    'Authorization': 'Bearer ' + token.data.token
                }
            }
            var apiUrl = configs.url + configs.routes.publiczipcodes + "/search?postal_code=" + zipcode
            axios.get(apiUrl, configRequestsAxios)
                .then(function (response) {
                    $("#__zipcodeid__").val("")
                    $("#input_address").val("")
                    try {
                        if (response.data.zipcodes != null) {
                            var address = response.data.zipcodes[0].public_place
                                + ", " + response.data.zipcodes[0].district
                                + ", " + response.data.zipcodes[0].state
                            $("#__zipcodeid__").val(response.data.zipcodes[0].id)
                            $("#input_address").val(address)
                        }
                        getBoxProcess(boxProcess, false)
                    } catch (e) { getBoxProcess(boxProcess, false) }
                  //  console.log(response)
                })
        }($("#input_zipcode")), 1000)
    })
    $("#btnSave").on("click", function () {
        waitingTime= new Date()
        var data = {
            full_name: $("#input_name").val(),
            phone: $("#input_phone").val().replace(/[^\d]+/g,''),
            address: $("#input_address").val(),
            zipcode_id: $("#__zipcodeid__").val(),
            number_house: $("#input_number").val(),
            campaign_id: campaign.id
        }
        $("#btnSave").val("PROCESSANDO...")
        let timerInterval
        Swal.fire({
            title: '',
            html: 'Processando.',
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                    const content = Swal.getContent()
                    if (content) {
                        const b = content.querySelector('b')
                        if (b) {
                            b.textContent = Swal.getTimerLeft()
                        }
                    }
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })
        try {
            localStorger.insert("customers", JSON.stringify(data))
            var configs = Api();
            var configRequestsAxios = {
                validateStatus:false,
                headers: {
                    'Authorization': 'Bearer ' + token.data.token
                }
            }

            
            axios.post(configs.url + configs.routes.totemcustomersstore, data, configRequestsAxios)
                .then(function (response) {

                    location.href = "/printcupom"
                }).then(data => {
                    console.log("1 ", data)

                })
                .catch(error => {

                    console.log("2 ", error.response.data[0].message)

                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data[0].message,
                        showConfirmButton: false,
                        timer: 3500,
                        willClose: () => {
                            __closeKeyBoard()
                            window.location.href = "/"
                        }
                    })
                    setTimeout(function () {
                        $("#btnSave").val("ENVIAR")
                        $("#msn-modal-body").html("")
                        $("#input_zipcode").val("")
                        //$("#input_zipcode").click();
                        // $("#input_zipcode").focus();
                    }, 3000)
                });
        } catch (e) {
            console.log(e)
        }
    })
});
function getBoxProcess(boxUuid, visible) {
    if (visible)
        boxUuid.html(` <div   class="box-process" ><div class="box-process item">Buscando Endereço...</div> </div>`)
    else
        boxUuid.html("")
}


function openTerms(terms){
  var newHeight=bodyDocumentHeight-250;
  try{



            var template=`<div class="modal" tabindex="-1" id="terms">
                            <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                <h5 class="modal-title">TERMOS DE SERVIÇO ROI </h5>
                                <button type="button" class="btn-close onClickClose"   data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                 <div class="modal-body">
                                 
                                  <div id="divContent" class=' ' style="height:`+newHeight+`px; overflow:auto; ">
                                  :conteudo
                                  </div>
                                </div>
                                <div class="modal-footer">
                                <button type="button" class="btn btn-secondary onClickClose" data-bs-dismiss="modal">Close</button>
                               
                                </div>
                            </div>
                            </div>
                        </div>`



            template=template.replace(":conteudo",terms)          
            containerTerms.html(template).show()
            $("#terms").slideDown(1).show()
            $(".onClickClose").on("click", function(){
                $("#terms").slideDown(60) 
                $("#terms").slideUp(1000,function(){
                     containerTerms.html("").hide()
                    }
                );
            })

  }catch(e){
      console.log(e)
  }


}



function  searchByAddress(inputparent){
    var newHeight=document.body.scrollHeight;
    try{
        $("#listAddress").html("")
        inputSeachAddress=$("#inputSeachAddress")
        contextThis.html("")
        contextSon1.html(context)
    
        inputSeachAddress.attr("height",document.body.scrollHeight)
        inputSeachAddress.show()
        __initStillKeyboard()
        window.scrollTo(0,0);
        $("#input_address_seach").val("")
        $("#input_address_seach").focus()
        $("#input_address_seach").click()
        $("#input_address_seach").change(function () {
            $(this).keyup()
        })
        $("#input_address_seach").keyup(function () {

           console.log($(this).val())
           var addressAndLocated=[]
           var configs = Api();
           try{
               var config = {
                   headers: {
                       'Authorization': 'Bearer ' + token.data.token
                   }
               }
               var apiUrl = configs.url + configs.routes.publiczipcodessearchaddress+"="+$(this).val()
               $("#listAddress").html("")
               $("#listAddress").html("<li class=\"p-3\"><b>Pesquisando...</b></li>")
               
               axios.get(apiUrl, config)
               .then(function (response) {
                    if(typeof response.data.zipcodes !="undefined"){
                       if(response.data.zipcodes.length > 0){
                           $("#listAddress").html("")
                           var address=response.data.zipcodes
                           for(next=0;next < address.length;next++){
                                var address_=address[next].public_place+" ,"+address[next].district+" ,"+address[next].state
                                if(addressAndLocated.indexOf(address_)===-1){
                                    var actionAttributed=address[next].id
                                    var actionAttributedZip=address[next].postal_code
                                    addressAndLocated.push(address_)
                                    $("#listAddress").append("<li   zipcode=\""+actionAttributedZip+"\" zipcodeId=\""+actionAttributed+"\" class=\"onClickListSelected p-3 list-group-item list-group-item-action \">"+address_+"</li>")

                                }

                           }

                           $(".onClickListSelected").on("click",function(){
                               var id=$(this).attr("zipcodeId")
                               var zipcode=$(this).attr("zipcode")
                               var address=$(this).text()
                               if(zipcode!=="null"){
                                        $("#input_zipcode").val(zipcode.replace(/[^\d]+/g,''))
                               }
                               
                               $("#__zipcodeid__").val(id)
                               $("#input_address").val(address)
                               $("#btnCloseSeach").click()
                            
                           })
                       }else{
                        $("#listAddress").html("")
                        $("#listAddress").html("<li class=\"p-3\"><b>Endereço não Localizado...</b></li>")
                       }
                   }else{
                    $("#listAddress").html("")
                    
                   }
               }).then(data => {
                   console.log("1 ", data)
                   
               }).catch(error => {
                
               })
           }catch(e){}
        })
        $("#btnCloseSeach").on("click",function(){
            if ($("#input_address_seach").hasClass("onchange")) {
                $(this).removeClass("onchange")
            }
            __closeKeyBoard()
           contextSon1.html("")
           contextThis.html("")
           contextThis.html(context)
          
           inputSeachAddress.hide()
           __initStillKeyboard()
           $("#input_zipcode").focus()
           $("#input_zipcode").click()
           
             

        })



     




    }catch(e){
        console.log(e)
    }

    
}




