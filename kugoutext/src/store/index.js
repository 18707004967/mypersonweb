
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
	},
	getters:{
		check(state){
			return state.check;
		},
		showLoading(state){
			return state.showLoading;
		}
	},
	mutations:{
		changeCheck(state,index){
			console.log(index)
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
		}
	}
})