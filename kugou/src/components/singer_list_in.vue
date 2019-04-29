<template>
	<div id="singerList">
		<div class="singer_top">
			<span class="goback_btn" @click="_historyBack"></span>
			<p class="singer_title">{{list.classname}}</p>
		</div>
		<ul class="list">
			<li v-for="(value , index ) in info">
				<router-link :to="{path:'/singerDetail',query:{singerid:value.singerid}}">
					<img :src="_sizeChange(value.imgurl,400)" class="singer_hd" alt="">
					<p class="singer_name">{{value.singername}}</p>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
export default{
	name:'singerList',
	data(){
		return {
			list:[],
			info:[],
		}
	},
	mounted(){
		this.$axios.get('api/singer/list/'+ this.$route.query.classid +'?json=true')
		.then(res=>{
			this.list = res.data;
			this.info = res.data.singers.list.info;
			console.log(this.info)
		})
		.catch(error=>{
			console.log(error)
		})
	}
}
</script>
<style scoped>
#singerList{ padding: 2.0rem 0 0 0;}
.singer_top{ width: 100%; height: 0.80rem; background:#eee; position: fixed; left: 0; top: 0.80rem; z-index: 300;  }
.goback_btn{ display: block; width: 0.24rem; height: 0.40rem; background: url(../assets/img/goback_1.png) no-repeat; background-size: 0.24rem 0.40rem; position: absolute; left: 0.20rem; top: 0.20rem; filter:invert(100%); }
.singer_title{ width: 100%; height: 0.80rem; line-height: 0.80rem; text-align: center; font-size: 0.32rem; color: #000; }
.list{ width: 100%; background: #f1f1f1; }
.list li{ width: 7.0rem; height: 2.40rem; align-items: center; border-bottom: #000 solid 1px; padding: 0 0 0 0.50rem; }
.list li a{ display: flex; width: 100%; height: 100%; align-items: center; }
.singer_hd{ display: block; width: 1.60rem; height: 1.60rem; border-radius: 0.20rem; }
.singer_name{ width: 3.0rem; height: 2.0rem; display: flex; align-items: center; padding: 0 0 0 0.60rem; font-size: 0.42rem; }
</style>