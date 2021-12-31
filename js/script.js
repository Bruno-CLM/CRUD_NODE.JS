(function readyJS(win, doc){
    if(doc.querySelectorAll('.deletar')){
        for(var i=0; i<doc.querySelectorAll('.deletar').length; i++){
            doc.querySelectorAll('.deletar')[i].addEventListener('click', function(e){
                if(confirm("Deseja mesmo apagar este dado?")){
                    return true;
                }else{
                    e.preventDefault();
                }
            }) 
        }
    }
})(window, document);