<template>
	<div id="nav_classify">
		<router-link v-for="(value,index) in navlist" :key="index" class="cur" :to="{path:value.path}" exact>{{value.name}}</router-link>
	</div>
</template>
<script>
export default{
	name:'nav_classify',
	data(){
		return {
			navlist:[
				{name:'新歌',path:'/'},
				{name:'排行',path:'/rank'},
				{name:'歌单',path:'/class'},
				{name:'歌手',path:'/singer'},
			]
		}
	}
}
</script>
<style scoped>
#nav_classify{ width: 90%; height: 0.80rem; padding: 0 5%; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; background: #eee; }	
#nav_classify a{ display: block; width: 20%; height: 0.60rem; background: #fff; border-radius: 0.10rem; font-size: 0.24rem; color: #000; line-height: 0.60rem; text-decoration: none; text-align: center;}
#nav_classify a.router-link-active{ border-bottom: #33a3f5 solid 0.03rem; }
</style>