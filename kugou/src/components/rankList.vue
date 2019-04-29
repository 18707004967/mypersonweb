<template>
	<div id="rankList">
		<ul class="rank_list">
			<li v-for="(value , index) in list" :key="index">

				<router-link :to="{
					path:'/rankMusicDetail',
					query:{
						rankid:value.rankid
					}
				}">
					<img v-lazy="_sizeChange(value.imgurl,400)" class="rank_image" alt="">
					<p class="rank_name">{{value.rankname}}</p>
					<span class="rank_jt_icon">&gt;</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
import Vue from 'vue'
export default{
	name:'rankList',
	data(){
		return {
			list:'',
		}
	},
	mounted(){
		this.$store.state.nolist = true;
		this.$axios.get('/api/rank/list&json=true')
		.then(res=>{
			this.list = res.data.rank.list;
		})
		.catch(error=>{
			console.log(error)
		})
	}
}
</script>
<style scoped>
#rankList{ padding: 1.8rem 0 0 0 ; background: #f4f4f4; }
.rank_list{ width: 90%; margin: 0 auto;}
.rank_list li{ width: 100%; margin: 0.10rem auto; height: 2.0rem; background: #f1f1f1; border-radius: 0.20rem; border-bottom: #999 solid 0.03rem;}
.rank_list li a{ display: block; width: 100%; height: 100%; display: flex;  }
.rank_image{ display: block; width: 1.60rem; height: 1.60rem; text-indent: -9999px; margin: 0.20rem 0 0 0.20rem;border-radius: 0.10rem; }
.rank_name{ width: 4.0rem; height: 1.60rem; display: flex; align-items: center; margin: 0.20rem 0 0 0.20rem; font-size: 0.36rem; line-height: 0.52rem; font-weight: bold; color: #666;}
.rank_jt_icon{ display: block; width: 0.30rem; height: 0.30rem;  font-size: 0.30rem; margin: 0.85rem 0 0 0.10rem; }
</style>