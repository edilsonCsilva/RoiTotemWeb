
var localStorger = new LocalStorger()
var token = localStorger.getToObject("token")
var scanner=null



var timesClicksPagers=80
var timesContexSetInteval=null
var limitTime=100





 
if (token == null || token.data.length == 0) {
	window.location.href = "/"
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



	function readQRCode() {
		try {
			scanner=setInterval(function () {
				$('#scan').click()
				console.log("read")
			}, 1000)
		} catch (e) { console.log(e) }
	}


	function take_snapshot() {
		Webcam.snap(function (dataUrl) {
			qrCodeDecoder(dataUrl);
		});
	}
	// decode the img
	function qrCodeDecoder(dataUrl) {
		qrcode.decode(dataUrl);
	}
	// show info from qr code
	function readScanner(resumeScanner) {
		var configs = Api();
		clearInterval(scanner)

		//$("#qrContent p").text(data);
		if (resumeScanner.length > 0) {
			beep(100, 1, function () { });
			var resumeScanner = resumeScanner.split("|")
			var config = {
				headers: {
					'Authorization': 'Bearer ' + token.data.token
				}
			}
			var apiUrl = configs.url + configs.routes.totemcampaigns + "/search?" + resumeScanner[1]
			axios.get(apiUrl, config)
				.then(function (response) {
        	clearInterval(scanner)
			localStorger.insert("campaign", JSON.stringify(response.data.campaign))
			location.href = "/selectaccess"
			}).then(data => {
					console.log("1 ", data)
			})
			.catch(error => {
					clearInterval(scanner)
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: 'Oops...',
						text: "Campanha Não Localizada.",
						showConfirmButton: false,
						timer: 2000,
						willClose: () => {
							window.location.href = "/"
						}
					})
				});
			 
		}
	}





	$(document).ready(function () {
		setTimeout(function () {
			Webcam.attach('#webcam');
			$("#scan").on("click", function () {
				take_snapshot();
			})
			readQRCode()
			qrcode.callback = readScanner;
		}, 1000)

	});


	//

	navigator.getMedia = (navigator.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia ||
		navigator.msGetUserMedia);

	navigator.getMedia(

		// permissoes
		{
			video: true,
			audio: true
		},
		// callbackSucesso
		function (localMediaStream) {

		},

		// callbackErro
		function (err) {
			console.log("O seguinte erro ocorreu: " + err);

			/*
			Swal.fire({
				position: 'top-end',
				icon: 'error',
				title: 'Oops...',
				text: "O seguinte erro ocorreu: " + err,
				showConfirmButton: false,
				timer: 3500,
				willClose: () => {
					window.location.href = "/"
				}
			})

			*/
			



		}

	);


	setTimeout(function () {
		window.location.href = "/"
	}, 1.5 * 60000)

	//
})



function readQRCode() {
	try {
		setInterval(function () {
			$('#scan').click()
			console.log("read")
		}, 500)
	} catch (e) { }
}


function take_snapshot() {
	Webcam.snap(function (dataUrl) {
		qrCodeDecoder(dataUrl);
	});
}
// decode the img
function qrCodeDecoder(dataUrl) {
	qrcode.decode(dataUrl);
}
// show info from qr code
function readScanner(resumeScanner) {
	var configs = Api();

	//$("#qrContent p").text(data);
	if (resumeScanner.length > 0) {
		console.log(resumeScanner)
		beep(100, 1, function () { });
		var resumeScanner = resumeScanner.split(":")
		var config = {
			headers: {
				'Authorization': 'Bearer ' + token.data.token
			}
		}
		var apiUrl = configs.url + configs.routes.totemcampaigns + "/search?hash=" + resumeScanner[1]
		axios.get(apiUrl, config)
			.then(function (response) {
				console.log(response)
				localStorger.insert("campaign", JSON.stringify(response.data.campaign))
				location.href = "/selectaccess"
			}).then(data => {
				console.log("1 ", data)
			})
			.catch(error => {
				Swal.fire({
					position: 'top-end',
					icon: 'error',
					title: 'Oops...',
					text: "Campanha Não Localizada.",
					showConfirmButton: false,
					timer: 2000,
					willClose: () => {
						window.location.href = "/"
					}
				})
			});
		//alert(data)
	}
}




$(document).ready(function () {
	setTimeout(function () {
		Webcam.attach('#webcam');
		$("#scan").on("click", function () {
			take_snapshot();
		})
		readQRCode()
		qrcode.callback = readScanner;
	}, 1000)

});
