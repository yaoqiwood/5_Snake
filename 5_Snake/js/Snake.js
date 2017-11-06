/**
 * Created by KuroCat on 11/5/2017.
 */
//定义地图
//把地图对象全局化，方便以后访问
var map;
var food;
var snake;
var flag=0;
var judge= 1,record='right';
function Map(){
    this.width=800;
    this.height=400;
    this.bottom=0;
    this.right=0;
    this.color='#dddddd';
    this.position='absolute';
    //定义一个共有属性，用于获取地图的div元素
    this._map=null;

    //定义相关方法
    this.show=function(){
        //创建一个div元素
        this._map=document.createElement('div');
        this.h2=document.createElement('h2');
        this.h2.innerHTML='Catwood';
        this.h2.style.bottom=this.bottom+'px';
        this.h2.style.position=this.position;
        this.h2.style.right=this.right;
        //设置相关属性
        this._map.style.width=this.width+'px';
        this._map.style.height=this.height+'px';
        this._map.style.backgroundColor=this.color;
        this._map.style.position=this.position;
        //添加div元素到body元素中
        document.getElementsByTagName('body')[0].appendChild(this._map);
        this._map.appendChild(this.h2);
    }
}
//定义食物
function Food(){
    this.width=20;//宽度
    this.height=20;//高度
    this.color='yellow';
    this.position='absolute';
    this.x=0;
    this.y=0;
    this._food==null;
    this.show= function () {
        if (this._food==null){
            this._food=document.createElement('div');
            this._food.style.width=this.width+'px';
            this._food.style.height=this.height+'px';
            this._food.style.backgroundColor=this.color;
            this._food.style.position=this.position;
            //把食物显示在地图上
            map._map.appendChild(this._food);

        }

        this.x=Math.floor(Math.random()*40);  //随机横坐标为0-40
        this.y=Math.floor(Math.random()*20);  //随机纵坐标为0-20
        this._food.style.left=this.x*20+'px';        //随机横坐标乘20
        this._food.style.top=this.y*20+'px';         //随机纵坐标乘20
        //地图对象._map.appendChild(div);

    }
}
//定义蛇
function Snake(){
    this.width=20;
    this.height=20;
    this.position='absolute';
    this.direct='right'; //定义运动方向
    //定义蛇节
    this.body=[[3,2,'red',null],[2,2,'blue',null],[1,2,'blue',null]];

    //定义相关方法
    this.show=function(){
        //获取蛇节的长度
        var length=this.body.length;
        for (var i=0;i<length;i++){
            if (this.body[i][3]==null){
                this.body[i][3]=document.createElement('div');
                this.body[i][3].style.width=this.width+'px';
                this.body[i][3].style.height=this.height+'px';
                this.body[i][3].style.backgroundColor=this.body[i][2];
                this.body[i][3].style.position=this.position;
                this.body[i][3].style.left=this.body[i][0]*20+'px';
                this.body[i][3].style.top=this.body[i][1]*20+'px';
                //追加div元素到map中
                map._map.appendChild(this.body[i][3]);
            }
            this.body[i][3].style.left=this.body[i][0]*20+'px';
            this.body[i][3].style.top=this.body[i][1]*20+'px';
        }
    };
    //定义一个setDirect,判断运动方向
    this.setDirect= function (code) {
      switch (code){
          case 37:
              this.direct='left';
              break;
          case 38:
              this.direct='up';
              break;
          case 39:
              this.direct='right';
              break;
          case 40:
              this.direct='down';
              break;
      }
    };

    this.move=function(){
        //判断吃到食物
        if (this.body[0][0]==food.x && this.body[0][1]==food.y){
            //增加一节
            this.body.push([0,0,'blue',null]);
            //吃到食物随机显示
            food.show();
        }
        var length=this.body.length;
        //交换舌头以外的其他坐标
        for (var i=length-1;i>0;i--){
            this.body[i][0]=this.body[i-1][0];
            this.body[i][1]=this.body[i-1][1];
        }
        //判断蛇的运动方向
        if (record=='right' && this.direct=='left'){   //记录蛇上一个按键防止出现反方向运动的情况
            this.direct='right';
        }else{
            if (record=='left' && this.direct=='right'){
                this.direct='left';
            }else{
                if (record=='down' && this.direct=='up'){
                    this.direct='down';
                }else{
                    if (record=='up' && this.direct=='down'){
                        this.direct='up';
                    }
                }
            }
        }
        if (this.direct=='right'){
            this.body[0][0]+=1;
            record='right';
        }
        if (this.direct=='left'){
            this.body[0][0]-=1;
            record='left';
        }

        if (this.direct=='up'){
            this.body[0][1]-=1;
            record='up';
        }
        if (this.direct=='down'){
            this.body[0][1]+=1;
            record='down';
        }


        if(this.body[0][0]*20 < 800 && this.body[0][0]*20>=0 && this.body[0][1]*20>=0 && this.body[0][1]*20<400){//判断是否撞到墙
            for (var j=length-1;j>0;j--){
               // console.log(this.body[0][0]+','+this.body[i][0]);
                //console.log(this.body[0][1]+','+this.body[])
                if (this.body[0][0]==this.body[j][0] && this.body[0][1]==this.body[j][1]){ //判断是否撞到自身
                    judge=0;
                    break;
                }
            }
            if (judge){
                this.show();//重新显示
                console.log(this.body[0][1]*20);
            }else{
                if (flag==0){
                    alert('Game Over!');
                    flag=1;
                }
            }

        }else{
            if (flag==0){
                alert('Game Over!');
                flag=1;
            }
        }
    }
}

//定义window.onload页面载入事件
window.onload=function(){
    //实例化Map类对象
    map=new Map();
    //调用show方法
    map.show();
    food=new Food(); //实例化
    food.show();    //调用方法
    snake=new Snake();
    snake.show();
    //使用定时器
    setInterval('snake.move()',200);
    document.onkeydown=function (event){
        var code;
        if (window.event){
            code=window.event.keyCode;
        }
        console.log(code);
        snake.setDirect(code);
    }
};