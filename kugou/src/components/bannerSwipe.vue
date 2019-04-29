<template>
	<div id="bannerSwipe">		
		<div class="banner">
			<div class="swiper-container">
			    <div class="swiper-wrapper clearfix">
			        <div class="swiper-slide" v-if="list.length>0" v-for="(value,index) in list" :key="index">
			        	<img :src="value.imgurl" alt="">
			        </div>
			    </div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
import Swiper from 'swiper'
export default{
	name:"bannerSwipe",
	data(){
		return {
			list:[],
		}
	},
	mounted(){
		axios.get('/api/?json=true')
			.then(res=>{
				this.list = res.data.banner;
				this.$nextTick(()=>{
					this.swiper = new Swiper('.swiper-container',{
						loop:true,
						loopAdditionalSlides : 3,
						autoplay: {
						    disableOnInteraction: false,
						    delay:4000
						},
						observer:true,
			    		observeSlideChildren:true,
					})
               	})
		    })
		    .catch(error=>{
		      console.log(error)
		    })
		
	}
}
</script>
<style scoped>
.swiper-container{ width: 7.0rem; overflow: hidden; margin: 0 auto; }
.swiper-wrapper{ width: 10000%;}
.swiper-wrapper div{ width: 7.0rem; float: left; border-radius: 0.15rem; overflow: hidden; }
.swiper-wrapper img{ display: block; width: 100%; }
</style>