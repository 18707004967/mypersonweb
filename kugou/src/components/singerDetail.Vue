<template>
	<div id="music_list_detail">
		<div class="music_top">
			<span class="music_back" @click="_historyBack"></span>
			<p class="music_title">{{info.singername}}</p>
		</div>
		<div class="music_poster">
			<img :src="[_sizeChange(info.imgurl,400)]" width="100%" alt="">
		</div>
		<p :class="'music_des'+ (changeIntro==false?'':' auto')">
			{{info.intro}} 
			<span :class="'changeIntro'+ (changeIntro==false?'':' change_icon')" @click="changeIntroFn"></span>
		</p>
		<ul class="music_list">
			<li v-for="(value,index) in list" @click="playMusic(index)">
				<span 
					:class="'music_rank'+(index<=2?(index==0?' first':(index==1?' second':' third')):'')"
				>{{index+1}}</span>
				<p class="music_name">{{value.filename}} </p>
				<span class="music_play_icon"></span>
			</li>
		</ul>
	</div>
</template>
<script>
export default{
	name:'musicListDetail',
	data(){
		return {
			singerid:'',
			info:[],
			list:[],
			changeIntro:false,
		}
	},
	computed:{
	},
	mounted(){
		this.$store.state.nolist = false;
		this.singerid = this.$route.query.singerid;
		this.$axios.get('/api/singer/info/'+this.singerid+'&json=true')
		.then(res=>{
			console.log(res)
			this.info = res.data.info;
			this.list = res.data.songs.list
			console.log(this.list)
		})
		.catch(error=>{
			console.log(error)
		})
	},
	methods:{
		changeIntroFn(){
			this.changeIntro = !this.changeIntro;
		},
		playMusic(index){
			var musicList = this.list;
			this.$store.commit('clickMe',musicList)
			this.$store.commit('changeCheck',index)
			this.$store.dispatch('changeMusic')
		}
	}
}
</script>
<style scoped>
#music_list_detail{ padding: 0.80rem 0 0 0; position: relative; }
.music_top{ width: 100%; height: 0.80rem; background:linear-gradient(to bottom ,rgba(0,0,0,0.6) 20%,rgba(0,0,0,0.1)); position: fixed; top: 0.80rem; left: 0; z-index: 300; }
.music_back{ display: block; width: 0.24rem; height: 0.40rem; background: url(../assets/img/goback_1.png) no-repeat; background-size: 0.24rem 0.40rem; position: absolute; left: 0.20rem ; top: 0.20rem; }
.music_title{ width: 80%; height: 100%; text-align: center; font-size: 0.32rem; color: #fff; line-height: 0.80rem; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0 auto; }
.music_poster{ width: 100%; height: 5.0rem; overflow: hidden; position: relative; }
.music_update_time{ display: block; width: 100%; height: 0.80rem;position: absolute; left: 0; bottom: 0; z-index: 20; background: linear-gradient(to top,rgba(0,0,0,0.7),rgba(0,0,0,0)); font-size: 0.32rem; line-height: 0.80rem; text-indent: 0.30rem; color: #fff; }
.music_des{ width: 7.10rem; padding: 0 0.40rem 0 0; height: 0.80rem; line-height: 0.80rem; font-size: 0.36rem; color: #000; overflow: hidden; border-bottom:#ccc solid 1px; box-shadow: #ccc 0 2px 2px; position: relative;}
.music_des.auto{ height: auto; }
.changeIntro{ display: block; width: 0.40rem; height: 0.40rem; background: url(../assets/img/zk_icon.png) no-repeat; background-size: 0.40rem 0.40rem; height: 0.40rem; position: absolute; right: 0.20rem; top: 0.20rem; z-index: 20; }
.changeIntro.change_icon{ background: url(../assets/img/ss_icon.png) no-repeat; background-size: 0.40rem 0.40rem;}
.music_list{ width: 100%; }
.music_list li{ width: 7.50rem; border-bottom:#ccc solid 1px; display: flex; align-items: center; font-size: 0.36rem; padding: 0 0 0 0; }
.music_name{ width: 5.40rem; min-height: 1.20rem; display: flex; align-items: center; padding:0 0 0 0.30rem;}
.music_play_icon{ display: block; width: 0.50rem; height: 0.50rem; background: url(../assets/img/music_play.png) no-repeat; background-size: 0.50rem 0.50rem;}
.music_rank{ display: block; width: 0.60rem; height: 0.40rem; line-height: 0.40rem; text-align: center; color: #ccc; }
.music_rank.first{ background: #f00; border-radius: 0.20rem; color: #fff; }
.music_rank.second{ background: #ff7200; border-radius: 0.20rem; color: #fff; }
.music_rank.third{ background: #f8b300; border-radius: 0.20rem; color: #fff; }
</style>