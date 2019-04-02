var option = [
  'images/lent1.png',
  'images/lent2.png',
  'images/lent3.png',
  'images/lent4.png',
]
function LanternDraw(data){
  this._option = [];
  this.position = data.position;
  console.log(this.position)
  let self = this;
  this.lentArr = [];
  this.num = 0;
  var canvas = document.getElementById('canvas');
  this.wt = document.documentElement.clientWidth;
  this.ht = document.documentElement.clientHeight;
  console.log(this.wt,this.ht)
  canvas.width = this.wt;
  canvas.height = this.ht;
  this.ctx = canvas.getContext('2d');
  option.forEach(function(value,index){
    self._option.push(value);
  })
  this.lentAdd();
  this.lentStart();
}
LanternDraw.prototype.lentData = function() {

  var img = this._option[Math.floor(Math.random()*4)];
  var startx = this.position[this.num][0];
  var starty = Math.round(Math.random()*150+350);
  var endy = this.position[this.num][1];
  var speed = Math.round(Math.random()*5+10)/10;
  var arr = [0.5,0.6,0.8,0.9,1]
  this.num++;
  return {
    img:img,
    startx:startx,
    starty:starty,
    endy:endy,
    speed:speed,
    scale:arr[Math.round(Math.random()*arr.length)],
    opacity:arr[Math.round(Math.random()*arr.length)]-0.3,
  }
};
LanternDraw.prototype.lentInit = function() {
  if(this.num<this.position.length){
    this.lentArr.push(this.lentData());
  }    
}
LanternDraw.prototype.lentAdd = function() {
  var self = this;
  this.time = setInterval(function(){
    self.lentInit();
    if(self.position.length<1){
      clearInterval(self.time)
    }
  },500)
}
LanternDraw.prototype.lentDraw = function(){
    var self = this;
  for(var i = 0;i<this.lentArr.length; i++){
    if(this.lentArr[i].starty>this.lentArr[i].endy){
      this.lentArr[i].starty -= this.lentArr[i].speed;
    }else{
      this.lentArr[i].starty = this.lentArr[i].endy;
    }
    var arr = this.lentArr[i];
    var img = new Image();
    img.src = arr.img;
    this.ctx.save();
    this.ctx.scale(this.lentArr[i].scale,this.lentArr[i].scale);
    this.lentArr[i].opacity+=0.02;
    if(this.lentArr[i].opacity>=1){this.lentArr[i].opacity=1};
    this.ctx.globalAlpha=this.lentArr[i].opacity;
    this.ctx.drawImage(img,Math.round(arr.startx),Math.round(arr.starty))      
    this.ctx.restore();    
  }
}
LanternDraw.prototype.lentStart = function(){
  var self = this;
  function animate(){
    self.ctx.clearRect(0,0,self.wt,self.ht)
    reqAnimFrame = window.mozRequestAnimationFrame    ||
                   window.webkitRequestAnimationFrame ||
                   window.msRequestAnimationFrame     ||
                   window.oRequestAnimationFrame
                   ;

    reqAnimFrame(animate);
    self.lentDraw()    
  } 
  animate()
}