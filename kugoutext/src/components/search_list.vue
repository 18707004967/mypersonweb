<template>
	<div id="searchList">
		<template  v-if="searchlist.length>0">
			<p class="search_sum">共有{{searchlist.length}}条数据</p>
			<ul class="search_list">
				<li v-for="(value,index) in searchlist" :key="index" @click="showPlay(index)">
					<p class="search_detail_name">{{value.filename}}</p>
				</li>
			</ul>
		</template>
		<div class="no_search" v-if="searchlist.length<=0">
			<img src="../assets/img/search_empty.png" class="search_empty_img" alt="">
			<p class="no_search_para">没有搜索到相关内容</p>
		</div>
	</div>
</template>
<script>
export default{
	name:'searchList',
	data(){
		return {
			list:[],
			isEmpty:true,
		}
	},
	props:['searchlist'],
	mounted(){
	},
	methods:{
		showPlay(index){
			var hash = this.searchlist[index].hash;
			this.$store.dispatch('clickMe',hash);
			this.$store.commit('changeCheck',index);
		},
	}
}
</script>
<style scoped>
.search_sum{ width: 100%; height: 0.60rem; font-size: 0.34rem; line-height: 0.60rem; color: #5d5d5d; text-indent: 0.30rem; background: #e6e6e6; margin: 0.30rem auto 0;}
.search_list{ width: 7.20rem; margin: 0.10rem 0 0 0.30rem;}
.search_list li{ width: 7.20rem; height: auto; min-height: 0.60rem; display: flex; align-items: center; border-bottom: #ccc solid 1px; padding: 0.20rem 0; }
.search_detail_name{ width: 6.50rem; font-size: 0.36rem; color: #666; }
.no_search{ width: 7.50rem; background:rgba(238,238,238,0.6); position: absolute; left: 0; top: 3.0rem; height: 100vh; }
.search_empty_img{ display: block; width: 5.0rem; margin: 1.0rem auto 0; }
.no_search_para{ width: 100%; margin: 0.60rem auto 0; font-size: 0.36rem; color: #333; text-align: center; }
</style>