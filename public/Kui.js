var DW = document.documentElement.clientWidth;
var DH = document.documentElement.clientHeight;

// 构造函数
function Kui() {
	// 样式
	this.load()
};
// 变量
Kui.prototype.Vars = {
	popMsg: {
		title: "标题",
		text: "内容",
		message: "内容",
		setSubmit: null
	},
	popConWidth: 300,
	popConHeight: 160,
	TabLi: "",
	TabSize: null,
	PanelLi: "",
	PanelSize: null,
	SliderSize: {
		SilderPro: "20%",
		SilderType: "infor",
		calFun: null
	},
	PageItems: "",
	PageSize: {
		pageStart: 1,
		pageSum: 20,
		pageNumber: 6,
		pageIndex: function () {
		}
	},
	ProgessSize: "",
	ProgessSizeColor: "",
	setEmojiStyle: {
		png: 0,
		gif: 0,
	},
	// 瀑布流
	CascadeF: {
		size: 4,
		Mtop: 15
	},
	BannerS: {
		bgColor: "kui-primary",
		bannerTime: 3000
	},
	Tree: {
		TreeVal: {},
		Callback: null
	},
	RollRS: {
		Callback: null
	},
	// KuiVM
	KuiVMCS: {
		id: "",
		data: {},
		loads: null,
		method: {}
	}
};
Kui.prototype.load = function () {
	$(function () {
		// 事件样式
		$(".kui-anim-scale").click(function () {
			var scaleWidth = $(".kui-anim-scale").width();
			var scaleHeight = $(".kui-anim-scale").height();
			$(".kui-anim-scale").css({
				"width": "0",
				"height": "0",
				"marginTop": scaleHeight / 2,
				"marginLeft": scaleWidth / 2
			});
			$(".kui-anim-scale").animate({
				"width": scaleWidth,
				"height": scaleHeight,
				"margin": "0"
			}, 250)
		});
		$(".kui-anim-fade").click(function () {
			$(".kui-anim-fade").hide();
			$(".kui-anim-fade").fadeIn()
		});
		$(".kui-anim-down").click(function () {
			$(".kui-anim-down").hide();
			$(".kui-anim-down").slideDown()
		});
	})
};
// 方法
Kui.prototype.FunLaod = {
	// 选项卡
	setKuiTabFun: function () {
		$(".kuiTab-header").append("<ul></ul>");
		$(".kuiTab-header ul").append(Kui.Vars.TabLi);
		$(".kuiTab-body .kuiTab-items").eq(0).show();
		$(".kuiTab-header ul li").eq(0).addClass("kuiTabActive");
		$(".kuiTab-header ul li").each(function (index) {
			$(this).click(function () {
				$(this).addClass("kuiTabActive").siblings().removeClass("kuiTabActive");
				$(".kuiTab-body .kuiTab-items").eq(index).show().siblings().hide()
			})
		});
	},
	// 折叠面板
	setPanelFun: function () {
		$(".panel").append("<ul></ul>");
		$(".panel ul").append(Kui.Vars.PanelLi);
		$(".panel ul li").eq(0).find(".panelCon").show();
		$(".panel ul li").eq(0).find("h3").addClass("panelConActive");
		$(".panel ul li").each(function (index) {
			var that = $(this);
			$(this).find("h3").click(function () {
				$(".panel ul li").not($(that)).find("h3").removeClass("panelConActive");
				$(".panel ul li").not($(that)).find(".panelCon").slideUp(100);
				$(this).addClass("panelConActive");
				$(that).find(".panelCon").slideDown(100)
			})
		});
	},
	//滑块
	setSliderFun: function () {
		var setSilderDiv = '<div class="sliderBefore"></div><div class="sliderBox"></div>';
		$(".slider").append(setSilderDiv);
		var slideLV = $(".sliderBox").width() / 2;
		$(".sliderBefore").addClass("kui-" + Kui.Vars.SliderSize.SilderType);
		$(".sliderBefore").width(Kui.Vars.SliderSize.SilderPro);
		$(".sliderBox").addClass("slider-" + Kui.Vars.SliderSize.SilderType + "-border");
		$(".sliderBox").css({
			"left": $(".sliderBefore").width() - 10 + "px"
		});
		$(".slider").bind("mousedown", function (evtD) {
			var that = $(this);
			var evtDX = evtD.clientX;
			var proPUG = 0;
			if (evtDX <= $(".slider").offset().left + $(".slider").width() && evtDX >= $(".slider").offset().left) {
				$(that).find(".sliderBox").css({
					"left": evtDX - $(that).find('.sliderBefore').offset().left - slideLV + "px"
				});
				$(that).find('.sliderBefore').css({
					"width": evtDX - $(that).find('.sliderBefore').offset().left + "px"
				});
				proPUG = evtDX - $(that).find('.sliderBefore').offset().left - slideLV;
			}
			$(document).bind("mousemove", function (evtM) {
				var evtMX = evtM.clientX;
				if (evtMX <= $(".slider").offset().left + $(".slider").width() && evtMX >= $(".slider").offset().left) {
					$(that).find(".sliderBox").css({
						"left": evtMX - $(that).find('.sliderBefore').offset().left - slideLV + "px"
					});
					$(that).find('.sliderBefore').css({
						"width": evtMX - $(that).find('.sliderBefore').offset().left + "px"
					});
					proPUG = evtMX - $(that).find('.sliderBefore').offset().left - slideLV;
				} else if (evtMX >= $(".slider").offset().left + $(".slider").width() - $(".sliderBox").width() / 2) {
					$(that).find(".sliderBox").css({
						"left": $(".slider").width() - $(".sliderBox").width() / 2 + "px"
					});
					$(that).find('.sliderBefore').css({
						"width": $(".slider").width() + "px"
					});
					proPUG = $(".slider").width()
				} else if (evtMX <= $(".slider").offset().left - $(".sliderBox").width() / 2) {
					$(that).find(".sliderBox").css({
						"left": -$(".sliderBox").width() / 2 + "px"
					});
					$(that).find('.sliderBefore').css({
						"width": -$(".sliderBox").width() / 2 + "px"
					});
					proPUG = 0;
				}
				if (proPUG <= 0) {
					proPUG = 0;
				}
				var getProgess = parseFloat(Kui.Vars.SliderSize.SilderPro) / 100;
				if (proPUG / $(".slider").width() >= getProgess) {
					if (Kui.Vars.SliderSize.calFun != null) {
						Kui.Vars.SliderSize.calFun()
					}
				}
			});
			$(document).mouseup(function () {
				$(document).unbind('mousemove');
			});
		});
	},
	// 分页
	setPageFun: function () {
		var pageLable = '<button class="pageFirst">首页</button><button class="pageP">上一页</button><div class="pageCon">' + Kui.Vars.PageItems + '</div><button class="pageN">下一页</button><button class="pageLast">尾页</button>';
		$(".page").append(pageLable);
		if (Kui.Vars.PageSize.pageSum > Kui.Vars.PageSize.pageNumber) {
			$(".pageEI").show()
		} else {
			$(".pageEI").hide()
		}
		var IndexVal = null;
		$(".pageCon span").eq(Kui.Vars.PageSize.pageStart - 1).addClass("pageActive");
		$(".pageCon span").each(function (index) {
			$(this).click(function () {
				IndexVal = parseInt($(this).html());
				Kui.Vars.PageSize.pageIndex(IndexVal);
				setPageloop()
			})
		});
		$(".pageFirst").click(function () {
			IndexVal = 1;
			Kui.Vars.PageSize.pageIndex(1);
			setPageloop();
		});
		$(".pageLast").click(function () {
			IndexVal = Kui.Vars.PageSize.pageSum;
			Kui.Vars.PageSize.pageIndex(Kui.Vars.PageSize.pageSum);
			setPageloop();
		});
		$(".pageP").click(function () {
			if (IndexVal > 1) {
				IndexVal--;
				Kui.Vars.PageSize.pageIndex(Kui.Vars.PageSize.pageSum);
				setPageloop();
			}
		});
		$(".pageN").click(function () {
			if (IndexVal < Kui.Vars.PageSize.pageSum) {
				IndexVal++;
				Kui.Vars.PageSize.pageIndex(Kui.Vars.PageSize.pageSum);
				setPageloop();
			}
		});
		
		function setPageloop() {
			if ((Kui.Vars.PageSize.pageNumber + 1) / 2 >= IndexVal) {
				$(".pageFI").hide();
				$(".pageEI").show();
				for (var j = 1; j < Kui.Vars.PageSize.pageNumber - 1; j++) {
					$(".pageCon span").eq(j).html(j + 1)
				}
				$(".pageCon span").eq(IndexVal - 1).addClass("pageActive").siblings().removeClass("pageActive");
			} else if ((Kui.Vars.PageSize.pageNumber + 1) / 2 < IndexVal && (Kui.Vars.PageSize.pageSum - (Kui.Vars.PageSize.pageNumber + 1) / 2) >= IndexVal) {
				$(".pageFI").show();
				$(".pageEI").show();
				for (var j = 1; j < Kui.Vars.PageSize.pageNumber - 1; j++) {
					$(".pageCon span").eq(j).html(IndexVal - 3 + j)
				}
				if ((Kui.Vars.PageSize.pageNumber + 1) / 2 < IndexVal) {
					$(".pageCon span").eq((Kui.Vars.PageSize.pageNumber - 1) / 2).addClass("pageActive").siblings().removeClass("pageActive");
				}
			} else {
				$(".pageFI").show();
				$(".pageEI").hide();
				for (var j = 1; j < Kui.Vars.PageSize.pageNumber - 1; j++) {
					$(".pageCon span").eq(j).html(Kui.Vars.PageSize.pageSum - (Kui.Vars.PageSize.pageNumber - 1) + j)
				}
				$(".pageCon span").eq(Kui.Vars.PageSize.pageNumber - (Kui.Vars.PageSize.pageSum - IndexVal) - 1).addClass("pageActive").siblings().removeClass("pageActive");
			}
		}
	},
	// 进度条
	setProgressFun: function () {
		var progessHtml = '<div class="progress-bar"></div><div class="progess-num"><span>20%</span><p></p></div>';
		$(".progress").append(progessHtml);
		$(".progress-bar").addClass(Kui.Vars.ProgessSizeColor);
		$(".progress-bar").width(Kui.Vars.ProgessSize);
		$(".progess-num").css({
			"left": $(".progress-bar").width() - $(".progess-num").width() / 2 + "px"
		});
		$(".progess-num").find("span").text(Kui.Vars.ProgessSize);
		$(window).resize(function () {
			$(".progess-num").css({
				"left": $(".progress-bar").width() - $(".progess-num").width() / 2 + "px"
			});
			$(".progess-num").find("span").text(Kui.Vars.ProgessSize)
		});
	},
	// 表情
	setEmojiFun: function () {
		var EmojiHtml = '<div class="Expression" tabindex="0"><i class="EmojiI"></i><div class="EmojiTitle"><i>表情</i><span>&times;</span></div><ul class="EmojiFace"></ul></div>';
		$(".EmojiLog").click(function () {
			$(".Expression").remove();
			$(".Emoji").append(EmojiHtml);
			
			AddEmojiImg(Kui.Vars.setEmojiStyle);
			
			$(".Expression").css({
				"left": $(".EmojiLog").position().left - 17 + 'px',
				"top": $(".EmojiLog").position().top + 32 + 'px'
			});
			$(".EmojiTitle").find("span").click(function () {
				$(".Expression").remove();
			});
			$(".EmojiFace li").each(function () {
				$(this).click(function () {
					$("#EmojiVal").focus();
					var FaceImg = $(this).find("img").attr("src");
					var FaceImgVal = "<img src=" + FaceImg + ">";
					insertHtmlAtCaret(FaceImgVal);
				});
				$(".Expression").focus();
			});
			$(".Expression").blur(function () {
				$(".Expression").remove();
			});
			
		});
		// $(document).click(function (evt) {
		// 	var DEvtX = evt.clientX;
		// 	var DEvtY = evt.clientY;
		// 	blurClickEvent($(".Expression"), false, DEvtX, DEvtY);
		// });
		function AddEmojiImg(style) {
			for (var key in style) {
				var keyString = key.toString();
				for (var A = 1; A <= style[key]; A++) {
					$(".EmojiFace").append("<li><img src='Emoji/" + keyString + "/" + A + "." + keyString + "'></li>")
				}
			}
		};
		$(".EmojiBtn").click(function () {
			$(".EmojiRendering").html($("#EmojiVal").html())
		});
	},
	// 瀑布流
	setCascadeFlowFun: function () {
		var TopMargin = Kui.Vars.CascadeF.Mtop;
		var getMaxTopH = new Array();
		$(".CascadeFlow ul").hide();
		for (var C = 0; C < Kui.Vars.CascadeF.size; C++) {
			$(".CascadeFlow ul li").eq(C).css({
				"top": "0",
				"left": 100 / Kui.Vars.CascadeF.size * C + "%"
			});
		}
		$(".CascadeFlow ul li").css({
			"width": 100 / Kui.Vars.CascadeF.size + "%"
		});
		$(".CascadeFlow ul").fadeIn(100, function () {
			$(".CascadeFlow ul li").each(function (index) {
				if (index < Kui.Vars.CascadeF.size) {
					var getItemsT = $(this).position().top + $(this).height();
					var getItemsL = $(this).position().left;
					getMaxTopH.push([getItemsL, getItemsT])
				} else {
					var minTopVal = getMaxTopH[0][1];
					var items = 0;
					for (var h = 0; h < getMaxTopH.length; h++) {
						if (getMaxTopH[h][1] < minTopVal) {
							minTopVal = getMaxTopH[h][1];
							items = h;
						}
					}
					$(this).css({
						"top": getMaxTopH[items][1] + TopMargin + "px",
						"left": getMaxTopH[items][0] + "px"
					});
					var getItemsT = $(this).position().top + $(this).height();
					var getItemsL = $(this).position().left;
					getMaxTopH[items][1] = getItemsT;
				}
			})
		})
	},
	// 拖动弹窗
	setMovePop: function () {
		$(".movePop").hide();
		$(".movePop").show();
		$(".movePop").css({
			"top": (DH - $(".movePop").height()) / 2 * 0.8 + "px",
			"left": (DW - $(".movePop").width()) / 2 + "px"
		});
		$(".movePopTitle").mousedown(function (evtE) {
			var getMovePopL = $(".movePop").position().left;
			var getMovePopT = $(".movePop").position().top;
			var movePopEX = evtE.clientX;
			var movePopEY = evtE.clientY;
			$(document).bind("mousemove", function (evtM) {
				var movePopMX = evtM.clientX;
				var movePopMY = evtM.clientY;
				$(".movePop").css({
					"top": getMovePopT + (movePopMY - movePopEY) + "px",
					"left": getMovePopL + (movePopMX - movePopEX) + "px"
				})
			})
		});
		$(document).mouseup(function () {
			$(document).unbind("mousemove")
		});
		$(".closeMovePop").click(function () {
			$(".movePop").hide()
		})
	},
	// banner
	setBanner: function () {
		var setItems = {
			setItemsLi: 0,
			setItemsWidth: $(".BigUl li").width(),
			setItemsZindex: 99,
			itemsLength: $(".BigUl li").length,
			itemsFirst: 0,
			itemsSecond: 0,
			itemsThree: 0,
			timer: null,
			Obj: $(".BigUl li"),
			ObjSmall: $(".SmallUl li")
		};
		var bannerBtnLable = '<div class="bannerBtnRight bannerBtn"><img src="img/bannerBtnR.png" alt=""></div><div class="bannerBtnLeft bannerBtn"><img src="img/bannerBtnL.png" alt=""></div>';
		$(".banner").append("<ul class='SmallUl'></ul>" + bannerBtnLable);
		$(".bannerBtn").css({"top": ($(".banner").height() - $(".bannerBtn").height()) / 2 + "px"});
		for (var i = 0; i < setItems.itemsLength; i++) {
			$(".SmallUl").append("<li></li>")
		}
		$(".SmallUl").css({"left": ($(".banner").width() - $(".SmallUl").width()) / 2 + "px"});
		var SmallObj = $(".SmallUl li");
		setItems.Obj.css({"left": "0px"});
		setItems.Obj.eq(setItems.setItemsLi).css({"zIndex": setItems.setItemsZindex, "left": 0});
		setItems.Obj.eq(setItems.setItemsLi + 1).css({"zIndex": setItems.setItemsZindex, "left": setItems.setItemsWidth + "px"});
		setItems.Obj.eq(setItems.itemsLength - 1).css({"zIndex": setItems.setItemsZindex, "left": -setItems.setItemsWidth + "px"});
		SmallObj.eq(setItems.setItemsLi).addClass(Kui.Vars.BannerS.bgColor);
		SmallObj.eq(setItems.setItemsLi).css({"width": "25px"});
		setBannerFun();
		$(".banner").mouseover(function () {
			clearInterval(setItems.timer);
		});
		$(".banner").mouseout(function () {
			setBannerFun();
		});
		$(".bannerBtnRight").click(function () {
			setItems.setItemsLi++;
			setItems.setItemsZindex++;
			setBannerMove(true)
		});
		$(".bannerBtnLeft").click(function () {
			setItems.setItemsLi--;
			if (0 > setItems.setItemsLi) {
				setItems.setItemsLi = setItems.itemsLength - 1;
			}
			setItems.setItemsZindex++;
			setBannerMove(false)
		});
		SmallObj.each(function (index) {
			$(this).click(function () {
				setItems.setItemsLi = index;
				setItems.setItemsZindex++;
				setBannerMove(true)
			})
		});
		
		function setBannerFun() {
			setItems.timer = setInterval(function () {
				setItems.setItemsLi++;
				setItems.setItemsZindex++;
				setBannerMove(true)
			}, Kui.Vars.BannerS.bannerTime);
		}
		
		function setBannerMove(flage) {
			if (setItems.setItemsLi == 0) {
				setItems.itemsFirst = setItems.itemsLength - 1;
				setItems.itemsSecond = setItems.setItemsLi;
				setItems.itemsThree = setItems.setItemsLi + 1;
			} else if (setItems.setItemsLi == (setItems.itemsLength - 1)) {
				setItems.itemsFirst = setItems.setItemsLi - 1;
				setItems.itemsSecond = setItems.setItemsLi;
				setItems.itemsThree = 0;
				if (flage) {
					setItems.setItemsLi = -1;
				}
			} else {
				setItems.itemsFirst = setItems.setItemsLi - 1;
				setItems.itemsSecond = setItems.setItemsLi;
				setItems.itemsThree = setItems.setItemsLi + 1
			}
			setItems.Obj.eq(setItems.itemsFirst).animate({"zIndex": setItems.setItemsZindex, "left": -setItems.setItemsWidth + "px"});
			setItems.Obj.eq(setItems.itemsSecond).animate({"zIndex": setItems.setItemsZindex, "left": 0});
			setItems.Obj.eq(setItems.itemsThree).animate({"zIndex": setItems.setItemsZindex, "left": setItems.setItemsWidth + "px"});
			SmallObj.not(SmallObj.eq(setItems.itemsSecond)).animate({"width": "12px"});
			SmallObj.eq(setItems.itemsSecond).animate({"width": "25px"});
			SmallObj.eq(setItems.itemsSecond).addClass(Kui.Vars.BannerS.bgColor).siblings().removeClass(Kui.Vars.BannerS.bgColor)
		}
	},
	// Tree
	setTree: function () {
		var Tree = Kui.Vars.Tree.TreeVal;
		var itemsLi = 'TreeLi';
		var itemsUl = 'TreeUl';
		var levelSize = 0;
		$("#Trees").append("<ul class='TreeUl0' id='TreeUl0'></ul>");
		for (var i = 0; i < Tree.length; i++) {
			if (Tree[i].bId == 0) {
				$("#TreeUl0").append("<li class=" + itemsLi + Tree[i].bId + " id=" + itemsLi + Tree[i].id + "><h4 select='no'><i><img src='img/tree.png' alt=''></i>" + Tree[i].name + "</h4></li>")
			}
			if (Tree[i].bId >= levelSize) {
				levelSize = Tree[i].bId
			}
		}
		for (var a = 1; a <= levelSize; a++) {
			for (var i = 0; i < Tree.length; i++) {
				if (Tree[i].bId == a) {
					if ($("#" + itemsUl + Tree[i].bId).html() == undefined) {
						$("#" + itemsLi + Tree[i].bId).append("<ul class=" + itemsUl + Tree[i].bId + " id=" + itemsUl + Tree[i].bId + "></ul>")
					}
					$("#" + itemsUl + Tree[i].bId).append("<li class=" + itemsLi + Tree[i].bId + " id=" + itemsLi + Tree[i].id + "><h4 select='no'><i><img src='img/tree.png' alt=''></i>" + Tree[i].name + "</h4></li>")
				}
			}
		}
		$("#Trees li h4").each(function () {
			if ($(this).attr("select") == "no") {
				$(this).siblings("ul").find("li").hide();
				$(this).find("i img").removeClass("ImgActive");
			} else {
				$(this).siblings("ul").find("li").show();
				$(this).find("i img").addClass("ImgActive");
			}
			if ($(this).siblings().html() == undefined) {
				$(this).find("i img").remove();
				$(this).click(function () {
					if (Kui.Vars.Tree.Callback != null) {
						Kui.Vars.Tree.Callback()
					}
				})
			}
			// setAdd(this);
			$(this).click(function () {
				$("#Trees li h4").removeClass("Active");
				$(this).addClass("Active");
				setAdd($(this))
			})
		});
		
		function setAdd(Obj) {
			if (Obj.attr("select") == "no") {
				Obj.attr("select", "select");
				Obj.siblings("ul").find("li").show();
				Obj.find("i img").addClass("ImgActive");
				Obj.siblings("ul").find("li").find("ul li").hide();
				Obj.siblings("ul").find("li").find("h4 i img").removeClass("ImgActive");
				Obj.siblings("ul").find("li").find("h4").attr("select", "no");
			} else {
				Obj.attr("select", "no");
				Obj.siblings("ul").find("li").hide();
				Obj.find("i img").removeClass("ImgActive");
			}
		}
	},
	// 滚到地步刷新页面
	setRollRefresh: function () {
		$(window).scroll(function () {
			if ($(window).scrollTop() + DH == $(document).height()) {
				if (Kui.Vars.RollRS.Callback != null) {
					Kui.Vars.RollRS.Callback()
				}
			}
		})
	},
	//MVVM框架
	setKuiVM: function () {
		var DIV = $("#" + Kui.Vars.KuiVMCS.id);
		var Summary = Kui.Vars.KuiVMCS;
		var lableSymbolS = "{{", lableSymbolE = "}}";
		var attrValAdd = {
			AvmVFor: "m-for",
			AvmVShow: "m-show"
		};
		// -----------------onload--------------------------
		// 用来加载load执行的方法或是ajax
		var LoadFlage = false, timer;
		setTime();
		var proBodys = DIV.html();
		DIV.children().remove();
		setLoad();
		
		// 设置加载load的dom
		function setTime() {
			timer = setInterval(function () {
				if (LoadFlage) {
					DIV.append(proBodys);
					setLoop(DIV.children());
					clearInterval(timer);
				}
			}, 10)
		}
		
		// 预先加载的dom
		function setLoad() {
			if (Summary.loads != null) {
				Summary.loads()
			}
			LoadFlage = true;
		}
		
		// createHTML-->v-for-->loop
		function setLoop(FSomes) {
			var FSomess = FSomes.parent(), FSome = FSomes, FLength = 0, FLsize = true;
			for (var i = 0; i < FSome.length; i++) {
				if (FSome.eq(i).attr(attrValAdd.AvmVFor)) {
					if (FLsize) {
						FLsize = false;
						FLength = i;
					}
					var StringVFor = FSome.eq(i).attr(attrValAdd.AvmVFor);
					var vForS = StringVFor.substring(0, StringVFor.indexOf("in") - 1);
					var vForE = StringVFor.substring(StringVFor.indexOf("in") + 3, StringVFor.length);
					FSome.eq(i).removeAttr(attrValAdd.AvmVFor);
					var itemsWillDelF = {
						item: FSome.eq(i),
						tagName: FSome.eq(i)[0].tagName,
						html: FSome.eq(i).html()
					};
					for (var key in Summary.data) {
						if (key == vForE) {
							for (var j = 0; j < Summary.data[key].length; j++) {
								var FSLable = {
									Lables: itemsWillDelF.tagName,
									LablesAttr: setAttrR(itemsWillDelF.item),
									Html: itemsWillDelF.html
								};
								var itmesDivF = FSomess.children().eq(FLength + j).after("<" + FSLable.Lables + FSLable.LablesAttr + ">" + FSLable.Html + "</" + FSLable.Lables + ">");
								setMessage(itmesDivF, Summary.data[key][j], vForS, j);
								setEvent(itmesDivF.parent().children().eq(FLength + j));
							}
							FSomess.children().eq(FLength + Summary.data[key].length).remove();
							FLength += Summary.data[key].length;
						}
					}
				} else {
					setEvent(FSome.eq(i));
					setMessage(FSome.eq(i));
				}
				if (FSome.eq(i).children().length != 0) {
					var sonSome = FSome.eq(i).children(), FLengths = 0, FLsizes = true;
					for (var m = 0; m < sonSome.length; m++) {
						if (sonSome.eq(m).attr(attrValAdd.AvmVFor)) {
							if (FLsizes) {
								FLsizes = false;
								FLengths = m;
							}
							var StringVForS = sonSome.eq(m).attr(attrValAdd.AvmVFor);
							var vForSs = StringVForS.substring(0, StringVForS.indexOf("in") - 1);
							var vForEs = StringVForS.substring(StringVForS.indexOf("in") + 3, StringVForS.length);
							sonSome.eq(m).removeAttr(attrValAdd.AvmVFor);
							var itemsWillDel = {
								item: sonSome.eq(m),
								tagName: sonSome.eq(m)[0].tagName,
								html: sonSome.eq(m).html()
							};
							for (var key in Summary.data) {
								if (key == vForEs) {
									for (var h = 0; h < Summary.data[key].length; h++) {
										var SSLable = {
											Lables: itemsWillDel.tagName,
											LablesAttr: setAttrR(itemsWillDel.item),
											Html: itemsWillDel.html
										};
										var itmesDiv = FSome.eq(i).children().eq(FLengths + h).after("<" + SSLable.Lables + SSLable.LablesAttr + ">" + SSLable.Html + "</" + SSLable.Lables + ">");
										setMessage(itmesDiv, Summary.data[key][h], vForSs, h)
									}
									FSome.eq(i).children().eq(FLengths + Summary.data[key].length).remove();
									FLengths += Summary.data[key].length;
								}
							}
						} else {
							setEvent(sonSome.eq(m))
							setMessage(sonSome.eq(m));
						}
						if (sonSome.eq(m).children().length != 0) {
							setLoop(sonSome);
						}
					}
				}
			}
		};
		
		// get/set the Label attribute
		function setAttrR(AttrDiv) {
			var AttrsVal = {
				AttVal: AttrDiv[0].attributes,
				AddArr: []
			};
			for (var key in AttrsVal.AttVal) {
				if (!isNaN(parseInt(key))) {
					AttrsVal.AddArr.push(AttrsVal.AttVal[key])
				}
			}
			var AttrValS = '';
			for (var key in AttrsVal.AddArr) {
				var setValue = AttrsVal.AddArr[key].value;
				var setAttrName = AttrsVal.AddArr[key].name;
				AttrValS += " " + setAttrName + "='" + setValue + "'";
			}
			return AttrValS
		};
		
		// set Event
		function setEvent(Dobj) {
			var EventS = {
				click: ":click",
				mouseenter: ":mouseenter",
				mouseover: ":mouseover",
				mouseup: ":mouseup",
				mousedown: ":mousedown",
				mousemove: ":mousemove"
			};
			for (var keyEvet in EventS) {
				if (Dobj.attr(EventS[keyEvet])) {
					var clickVal = Dobj.attr(EventS[keyEvet]);
					var cellS = clickVal.substring(clickVal.indexOf("(") + 1, clickVal.indexOf(")"));
					clickVal = clickVal.replace("(" + cellS + ")", "");
					Dobj.on(keyEvet, function () {
						if (cellS == '') {
							new Summary.method[clickVal](Dobj);
						} else {
							new Summary.method[clickVal](cellS, Dobj);
						}
					})
				}
			}
		};
		
		// RegExp-->html
		function setReg(stringVal, regVal, endVal) {
			var reg = new RegExp(regVal, "gim");
			return stringVal.replace(reg, endVal)
		};
		
		//set-Message-information
		function setMessage(itemsDiv, itemsDivHtml, selectVal, ide) {
			var getHtmlV = itemsDiv.html();
			if (getHtmlV.indexOf(lableSymbolS) != "-1") {
				// AVM中的Array
				// AVM中字符串、数组
				for (var keyE in Summary.data) {
					getHtmlV = itemsDiv.html();
					if (getHtmlV.substring(getHtmlV.indexOf(lableSymbolS) + 2, getHtmlV.indexOf(lableSymbolE)) == keyE) {
						if (typeof Summary.data[keyE] == "string" || typeof Summary.data[keyE] == "number") {
							var ObjString = Summary.data[keyE].toString();
							var regVal = lableSymbolS + keyE + lableSymbolE;
							itemsDiv.html(setReg(getHtmlV, regVal, ObjString));
						}
					}
					if (typeof Summary.data[keyE] == "object") {
						if (Array.isArray(Summary.data[keyE])) {
							// 数组中的json对象
							if (typeof Summary.data[keyE][ide] == "object") {
								// 循环数组里的json对象
								for (var keyJsons in Summary.data[keyE][ide]) {
									if (itemsDivHtml && selectVal) {
										var setJsonNames = selectVal + "." + keyJsons;
										getHtmlV = itemsDiv.html();
										if (getHtmlV.substring(getHtmlV.indexOf(lableSymbolS) + 2, getHtmlV.indexOf(lableSymbolE)) == setJsonNames) {
											var ObjStrings = Summary.data[keyE][ide][keyJsons].toString();
											var regVal = lableSymbolS + setJsonNames + lableSymbolE;
											itemsDiv.html(setReg(getHtmlV, regVal, ObjStrings));
										}
									}
								}
							} else {
								// if (getHtmlV.substring(getHtmlV.indexOf(lableSymbolS) + 2, getHtmlV.indexOf(lableSymbolE)) == selectVal) {
								var regVal = lableSymbolS + selectVal + lableSymbolE;
								itemsDiv.html(setReg(getHtmlV, regVal, itemsDivHtml));
								// }
							}
						} else {
							for (var keyJson in Summary.data[keyE]) {
								var setJsonName = keyE + "." + keyJson;
								if (getHtmlV.substring(getHtmlV.indexOf(lableSymbolS) + 2, getHtmlV.indexOf(lableSymbolE)) == setJsonName) {
									var ObjString = Summary.data[keyE][keyJson].toString();   //json一级对象
									var regVal = lableSymbolS + setJsonName + lableSymbolE;
									itemsDiv.html(setReg(getHtmlV, regVal, ObjString));
								}
							}
						}
					}
				}
			}
		};
	}
};

// 加载事件
function getjQuery(getFunction) {
	$(function () {
		getFunction()
	})
};

// 失焦事件
function blurClickEvent(Obj, flage, DEvtX, DEvtY) {
	if (Obj.length > 0) {
		var ObjStyle = {
			width: Obj.width(),
			height: Obj.height(),
			top: Obj.offset().top,
			left: Obj.offset().left
		};
		if (((DEvtY < ObjStyle.top - 30) || (DEvtY > (ObjStyle.top + ObjStyle.height))) || ((DEvtX < ObjStyle.left) || (DEvtX > (ObjStyle.left + ObjStyle.width)))) {
			if (flage) {
				Obj.hide();
			} else {
				Obj.remove()
			}
		}
	}
};

function insertHtmlAtCaret(html) {
	var sel, range;
	if (window.getSelection) {
		// IE9 and non-IE
		sel = window.getSelection();
		if (sel.getRangeAt && sel.rangeCount) {
			range = sel.getRangeAt(0);
			range.deleteContents();
			// Range.createContextualFragment() would be useful here but is
			// non-standard and not supported in all browsers (IE9, for one)
			var el = document.createElement("div");
			el.innerHTML = html;
			var frag = document.createDocumentFragment(), node, lastNode;
			while ((node = el.firstChild)) {
				lastNode = frag.appendChild(node);
			}
			range.insertNode(frag);
			// Preserve the selection
			if (lastNode) {
				range = range.cloneRange();
				range.setStartAfter(lastNode);
				range.collapse(true);
				sel.removeAllRanges();
				sel.addRange(range);
			}
		}
	} else if (document.selection && document.selection.type != "Control") {
		// IE < 9
		document.selection.createRange().pasteHTML(html);
	}
};
Kui.prototype.open = function (valMsg) {
	Kui.Vars.popMsg = $.extend({
		title: "标题",
		text: "内容",
		message: "内容",
		setSubmit: null
	}, valMsg);
	var popLable = '<div class="pop"><div class="popCon"><div class="popMain"><div class="popHead"><i>标题</i><span class="closePop closeSpan">&times;</span></div><div class="popBody">内容</div><div class="popFoot"><span class="popSpan"><button class="kui-btn kui-primary closeSubmit">确定</button></span><span class="popSpan"><button class="kui-btn kui-info closePop">取消</button></span></div></div></div></div>';
	$("body").append(popLable);
	$(".pop").height(DH);
	$(".popCon").css({
		"top": (DH - $(".popCon").height()) / 2 - 50 + "px",
		"left": (DW - $(".popCon").width()) / 2 + "px",
	});
	$(".popHead i").text(Kui.Vars.popMsg.title);
	if (Kui.Vars.popMsg.text != "") {
		$(".popBody").text(Kui.Vars.popMsg.text);
	} else {
		$(".popBody").html(Kui.Vars.popMsg.message);
	}
	$(".pop").show();
	$(".popMain").hide();
	$(".popCon").css({
		"width": "0",
		"height": "0",
		"top": DH / 2 - 50 + "px",
		"left": DW / 2 + "px",
	});
	$(".popCon").animate({
		"width": Kui.Vars.popConWidth,
		"height": Kui.Vars.popConHeight,
		"top": (DH - Kui.Vars.popConHeight) / 2 - 50 + "px",
		"left": (DW - Kui.Vars.popConWidth) / 2 + "px",
	}, 100, function () {
		$(".popMain").show();
	});
	Kui.close(Kui.Vars.popMsg.setSubmit)
};
Kui.prototype.close = function (Scallback) {
	$(".closePop").click(function () {
		closeDiv($(".closePop"))
	});
	$(".closeSubmit").click(function () {
		closeDiv($(".closeSubmit"));
		if (Scallback != null) {
			Scallback()
		}
	})
};

function closeDiv() {
	$(".popMain").hide();
	$(".popCon").animate({
		"width": 0,
		"height": 0,
		"top": DH / 2 - 50 + "px",
		"left": DW / 2 + "px",
	}, 100);
	$(".pop").fadeOut(100, function () {
		$(".pop").remove()
	});
};
Kui.prototype.promptBox = function (valMsg) {
	var valMsgP = $.extend({
		TipsType: "success",
		TipsMsg: "操作成功"
	}, valMsg);
	var tipsLable = '<div class="Tips kui-border-radius3">操作成功</div>';
	$("body").append(tipsLable);
	var setType = "Tips-" + valMsgP.TipsType;
	$(".Tips").addClass(setType);
	$(".Tips").html(valMsgP.TipsMsg);
	$(".Tips").css({
		"top": (DH - $(".Tips").height()) / 2 - 100 + "px",
		"left": (DW - $(".Tips").width()) / 2 + "px",
	});
	$(".Tips").fadeIn(300);
	setTimeout(function () {
		$(".Tips").fadeOut(300, function () {
			$(".Tips").remove()
		});
	}, 2000)
};
Kui.prototype.kuiTab = function (TabVal) {
	Kui.Vars.TabSize = $.extend(["商品1", "商品2", "商品3"], TabVal)
	for (var i = 0; i < Kui.Vars.TabSize.length; i++) {
		Kui.Vars.TabLi += "<li>" + Kui.Vars.TabSize[i] + "</li>"
	}
	getjQuery(Kui.FunLaod.setKuiTabFun)
};
Kui.prototype.Panel = function (PanelVal) {
	Kui.Vars.PanelSize = $.extend([
		{id: 0, title: "标题", message: "山东省济南市"},
		{id: 1, title: "标题", message: "山东省济南市"},
		{id: 2, title: "标题", message: "山东省济南市"}
	], PanelVal)
	for (var i = 0; i < Kui.Vars.PanelSize.length; i++) {
		Kui.Vars.PanelLi += "<li><h3>" + Kui.Vars.PanelSize[i].title + "</h3><div class='panelCon'>" + Kui.Vars.PanelSize[i].message + "</div></li>"
	}
	getjQuery(Kui.FunLaod.setPanelFun)
};
Kui.prototype.Slider = function (SliderVal) {
	Kui.Vars.SliderSize = $.extend({
		SilderPro: "20%",
		SilderType: "infor",
		calFun: null
	}, SliderVal);
	getjQuery(Kui.FunLaod.setSliderFun)
};
Kui.prototype.Page = function (pageVal) {
	Kui.Vars.PageSize = $.extend({
		pageStart: 1,
		pageSum: 10,
		pageNumber: 6,
		pageIndex: function () {
		}
	}, pageVal);
	Kui.Vars.PageItems = '<span>1</span><i class="pageFI">...</i>';
	if (Kui.Vars.PageSize.pageSum <= Kui.Vars.PageSize.pageNumber) {
		for (var i = 2; i < Kui.Vars.PageSize.pageSum; i++) {
			Kui.Vars.PageItems += "<span>" + i + "</span>";
		}
	} else {
		for (var i = 2; i < Kui.Vars.PageSize.pageNumber; i++) {
			Kui.Vars.PageItems += "<span>" + i + "</span>";
		}
	}
	Kui.Vars.PageItems += '<i class="pageEI">...</i><span>' + Kui.Vars.PageSize.pageSum + '</span>';
	getjQuery(Kui.FunLaod.setPageFun)
};
Kui.prototype.Progess = function (ProgessVal, colorBg) {
	Kui.Vars.ProgessSize = ProgessVal;
	Kui.Vars.ProgessSizeColor = colorBg;
	getjQuery(Kui.FunLaod.setProgressFun)
};
Kui.prototype.Emoji = function (EmojiVal) {
	Kui.Vars.setEmojiStyle = $.extend({
		png: 0,
		gif: 0,
	}, EmojiVal);
	getjQuery(Kui.FunLaod.setEmojiFun)
};
Kui.prototype.CascadeFlow = function (CFVal) {
	Kui.Vars.CascadeF = $.extend({
		size: 4,
		Mtop: 15
	}, CFVal);
	getjQuery(Kui.FunLaod.setCascadeFlowFun)
};
Kui.prototype.MovePop = function () {
	getjQuery(Kui.FunLaod.setMovePop)
};
Kui.prototype.Banner = function (BannerVal) {
	Kui.Vars.BannerS = $.extend({
		bgColor: "kui-primary",
		bannerTime: 3000
	}, BannerVal);
	getjQuery(Kui.FunLaod.setBanner);
};
Kui.prototype.TreeUnit = function (TreeVal) {
	Kui.Vars.Tree = $.extend({
		TreeVal: {},
		Callback: null
	}, TreeVal);
	getjQuery(Kui.FunLaod.setTree);
};
Kui.prototype.RollRefresh = function (RollRSVal) {
	Kui.Vars.RollRS = $.extend({
		Callback: null
	}, RollRSVal);
	getjQuery(Kui.FunLaod.setRollRefresh);
};
Kui.prototype.KuiVM = function (KuiVMVal) {
	Kui.Vars.KuiVMCS = $.extend({
		id: "",
		data: {},
		loads: null,
		method: {}
	}, KuiVMVal);
	getjQuery(Kui.FunLaod.setKuiVM);
};
var Kui = new Kui();
 