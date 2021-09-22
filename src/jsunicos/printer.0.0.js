var localStorger = new LocalStorger()
var token = localStorger.getToObject("token")
var customers = localStorger.getToObject("customers")
var campaign = localStorger.getToObject("campaign")
 
if (token == null || token.data.length == 0 || campaign == null) {
    location.href = "/"
}
$(document).ready(function () {
    try {
        $("#spName").html(customers.full_name)
        var configs = Api();
        var configRequestsAxios = {
            headers: { 'Authorization': 'Bearer ' + token.data.token }
        }
        var data = {
            companyName: configs.companyName,
            companysadress: configs.companysadress,
            cnpj: configs.cnpj,
            ie: configs.ie,
            customers: customers.full_name,
            barcode: campaign.barcode,
            description:campaign.description
           
        }


         
        axios.post("/" + configs.routes.printcupom,
            data, configRequestsAxios).then(function (response) {
                console.log()

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Imprimindo...',
                    showConfirmButton: false,
                    timer: 3500
                })
                setTimeout(function () {
                    location.href = "/"
                }, 9 * 1000)
            })
        console.log(configRequestsAxios)
    } catch (e) {
        console.log(e)
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao Gerar na Impressão.!',
            showConfirmButton: false,
            timer: 3500
        })
    }
    setTimeout(function () {
         location.href = "/"
    }, 9 * 10000)
});