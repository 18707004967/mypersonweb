<template>
	<div class="loading" v-if="showLoading==true">		
		<div class="loadding_wrap">
			<div class="loadding">
				<span class="ld1"></span>
				<span class="ld2"></span>
				<span class="ld3"></span>
				<span class="ld4"></span>
			</div>		
		</div>
	</div>
</template>
<script>
export default{
	name:"loading",
	data(){
		return {
		}
	},
	computed:{
		showLoading(){
			return this.$store.getters.showLoading
		}
	}
}
</script>
<style scoped>
.loadding_wrap{ width: 3.20rem; height: 3.20rem; background: rgba(0,0,0,0.1); position: fixed; left: 50%; top: 50%; margin: -1.60rem 0 0 -1.60rem; z-index: 600; border-radius: 0.20rem;}
.loadding{ width: 2.56rem; height: 2.56rem ; position: absolute; left: 50%;top: 50%; margin: -1.28rem 0 0 -1.28rem; z-index: 600; opacity: 0.6; filter: drop-shadow(#126ac5 0 0 4px);}
.ld1{ display: block; width: 2.56rem; height: 2.56rem; position: absolute; left: 0; top: 0; background: url(../assets/img/ld1.png) no-repeat; background-size: 2.56rem 2.56rem; animation: ld1 3s linear infinite;}
.ld2{ display: block; width: 2.56rem; height: 2.56rem; position: absolute; left: 0; top: 0; background: url(../assets/img/ld2.png) no-repeat; background-size: 2.56rem 2.56rem; animation: ld2 3s linear infinite;}
.ld3{ display: block; width: 2.56rem; height: 2.56rem; position: absolute; left: 0; top: 0; background: url(../assets/img/ld3.png) no-repeat; background-size: 2.56rem 2.56rem; animation: ld2 5s linear infinite;}
.ld4{ display: block; width: 2.56rem; height: 2.56rem; position: absolute; left: 0; top: 0; background: url(../assets/img/ld4.png) no-repeat; background-size: 2.56rem 2.56rem; animation: ld1 5s linear infinite;}
@keyframes ld1{
	0%{
		transform: rotate(0);
	}
	100%{
		transform: rotate(360deg);
	}
}
@keyframes ld2{
	0%{
		transform: rotate(360deg);
	}
	100%{
		transform: rotate(0);
	}
}
</style>