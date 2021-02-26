
var localStorger = new LocalStorger()
var token = localStorger.getToObject("token")
var campaign = localStorger.getToObject("campaign")
var modal = $("#msn")
var boxProcess = $("#box-process")
var waitingTime= new Date()



if (token == null || token.data.length == 0 || campaign == null) {
    location.href = "/"
}


$(document).ready(function () {
    
    setTimeout(function () {
        // window.location.href="/"                
    }, 60 * 1000)


    $("#input_address").focus(function () {
        this.value = ""
        $("#input_zipcode").click();
        $("#input_zipcode").focus();
        
    })
    $("#input_zipcode").change(function () {
        $(this).keyup()
    })
    $("#input_zipcode").keyup(function () {
        waitingTime= new Date()
        getBoxProcess(boxProcess, true)
        setTimeout(function (el) {
            var zipcode = $(el).val()
            var configs = Api();
            var configRequestsAxios = {
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
                    console.log(response)
                })
        }($("#input_zipcode")), 1000)
    })
    $("#btnSave").on("click", function () {
        waitingTime= new Date()
        var data = {
            full_name: $("#input_name").val(),
            phone: $("#input_phone").val(),
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

