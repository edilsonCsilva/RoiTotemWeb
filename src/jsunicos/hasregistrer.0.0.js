var localStorger = new LocalStorger()
var token = localStorger.getToObject("token")
var campaign = localStorger.getToObject("campaign")
var modal = $("#msn")
var isClick = false;
if (token == null || token.data.length == 0 || campaign == null) {
    location.href = "/"
}
$(document).ready(function () {
    setTimeout(function () {
 
        window.location.href = "/"
    }, 120 * 1000)
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
                headers: {
                    'Authorization': 'Bearer ' + token.data.token
                }
            }
            var apiUrl = configs.url + configs.routes.totemcustomers + "/search?phone=" + $("#input_fone").val()
            axios.get(apiUrl, configRequestsAxios)
                .then(function (response) {
                    if (response == undefined) {
                        s
                        isClick = false;
                    }
                    localStorger.insert("customers", JSON.stringify(response.data.customer))
                    var campaign = localStorger.getToObject("campaign")
                    var customer_id = response.data.customer.id
                    var campaign_id = campaign.id
                    axios.post(configs.url + configs.routes.totemcampaignscustomer,
                        { campaign_id: campaign_id, customer_id: customer_id }, configRequestsAxios)
                        .then(function (response) {
                            location.href = "/printcupom"
                        }).then(data => {
                            console.log("1 ", data)
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
                            window.location.href = "/"
                        }
                    })

                    setTimeout(function () {
                        location.href = "/"
                    }, 2000)
                });

        }, 1000)
    })
});