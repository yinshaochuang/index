function shape(canvas,copy,cobj){
    this.canvas=canvas;
    this.copy=copy;
    this.cobj=cobj;
    this.width=this.canvas.width;
    this.height=this.canvas.height;
    this.historyss=[];
    this.type="line";
    this.style="stroke";
    this.border="#000";
    this.fill="#000";
    this.linew=1;
    this.bianNum=5;
    this.jiaoNum=5;
    this.isback=true;
    this.xpsize=20;
    this.isshowxp=true;
}
shape.prototype={
    init:function(){
        this.cobj.strokeStyle=this.border;
        this.cobj.fillStyle=this.fill;
        this.cobj.lineWidth=this.linew;
    },
    draw:function(){
        
        var that=this;
        this.copy.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY;
            that.copy.onmousemove=function(e){
                that.isback=true;
                that.init();
                var endx= e.offsetX;
                var endy= e.offsetY;
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.historyss.length>0){
                    that.cobj.putImageData(that.historyss[that.historyss.length-1],0,0);
                }
                that[that.type](startx,starty,endx,endy);

            }

            that.copy.onmouseup=function(){
                that.copy.onmouseup=null;
                that.copy.onmousemove=null;
                that.historyss.push(that.cobj.getImageData(0,0,that.width,that.height));
            }
        }
    },
    line:function(x,y,x1,y1){
        
        var that=this;
        that.cobj.beginPath();
        that.cobj.moveTo(x,y);
        that.cobj.lineTo(x1,y1);
        that.cobj.stroke();
    },
    rect:function(x,y,x1,y1){
        
        var that=this;
        that.cobj.beginPath();
        that.cobj.rect(x,y,x1-x,y1-y)
        that.cobj[that.style]();
    },
    arc:function(x,y,x1,y1){
        
        this.cobj.beginPath();
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        this.cobj.arc(x,y,r,0,2*Math.PI);
        this.cobj[this.style]();
    },
    bian:function(x,y,x1,y1){
        
        var angle=360/this.bianNum*Math.PI/180;
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        this.cobj.beginPath();
        for(var i=0;i<this.bianNum;i++){
            this.cobj.lineTo(Math.cos(angle*i)*r+x,Math.sin(angle*i)*r+y);
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },

    jiao:function(x,y,x1,y1){
        
        var angle=360/(this.jiaoNum*2)*Math.PI/180;
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var r1=r/3;
        this.cobj.beginPath();
        for(var i=0;i<this.jiaoNum*2;i++){
            if(i%2==0) {
                this.cobj.lineTo(Math.cos(angle * i) * r + x, Math.sin(angle * i) * r + y);
            }else{
                this.cobj.lineTo(Math.cos(angle * i) * r1 + x, Math.sin(angle * i) * r1 + y);
            }
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    pen:function(){
        
        var that=this;
        this.copy.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY;
            that.cobj.beginPath();
            that.cobj.moveTo(startx,starty);
            that.copy.onmousemove=function(e){
                that.init();
                var endx= e.offsetX;
                var endy= e.offsetY;
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.historyss.length>0){
                    that.cobj.putImageData(that.historyss[that.historyss.length-1],0,0);
                }
                that.cobj.lineTo(endx,endy);
                that.cobj.stroke();

            }

            that.copy.onmouseup=function(){
                that.copy.onmouseup=null;
                that.copy.onmousemove=null;
                that.historyss.push(that.cobj.getImageData(0,0,that.width,that.height));
            }
        }
    },
    clear:function(){
        this.cobj.clearRect(0,0,this.width,this.height);
        this.historyss=[];
    },
    xp:function(xpObj){
        var that = this;
        this.copy.onmousemove = function(e){
            if(!that.isshowxp){
                return false;
            }
            var movex = e.offsetX;
            var movey = e.offsetY;
            var lefts = movex-that.xpsize/2;
            var tops = movey-that.xpsize/2;
            if(lefts<0){
                lefts = 0;
            }
            if(lefts>that.width-that.xpsize){
                lefts = that.width-that.xpsize;
            }
            if(tops<0){
                tops = 0;
            }
            if(tops>that.height-that.xpsize){
                tops = that.height-that.xpsize;
            }
            xpObj.css({
                display:"block",
                left:lefts,top:tops,
                width:that.xpsize+"px",
                height:that.xpsize+"px"
            })
        }

        that.copy.onmousedown = function(e){
            that.copy.onmousemove = function(e){
                var movex = e.offsetX;
                var movey = e.offsetY;
                var lefts = movex-that.xpsize/2;
                var tops = movey-that.xpsize/2;
                if(lefts<0){
                    lefts = 0;
                }
                if(lefts>that.width-that.xpsize){
                    lefts = that.width-that.xpsize;
                }
                if(tops<0){
                    tops = 0;
                }
                if(tops>that.height-that.xpsize){
                    tops = that.height-that.xpsize;
                }
                xpObj.css({
                    //display:"block",
                    left:lefts,top:tops,
                    width:that.xpsize+"px",
                    height:that.xpsize+"px"
                });
                that.cobj.clearRect(lefts,tops,that.xpsize,that.xpsize);
            }
            that.copy.onmouseup = function(){
                that.copy.onmousemove = null;
                that.copy.onmouseup = null;

                that.xp(xpObj);
                that.historyss.push(that.cobj.getImageData(0,0,that.width,that.height));
                //that.cobj.putImageData(that.historyss,0,0)

            }
        }
    },
    mh:function(dataobj,num,x,y){
       console.log(1);
        var width = dataobj.width, height = dataobj.height;
        var arr=[];
        var num = num;
        for (var i = 0; i < height; i++) {//行
            for (var j = 0; j < width; j++) {//列  x
                var x1=j+num>width?j-num:j;
                var y1=i+num>height?i-num:i;
                var dataObj = this.cobj.getImageData(x1, y1,num, num);
                var r = 0, g = 0, b = 0;
                for (var k = 0; k < dataObj.width * dataObj.height; k++) {
                    r += dataObj.data[k * 4 + 0];
                    g += dataObj.data[k * 4 + 1];
                    b += dataObj.data[k * 4 + 2];
                }
                r = parseInt(r / (dataObj.width * dataObj.height));
                g = parseInt(g / (dataObj.width * dataObj.height));
                b = parseInt(b / (dataObj.width * dataObj.height));
                arr.push(r,g,b,255);
            }
        }
        for(var i=0;i<dataobj.data.length;i++){
            dataobj.data[i]=arr[i]
        }
        this.cobj.putImageData(dataobj,x,y);
    },
    msk:function(dataobj,num,x,y){
        var width=dataobj.width,height=dataobj.height;
        var num=num;
        var w=width/num;
        var h=height/num;
        for(var i=0;i<num;i++){ //行
            for(var j=0;j<num;j++){  //列---x
                var dataobj=this.cobj.getImageData(j*w,i*h,w,h);

                var r=0,g=0,b=0;
                for(var k=0;k<dataobj.width*dataobj.height;k++){
                    r+=dataobj.data[k*4+0];
                    g+=dataobj.data[k*4+1];
                    b+=dataobj.data[k*4+2];
                }

                r=parseInt(r/(dataobj.width*dataobj.height));
                g=parseInt(g/(dataobj.width*dataobj.height));
                b=parseInt(b/(dataobj.width*dataobj.height));

                for(var k=0;k<dataobj.width*dataobj.height;k++){
                    dataobj.data[k*4+0]=r;
                    dataobj.data[k*4+1]=g;
                    dataobj.data[k*4+2]=b;
                }
                this.cobj.putImageData(dataobj,x+j*w,y+i*h);
            }
        }
    },
    fx:function(dataobj,x,y){
        for(var i=0;i<dataobj.width*dataobj.height;i++){    //rgba
            dataobj.data[i*4+0]=255-dataobj.data[i*4+0];
            dataobj.data[i*4+1]=255-dataobj.data[i*4+1];
            dataobj.data[i*4+2]=255-dataobj.data[i*4+2];
            dataobj.data[i*4+3]=255;
        }
        this.cobj.putImageData(dataobj,x,y);
    },
    select:function(selectareaobj){
        var that=this;
        that.copy.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY;
            var minx,miny,w,h;
            that.init();
            that.copy.onmousemove=function(e){
                var endx= e.offsetX;
                var endy= e.offsetY;
                minx=startx>endx?endx:startx;
                miny=starty>endy?endy:starty;
                w=Math.abs(startx-endx);
                h=Math.abs(starty-endy);
                selectareaobj.css({
                    left:minx,
                    top:miny,
                    width:w,
                    height:h,
                    display:"block"
                })
            }
            that.copy.onmouseup=function(){
                that.copy.onmouseup=null;
                that.copy.onmousemove=null;
                that.temp=that.cobj.getImageData(minx,miny,w,h);
                that.cobj.clearRect(minx,miny,w,h);
                //that.historyss.push(that.cobj.getImageData(0,0,that.canvas.width,that.canvas.height));
                that.historyss.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.cobj.putImageData(that.temp,minx,miny);
                that.drag(minx,miny,w,h,selectareaobj);
            }
        }
    },
    drag:function(x,y,w,h,selectareaobj){
        var that=this;
        that.copy.onmousemove=function(e){
            selectareaobj.css("cursor","move");
        }
        that.copy.onmousedown=function(e){
            var ax= selectareaobj.position().left;
            var ay= selectareaobj.position().top;
            var ox= e.clientX;
            var oy= e.clientY;
            that.copy.onmousemove=function(e){
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.historyss.length!=0){
                    that.cobj.putImageData(that.historyss[that.historyss.length-1],0,0);
                }
                var mx= e.clientX;
                var my= e.clientY;
                var lefts=(mx-ox)+ax;
                var tops=(my-oy)+ay;
                if(lefts<0){
                    lefts=0;
                }
                if(lefts>that.canvas.widht-w){
                    lefts=that.canvas.width-w;
                }
                if(tops<0){
                    tops=0;
                }
                if(tops>that.canvas.height-h){
                    tops=that.canvas.height-h;
                }
                selectareaobj.css({
                    left:lefts,
                    top:tops
                })
                x=lefts;
                y=tops;
                that.cobj.putImageData(that.temp,lefts,tops);
                //that.selectarea.css("border","1px dotted #000");
            }
            that.copy.onmouseup=function(){
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
                that.drag(x,y,w,h,selectareaobj);
                //that.selectarea.css("border","0");
            }
        }
    }


}