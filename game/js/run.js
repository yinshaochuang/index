window.onload=function(){
    var clientW=document.documentElement.clientWidth;
    var clientH=document.documentElement.clientHeight;
    var canvas=document.querySelector("canvas");
    canvas.width=clientW;
    canvas.height=clientH;
    var cobj=canvas.getContext("2d");

    var runs=document.querySelectorAll(".run");
    var jumps=document.querySelectorAll(".jump");
    var hinderImg=document.querySelectorAll(".hinder");

    var gameObj=new game(canvas,cobj,runs,jumps,hinderImg,runA,jumpA,hitA);
    //选项卡
    var start=$(".start");
    //遮罩
    var mask=$(".mask");
    //开始按钮
    var startBtn=$(".btn");
    startBtn.one("click",function(){
        gameObj.play(start,mask,stop);
    })
    var stop=$(".stop");
    stop.click(function(){
        gameObj.stop(start,mask,stop);

    })

    var runA=$(".runA")
    var jumpA=$(".jumpA")
    var hitA=$(".hitA")
}