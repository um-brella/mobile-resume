//在String字符串的原型上增加一个解析URL方法
(function(pro) {
	function queryURLParameter() {
		//?a=1&b=2&c=3
		var reg = /([^?=&#]+)=([^?=&#]+)/g;
		var obj = {};
		this.replace(reg, function() {
			obj[arguments[1]] = arguments[2];
		});
		return obj;
	}
	pro.queryURLParameter = queryURLParameter;
})(String.prototype);

//loading页面，单例模式
var loadingRender = (function() {
	var ary = ["loadingBg.jpg", "ufo.png", "ufoGif.png", "email-Bar.jpg", "email-Bg.jpg", "email-Message.png", "information-Bg.jpg", "information-page1-me.jpg"];

	//获取当前操作的元素
	var $loading = $("#loading");
	var $progressBox = $loading.find(".progressBox");
	var $ufoImg = $progressBox.children("img");
	var $emailIcon = $progressBox.children(".email");
	var step = 0;
	var ufoStart = -0.4,
		emailStart = 0.1;
	var total = ary.length;
	return {
		init: function() {
			$loading.css("display", "block");
			//循环加载所有的图片，控制进度条的宽度
			$.each(ary, function(index, item) {
				var oImg = new Image;
				oImg.src = "img/" + item;
				oImg.onload = function() {
					step++;
					$progressBox.css("width", step / total * 100 + "%");
					var ufoEnd = step / total * 4.2 + ufoStart;
					var emailEnd = step / total * 4.23 + emailStart;
					$ufoImg.css("left", ufoEnd.toFixed(2) + "rem");
					$emailIcon.css("left", emailEnd.toFixed(2) + "rem");
					//当图片加载完毕，进度条走完，关闭当前loading页面，显示phone页面
					if(step == total) {
						//page方便开发，或者是浏览当前页，当page=0就只是想显示当前loading页，不想跳转
						if(page === 0) {
							return;
						}
						window.setTimeout(function() {
							$loading.css("display", "none");
							emailRender.init();
						}, 2000)
					}
				}
			});
		}
	}
})();
//email页面
var emailRender = (function() {
	var $phoneEmail = $("#phoneEmail"),
		$emailTime = $phoneEmail.children(".emailTime"),
		$emailWeek = $phoneEmail.children(".emailWeek"),
		$emailMessage = $phoneEmail.children(".emailMessage");
	var time = new Date;
	var month = time.getMonth(),
		day = time.getDate(),
		week = time.getDay(),
		hours = time.getHours(),
		minutes = time.getMinutes();
	var weeks = "日一二三四五六",
		weekTody = "星期" + weeks.charAt(week)

	return {
		init: function() {
			$phoneEmail.css("display", "block");
			$("#dingMusic")[0].play(); 
			minutes < 10 ? minutes = "0" + minutes : null;
			hours < 10 ? hours = "0" + hours : null;
			$emailTime.html(hours + ":" + minutes);
			$emailTime.css("marginLeft", -(parseInt($emailTime.width()) / 2) + "px");
			$emailWeek.html(month + "月" + day + "日" + " " + weekTody);
			$emailWeek.css("marginLeft", -(parseInt($emailWeek.width()) / 2) + "px");
			$emailMessage.singleTap(function() {
				if(page === 1) {
					$loading.css("display", "none");
					return;
				}
				//				$phoneEmail.css("transform", "translateY(" + (-document.documentElement.clientHeight) + "px)").on("webkitTransitionEnd", function() {
				//					//当过度完成之后
				$phoneEmail.css("display", "none");
				//				});
				informationRender.init();
			})
		}
	}
})();
//information页面
var informationRender = (function() {
	var $information = $("#information"),
		$swiperCon = $(".swiper-container"),
		$swiperBtn = $(".swiper-button-next"),
		$page1 = $swiperCon.find("#page1"),
		$introduce = $page1.children(".introduce"),
		$blog = $page1.children(".blog"),
		$skill = $page1.children(".skill"),
		$project = $page1.children(".project"),
		$introduceDate=$page1.children(".introduceDate"),
		$blogDate=$page1.children(".blogDate"),
		$skillDate=$page1.children(".skillDate"),
		$projectDate=$page1.children(".projectDate");

	function change(example) {
		var slidesAry = example.slides;
		//page3
		//当example.activeIndex===2隐藏按钮
		if(example.activeIndex === 2) {
			$swiperBtn.css("display", "none");
			$(".page2 .teachTime1").css("-webkit-animation","");
			$(".page2 .teachInfo1").css("-webkit-animation","");
			$(".page2 .teachTime2").css("-webkit-animation","");
			$(".page2 .teachInfo2").css("-webkit-animation","");
			$(".page2 .workTime").css("-webkit-animation","");
			$(".page2 .workInfo").css("-webkit-animation","");
			$(".page2 .teach h2").css("-webkit-animation","");
			$(".page2 .work h2").css("-webkit-animation","");
			$(".page3 h2").css("-webkit-animation","zoomInDown 1.8s both");
			$(".page3 .commend").css("-webkit-animation","zoomIn 1.8s 1.5s both");
			$(".page3 .item").css("-webkit-animation","rotateInUpLeft 1.8s 3s both");
		} else if(example.activeIndex === 0) {
			$swiperBtn.css("display", "block");
			$(".page2 .teachTime1").css("-webkit-animation","");
			$(".page2 .teachInfo1").css("-webkit-animation","");
			$(".page2 .teachTime2").css("-webkit-animation","");
			$(".page2 .teachInfo2").css("-webkit-animation","");
			$(".page2 .workTime").css("-webkit-animation","");
			$(".page2 .workInfo").css("-webkit-animation","");
			$(".page2 .teach h2").css("-webkit-animation","");
			$(".page2 .work h2").css("-webkit-animation","");
			$(".page3 h2").css("-webkit-animation","");
			$(".page3 .commend").css("-webkit-animation","");
			$(".page3 .item").css("-webkit-animation","");
		}else if(example.activeIndex === 1) {
			$swiperBtn.css("display", "block");
			$(".page2 .teachTime1").css("-webkit-animation","bounceInRight 2s .8 both");
			$(".page2 .teachInfo1").css("-webkit-animation","bounceInRight 2s .8 both");
			$(".page2 .teachTime2").css("-webkit-animation","bounceInRight 2s 1.6s both");
			$(".page2 .teachInfo2").css("-webkit-animation","bounceInRight 2s 1.6s both");
			$(".page2 .workTime").css("-webkit-animation","bounceInLeft 2s 3.9s both");
			$(".page2 .workInfo").css("-webkit-animation","bounceInLeft 2s 3.9s both");
			$(".page2 .teach h2").css("-webkit-animation","zoomIn 1s  both");
			$(".page2 .work h2").css("-webkit-animation","zoomIn 1s 3s both");
			$(".page3 h2").css("-webkit-animation","");
			$(".page3 .commend").css("-webkit-animation","");
			$(".page3 .item").css("-webkit-animation","");
		}
	}
	return {
		init: function(index) {
			$information.css("display", "block");
			//page1
			var introduceData = `<div class="introduceDataRemove">
			<div class="name"><i>姓名</i><span>亓智</span></div>
			<div class="sex"><i>性别</i><span>男</span></div>
			<div class="age"><i>年龄</i><span>23</span></div>
			<div class="tel"><i>电话</i><span>13604512790</span></div>
			<div class="email"><i>邮箱</i><span>um_brella@126.com</span></div>
			<div class="wantto"><i>求职意向</i><span>前端工程师</span></div>
			<div class="road"><i>前端之路</i><span>16年毕业有幸在百度作为一名运营人员,接触大量活动策划,从而能与前端大牛们接触,对于能在客户端呈现自己想要的效果心痒难耐,结合大学所学从而开始前端的学习,半夜看书,深夜敲代码.</span></div>
			<div class="icon return introduceReturn"></div>
			</div>
			`;
			var blogData = `<div class="blogDataRemove">
			<div class="blogintroduce"><i>博客介绍</i><span>
				<ol>
					<li>1. 此博客由17年3月创建,主要为记录前端知识点,方便自己巩固与练习,发现有趣的知识及时记录.同时还有个人相册进行不定时更新.</li>
					<li>2. 此博客利用gothub来搭建,进行了响应式设计,适配移动端,同时相册利用原生JS进行了延迟加载设置,提高响应速度.</li>
				</ol>
			</span></div>
			<div class="blogHere">可在最后一页进行查看</div>
			<div class="icon return blogReturn"></div>
			</div>
			`;
			var skillData = `<div class="skillDataRemove">
			<div class="html">
				<span class="per">95%</span>
				<div class="wrapper right">
            			<div class="circleProgress rightcircle"></div>
        			</div>
        			<div class="wrapper left">
            			<div class="circleProgress leftcircle"></div>
        			</div>
        			<span class="type">html</span>
			</div>
			<div class="css">
				<span class="per">80%</span>
				<div class="wrapper right">
            			<div class="circleProgress rightcircle"></div>
        			</div>
        			<div class="wrapper left">
            			<div class="circleProgress leftcircle"></div>
        			</div>
        			<span class="type">css</span>
			</div>
			<div class="javascript">
				<span class="per">80%</span>
				<div class="wrapper right">
            			<div class="circleProgress rightcircle"></div>
        			</div>
        			<div class="wrapper left">
            			<div class="circleProgress leftcircle"></div>
        			</div>
        			<span class="type">JS</span>
			</div>
			<div class="jQuery">
				<span class="per">70%</span>
				<div class="wrapper right">
            			<div class="circleProgress rightcircle"></div>
        			</div>
        			<div class="wrapper left">
            			<div class="circleProgress leftcircle"></div>
        			</div>
        			<span class="type">JQ</span>
			</div>		
			<div class="icon return skillReturn"></div>
			</div>
			`;
			var projectData = `<div class="projectDataRemove">
			<div class="hitGame">
				<h2>打地鼠游戏</h2>
				<i>项目介绍</i>
				<ul>
					<li>
						1. 点击开始游戏 ->游戏开始，时间总计60秒进行倒计时，可按结束游戏来停止游戏.
					</li>
					<li>
						2. 每打中一只地鼠加5分，实时同步总分数及命中率.
					</li>
				</ul>
				<span>项目已上传到GitHub,可在最后一页进行查看.</span>
			</div>
			<div class="covering">
				<h2>遮罩层JQ插件</h2>
				<i>项目介绍</i>
				<ul>
					<li>
						1. 这是一个JQ的遮罩层插件，实现了对某一个元素进行局部遮罩.
					</li>
					<li>
						2. 本方法是拓展一个对象到jQuery的prototype中，要使用需引入JQ.
					</li>
					<li>
						3. 可设置遮罩层的背景颜色,添加文字等属性,同样支持回调函数及后续的文本更改与遮罩层隐藏移除.
					</li>
				</ul>
				<span>项目已上传到GitHub,可在最后一页进行查看.</span>
			</div>
			<div class="icon return projectReturn"></div>
			</div>
			`;
			var DataAry=[$(".introduceDataRemove"),$(".blogDataRemove"),$(".skillDataRemove"),$(".projectDataRemove")];
			$introduce.singleTap(function() {
				$.each(DataAry, function(index,item) {
					if ($(item)!=$(".introduceDataRemove")) {
						$(item).remove();
					}
				});
				$introduceDate.html(introduceData);
				$(".introduceReturn").singleTap(function () {
					$(".introduceDataRemove").remove();
					return false;
				})
			});
			$blog.singleTap(function() {
				$.each(DataAry, function(index,item) {
					if ($(item)!=$(".blogDataRemove")) {
						$(item).remove();
					}
				});
				$blogDate.html(blogData);
				$(".blogReturn").singleTap(function () {
					$(".blogDataRemove").remove();
					return false;
				})
			});
			$skill.singleTap(function() {
				$.each(DataAry, function(index,item) {
					if ($(item)!=$(".skillDataRemove")) {
						$(item).remove();
					}
				});				
				$skillDate.html(skillData);
				var $per=$(".skillDate").find(".per");
				$.each($per, function(index,item) {
					$(this).css("marginLeft", -(parseInt(this.offsetWidth/ 2)) + "px");
					$(this).css("marginTop", -(parseInt(this.offsetHeight/ 2)) + "px");
				});
				var $type=$(".skillDate").find(".type");
				$.each($type, function(index,item) {
					$(this).css("marginLeft", -(parseInt(this.offsetWidth/ 2)) + "px");
					$(this).css("marginTop", -(parseInt(this.offsetHeight/ 2)) + "px");
				});
				$(".skillReturn").singleTap(function () {
					$(".skillDataRemove").remove();
					return false;
				})
			});
			$project.singleTap(function() {
				$.each(DataAry, function(index,item) {
					if ($(item)!=$(".projectDataRemove")) {
						$(item).remove();
					}
				});
				$projectDate.html(projectData);
				$(".projectReturn").singleTap(function () {
					$(".projectDataRemove").remove();
					return false;
				})
			});
			//page2
			$(".page2 .teach h2").css("marginLeft", -(parseInt($(".page2 .teach h2")[0].offsetWidth/ 2)) + "px");
			$(".page2 .work h2").css("marginLeft", -(parseInt($(".page2 .work h2")[0].offsetWidth/ 2)) + "px");
			//page3			
			$(".page3 .item").css("marginLeft", -(parseInt($(".page3 .item")[0].offsetWidth/ 2)) + "px");
			var mySwiper = new Swiper('.swiper-container', {
				direction: 'vertical',
				paginationType: 'custom',
				//				loop: true,
				// 如果需要分页器
				pagination: '.swiper-pagination',
				//需要向下切换按钮
				nextButton: '.swiper-button-next',
				onTransitionStart: change,
				onInit: change
			});
			$swiperBtn.css("marginLeft", -(parseInt($swiperBtn.height()) / 2) + "px");
			//可以手动控制展示的页面
			index = index || 0;
			mySwiper.slideTo(index, 0);
		}
	}
})()

//控制哪个page页显示
var urlObj = window.location.href.queryURLParameter();
var page = parseFloat(urlObj["page"]);
page == 0 || isNaN(page) ? loadingRender.init() : null;
page == 1 ? emailRender.init() : null;
page == 2 ? informationRender.init(2) : null;