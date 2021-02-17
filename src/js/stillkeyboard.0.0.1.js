var activeComponent=null
var containerstillkeyboard=null
var containerstillkeyboardSize=0
var keyboardNum=[]
var tabComponent =[];











//function construtoras

function InputElement(id,name,positionTheScreen,taborder){
    return {
        _id:id,
        _name:name,
        _positionTheScreen:positionTheScreen,
        _taborder:taborder
    }
}


function ActionComponet(id,label,_class){
    return {
        _id:id,
        _label:label,
        _class:_class
    }
}





//Debug Tirar

function dd(objects){
    var data =  new Date();
    console.log("***********************************************************\n")
    console.log("**********************Debug********************************\n")
    console.log("**********************"+data+"********************************\n")
    console.log("***********************************************************\n")
    console.log("\n")
    console.log(objects)
    console.log("\n")
    console.log("***********************************************************\n")

    
}



//Funcoes 


function __initStillKeyboard(){
    var msn="Container de Teclado Indefinido: ID:containerstillkeyboard"
    try{
        containerstillkeyboard=$("#containerstillkeyboard")
        if(typeof containerstillkeyboard.length && containerstillkeyboard.length > 0){
            containerstillkeyboard=containerstillkeyboard[0]
            var elemPagerInput=$(".onfocusClick")
            for(var poss=0 ; poss < elemPagerInput.length;poss++){
                var posicao=elemPagerInput[poss].getBoundingClientRect()
                var componetPositionScreen={
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


        //<button class="flex-item onclickAction num-pad" stillValue="1">1</button>
        keyboardNum.push(new ActionComponet(1,"1","flex-item onclickAction num-pad"))
        keyboardNum.push(new ActionComponet(2,"2","flex-item onclickAction num-pad"))
        keyboardNum.push(new ActionComponet(3,"3","flex-item onclickAction num-pad"))
        keyboardNum.push(new ActionComponet(4,"4","flex-item onclickAction num-pad"))
        keyboardNum.push(new ActionComponet(5,"5","flex-item onclickAction num-pad"))
        keyboardNum.push(new ActionComponet(6,"6","flex-item onclickAction num-pad"))
        keyboardNum.push(new ActionComponet(7,"7","flex-item onclickAction num-pad"))
        keyboardNum.push(new ActionComponet(8,"8","flex-item onclickAction num-pad"))
        keyboardNum.push(new ActionComponet(9,"9","flex-item onclickAction num-pad"))
        keyboardNum.push(new ActionComponet(0,"0","flex-item onclickAction num-pad"))
        keyboardNum.push(new ActionComponet(-2,"Return","flex-item onclickAction num-pad btn-info"))
        keyboardNum.push(new ActionComponet(-3,"<i class=\"fa fa-backward fa-1x\" aria-hidden=\"true\"></i>","flex-item onclickAction num-pad btn-danger"))
        keyboardNum.push(new ActionComponet(-1,"Cancelar","flex-item onclickAction num-pad btn-warning"))
        keyboardNum.push(new ActionComponet(100,"Enter","flex-item onclickAction num-pad btn-danger"))
        }else{
            alert(msn)
            return false
        }
    }catch(e){
        console.log(msn)
        alert(msn)
        return false
    }
}



function __setOnActionClicks(){
    $(".onclickAction").on("click",function(event){
        __events(this,containerstillkeyboard)
        return false;
    })

   



   


    
 
}

function _setScroll(x,y){
    window.scrollTo( x, y );
}
function __openKeyBoard(){

    try{
       $(containerstillkeyboard)
        .addClass("still-keyboard-open")
        .slideDown(2000,
            function(){
                //alert("Slide concluido");
                containerstillkeyboardSize=containerstillkeyboard.getBoundingClientRect().height
                var positionYScroll = parseInt($("body").height())
                var newPositionBodyHeight =positionYScroll+containerstillkeyboardSize
                $("body").height(newPositionBodyHeight)
                _setScroll(0,activeComponent.eixoPositions.y-positionYScroll)
               
            }
        );


    }catch(e){ 
        console.log(e)
        alert("Error")}
}

function __closeKeyBoard(){
    try{
       $(containerstillkeyboard)
        .removeClass("still-keyboard-open")
        .addClass("still-keyboard-close")
        var positionYScroll = parseInt($("body").height())
        var newPositionBodyHeight =Math.abs(positionYScroll-containerstillkeyboardSize)
        $("body").height(newPositionBodyHeight)
        containerstillkeyboard.innerHTML=""
        
    }catch(e){ 
        console.log(e)
        alert("Error")}
}

function __kybNum(){
    containerstillkeyboard.innerHTML=""
     var numPad="<div class=\"item-container flex-container\" >"
             for(poss=0; poss < keyboardNum.length;poss++){  
                        numPad+="<button class=\""+keyboardNum[poss]._class+"\" stillValue=\""+keyboardNum[poss]._id+"\">"+keyboardNum[poss]._label+"</button>"
             }
        numPad+="</div>";
       containerstillkeyboard.innerHTML =numPad
     
       __setOnActionClicks()
}

//Funcoes 
//Inicia o Documento
$(document).ready(function(){
    
      __initStillKeyboard()
     
      $(".onfocusClick").focus(function(){ 
        activeComponent = {
            self:this,
            uuid:this.getAttribute("id"),
            value:$(this).val(),
            typekeyborad :this.getAttribute("stilltype"),
            eixoPositions :this.getBoundingClientRect() 
        };
     
        
        return false;
      })
    
    
     $(".onfocusClick").on("click",function(event){
        activeComponent = {
            self:this,
            uuid:this.getAttribute("id"),
            value:$(this).val(),
            typekeyborad :this.getAttribute("stilltype"),
            eixoPositions :this.getBoundingClientRect() 
        };
        if(this.getAttribute("stilltype")=="num"){
             __kybNum()

        }
        __openKeyBoard()
       

     })

    

})






function __events(events,activatedComponent){
    var eventsClick=parseInt($(events).attr("stillvalue"));


    var newValues=(activeComponent.self.value+""+eventsClick)
    console.log({events,newValues})
    if(eventsClick==-1){
        __closeKeyBoard()

    } else if(eventsClick==-3){
        if(activeComponent.self.value.trim().length > 0){
            var size=activeComponent.self.value.length-1
            var objectCopy =activeComponent.self.value
            $("#"+activeComponent.uuid).val(objectCopy.substr(0, size))

            return false;
        }else{
            __closeKeyBoard()
        }
    }else if(eventsClick >=0 && eventsClick <=9){
        var newValues=(activeComponent.self.value+""+eventsClick)
        activeComponent.self.value=newValues
        return false;
    }else{
        alert("Evento Não Loacalizado : ["+eventsClick+"]")
    }





}
