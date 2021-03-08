var activeComponent = null
var activeComponentOldAccessed = null

var containerstillkeyboard = null
var containerstillkeyboardSize = 0
var keyboardNum = []
var keyboardLetters = []
var tabComponent = [];
var capLook = true;

var enter = -400
var stop = -401
var deletedChart = -402
var capLooks = -403
var turnBack = -404

//function construtoras
function InputElement(id, name, positionTheScreen, taborder) {
    return {
        _id: id,
        _name: name,
        _positionTheScreen: positionTheScreen,
        _taborder: taborder
    }
}
function ActionComponet(id, label, _class) {
    return {
        _id: id,
        _label: label,
        _class: _class
    }
}

//Debug Tirar
function dd(objects) {
    var data = new Date();
    console.log("***********************************************************\n")
    console.log("**********************Debug********************************\n")
    console.log("**********************" + data + "********************************\n")
    console.log("***********************************************************\n")
    console.log("\n")
    console.log(objects)
    console.log("\n")
    console.log("***********************************************************\n")


}
//A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,
//Funcoes 
function __ascii(_char_, index = true) {
    var listAscii = [
        { id: 0, ref: "Null – NUL" }, { id: 1, ref: "Start of Heading – SOH" }, { id: 2, ref: "Start of Text – STX" },
        { id: 3, ref: "End of Text – ETX" }, { id: 4, ref: "End of Transmission – EOT" },
        { id: 5, ref: "Enquiry – ENQ" }, { id: 6, ref: "Acknowledge – ACK" }, { id: 7, ref: "Bell, rings terminal bell – BEL" },
        { id: 8, ref: "BackSpace – BS" }, { id: 9, ref: "Horizontal Tab – HT" }, { id: 10, ref: "Line Feed – LF" },
        { id: 11, ref: "Vertical Tab – VT" }, { id: 12, ref: "Form Feed – FF" }, { id: 13, ref: "Enter – CR" },
        { id: 14, ref: "Shift-Out – SO" }, { id: 15, ref: "Shift-In – SI" }, { id: 16, ref: "Data Link Escape – DLE" },
        { id: 17, ref: "Device Control 1 – D1" }, { id: 18, ref: "Device Control 2 – D2" },
        { id: 19, ref: "Device Control 3 – D3" }, { id: 20, ref: "Device Control 4 – D4" },
        { id: 21, ref: "Negative Acknowledge – NAK" }, { id: 22, ref: "Synchronous idle – SYN" },
        { id: 23, ref: "End Transmission Block – ETB" }, { id: 24, ref: "Cancel line – CAN" },
        { id: 25, ref: "End of Medium – EM" }, { id: 26, ref: "Substitute – SUB" },
        { id: 27, ref: "Escape – ESC" }, { id: 28, ref: "File Separator – FS" },
        { id: 29, ref: "Group Separator – GS" }, { id: 30, ref: "Record Separator – RS" },
        { id: 31, ref: "Unit Separator – US" }, { id: 32, ref: " " }, { id: 33, ref: "!" }, { id: 34, ref: "“" },
        { id: 35, ref: "#" }, { id: 36, ref: "$" }, { id: 37, ref: "%" }, { id: 38, ref: "&" }, { id: 39, ref: "‘" }, { id: 40, ref: "(" },
        { id: 41, ref: ")" }, { id: 42, ref: "*" }, { id: 43, ref: "+" }, { id: 44, ref: "," }, { id: 45, ref: "–" }, { id: 46, ref: "." },
        { id: 47, ref: "/" }, { id: 48, ref: "0" }, { id: 49, ref: "1" }, { id: 50, ref: "2" }, { id: 51, ref: "3" }, { id: 52, ref: "4" },
        { id: 53, ref: "5" }, { id: 54, ref: "6" }, { id: 55, ref: "7" }, { id: 56, ref: "8" }, { id: 57, ref: "9" }, { id: 58, ref: ":" },
        { id: 59, ref: ";" }, { id: 60, ref: "<" }, { id: 61, ref: "=" }, { id: 62, ref: ">" }, { id: 63, ref: "?" }, { id: 64, ref: "@" },
        { id: 65, ref: "A" }, { id: 66, ref: "B" }, { id: 67, ref: "C" }, { id: 68, ref: "D" }, { id: 69, ref: "E" }, { id: 70, ref: "F" },
        { id: 71, ref: "G" }, { id: 72, ref: "H" }, { id: 73, ref: "I" }, { id: 74, ref: "J" }, { id: 75, ref: "K" }, { id: 76, ref: "L" },
        { id: 77, ref: "M" }, { id: 78, ref: "N" }, { id: 79, ref: "O" }, { id: 80, ref: "P" }, { id: 81, ref: "Q" }, { id: 82, ref: "R" },
        { id: 83, ref: "S" }, { id: 84, ref: "T" }, { id: 85, ref: "U" }, { id: 86, ref: "V" }, { id: 87, ref: "W" }, { id: 88, ref: "X" },
        { id: 89, ref: "Y" }, { id: 90, ref: "Z" }, { id: 91, ref: "[" }, { id: 92, ref: "\\" }, { id: 93, ref: "]" }, { id: 94, ref: "^" },
        { id: 95, ref: "_" }, { id: 96, ref: "`" }, { id: 97, ref: "a" }, { id: 98, ref: "b" }, { id: 99, ref: "c" }, { id: 100, ref: "d" },
        { id: 101, ref: "e" }, { id: 102, ref: "f" }, { id: 103, ref: "g" }, { id: 104, ref: "h" }, { id: 105, ref: "i" }, { id: 106, ref: "j" },
        { id: 107, ref: "k" }, { id: 108, ref: "l" }, { id: 109, ref: "m" }, { id: 110, ref: "n" }, { id: 111, ref: "o" }, { id: 112, ref: "p" },
        { id: 113, ref: "q" }, { id: 114, ref: "r" }, { id: 115, ref: "s" }, { id: 116, ref: "t" }, { id: 117, ref: "u" }, { id: 118, ref: "v" },
        { id: 119, ref: "w" }, { id: 120, ref: "x" }, { id: 121, ref: "y" }, { id: 122, ref: "z" }, { id: 123, ref: "{" }, { id: 124, ref: "|" },
        { id: 125, ref: "}" }, { id: 126, ref: "~" }, { id: 127, ref: "Delete" }, { id: 128, ref: "Ç" }, { id: 129, ref: "ü" }, { id: 130, ref: "é" },
        { id: 131, ref: "â" }, { id: 132, ref: "ä" }, { id: 133, ref: "à" }, { id: 134, ref: "å" }, { id: 135, ref: "ç" }, { id: 136, ref: "ê" },
        { id: 137, ref: "ë" }, { id: 138, ref: "è" }, { id: 139, ref: "ï" }, { id: 140, ref: "î" }, { id: 141, ref: "ì" }, { id: 142, ref: "Ä" },
        { id: 143, ref: "Å" }, { id: 144, ref: "É" }, { id: 145, ref: "æ" }, { id: 146, ref: "Æ" }, { id: 147, ref: "ô" }, { id: 148, ref: "ö" },
        { id: 149, ref: "ò" }, { id: 150, ref: "û" }, { id: 151, ref: "ù" }, { id: 152, ref: "ÿ" }, { id: 153, ref: "Ö" }, { id: 154, ref: "Ü" },
        { id: 155, ref: "ø" }, { id: 156, ref: "£" }, { id: 157, ref: "Ø" }, { id: 158, ref: "×" }, { id: 159, ref: "ƒ" }, { id: 160, ref: "á" },
        { id: 161, ref: "ù" }, { id: 162, ref: "ó" }, { id: 163, ref: "ú" }, { id: 164, ref: "ñ" }, { id: 165, ref: "Ñ" }, { id: 166, ref: "ª" },
        { id: 167, ref: "º" }, { id: 168, ref: "¿" }, { id: 169, ref: "®" }, { id: 170, ref: "¬" }, { id: 171, ref: "½" }, { id: 172, ref: "¼" },
        { id: 173, ref: "¡" }, { id: 174, ref: "«" }, { id: 175, ref: "»" }, { id: 176, ref: "░" }, { id: 177, ref: "▒" }, { id: 178, ref: "▓" },
        { id: 179, ref: "│" }, { id: 180, ref: "┤" }, { id: 181, ref: "Á" }, { id: 182, ref: "Â" }, { id: 183, ref: "À" }, { id: 184, ref: "©" },
        { id: 185, ref: "╣" }, { id: 186, ref: "║" }, { id: 187, ref: "╗" }, { id: 188, ref: "╝" }, { id: 189, ref: "¢" }, { id: 190, ref: "¥" },
        { id: 191, ref: "┐" }, { id: 192, ref: "└" }, { id: 193, ref: "┴" }, { id: 194, ref: "┬" }, { id: 195, ref: "├" }, { id: 196, ref: "─" },
        { id: 197, ref: "┼" }, { id: 198, ref: "ã" }, { id: 199, ref: "Ã" }, { id: 200, ref: "╚" }, { id: 201, ref: "╔" }, { id: 202, ref: "╩" },
        { id: 203, ref: "╦" }, { id: 204, ref: "╠" }, { id: 205, ref: "═" }, { id: 206, ref: "╬" }, { id: 207, ref: "¤" }, { id: 208, ref: "ð" },
        { id: 209, ref: "Ð" }, { id: 210, ref: "Ê" }, { id: 211, ref: "Ë" }, { id: 212, ref: "È" }, { id: 213, ref: "ı" }, { id: 214, ref: "Í" },
        { id: 215, ref: "Î" }, { id: 216, ref: "Ï" }, { id: 217, ref: "┘" }, { id: 218, ref: "┌" }, { id: 219, ref: "█" }, { id: 220, ref: "▄" },
        { id: 221, ref: "¦" }, { id: 222, ref: "Ì" }, { id: 223, ref: "▀" }, { id: 224, ref: "Ó" }, { id: 225, ref: "ß" }, { id: 226, ref: "Ô" },
        { id: 227, ref: "Ò" }, { id: 228, ref: "õ" }, { id: 229, ref: "Õ" }, { id: 230, ref: "µ" }, { id: 231, ref: "þ" }, { id: 232, ref: "Þ" },
        { id: 233, ref: "Ú" }, { id: 234, ref: "Û" }, { id: 235, ref: "Ù" }, { id: 236, ref: "ý" }, { id: 237, ref: "Ý" }, { id: 238, ref: "¯" },
        { id: 239, ref: "´" }, { id: 240, ref: "­­" }, { id: 241, ref: "±" }, { id: 242, ref: "‗" }, { id: 243, ref: "¾" }, { id: 244, ref: "¶" },
        { id: 245, ref: "§" }, { id: 246, ref: "÷" }, { id: 247, ref: "¸" }, { id: 248, ref: "°" }, { id: 249, ref: "¨" }, { id: 250, ref: "·" },
        { id: 251, ref: "¹" }, { id: 252, ref: "³" }, { id: 253, ref: "²" }, { id: 254, ref: "■" }, { id: 255, ref: "" }
    ]
    for (var poss = 0; poss < listAscii.length; poss++) {
        if (_char_ == listAscii[poss].ref || _char_ == listAscii[poss].id) {
            if (index) {
                return listAscii[poss].id
            } else {
                return listAscii[poss].ref
            }
        }

    }
    return undefined
} 
function _setScroll(x, y) {
    window.scrollTo(0,0);
    window.scrollTo(x, y);
}
function __initPadNum() {
   
    keyboardNum.push(new ActionComponet(1, "1", "flex-item onclickAction num-pad  num-pad-number btn-keys "))
    keyboardNum.push(new ActionComponet(2, "2", "flex-item onclickAction num-pad  num-pad-number btn-keys "))
    keyboardNum.push(new ActionComponet(3, "3", "flex-item onclickAction num-pad  num-pad-number btn-keys "))
    keyboardNum.push(new ActionComponet(4, "4", "flex-item onclickAction num-pad  num-pad-number btn-keys "))
    keyboardNum.push(new ActionComponet(5, "5", "flex-item onclickAction num-pad  num-pad-number btn-keys "))
    keyboardNum.push(new ActionComponet(6, "6", "flex-item onclickAction num-pad  num-pad-number btn-keys "))
    keyboardNum.push(new ActionComponet(7, "7", "flex-item onclickAction num-pad  num-pad-number btn-keys "))
    keyboardNum.push(new ActionComponet(8, "8", "flex-item onclickAction num-pad  num-pad-number btn-keys "))
    keyboardNum.push(new ActionComponet(9, "9", "flex-item onclickAction num-pad  num-pad-number btn-keys "))
    keyboardNum.push(new ActionComponet(0, "0", "flex-item onclickAction num-pad  num-pad-number btn-keys "))
    keyboardNum.push(new ActionComponet(deletedChart, "<i class=\"fa fa-backward fa-1x\" aria-hidden=\"true\"></i>", "flex-item onclickAction num-pad btn-danger num-pad-number num-pad-auto"))
    keyboardNum.push(new ActionComponet(stop, "Fechar", "flex-item onclickAction num-pad  num-pad-auto num-pad-number num-close-keys"))
    keyboardNum.push(new ActionComponet(turnBack, "Anterior", "flex-item onclickAction num-pad btn-info num-pad-auto num-pad-number num-back-keys"))
    keyboardNum.push(new ActionComponet(enter, "Próximo", "flex-item onclickAction num-pad  num-pad-auto num-pad-number num-next-keys"))
}

function __initLetters() {
    
    var letters = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Ç","Z","X","C","V","B","N","M", "."]
    keyboardLetters = []
    if (capLook) {
        for (poss = 0; poss < letters.length; poss++) {
            var spaceClass = ""
            if (letters[poss] == " ") {
                spaceClass = "space "
                keyboardLetters.push(new ActionComponet(32, "      ", "flex-item onclickAction num-pad  " + spaceClass))

            } else {
                keyboardLetters.push(new ActionComponet(__ascii(letters[poss]), letters[poss], "flex-item onclickAction num-pad btn-keys " + spaceClass))
            }
        }
        // keyboardLetters.push(new ActionComponet(capLooks,"<i class=\"fa fa-home\" aria-hidden=\"true\"></i>","flex-item onclickAction num-pad btn-info"))
    } else {
        for (poss = 0; poss < letters.length; poss++) {
            var char = letters[poss].toLowerCase()
           
            if (letters[poss] == " ") {
                spaceClass = "space"
                keyboardLetters.push(new ActionComponet(32, "      ", "flex-item onclickAction num-pad btn-keys  " + spaceClass))

            } else {
                keyboardLetters.push(new ActionComponet(__ascii(char), char, "flex-item onclickAction num-pad btn-keys  " + spaceClass))

            }

        }
        // keyboardLetters.push(new ActionComponet(capLooks,"<i class=\"fa fa-level-up\" aria-hidden=\"true\"></i>","flex-item onclickAction num-pad btn-info"))

    }
    spaceClass = "space spacer-50 "
    keyboardLetters.push(new ActionComponet(deletedChart, "<i class=\"fa fa-backward\" aria-hidden=\"true\"></i>", "flex-item onclickAction num-pad  num-close-keys"))
    keyboardLetters.push(new ActionComponet(stop, "Fechar", "flex-item onclickAction num-pad num-close-keys"))
    keyboardLetters.push(new ActionComponet(turnBack, "Anterior", "flex-item onclickAction num-pad btn-info num-back-keys"))
    keyboardLetters.push(new ActionComponet(32, "       ", "flex-item onclickAction num-pad  " + spaceClass))
    keyboardLetters.push(new ActionComponet(enter, "Próximo", "flex-item onclickAction num-pad num-next-keys"))


}





function __initStillKeyboard() {
    var msn = "Container de Teclado Indefinido: ID:containerstillkeyboard"
    try {
        containerstillkeyboard = $("#containerstillkeyboard")
        tabComponent = []

        if (typeof containerstillkeyboard.length && containerstillkeyboard.length > 0) {
            containerstillkeyboard = containerstillkeyboard[0]
            $(containerstillkeyboard).on("click", function () {
                __closeKeyBoard()
            })
            var elemPagerInput = $(".onfocusClick")
            for (var poss = 0; poss < elemPagerInput.length; poss++) {
                var posicao = elemPagerInput[poss].getBoundingClientRect()
                var componetPositionScreen = {
                    bottom: posicao.bottom,
                    height: posicao.height,
                    left: posicao.left,
                    right: posicao.right,
                    top: posicao.top,
                    width: posicao.width,
                    x: posicao.x,
                    y: posicao.y

                }
                tabComponent.push(new InputElement(
                    elemPagerInput[poss].id,
                    elemPagerInput[poss].name,
                    componetPositionScreen,
                    elemPagerInput[poss].getAttribute("taborder")
                ))
            }
            __initPadNum()
            __initLetters()
        } else {
            alert(msn)
            return false
        }
    } catch (e) {
        console.log(msn)
        alert(msn)
        return false
    }
}



function __setOnActionClicks() {
    $(".onclickAction").on("click", function (event) {
        __events(this, containerstillkeyboard)
        return false;
    })
}


function __openKeyBoard() {

    try {
        $(containerstillkeyboard)
            .addClass("still-keyboard-open")
            .slideDown(2000,
                function () {
                    //alert("Slide concluido");
                    containerstillkeyboardSize = containerstillkeyboard.getBoundingClientRect().height
                    var positionYScroll = parseInt($("body").height())
                    var newPositionBodyHeight = positionYScroll + containerstillkeyboardSize
                    $("body").height(newPositionBodyHeight)
                    _setScroll(0, activeComponent.eixoPositions.y - parseInt(containerstillkeyboardSize /3))
                    console.log("#3 ", containerstillkeyboardSize, positionYScroll, newPositionBodyHeight, activeComponent.eixoPositions.y)

                }
            );



    } catch (e) {
        console.log(e)
        alert("Error")
    }
}

function __closeKeyBoard() {
    try {
        $(containerstillkeyboard)
            .removeClass("still-keyboard-open")
            .addClass("still-keyboard-close")
        var positionYScroll = parseInt($("body").height())
        var newPositionBodyHeight = Math.abs(containerstillkeyboardSize)
        $("body").height(newPositionBodyHeight)
        containerstillkeyboard.innerHTML = ""

    } catch (e) {
        console.log(e)
        alert("Error")
    }
}

function __kybNum() {
    containerstillkeyboard.innerHTML = ""
    var numPad = "<div class=\"item-container flex-container\" >"
    numPad += "<div class=\"item-format\" >"
    for (poss = 0; poss < keyboardNum.length; poss++) {

        numPad += "<button class=\"" + keyboardNum[poss]._class + "\" stillValue=\"" + keyboardNum[poss]._id + "\">" + keyboardNum[poss]._label + "</button>"
    }
    numPad += "</div>";
    numPad += "</div>";

    containerstillkeyboard.innerHTML = numPad

    __setOnActionClicks()
}


function __kybLetters() {
    containerstillkeyboard.innerHTML = ""
    var numPad = "<div class=\"item-container flex-container\" >"
    numPad+="<center><div class=\"lettes\">"
    for (poss = 0; poss < keyboardLetters.length; poss++) {
        numPad += "<button class=\"" + keyboardLetters[poss]._class + "\" stillValue=\"" + keyboardLetters[poss]._id + "\">" + keyboardLetters[poss]._label + "</button>"
    }
    numPad += "</div>";
    numPad += "</div>";
    containerstillkeyboard.innerHTML = numPad

    __setOnActionClicks()
}


//Funcoes 





function __events(events, activatedComponent) {
    var eventsClick = parseInt($(events).attr("stillvalue"));
    var newValues = (activeComponent.self.value + "" + eventsClick)
    var activeComponentOldAccessed = activeComponent


    console.log({ events, newValues })

    //
    // console.log("#5 ",activeComponent)
    if (eventsClick == stop) {
        __closeKeyBoard()
    } else if (eventsClick == deletedChart) {

        if (activeComponent.self.value.trim().length > 0) {
            var size = activeComponent.self.value.length - 1
            var objectCopy = activeComponent.self.value
            $("#" + activeComponent.uuid).val(objectCopy.substr(0, size))

            return false;
        } else {
            __closeKeyBoard()
        }
    } else if (eventsClick >= 0 && eventsClick <= 9) {
        

        var newValues = (activeComponent.self.value + "" + eventsClick)
        if($("#"+activeComponent.self.id).hasClass('mask-phone')){
            if(newValues.length > 14){
                return false;
            }
            activeComponent.self.value = mTel(newValues)
        }else{
            activeComponent.self.value = newValues
        }
        if ($(activeComponent.self).hasClass("onchange")) {
            $(activeComponent.self).change()
        }

        return false;
    } else if (eventsClick >= 97 && eventsClick <= 122 ) {

        var newValues = (activeComponent.self.value + "" + String.fromCharCode(eventsClick))
        activeComponent.self.value = newValues
        if ($(activeComponent.self).hasClass("onchange")) {
            $(activeComponent.self).change()
        }
        return false;
    } else if (eventsClick >= 65 && eventsClick <= 90) {

        var newValues = (activeComponent.self.value + "" + String.fromCharCode(eventsClick))
        activeComponent.self.value = newValues
        if ($(activeComponent.self).hasClass("onchange")) {
            $(activeComponent.self).change()
        }
        return false;
    }else if(eventsClick==128){
      
        var newValues = (activeComponent.self.value + "" +  __ascii(eventsClick,false))
        activeComponent.self.value = newValues
        if ($(activeComponent.self).hasClass("onchange")) {
            $(activeComponent.self).change()
        }

        return false;

    } else if (eventsClick == 32) {
        var newValues = (activeComponent.self.value + "" + String.fromCharCode(eventsClick))
        activeComponent.self.value = newValues
        if ($(activeComponent.self).hasClass("onchange")) {
            $(activeComponent.self).change()
        }
        return false;
    } else if (eventsClick == 46) {
        var newValues = (activeComponent.self.value + "" + String.fromCharCode(eventsClick))
        activeComponent.self.value = newValues
        if ($(activeComponent.self).hasClass("onchange")) {
            $(activeComponent.self).change()
        }
        return false;
    } else if (eventsClick == -403) {
        capLook = !capLook
        __initLetters()
        __kybLetters()
        __openKeyBoard()
        return false;
    } else if (eventsClick == -400) {
        __closeKeyBoard()
        for (var indice = 0; indice < tabComponent.length; indice++) {
            if (tabComponent[indice]._id == activeComponentOldAccessed.uuid) {
                var i = indice
                i++
                if (typeof tabComponent[i] != 'undefined') {
                    $("#" + tabComponent[i]._id).focus()
                    $("#" + tabComponent[i]._id).click()
                    return

                }
                break
            }
        }
    } else if (eventsClick == -404) {
        __closeKeyBoard()
        for (var indice = 0; indice < tabComponent.length; indice++) {
            if (tabComponent[indice]._id == activeComponentOldAccessed.uuid) {
                var i = indice
                i--
                if (typeof tabComponent[i] != 'undefined') {
                    $("#" + tabComponent[i]._id).focus()
                    $("#" + tabComponent[i]._id).click()
                    return
                }
                break
            }
        }
    } else {
        console.log(__ascii(eventsClick,false))
        alert("Evento Não Loacalizado : [" + eventsClick + "]")
    }





}




function mTel(tel) {

    
    tel=tel.replace(/\D/g,"")
   // tel=tel.replace(/^(\d)/,"+$1")
    tel=tel.replace(/(.{0})(\d)/,"$1($2")
    tel=tel.replace(/(.{3})(\d)/,"$1)$2")
    if(tel.length == 10) {
        tel=tel.replace(/(.{1})$/,"-$1")
    } else if (tel.length == 13) {
        tel=tel.replace(/(.{4})$/,"-$1")
    } else if (tel.length == 14) {
        tel=tel.replace(/(.{3})$/,"-$1")
    } else if (tel.length == 15) {
        tel=tel.replace(/(.{4})$/,"-$1")
    } else if (tel.length > 15) {
        tel=tel.replace(/(.{4})$/,"-$1")
    }

    console.log(tel.length)
    return tel;
}



//Inicia o Documento
$(document).ready(function () {

    __initStillKeyboard()

    $(".onfocusClick").focus(function () {
        activeComponent = {
            self: this,
            uuid: this.getAttribute("id"),
            value: $(this).val(),
            typekeyborad: this.getAttribute("stilltype"),
            eixoPositions: this.getBoundingClientRect()
        };


        return false;
    })


    $(".onfocusClick").on("click", function (event) {
        var isOpen = false
        activeComponent = {
            self: this,
            uuid: this.getAttribute("id"),
            value: $(this).val(),
            typekeyborad: this.getAttribute("stilltype"),
            eixoPositions: this.getBoundingClientRect()
        };
        if (this.getAttribute("stilltype") == "num") {
            __kybNum()
            isOpen = true

        } else if (this.getAttribute("stilltype") == "letters") {
            __kybLetters()
            isOpen = true
        }



        if (isOpen) {
            __openKeyBoard()
        }



    })
})


