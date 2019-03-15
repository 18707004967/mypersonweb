<template>
	<div id="index_new">
		<div v-if="list.data!==undefined">
			<bannerSwipe></bannerSwipe>
			<ul class="music_list">
				<li v-for="(music,idx) in list.data" :class="idx==check?'cur':''" @click="clickMe(idx)">
					<p>{{music.filename}}</p>
					<span class="music_dx"></span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import bannerSwipe from './bannerSwipe'
export default{
	name:'index_new',
	data(){
		return {
			// check:this.$store.state.check,
			list:[],
		}
	},
	components:{
		bannerSwipe,
	},
	mounted(){
		this.$store.state.nolist = true;
		this.$axios.get('/api/?json=true')
		.then(res=>{
			this.list = res.data
			console.log(this.list)
	    })
	    .catch(error=>{
	      console.log(error)
	    })
		this.$store.commit('changeCheck',-1);
	},
	computed:{
		check(){
			return this.$store.state.check
		}
	},
	methods:{
		clickMe(index){
			var musicList = this.list.data;
			this.$store.commit('clickMe',musicList)
			this.$store.commit('changeCheck',index)
		}
	}
}
</script>
<style scoped>
#index_new{ padding: 1.80rem 0 0 0; background: #f4f4f4; }
.music_list{ width: 7.50rem ; background: #eee; padding: 0.10rem 0 0 0; margin: 0.20rem auto 0; }
.music_list li{ width: 7.0rem; background: #fff; height: auto; min-height: 0.70rem; padding: 0.08rem 0 0.08rem 0.16rem; margin: 0.10rem 0; border-radius: 0 0.20rem 0.20rem 0; font-size: 0.30rem; display: flex; align-items: center; position: relative; overflow: hidden;}
.music_list li p{ width: 6.0rem; align-items: center; position: relative; z-index: 20; }
.music_dx{ display: block; height: 100%; width: 0; position: absolute; left: 0; z-index: 10; transition: 0.4s; background: #2ca2f9; opacity: 0.2; }
.music_list li.cur .music_dx{ width: 100%;}
</style>