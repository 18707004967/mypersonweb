<template>
  <div class="wrap">
    <canvas id="canvas"></canvas>
    <div class="nav_box">
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu> 
      <el-radio-group v-model="isCollapse">
        <el-radio-button :style="'display:'+ (isCollapse==true?'block':'none')" :label="false"></el-radio-button>
        <el-radio-button :style="'display:'+ (isCollapse==false?'block':'none')" :label="true"></el-radio-button>
      </el-radio-group>    
    </div>
    <button class="c_back" @click="backworld">返回</button>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'index',
  data () {
    return {
      isCollapse: true,
      campImg:[require('../assets/img/lent1.png'),require('../assets/img/lent2.png'),require('../assets/img/lent3.png'),require('../assets/img/lent4.png'),require('../assets/img/lent5.png'),require('../assets/img/lent6.png')],
      test:['花半开最美','情留白最浓','懂得给生命留白','亦是一种生活的智慧','淡泊以明志','宁静以致远','懂得给心灵留白','方能在纷杂繁琐的世界','淡看得失','宠辱不惊','去意无留','懂得给感情留白','方能持久生香','留有余地','相互欣赏','拥有默契','懂得给生活留白','揽一份诗意','留一份淡定','多一份睿智'],
      begainReturn:false,
      stCvs:true,
    }
  },
  computed:{
    
  },
  mounted(){
      this.startCanvas()
      
  },
  methods:{
		handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    backworld(){
      this.begainReturn=!this.begainReturn;
    },
    startCanvas(){
      this.canvas = document.getElementById('canvas');
      this.ctx = this.canvas.getContext('2d');
      console.log(this.ctx)
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      var self = this;
      function Drawcamp(data){
        this.default = {};
        this.data = data;
        $.extend(this.default,data);
        this.default.xspeed = Math.random()*(-10)+5;
        this.default.yspeed = Math.random()*(-10)+5;
      }
      
      Drawcamp.prototype.changeData = function() {
        if(self.begainReturn){
          this.return();
        }else{
          self.stCvs = true;
          this.default.x+=this.default.xspeed;
          this.default.y+=this.default.yspeed;
          if(this.default.x<=0||this.default.x>=self.width){
            this.default.xspeed = (-this.default.xspeed);
          }
          if(this.default.y<=0||this.default.y>=self.height){

            this.default.yspeed=(-this.default.yspeed);
          }
        }
        self.ctx.fillStyle = "rgba("+this.default.imageArr[0]+","+this.default.imageArr[1]+","+this.default.imageArr[2]+","+this.default.imageArr[3]+")";
        self.ctx.fillRect(this.default.x,this.default.y,0.9,0.9);
      };
      Drawcamp.prototype.return = function() {
          var px = this.default.x - this.data.x;
          var py = this.default.y - this.data.y;
          if(px>0){
            this.default.x-=Math.abs(this.default.xspeed);
          }else{
            this.default.x+=Math.abs(this.default.xspeed);
          }
          if(py>0){
            this.default.y-=Math.abs(this.default.yspeed);
          }else{
            this.default.y+=Math.abs(this.default.yspeed);
          }
          if(px<=1&&px>=-1){
            this.default.x = this.data.x
          }
          if(py<=1&&py>=-1){
            this.default.y = this.data.y
          }
      }
      function Getdata(){
        self.ctx.fillStyle = "#fff";
        self.ctx.font = 'normal 18px 方正报宋简体 常规';
        for(var i = 0; i < self.test.length; i++){
          self.ctx.fillText(self.test[i],self.width*0.7,100+i*24)
        }        
        this.imageData = self.ctx.getImageData(0,0,self.width,self.height);
        this.calculation();
      }
      Getdata.prototype.calculation = function() {
        var imageData = this.imageData.data;
        var k = 0;
        var arr = [];
        for(var i = 0; i < self.height; ++i){
          for(var j = 0; j<self.width; ++j){
            if(imageData[(i*self.width+j)*4+3]!==0){
              arr.push({
                imageArr:[imageData[(i*self.width+j)*4],imageData[(i*self.width+j)*4+1],imageData[(i*self.width+j)*4+2],imageData[(i*self.width+j)*4+3]],
                x:j,
                y:i,
              })           
            }
          }
        }
        this.realImageData = arr;
      }
      var getdata = new Getdata();
      var imgData = getdata.realImageData;
      this.dc = [];
      for(var i = 0; i < imgData.length; i++){
        this.dc.push(new Drawcamp(imgData[i]));
      }
      this.drawImage();
    },
    startDraw(){
      this.ctx.clearRect(0,0,this.width,this.height)
      for(var k = 0; k<this.dc.length; k++){
        this.dc[k].changeData();
      }
    },
    drawImage(){
      if(!this.stCvs){return false;}
      var reqAnimFrame = window.mozRequestAnimationFrame    ||
                     window.webkitRequestAnimationFrame ||
                     window.msRequestAnimationFrame     ||
                     window.oRequestAnimationFrame
                     ;
      reqAnimFrame(this.drawImage); 
      this.startDraw();
    }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    float: left;
  }
  .nav_box{
    position: fixed;
    left: 0; 
    top: 150px;
    z-index: 300;
    padding: 0 22px 0 0;
  }
  .el-radio-group{
    position: absolute;
    right: 0;
    top: 0;
    z-index: 40;
    height: 100%;
    width: 20px;
    margin-bottom:0 !important ;
    background: #fff;
  }
  .el-radio-button{
    width: 20px;
    height: 100%;
    background: url(../assets/img/nav_s_icon.png) no-repeat center center;
    text-indent: -9999px;
    cursor: pointer;
  }
  .el-radio-button__orig-radio{
    width: 20px;
    height: 100%;
  }
  .el-radio-group .el-radio-button:nth-child(2){
    transform: rotate(180deg);
  }
  .c_back{ display: block; width: 120px; height: 60px; border: #f00 solid 2px; border-radius: 10px; background: #fff; color: #000; text-align: center; line-height: 60px; font-size: 24px; position: absolute; left: 50%; bottom: 200px; z-index: 300; margin: 0 0 0 -62px; }
  .wrap{ width: 100%; background: url(../assets/img/zuom.jpg) no-repeat top center; background-size: 100% auto; }
</style>
