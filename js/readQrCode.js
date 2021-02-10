$(document).ready(function () {
	Webcam.attach('#webcam');
	$("#scan").on("click", function(){
		take_snapshot();
	})
	readQRCode()
	qrcode.callback = showInfo;
});
function readQRCode(){
	setTimeout(function(){
		$('#scan').click()
	},500)
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
	if(data.length==0){
		readQRCode()
	}else{
	  console.log(data)
	}
}
