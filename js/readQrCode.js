function readQRCode(){
	try{
		setInterval(function(){
			$('#scan').click()
			console.log("read")
		},500)
	}catch(e){}
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
	var configs =  Api();
	
	//$("#qrContent p").text(data);
	if(resumeScanner.length > 0){
		console.log(resumeScanner)
		beep(100, 1, function () {});
		var resumeScanner=resumeScanner.split(":")
		var config = {
			headers: {
			  'Authorization': 'Bearer ' +token.data.token
			}
		  }
		var apiUrl=configs.url+configs.routes.totemcampaigns+"/search?hash="+resumeScanner[1]
		axios.get(apiUrl,config)
        .then(function(response){
			console.log(response)
            localStorger.insert("campaign",JSON.stringify(response.data.campaign))
            location.href="/selectaccess"
        }).then(data => {
               console.log("1 ",data)
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
						window.location.href="/"
					}
				})
		});
		//alert(data)
	} 
}





$(document).ready(function () {
	 setTimeout(function(){
		Webcam.attach('#webcam');
		$("#scan").on("click", function(){
			take_snapshot();
		})
		readQRCode()
		qrcode.callback = readScanner;
	 },1000)

});
