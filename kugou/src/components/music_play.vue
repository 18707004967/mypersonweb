<template>
	<div id="music_play" :class="check==-1?'':'show'">
		<div class="music_pic" @click="showDetail">
			<img :src="(_sizeChange(musicInfo.imgUrl,400)||_sizeChange(musicInfo.album_img,400))" alt="">
		</div>
		<p class="musicName"><span>{{musicInfo.songName}}</span><br>{{musicInfo.choricSinger}}</p>
		<span :class="state.openPlay==true?'play_btn':'play_btn pause'" @click="changePlay"></span>
		<span class="last_btn prev_btn" @click="nextChange(1)"></span>
		<audio :src="musicInfo.url" id="audio" autoplay></audio>
	</div>
</template>
<script>
export default{
	name:'music_play',
	data(){
		return {
			list:[],
			index:0,
			audio:null,
		}
	},
	computed:{
		check(){
			return this.$store.state.check;
		},
		state(){
			return this.$store.state		
		},
		musicInfo(){
			return this.$store.state.musicList;
		}
	},
	mounted(){
		this.audio = document.getElementById('audio');
	},
	methods:{
		changePlay(){
			if(this.$store.state.openPlay==false){
				this.audio.play();
				this.$store.state.openPlay = true;
			}else{
				this.audio.pause();
				this.$store.state.openPlay = false;
			}
		},
		nextChange(){
			this.$store.commit('nextChange',1)
			this.$store.dispatch('changeMusic')
		},
		showDetail(){
			this.$store.commit('showDetail',true)
		}
	}
}
</script>
<style scoped>
#music_play{ width: 100%; height: 1.40rem; background: #000; position: fixed; left: 0; bottom: -1.40rem; display: flex; z-index: 200; transition: all 0.2s;}	
#music_play.show{bottom: 0;}
.music_pic{ width: 1rem; height: 1rem; border-radius: 0.10rem; overflow: hidden; margin: 0.20rem 0 0 0.20rem;}
.music_pic img{ display: block; width: 100%; height: 100%; }
.play_btn{ display: block; width: 0.70rem; height: 0.70rem; background: url(../assets/img/play_icon.png) no-repeat; background-size: 0.70rem 0.70rem; margin: 0.34rem 0 0 0.30rem; }
.play_btn.pause{ background: url(../assets/img/pause_icon.png) no-repeat; background-size: 0.70rem 0.70rem; margin: 0.34rem 0 0 0.30rem; }
.last_btn{ display: block; width: 0.70rem; height: 0.70rem; background: url(../assets/img/next_icon.png) no-repeat; background-size: 0.70rem 0.70rem; margin: 0.34rem 0 0 0.20rem; transform: rotate(180deg); }
.prev_btn{ transform: rotate(0); }
.musicName{ height: 1.05rem; width: 3.60rem; font-size: 0.30rem; color: #fff; overflow: hidden; padding: 0.25rem 0 0 0.15rem; }
.musicName span{ color: #c9c9c9 }
</style>