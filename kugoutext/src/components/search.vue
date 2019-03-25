<template>
	<div id="search">
		<div class="search_top">
			<span class="search_back" @click="_historyBack">&lt;</span>
			<p class="search_title">搜索</p>
		</div>
		<div class="search_ipt_box">
			<div class="search_ipt_box_in">
				<span class="search_ipt_icon"></span>
				<input type="text" placeholder="歌手/歌名/拼音" @input="input" class="search_inpt">
			</div>
			<span :class="isEmpty==true ? 'search_btn disable' : 'search_btn'" :disable="isEmpty==true ? 'disable' : 'false'" @click="searchKeyworld">搜索</span>
		</div>
		<searchNewHot @setValue="getValue" v-if="hotShow==true"></searchNewHot>
		<searchList :searchlist="searchlist" v-if="hotShow==false"></searchList>
	</div>
</template>
<script>
import searchNewHot from './search_newHot'
import searchList from './search_list'
export default{
	name:"search",
	data(){
		return {
			iptValue:'',
			list:[],
			hotShow:true,
			searchlist:[],
			searchNum:20,
		}
	},
	mounted(){
		this.$store.state.nolist = false;
		this.iptValue='';
		var index  = -1;
		this.$store.commit('changeCheck',index);
		this.$store.commit('changeInfo','');
		window.addEventListener('scroll',this.searchMore)
	},
	destroyed(){
		window.removeEventListener('scroll',this.searchMore)
	},
	components:{
		searchNewHot,
		searchList
	},
	computed:{
		isEmpty(){
			if(this.iptValue==''){
				return true
			}else{
				return false
			}
		}
	},
	methods:{
		input(ev){
			this.iptValue = ev.target.value;
		},
		getValue(value){
			this.iptValue = value;
			this.searchKeyworld();
		},
		searchKeyworld(){
			this.searchNum = 20;	
			this.search(this.searchNum)
			this.hotShow = false;
		},
		search(num){		
	    	this.$axios.get('/server/api/v3/search/song', {
				params:{
					format:'json',
					keyword:this.iptValue,
					page:1,
					pagesize:num,
					showtype:1
				}
			})
			.then(res=>{
				this.searchlist = res.data.data.info
			})
			.catch(error=>{
				console.log(error)
			})
		},
	    searchMore(){
	    	var st = window.scrollY;	
	    	var iht = window.innerHeight;
	    	var ht = document.body.clientHeight;
	    	console.log(ht)
	    	if(st+iht>=ht){
	    		this.searchNum+=20;
	    		this.search(this.searchNum)
	    	}
	      
	    }
	}
}
</script>
<style scoped>
#search{ padding: 2.0rem 0 0 0; }
.search_top{ width: 100%; background: rgba(238,238,238,0.6); height: 0.80rem; position: fixed; left: 0; top: 0.80rem; z-index: 300;}
.search_back{ display: block; width: 0.80rem; height: 0.80rem; line-height: 0.80rem; text-align: center; font-size: 0.42rem; position: absolute; left: 0; top: 0; }
.search_title{ width: 100%; height: 0.80rem; font-size: 0.42rem; color: #333; text-align: center; line-height: 0.80rem; }
.search_ipt_box{ width: 7.0rem; height: 0.56rem; margin: 0 auto; display: flex; justify-content: space-between;}
.search_ipt_box_in{ width: 5.20rem; height: 0.54rem; border:#ccc solid 1px; border-radius: 0.10rem; display: flex; }
.search_ipt_icon{ width: 0.34rem; height: 0.54rem; padding:0 0 0 0.20rem; background: url(../assets/img/search_icon.png) no-repeat 0.20rem 0; background-size: 0.34rem 0.54rem;}
.search_inpt{ display: block; width: 4.40rem; height: 0.54rem; font-size: 0.24rem; line-height: 0.54rem; text-indent: 0.15rem; }
.search_btn{ display: block; width: 1.60rem; height: 0.56rem; background: #2ba2fa; font-size: 0.36rem; text-align: center; line-height: 0.56rem; border-radius: 0.10rem; color: #fff }
.search_btn.disable{ background: #eee; color: #999; }
</style>