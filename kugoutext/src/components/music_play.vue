<template>
	<div id="music_play" :class="check==-1?'':'show'" v-if="check!==-1">
		<div class="music_pic">
			<img :src="[musicUrl[0]||'../assets/img/logo_kugou.png']" alt="">
		</div>
		<p class="musicName"></p>
		<span :class="state.openPlay==true?'play_btn':'play_btn pause'" @click="changePlay"></span>
		<span class="last_btn prev_btn"></span>
		<audio :src="musicUrl[1]" id="audio" autoplay></audio>
	</div>
</template>
<script>
export default{
	name:'music_play',
	data(){
		return {
			list:[],
			index:0,
			musicInfo:[],
		}
	},
	mounted(){
		this.changeMusic();
	},
	computed:{
		musicUrl(){
			var pd = Object.keys(this.$store.state.musicInfo);
			if(pd.length!==0){
				console.log(this.$store.state.musicInfo)
				var str = this.$store.state.musicInfo.imgUrl;
				var str2 = this.$store.state.musicInfo.url;
				str = this._sizeChange(str,200);
				return [str,str2]
			}else{
				return ""
			}	
		},
		check(){
			return this.$store.getters.check;
		},
		state(){
			return this.$store.state		
		}
	},
	methods:{
		changePlay(){
			var audio = document.getElementById('audio');
			if(this.$store.state.openPlay==false){
				audio.play();
				this.$store.state.openPlay = true;
			}else{
				audio.pause();
				this.$store.state.openPlay = false;
			}
		},
		changeMusic(){
			this.list = this.$store.state.musicInfo;
			this.index = this.$store.state.index;
			console.log(index)
			this.$axios.get('/api/app/i/getSongInfo.php',{
				params:{
					cmd:'playInfo',
					hash:this.list[this.index].hash
				}
			})
			.then(res=>{
				console.log(res)
				this.musicInfo = res
		    })
		    .catch(error=>{
		      console.log(error)
		    })
		}
	}
}
</script>
<style scoped>
#music_play{ width: 100%; height: 1.40rem; background: #000; position: fixed; left: 0; bottom: -1.40rem; display: flex; z-index: 200; transition: all 0.2s;}	
#music_play.show{bottom: 0;}
.music_pic{ width: 1rem; height: 1rem; border-radius: 0.10rem; overflow: hidden; margin: 0.20rem 0 0 0.20rem;}
.music_pic img{ width: 100%; height: 100%; }
.play_btn{ display: block; width: 1rem; height: 1rem; background: url(../assets/img/play_icon.png) no-repeat; background-size: 1rem 1rem; margin: 0.20rem 0 0 0.30rem; }
.play_btn.pause{ background: url(../assets/img/pause_icon.png) no-repeat; background-size: 1rem 1rem; margin: 0.20rem 0 0 0.30rem; }
.last_btn{ display: block; width: 1.0rem; height: 1.0rem; background: url(../assets/img/next_icon.png) no-repeat; background-size: 1rem 1rem; margin: 0.20rem 0 0 0.20rem; transform: rotate(180deg); }
.prev_btn{ transform: rotate(0); }
</style>