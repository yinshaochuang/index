window.onload=function(){
    var scene=document.querySelector(".scene");
    var room=document.querySelector(".room");

    //屏幕宽高
    var clientW=document.documentElement.clientWidth;
    var clientH=document.documentElement.clientHeight;
    room.style.transforOrigin="center center "+clientW/2+"px";

    //最后一个panel
    var lastPanel=document.querySelector(".panel:last-child");
    lastPanel.style.transform="translate3d(0,0,"+clientW+"px) rotate3d(0,1,0,180deg)";

    //天花板、地板
    var floor=document.querySelector(".panel:first-child");
    var ceil=document.querySelector(".panel:nth-child(5)");
    floor.style.width=floor.style.height=ceil.style.width=ceil.style.height=clientW+"px";
    ceil.style.top=-(clientW-clientH)+"px";

    //执行
    room.style.transformOrigin="center 500px 500px";
    room.style.transform="rotate3d(0,1,0,180deg)";
    lastPanel.onclick=function(){
        room.style.transition="transform 2s ease";
        room.style.transform="translate3d(0,0,-300px) rotate3d(0,1,0,180deg)";
    }
    //进去room
    var angle1=0,angle=0;
    var flag1=false;
    document.onmousedown=function(e){
        var startx= e.clientX;
        var starty= e.clientY;
        document.onmousemove=function(e){
            //让图跟着鼠标动
            flag1=true;
            room.style.transition="none";
            var movex=e.clientX;
            var movey= e.clientY;
            e.preventDefault();
            angle=Math.abs(movex-startx)>Math.abs(movey-starty)?movex-startx:movey-starty;
            room.style.transform="translate3d(0,0,-500px) rotate3d(0,1,0,"+(angle1+angle)+"deg)";

        }
        document.onmouseup=function(){
            if(flag1){
                angle1+=angle;
            }
            flag1=false;
            document.onmousemove=null;
            document.onmouseup=null;
        }
        e.preventDefault();
    }
    var panels=document.querySelectorAll(".panel");
    var flag=true;
    for(var i=0;i<panels.length;i++){
        if(i<(panels.length-1)){
            panels[i].ondblclick=function(){
                room.style.transition="transform 2s ease";
                if(flag){
                    room.style.transform="translate3d(0,0,200px) rotate3d(0,1,0,"+angle1+"deg)";
                    flag=false;
                }else{
                    room.style.transform="translate3d(0,0,-500px) rotate3d(0,1,0,"+angle1+"deg)";
                    flag=true;
                }

            }
        }
    }
}
