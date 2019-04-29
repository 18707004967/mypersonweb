
import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		dataInfo:[],
		check:-1,
		openPlay:false,
		musicInfo:{},
		nolist:true,
		showLoading:false,
		musicList:[],
		detail:false,
		changepre:false,
		lyrics:[],
		changeNum:0,
	},
	getters:{
		check(state){
			return state.check;
		},
		detail(state){
			return state.detail;
		},
		showLoading(state){
			return state.showLoading;
		},
		changepre(state){
			return state.changepre
		},
		lyrics(state){
			return state.lyrics
		}
	},
	mutations:{
		changeCheck(state,index){
			state.check = index;
		},
		changeInfo(state,info){
			state.musicInfo = info
		},
		changeShowLoading(state,bool){ 
			state.showLoading = bool
		},
		clickMe(state,list){
			state.musicInfo = list;
			state.openPlay = true;
		},
		nextChange(state,num){
			state.check+=num;
			state.check%=state.musicInfo.length;
		},
		getMusicList(state,list){
			state.musicList = list;
		},
		showDetail(state,bool){
			state.detail = bool;
		}
	},
	actions:{

		changeMusic(){
			// console.log(this.state.musicInfo)
			axios.get('/api/app/i/getSongInfo.php',{
				params:{
					cmd:'playInfo',
					hash:this.state.musicInfo[this.state.check].hash
				}
			})
			.then(res=>{
				this.state.musicList = res.data;
				this.dispatch('getInfo',this.state.musicList.hash)
		    })
		    .catch(error=>{
		      console.log(error)
		    })
		},
		getInfo(state,hash){
			// console.log(hash)
			axios.get('/svr/yy/index.php?r=play/getdata&hash='+hash)
			.then(res=>{
				this.state.lyrics = res.data.data.lyrics.split('\r');
				// console.log(this.state.lyrics)
				this.state.changepre = true;
				this.state.changeNum = 0;
		    })
		    .catch(error=>{
		      console.log(error)
		    })
		},
	}
})