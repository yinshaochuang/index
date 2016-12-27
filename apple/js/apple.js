 $(function(){
    var num=0;
    var next=0;
    var ww=$(window).width();
    $(".imgbox>a:gt(0)").css("left",$(".imgbox>a").width()+"px");
    var flag=true;
    function move(type){
      type=type||"next";
      if(!flag){
        return;
      }
      flag=false;
      $(".imgbox>a").stop(false,false)
      if(type=="pre"){
        next--;
        if(next<0){
          next=$(".imgbox>a").length-1;
        }
        $(".imgbox>a").eq(next).css("left","-"+$(".imgbox>a").width()+"px").animate({left:0});
        $(".imgbox>a").eq(num).animate({left:ww},function(){
          flag=true;
        });
      }
      else if(type=="next"){
        next++;
        if(next>=$(".imgbox>a").length){
          next=0;
        }
        $(".imgbox>a").eq(next).css("left",$(".imgbox>a").width()+"px").animate({left:0});
        $(".imgbox>a").eq(num).animate({left:"-"+$(".imgbox>a").width()},function(){
          flag=true;
        });
      }
      $(".banner>.btn>li").eq(next).addClass("active");
      $(".banner>.btn>li").eq(num).removeClass("active")
      num=next;
    }
    var t =  setInterval(move,2000)
   $(".banner").mouseover(function(){
    clearInterval(t)
   }).mouseout(function(){
    t =  setInterval(move,2000)
   })
  $(".leftbtn").click(function(){
    move("pre");
  })
  $(".rightbtn").click(function(){
    move("next");
  })
  $(".banner>.btn li").click(function(){
    next=$(this).index()
    if(num>next){
      next=$(this).index()-1
      move("next")
    }else if(num<next){
      next=$(this).index()+1
      move("pre")
    }
  })






/*nav-footer文字*/
$(".nf_er").show();
$(".agm_er").hide();
$(window).resize(function(){
var cw=document.documentElement.clientWidth;
    if(cw<800){
        $(".nf_er").hide();
        $('.nf_n').click(function(){
          var index=$(this).index(".nf_n");
        $('.nf_er').eq(index).stop(true,false).slideToggle();
        return false;
        });
        /*nav-header*/
        $(".agm_er").hide();
        $(".ac-gn-menu li:nth-child(1)").click(function(){
            $(".agm_er").slideDown();    
        })
        $(".agm_er b").click(function(){
            $(".agm_er").slideUp();   
        })
    }else{
        $(".nf_er").show();
        var index=$(this).index(".nf_n");
        $('.nf_er').eq(index).stop(false,false);
        $(".agm_er").hide();
    }

});



})

