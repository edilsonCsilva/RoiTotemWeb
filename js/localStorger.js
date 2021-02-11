
function LocalStorger(){
  
    this.cls=function(){
        localStorage.clear();
    };

    this.insert=function(key,value){
        localStorage.setItem(key, value);
    };

    this.update=function(key,value){
        localStorage.setItem(key, value);
    };

    this.delete=function(key){
        localStorage.removeItem(key);
    };




}