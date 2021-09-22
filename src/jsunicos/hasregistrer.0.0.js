var localStorger = new LocalStorger()
var token = localStorger.getToObject("token")
var campaign = localStorger.getToObject("campaign")
var timesClicksPagers=80
var timesContexSetInteval=null
var limitTime=100



var modal = $("#msn")
var isClick = false;
if (token == null || token.data.length == 0 || campaign == null) {
    location.href = "/"
}
$(document).ready(function () {



	timesContexSetInteval=setInterval(function () {
        timesClicksPagers--
        if(timesClicksPagers==0){
            window.location.href = "/"
            return
        }
        console.log("click",timesClicksPagers)

    },6*100)

	$("body").mousemove(function(){
		console.log("add ")
		if(timesClicksPagers < limitTime){
			timesClicksPagers++
		}
		
	});
	$(window).bind('beforeunload', function(){
		clearInterval(timesContexSetInteval)
	});
    

    

    $("#btn_process").on("click", function () {
        if (isClick) {
            return;
        }
        $("#btn_process").html(`<div  class="theme-btn-round-heigth-title ">
                                 <span class="colors-write">
                                 <b>PROCESSANDO..</b>
                                 </span></div>`)
        let timerInterval
        Swal.fire({
            title: '',
            html: 'Processando.',
            timer: 2000,
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

        setTimeout(function () {
            var configs = Api();
            var configRequestsAxios = {
                validateStatus:false,
                headers: {
                    'Authorization': 'Bearer ' + token.data.token
                }
            }
            var apiUrl = configs.url + configs.routes.totemcustomers + "/search?phone=" + $("#input_fone").val().replace(/[^\d]+/g,'')
            axios.get(apiUrl, configRequestsAxios)
                .then(function (response) {
                    if (response == undefined) {
                        isClick = false;
                    }
                    localStorger.insert("customers", JSON.stringify(response.data.customer))
                    var campaign = localStorger.getToObject("campaign")
                    var customer_id = response.data.customer.id
                    var campaign_id = campaign.id
                    axios.post(configs.url + configs.routes.totemcampaignscustomer,
                        { campaign_id: campaign_id, customer_id: customer_id }, configRequestsAxios)
                        .then(function (response) {

                            if(response.status!=201){
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: response.data.message,
                                    showConfirmButton: false,
                                    timer: 5500,
                                    willClose: () => {
                                         window.location.href = "/"
                                    }
                                })
                            }else{
                                location.href = "/printcupom"
                            }
                            
                           
                        })
                        .catch(function(error){
                            console.log(error)
                            alert("1s")
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Telefone Não Localizado.!',
                                showConfirmButton: false,
                                timer: 4500,
                                willClose: () => {
                                      window.location.href = "/"
                                }
                            })

                        });
                    isClick = true;
                }).then(data => {
                    console.log("1 ", data)
                    setTimeout(function () {
                        location.href = "/"
                    }, 2000)

                })
                .catch(error => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Telefone Não Localizado.!',
                        showConfirmButton: false,
                        timer: 3500,
                        willClose: () => {
                           //  window.location.href = "/"
                        }
                    })

                    setTimeout(function () {
                       //location.href = "/"
                    }, 2000)
                });

        }, 1000)
    })
});