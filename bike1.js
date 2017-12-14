$(document).ready(function(){
    var angle = 360/$(".spokes li").length; 
    var i = 0;
    while (i < 361){
        $(".spokes li").each(function(){
            $(this).css("transform","rotate("+i+"deg)");
            i+=angle;
        });
    }
});
        