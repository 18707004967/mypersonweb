<template>
	<div id="musicDetail">
		<div class="bg" :style="'background:url('+(_sizeChange(musicInfo.imgUrl,400)||_sizeChange(musicInfo.album_img,400))+') no-repeat center center; background-size:cover;'"></div>
		<div class="music_cover"></div>
		<div class="music_in">			
			<div class="music_top">
				<span class="music_back" @click="hideDetail(false)"></span>
				<p class="music_title">{{musicInfo.fileName}}</p>
			</div>
			<div class="music_img">
				<img :src="(_sizeChange(musicInfo.imgUrl,400)||_sizeChange(musicInfo.album_img,400))" alt="">
			</div>
			<p class="music_lirc">
				<span class="current">{{lyone}}</span><span>{{lytwo}}</span>
			</p>
			<div class="block">
				<span class="music_now_time">{{nowTime}}</span>
				<el-slider v-model="prg" @change="drumpMusic" :show-tooltip="false"></el-slider>
				<span class="music_total_time">{{totalT}}</span>
			</div>
			<div class="music_kj">
				<span class="music_prev" @click="musicNextChange(1)"></span>
				<span :class="'music_play'+(openPlay==false?' play_pause':'')" @click="changePlay"></span>
				<span class="music_prev music_next" @click="musicNextChange(-1)"></span>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name:"musicDetail",
	data(){
		return {
			time:null,
			nowLyrics:0,
			open:'',
			prg:0,
			nowPlayTime:0,
			totalTime:0,
			audio:null,
			prgChange:false,
			changepre:false,
			end:false,
		}
	},
	mounted(){
		this.open = this.$store.state.nolist;
		this.$store.state.nolist = false;
		this.audio = document.getElementById('audio');
		var self = this;
		this.getInfo();
		this.audio.addEventListener('ended',function(){	
			self.changeNextMusic(1);		
		})
	},
	destroyed(){
		if(this.open==true){
			this.$store.state.nolist = true;
		}
	},
	computed:{
		musicInfo(){
			return this.$store.state.musicList;
		},
		lyrics(){
			if(this.$store.getters.lyrics.length>0){
				return this.$store.getters.lyrics;
			}else{
				return [];
			}
		},
		nowTime(){
			return this.getTime(this.nowPlayTime)
		},
		totalT(){
			return this.getTime(this.totalTime)
		},
		nowP(){
			if(this.lyrics.length>0&&this.nowLyrics<this.lyrics.length-2){
				var nowP = this.lyrics[this.nowLyrics+1].match(/\d+/g)
				nowP = Number(nowP[0])*60+Number(nowP[1])+Number(nowP[2])/100;
				return nowP
			}
		},
		lyone(){
			if(this.lyrics.length>0){
				return this.lyrics[this.nowLyrics].replace(/\[\d+:\d+\.\d+\]/,'')
			}{
				return '';
			}
			
		},
		lytwo(){
			if(this.lyrics.length>0&&this.nowLyrics<this.lyrics.length-2){
				return this.lyrics[this.nowLyrics+1].replace(/\[\d+:\d+\.\d+\]/,'')
			}{
				return '';
			}
			
		},
		openPlay(){
			return this.$store.state.openPlay
		}
	},
	methods:{
		getTime(t){
			var min = Math.floor(t/60);
			var sec = Math.floor(t - min*60)
			var time  = (min>=10?min:'0'+min) +':'+ (sec>=10?sec:'0'+sec);
			return time;			
		},
		hideDetail(bool){
			this.$store.commit('showDetail',bool)
		},
		getInfo(){
			this.$store.dispatch('changeMusic')
			this.setLic();
		},
		setLic(){		
			if(this.lyrics.length>0){
				var self = this;
				this.nowLyrics = 0;
				this.totalTime = audio.duration;
				if(this.time!==null){clearInterval(this.time)}
				this.time = setInterval(function(){
					if(self.lyrics.length>0){self.prgGo()}
				},60/1000)

			};	
		},
		prgGo(){
			var nowPlay = this.audio.currentTime;
			if(this.nowLyrics>this.lyrics.length-1){
				clearInterval(this.time)
				return
			}
			this.nowPlayTime = nowPlay;
			this.prg = Math.round(nowPlay/this.totalTime*100)
			if(nowPlay>=this.nowP){
				this.nowLyrics++;
			}

		},
		drumpMusic(val){
			this.audio.currentTime = this.totalTime*val/100;
			this.setLic();
		},
		changeNextMusic(n){
			var num = this.$store.state.changeNum;
			if(num==0){
				this.$store.commit('nextChange',n)
				this.$store.dispatch('changeMusic');
				var clt = setInterval(()=>{
					this.changepre = this.$store.state.changepre;
					if(this.changepre==true){
						this.setLic();
						clearInterval(clt);
						this.$store.state.changepre = false;
					}
				},60/1000)
				this.$store.state.changeNum++;
			}			
		},
		musicNextChange(num){
			this.changeNextMusic(num)
		},
		changePlay(){
			if(this.$store.state.openPlay==false){
				this.audio.play();
				this.$store.state.openPlay = true;
			}else{
				this.audio.pause();
				this.$store.state.openPlay = false;
			}
		},
	}
}
</script>
<style  scoped>
body{ height: 100vh; overflow: hidden;}
#musicDetail{ width: 100vw; height: 100vh; position: fixed; left: 0; top: 0; z-index: 320; background: #000;}
.bg{ width: 100vw; height: 100vh; filter: blur(5px); position: absolute; left: 0; top: 0; z-index: 10;}
.music_cover{ width: 100%; height: 100%; background: rgba(0,0,0,0.6); position: absolute; left: 0; top: 0; z-index: 20; }
.music_in{ padding: 0.80rem 0 0 0; width: 100%; position: relative; left: 0; top: 0; z-index: 30;}
.music_top{ width: 100%; height: 0.80rem; position: absolute; top: 0.80rem; left: 0; z-index: 300; }
.music_back{ display: block; width: 0.24rem; height: 0.40rem; background: url(../assets/img/goback_1.png) no-repeat; background-size: 0.24rem 0.40rem; position: absolute; left: 0.20rem ; top: 0.20rem; }
.music_title{ width: 80%; height: 100%; text-align: center; font-size: 0.32rem; color: #fff; line-height: 0.80rem; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0 auto; }
.music_img{ width: 4.0rem; height: 4.0rem; overflow: hidden; margin: 2.0rem auto 0; border-radius: 0.20rem ; overflow: hidden; }
.music_img img{ width: 100%; height: 100%; display: block; }
.music_lirc{ height: 1.40rem; font-size: 0.26rem; line-height: 0.70rem; text-align: center; color: #afabac; margin: 0.35rem auto 0;}
.music_lirc span{ display: block; }
.music_lirc span.current{ color: yellow; }
.music_prg{ width: 5.20rem; height: 0.04rem; background: #232228; border-radius: 0.02rem; margin: 0.45rem auto 0;position: relative;}
.prg_in{ width:0%; height: 0.04rem; background: #3195fd; border-radius: 0.07rem; }
.music_now_time{ display: block; font-size: 0.24rem; color: #dcdcdc; width: 1.0rem; text-align: right; position:absolute; left: -1.10rem; top: -0.12rem;}
.music_total_time{ display: block; font-size: 0.24rem; color: #dcdcdc; width: 1.0rem; position:absolute; right: -1.10rem; top: -0.12rem;}
.music_circle{ display: block; width: 0rem; height: 0rem; position: absolute; left: 0; top: 0.02rem; z-index: 20; }
.music_circle span{ display: block; width: 0.15rem; height: 0.15rem; border-radius: 50%; background: #3195fd; border: #fff solid 0.02rem; position: absolute; left: -0.09rem; top: -0.09rem; }
.block{ width: 5.20rem; height: 0.04rem; margin: 0.45rem auto 0;position: relative;}
.music_kj{ width: 3.0rem; height: 1.0rem; display: flex; justify-content: space-between; margin: 0.40rem auto 0; align-items: center; }
.music_prev{ display: block; width: 0.65rem; height: 0.64rem; background: url(../assets/img/play_prev.png) no-repeat; background-size: 0.65rem 0.64rem; text-indent: -9999px; }
.music_play{  display: block; width: 0.89rem; height: 0.89rem; background: url(../assets/img/play_play.png) no-repeat; background-size: 0.89rem 0.89rem; }
.music_play.play_pause{ background: url(../assets/img/play_pause.png) no-repeat; background-size: 0.89rem 0.89rem; }
.music_next{ background: url(../assets/img/play_next.png) no-repeat; background-size: 0.65rem 0.64rem; }
</style>
<style>
.el-slider__runway{ width: 5.20rem; height: 0.04rem; background: #232228; border-radius: 0.02rem; position: relative;}
.el-slider__bar{ width:0%; height: 0.04rem; background: #3195fd; border-radius: 0.07rem; }
.el-slider__button-wrapper{ width: 0rem; height: 0rem; position: absolute; left: 0; top: 0.02rem; z-index: 20; }
.el-slider__button{ display: block; width: 0.15rem; height: 0.15rem; border-radius: 50%; background: #3195fd; border: #fff solid 0.02rem; position: absolute; left: -0.09rem; top: -0.09rem; }
</style>