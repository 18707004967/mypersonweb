//入场页倒计时
function CountTime(data){
	this.time = data.time;
	this.timeBox = {};
	this.timeClear = {};
	this.invTime = null;
	$.extend(this.timeBox,data.timeBox);
	this.runTime()
}
CountTime.prototype.runTime = function(){
	var nowTime = new Date();
	var totalSecond =this.time - Math.round(nowTime.getTime()/1000);
	var self = this;
	this.invTime = setInterval(function(){		
		if(totalSecond<=0){ clearInterval(self.invTime);totalSecond = 0;}
		self.timeClear.h = Math.floor(totalSecond/3600);
		self.timeClear.m = Math.floor((totalSecond - 3600*self.timeClear.h)/60);
		self.timeClear.s = totalSecond - 60*self.timeClear.m - 3600*self.timeClear.h;
		totalSecond--;
		self.timeClear.h = self.addZero(self.timeClear.h).toString();
		self.timeClear.m = self.addZero(self.timeClear.m).toString();
		self.timeClear.s = self.addZero(self.timeClear.s).toString();
		$(self.timeBox.h).html(self.timeClear.h)
		$(self.timeBox.m).html(self.timeClear.m)
		$(self.timeBox.s).html(self.timeClear.s)
	},1000)
}
CountTime.prototype.addZero = function(x){
	return x >= 10 ? x : "0" + x ;
}

//头图文字滚动展示
function worldSCroll(data){
	var firstShow = 2;
	for (var i = 0; i < firstShow; i++) {
		$('.t_pp_list').append('<li><span class="t_pp_left"></span><p class="t_pp_center">'+data[i]+'</p><span class="t_pp_right"></span></li>')
	}
	setInterval(function(){
		firstShow%=data.length;		
		$('.t_pp_list').find('li').eq(1).css('margin-top',$('.t_pp_list').find('li').eq(0).height())
		$('.t_pp_list').append('<li><span class="t_pp_left"></span><p class="t_pp_center">'+data[firstShow]+'</p><span class="t_pp_right"></span></li>')		
		$('.t_pp_list').find('li').eq(0).css({'position':'absolute','top':105,'left':0})
		$('.t_pp_list').find('li').eq(1).animate({'margin-top':0},200)
		$('.t_pp_list').find('li').eq(0).animate({'top':30},200)
		setTimeout(function(){
			$('.t_pp_list').find('li').eq(0).animate({'top':0},200,function(){
				$(this).remove()
			})
		},1000)		
		firstShow++;
	},2000)
}
