<template>
	<div id="nav_top">
		<navTopBar :url="url"></navTopBar>
		<navClassify v-if="nolist==true"></navClassify>
	</div>
</template>
<script>
import navTopBar from './Nav_top_bar'
import navClassify from './Nav_classify'
export default{
	name:'nav_top',
	data(){
		return {
			list:[],
			url:'',
		}
	},
	computed:{
		nolist(){
			return this.$store.state.nolist
		}
	},
	components:{
		navTopBar,
		navClassify
	},
	mounted:function(){
		this.$axios.get('/api/?json=true')
		.then(res=>{
	      this.url = res.data.kg_domain
	    })
	    .catch(error=>{
	      console.log(error)
	    })
	}
}
</script>
<style scoped>
#nav_top{ width: 100%; position: fixed; left: 0; top: 0; z-index: 600; }	
</style>