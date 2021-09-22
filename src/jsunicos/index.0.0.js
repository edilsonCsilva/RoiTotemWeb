var localStorger = new LocalStorger()
localStorger.cls()
$(document).ready(function () {
    setTimeout(function () {
        window.location.href = "/"
    }, 60 * 1000)
    var configs = Api();
    console.log(configs.routes)
    axios.post(configs.url + configs.routes.oauth, { username: configs.username, password: configs.password })
        .then(function (response) {
            localStorger.insert("token", JSON.stringify(response))
            console.log(response)
        }).then(data => {
            console.log("1 ", data)
        })
        .catch(error => {
            console.log("2 ", error.response.data.error)
        });
    $("#OnClickNext").on('click', function () {
        location.href = "/start"
        return false;
    })
});
 