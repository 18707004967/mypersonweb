
//活动进行页 瀑布流
var data = [
	{
		imgUrl:__uri('../images/going_gds_img.jpg'),
		name:'OLAY玉兰油多效修护系列 眼霜15g',
		price:'118.20',
		gdsLink:'javascript:;'
	},
	{
		imgUrl:__uri('../images/going_gds_img.jpg'),
		name:'OLAY玉兰油多效修护系列 眼霜15g',
		price:'118.30',
		gdsLink:'javascript:;'
	},
	{
		imgUrl:__uri('../images/going_gds_img.jpg'),
		name:'OLAY玉兰油多效修护系列 眼霜15g',
		price:'118.40',
		gdsLink:'javascript:;'
	},
	{
		imgUrl:__uri('../images/going_gds_img.jpg'),
		name:'OLAY玉兰油多效修护系列 眼霜15g',
		price:'118.50',
		gdsLink:'javascript:;'
	},
	{
		imgUrl:__uri('../images/going_gds_img.jpg'),
		name:'OLAY玉兰油多效修护系列 眼霜15g',
		price:'118.00',
		gdsLink:'javascript:;'
	},
]

var k = 0;
function rendBrand() {
	if(k>=data.length){return false}
	var num = data[k].price.toString().split('.');
	var str = `<li>
	            	<a href="javascript:;" title="${data[k].name}">
		                <div class="going_gds_img">
		                	<img src="${data[k].imgUrl}" alt="${data[k].name}">
		                </div>
		                <p class="going_gds_name">${data[k].name}</p>
		                <p class="going_gds_prise">¥<strong>${num[0]}</strong>.${num[1]}</p>
	                </a>
	            </li>`;
	$('.going_sell_list').append(str);
	$('.going_loading').css('display','none');
	k++;

}
rendBrand()
var wh = $(window).height();
document.onscroll = function(ev){
	var st = $(window).scrollTop();
	if($('.going_sell_list').find('li').length<=0){
		var lsc = $('.going_sell_list').offset().top;	
	}else{
		var lsc = $('.going_sell_list').find('li:last-child').offset().top;
	}
	
	if(st+wh >= lsc+100){
		console.log(11)
		$('.going_loading').css('display','block');
		rendBrand()
	}	
}
//展开查看更多
$('.going_more').on('click',function(){
	console.log(11)
	$(this).siblings('ul').css('height','auto')
})

//关注店铺
$('.going_care').on('click',function(){
	$(this).find('span').toggleClass('check')
})