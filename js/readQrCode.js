$(document).ready(function () {
	Webcam.attach('#webcam');
	$("#scan").on("click", function(){
		take_snapshot();
	})
	readQRCode()
	qrcode.callback = showInfo;
});
function readQRCode(){
	setInterval(function(){
		$('#scan').click()
		console.log("read")
	},1000)
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
function showInfo(data) {
	//$("#qrContent p").text(data);
	if(data.length > 0){
		console.log(data)
		beep(1000, 2, function () {
			 
		});
		alert(data)
	} 
}
