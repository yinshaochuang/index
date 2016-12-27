//游戏主类
/*function game(canvas,cobj,runs,jumps){
    this.canvas=canvas;
    this.cobj=cobj;
    this.height=canvas.height;
    this.width=canvas.width;
    this.person=new person(canvas,cobj,runs,jumps);
}
game.prototype={
    play:function(canvas,cobj,runs,jumps){
       var that=this;
        var num=0;
        var top=0;
        var num2=0;
        setInterval(function(){
            that.cobj.clearRect(0,0,that.width,that.height);
            num++;
            num2+=5;
            that.person.state=num%8;
           // that.person.x+=that.person.speedx;
            that.person.speedy+=that.person.zhongli;
            top+=that.person.speedy;
            if(top>=420){
                top=420;
            }
            that.person.y=top;
            that.person.draw();
            that.canvas.style.backgroundPosition=-num2+"px";
        },50)
    }
}
function person(canvas,cobj,runs,jumps){
    this.canvas=canvas;
    this.cobj=cobj;
    this.runs=runs;
    this.jumps=jumps;
    this.x=200;
    this.y=420;
    this.width=1024;
    this.height=697;
    this.speedx=5;
    this.speedy=5;
    this.zhongli=0.4;
    this.status="runs";
    this.state=0;
}
person.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this[this.status][this.state],0,0,1024,697,0,0,this.width,this.height);
        this.cobj.restore();
    }
}*/
//人
function person(canvas,cobj,runs,jumps){
    this.canvas=canvas;
    this.cobj=cobj;
    this.runs=runs;
    this.jumps=jumps;
    this.x=0;
    this.y=516;
    //图片大小
    this.width=82;
    this.height=130;
    this.status="runs";//当前图片状态
    this.state=0;//张数，第几张
    this.num=0;
    this.speedx=2;
    this.life=3;
}
person.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        //drawImage(第几张图片,图片位置,放置图片的位置)
        this.cobj.drawImage(this[this.status][this.state],0,0,82,130,0,0,this.width,this.height);
        this.cobj.restore();
    }
}
//子弹
function zidan(canvas,cobj){
    this.canvas=canvas;
    this.cobj=cobj;
    this.x=0;
    this.y=0;
    this.width=10;
    this.height=10;
    this.color="rgb("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+")";
    this.speedx=5;
    this.jia=1;
}
zidan.prototype={
    draw:function(){
        var cobj=this.cobj;
        cobj.save();
        cobj.translate(this.x,this.y);
        cobj.fillStyle=this.color;
        cobj.fillRect(0,0,this.width,this.height);
        cobj.restore();
    },

}
//障碍物
function hinder(canvas,cobj,hinderImg){
    this.canvas=canvas;
    this.cobj=cobj;
    this.hinderImg=hinderImg;
    this.state=0;
    this.x=canvas.width-20;
    this.y=550;
    this.width=62;
    this.height=54;
    this.speedx=6;
}
hinder.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this.hinderImg[this.state],0,0,155,135,0,0,this.width,this.height);
        this.cobj.restore();
    }
}
//血
function lizi(cobj){
    this.cobj=cobj;
    this.x = 300;
    this.y = 200;
    this.r = 1+3*Math.random();
    this.color = "red";
    this.speedy = -4;
    this.speedx = Math.random()*10-3;
    this.zhongli = 0.3;
    this.speedr = 0.1;
}
lizi.prototype = {
    draw:function(){
        var cobj=this.cobj;
        cobj.save();
        cobj.translate(this.x,this.y);
        cobj.beginPath();
        cobj.fillStyle = this.color;
        cobj.arc(0,0,this.r,0,2*Math.PI);
        cobj.fill();
        cobj.restore();
    },
    update:function(){
        this.x+=this.speedx;
        this.speedy+=this.zhongli;
        this.y+=this.speedy;
        this.r-=this.speedr;
    }
}
function xue(cobj,x,y){
    var arr = [];
    for(var i = 0;i<30;i++)
    {
        var obj = new lizi(cobj);
        obj.x = x;
        obj.y = y;
        arr.push(obj);
    }
    var t = setInterval(function(){
        for(var i = 0;i<arr.length;i++)
        {

            arr[i].draw();
            arr[i].update();

            if(arr[i].r<0){
                arr.splice(i,1);
            }
        }
        if(arr.length==0){
            clearInterval(t);
        }
    },50)
}
//游戏主类
function game(canvas,cobj,runs,jumps,hinderImg,runA,hitA,jumpA){
    this.canvas=canvas;
    this.cobj=cobj;
    this.hinderImg=hinderImg;
    this.jumpA=jumpA;
    this.runA=runA;
    this.hitA=hitA;
    this.width=canvas.width;
    this.height=canvas.height;
    this.person=new person(canvas,cobj,runs,jumps);
    this.backx=0;
    this.backSpeed=6;
    this.score=0;//积分
    this.hinderArr=[];
    this.isfire=false;
    this.zidan=new zidan(canvas,cobj);
    this.t1=0;
    this.name="zhangsan";
}
prompt("请输入名字",this.name);
game.prototype={
    //主运行方法
    play:function(start,mask){
        //大幕拉起
        start.css("animation","start1 2s ease forwards");
        mask.css("animation","mask1 2s ease forwards");
        this.run();
        this.key();
        this.mouse();
    },
    //stop:function(stop,start,mask){
    //        //start.css("animation","start 2s ease forwards");
    //        //mask.css("animation","mask 2s ease forwards");
    //    clearInterval(this.t1);
    //    this.run();
    //}
    //,
    run:function(){
        var that=this;
        //that.runA.play();
        var num=0;
        var rand=(4+Math.ceil(6*Math.random()))*1000;
        this.t1=setInterval(function(){
            num+=50;
            that.cobj.clearRect(0,0,that.width,that.height);
            //计算显示图片
            that.person.num++;
            if(that.person.status=="runs"){
                that.person.state=that.person.num%8;
            }else{
                that.person.state=0;
            }
            //人物的x发生变化,
            that.person.x+=that.person.speedx;
            if(that.person.x>that.width/8){
                that.person.x=that.width/8;
            }
            that.person.draw();
            //操作障碍物
            if(num%rand==0){
                //条件成功后再取一次rand让障碍物之间的距离不会固定
                rand=(4+Math.ceil(6*Math.random()))*1000;
                num=0;
                var obj=new hinder(that.canvas,that.cobj,that.hinderImg);
                obj.state=Math.floor(Math.random()*that.hinderImg.length);
                that.hinderArr.push(obj);
            }
            for(var i=0;i<that.hinderArr.length;i++){
                that.hinderArr[i].x-=that.hinderArr[i].speedx;
                that.hinderArr[i].draw();

                if(hit(that.canvas,that.cobj,that.person,that.hinderArr[i])){
                    if(!that.hinderArr[i].flag){
                        //that.hitA.play();
                        xue(that.cobj,that.person.x+that.person.width/2,that.person.y+that.person.height/2);
                        that.person.life--;
                        if(that.person.life==0){
                            var messages = localStorage.messages?JSON.parse(localStorage.messages):[];//获取localStorage里的信息
                            var temp = {name:that.name,score:that.score};//要添加的信息
                            if(messages.length>0){//判断localStorage里是否有信息
                                messages.sort(function(a,b){ //排序  sort,冒泡
                                    return a.score<b.score;
                                })
                                if(temp.score>messages[messages.length-1].score){//判断新添加的分数是否大于message里的最后一个分数之后分两种情况
                                    if(messages.length == 5){//如果message里的信息有5个就替换最后一个否则直接添加
                                        messages[length-1] = temp;
                                    }else if(messages.length <5){
                                        messages.push(temp);
                                    }
                                }
                            }else{
                                messages.push(temp);
                            }
                            localStorage.messages = JSON.stringify(messages);
                            //alert("Game over");
                            location.reload();
                        }
                        that.hinderArr[i].flag=true;
                    }
                }

                if(that.person.x>that.hinderArr[i].x+that.hinderArr[i].width){
                    if(!that.hinderArr[i].flag&&!that.hinderArr[i].flag1){
                        that.score++;
                        document.title=that.score;
                        that.hinderArr[i].flag1=true;
                    }
                }
                if(hit(that.canvas,that.cobj,that.zidan,that.hinderArr[i])){
                    xue(that.cobj,that.hinderArr[i].x+that.hinderArr[i].width/2,that.hinderArr[i].y-that.hinderArr[i].height/2);
                    that.hinderArr.splice(i,1);
                }
            }
            //操作子弹
            if(that.isfire){
                that.zidan.speedx+=that.zidan.jia;
                that.zidan.x+=that.zidan.speedx;
                that.zidan.draw();
            }
            //操作背景
            that.backx-=that.backSpeed;
            that.canvas.style.backgroundPositionX=that.backx+"px";
        },50)
    },//按下空格跳跃
    key:function(){
        var that=this;
        var flag=true;
        document.onkeydown=function(e){
            if(!flag){
                return;
            }
            flag=false;
            if(e.keyCode==32) {  //空格
                that.person.status="jumps";
                //that.jumpA.play();
                //that.runA.pause();
                var inita=0;//角度
                var speeda=5;
                var r=100;
                var y=that.person.y;
                var t=setInterval(function(){
                    inita+=speeda;
                    if(inita>=180){
                        that.person.y=y;
                        clearInterval(t);
                        flag=true;
                        that.person.status="runs";
                    }else{
                        var top=Math.sin(inita*Math.PI/180)*r;
                        that.person.y=y-top;
                    }
                },50)
            }
        }
    },
    mouse:function(){
        var that=this;
        document.querySelector(".mask").onclick=function(){
            that.zidan.x=that.person.x+that.person.width/2;
            that.zidan.y=that.person.y+that.person.height/3;
            that.zidan.speedx=5;
            that.isfire=true;
        }
    }
}