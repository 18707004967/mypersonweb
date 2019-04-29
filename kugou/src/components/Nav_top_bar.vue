<template>
	<div id="nav_top_bar">
		<a :href="url" title="" class="logo_link">
			<img src="../assets/img/logo.png" class="logo" alt="">
		</a>
		<router-link :to="{path:'/search'}" class="search_btn"></router-link>	
	</div>
</template>
<script>
export default{
	name:'nav_top_bar',
	data(){
		return {

		}
	},
	props:['url']
}
</script>
<style scoped>
#nav_top_bar{width: 100%; height: 0.80rem; display: flex; background: #2ca2f9; justify-content: space-between;}
.logo_link{ display: block; width: 2.04rem; height: 0.47rem; margin: 0.10rem 0 0 0.30rem;  }
.logo{ display: block; width: 100%; height: 100%; }
.search_btn{ display: block; width: 0.34rem; height: 0.34rem; background: url(../assets/img/search.png) no-repeat; background-size: 0.34rem 0.34rem; margin: 0.20rem 0.30rem 0 0; }
</style>