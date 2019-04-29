<template>
	<div id="searchNewHot">
		<dl class="search_new_hot">
			<dt>最近热门</dt>
			<dd v-for="(value , index) in list" @click="chooseHot(value.keyword)">
				{{value.keyword}}
			</dd>
		</dl>		
	</div>
</template>
<script>
export default{
	name:'searchNewHot',
	data(){
		return {
			list:[],
		}
	},
	mounted(){		
		this.$axios.get('/server/api/v3/search/hot?format=json&plat=0&count=30')
		.then(res=>{
			this.list = res.data.data.info;
			console.log(res)
		})
		.catch(error=>{
			console.log(error)
		})
	},
	methods:{
		chooseHot(value){
			var ipt = document.getElementsByClassName('search_inpt')[0];
			ipt.value = value;
			this.$emit('setValue',value);
		}
	}
}
</script>
<style scoped>
.search_new_hot{ width: 100%; margin: 0.80rem auto 0; }
.search_new_hot dt{ height: 0.80rem; font-size: 0.36rem; line-height: 0.80rem; color: #2ca3f5; border-bottom: #ccc solid 1px; text-indent: 0.30rem; }
.search_new_hot dd{ height: 0.80rem; margin: 0.10rem 0 0 0; font-size: 0.36rem; color: #666; line-height: 0.80rem; border-bottom: #ccc solid 1px; text-indent: 0.30rem;  }
</style>