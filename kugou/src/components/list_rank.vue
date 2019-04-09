<template>
	<div id="listRank">
		<ul class="list_rank">
			<li v-for="(value , index) in list" :key="index">
				<router-link :to="{
					path:'/musicListDetail',
					query:{
						specialid:value.specialid
					}
				}">
					<img v-lazy="_sizeChange(value.imgurl,400)" class="list_rank_image" alt="">
					<div class="list_rank_name">
						<p>
							<strong>{{value.specialname}}</strong>
							<span><i class="headset_icon"></i>{{value.playcount}}</span>
						</p>
					</div>
					<span class="list_rank_jt_icon">&gt;</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	name:'listRank',
	data(){
		return {
			list:[],
		}
	},
	mounted(){
		this.$store.state.nolist = true;
		this.$axios.get('/api/plist/index&json=true')
		.then(res=>{
			this.list = res.data.plist.list.info;
			console.log(this.list)
		})
		.catch(error=>{
			console.log(error)
		})
	}
}
</script>
<style scoped>
#listRank{ padding: 1.8rem 0 0 0 ; background: #f4f4f4; }
.list_rank{ width: 90%; margin: 0 auto;}
.list_rank li{ width: 100%; margin: 0.20rem auto; height: 2.0rem; background: #f1f1f1; border-radius: 0.20rem; border-bottom: #999 solid 0.03rem;}
.list_rank li a{ display: block; width: 100%; height: 100%; display: flex;  }
.list_rank_image{ display: block; width: 1.60rem; height: 1.60rem; text-indent: -9999px; margin: 0.20rem 0 0 0.20rem; border-radius: 0.10rem; }
.list_rank_name{ width: 4.0rem; height: 1.60rem; display: flex; align-items: center; margin: 0.20rem 0 0 0.20rem;}
.list_rank_name strong{ display: block; font-size: 0.36rem; font-weight: bold; line-height: 0.42rem; font-weight: bold; color: #666; }
.list_rank_name span{ display: block; font-size: 0.24rem; line-height: 0.32rem; color: #666; }
.headset_icon{ display: inline-block; width: 0.20rem; height: 0.20rem; background: url(../assets/img/icon_music.png) no-repeat; background-size: 0.20rem 0.20rem; margin: 0.10rem 0 0 0; }
.list_rank_jt_icon{ display: block; width: 0.30rem; height: 0.30rem;  font-size: 0.30rem; margin: 0.85rem 0 0 0.10rem; }
</style>