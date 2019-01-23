$(function () {
	var DH = document.documentElement.clientHeight;
	var DW = document.documentElement.clientWidth;
	// ---------------------------功能框-------------------------
	var setBlock = {
		evtDownX: null,
		evtDownY: null,
		evtMoveX: null,
		evtMoveY: null,
		evtUpX: null,
		evtUpY: null,
		styleTop: null,
		styleLeft: null
	};
	$(".setStyleLogo").mousedown(function (evtDown) {
		setBlock.evtDownX = evtDown.clientX;
		setBlock.evtDownY = evtDown.clientY;
		setBlock.styleTop = $(".setStyle").position().top;
		setBlock.styleLeft = $(".setStyle").position().left;
		$(document).bind('mousemove', function (evtMove) {
			setBlock.evtMoveX = evtMove.clientX;
			setBlock.evtMoveY = evtMove.clientY;
			var getTop = setBlock.styleTop + (setBlock.evtMoveY - setBlock.evtDownY);
			var getLeft = setBlock.styleLeft + (setBlock.evtMoveX - setBlock.evtDownX);
			// 移动框的上下边界
			if (getTop <= 0) {
				getTop = 0;
			} else if (getTop >= (DH - $(".setStyle").height())) {
				getTop = DH - $(".setStyle").height();
			}
			// 移动框的左右边界
			if (getLeft <= 0) {
				getLeft = 0;
			} else if (getLeft >= (DW - $(".setStyle").width())) {
				getLeft = DW - $(".setStyle").width();
			}
			$(".setStyle").css({
				"top": getTop + "px",
				"left": getLeft + "px",
			});
		})
	});
	$(".setStyleLogo").mouseup(function () {
		$(document).unbind('mousemove')
	});
	$(document).mouseup(function () {
		$(document).unbind('mousemove')
	});
	// ---------------------------功能框内部-------------------------
	$(".getStyleBlock").click(function () {
		$(this).find('img').toggleClass("setStyleImgActive");
		$(".styleBlock").toggle()
	});
	$(".sBMenu ul li").each(function () {
		$(this).click(function () {
			$(this).addClass("SBMLActive").siblings().removeClass("SBMLActive")
		})
	});
	var CreateLable = ['div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'dl', 'dt', 'dd', 'span', 'a', 'strong', 'i', 'e', 'em', 'form', 'button'];
	$(".BIH3T").click(function () {
		setSelect('blockItemsS', this, CreateLable)
	});
	var CreateLableBorder = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'inherit'];
	$(".BIH3B").click(function () {
		setSelect('blockItemsB', this, CreateLableBorder)
	});
	// ---------------------------功能框menu-------------------------
	$(".menuBlock .BlockItems").eq(0).show();
	$(".sBMenuLi li").each(function (index) {
		$(this).click(function () {
			$(".menuBlock .BlockItems").eq(index).show().siblings(".BlockItems").hide()
		})
	});
	// ---------------------------父级容器部分-------------------------
	// 添加标签
	setLoop($('.container'));
	$(document).click(function () {
		setLoop($('.container'));
	});
	$("#noPopMove").click(function () {
		showFlage = false;
	});
	$(".menuBlock").css({
		"maxHeight": (DH - $(".getStyleBlock").height() - $(".setStyleLogo").height() - $(".sBMenu").height()) + "px"
	});
	$(".yesBtnEvt").click(function () {
		setHtmlModel(OBJS);
		OBJS = null;
		$(".fatherLable").val(" ")
	});
	$(".noBtnEvt").click(function () {
		$(".emptyVal").val("");
		$(".emptyHtml").html("")
	});
	$(".removeLableBtn").click(function () {
		$(OBJS).remove();
		$(".fatherLable").val(" ")
	});
	$(".clearLableBtn").click(function () {
		$(OBJS).append("<div class='clear'></div>");
		
	})
	// 编辑标签
	
	
});
var showFlage = true;
var OBJS = null;

// 下拉列表
function setSelect(Lable, obj, Arr) {
	var lables = '.' + Lable;
	if ($(lables).find("li").length == 0) {
		for (var i = 0; i < Arr.length; i++) {
			$(lables).append('<li>' + Arr[i] + '</li>')
		}
	}
	$(obj).siblings(lables).slideDown(100);
	$(lables).focus();
	$(lables).find("li").each(function () {
		$(this).click(function () {
			$(obj).find("span").html($(this).html());
			$(this).parents(lables).slideUp(100)
		})
	});
	$(lables).blur(function () {
		$(this).slideUp(100)
	})
}

// 获取父级标签
function setLoop(itemsLength) {
	var itemsSom1 = null, itemsSom2 = null;
	for (var i = 0; i < itemsLength.children().length; i++) {
		itemsSom1 = itemsLength.children().eq(i);
		itemsSom1.click(function () {
			AddFatherLableInt(this);
			OBJS = this;
			return false
		});
		if (itemsSom1.children().length > 0) {
			for (var j = 0; j < itemsSom1.children().length; j++) {
				itemsSom2 = itemsSom1.children().eq(j);
				itemsSom2.click(function () {
					AddFatherLableInt(this);
					OBJS = this;
					return false
				});
				if (itemsSom2.children().length > 0) {
					setLoop(itemsSom2)
				}
			}
		}
	}
	
}

// 标签转为字符串
function htmlToString(vals) {
	var getString = vals;
	getString = getString.replace(/</ig, "&lt;");
	getString = getString.replace(/>/ig, "&gt;");
	getString = getString.replace(/&gt;/ig, "&gt;<br>");
	return getString
}

// 父级标签添加int
function AddFatherLableInt(Obj) {
	if (showFlage) {
		Kui.MovePop();
		var setConDiv = '<div style="margin-left:40px;max-height: 120px;overflow-y: auto">' + htmlToString($(Obj).html()) + '</div>'
		$("#movePopCon").html("标签：" + $(Obj).get(0).tagName + "<br>内容：" + setConDiv)
	}
	var getFatherClassName = '';
	if ($(Obj).attr('class')) {
		getFatherClassName = $(Obj).attr('class')
	}
	$(".fatherLable").val($(Obj).get(0).tagName + ";(class:" + getFatherClassName + ")");
	// $(".yesBtnEvt").click(function () {
	// 	setHtmlModel(Obj);
	// 	Obj = null;
	// 	$("#fatherLable").val(" ")
	// });
	// $(".noBtnEvt").click(function () {
	// 	$(".emptyVal").val("");
	// 	$(".emptyHtml").html("")
	// })
}

// 父级标签中添加属性方法
function setHtmlModel(Obj) {
	var getLableS = $("#setDIVLable").html();
	var getMargin = {
		top: $("#setStyleMT").val() + "px",
		right: $("#setStyleMR").val() + "px",
		bottom: $("#setStyleMB").val() + "px",
		left: $("#setStyleML").val() + "px"
	};
	var setStyleA = {
		width: $("#setStyleWidth").val() + "px",
		height: $("#setStyleHeight").val() + "px",
		border: $("#setStyleBW").val() + "px " + $("#setStyleBS").html() + " " + $("#setStyleBC").val(),
		background: $("#setStyleBackground").val(),
		boxShadow: $("#setStyleBSX").val() + "px " + $("#setStyleBSY").val() + "px " + $("#setStyleBSmh").val() + "px " + $("#setStyleBSSize").val() + "px " + $("#setStyleBSColor").val() + " " + $("#setStyleBSnw").val(),
		margin: null,
		padding: $("#setStylePT").val() + "px " + $("#setStylePR").val() + "px " + $("#setStylePB").val() + "px " + $("#setStylePL").val() + "px",
		fontSize: $("#setStyleFontS").val() + "px",
		fontColor: $("#setStyleFontC").val(),
		fontBold: $("#setStyleFontB").val(),
		lineHeight: $("#setStyleLineH").val() + "px",
		TextAlign: $("#setStyleTextAlign").val(),
		LableData: $("#setStylesData").val()
	};
	if ($("#setStyleMR").val() == 'auto') {
		getMargin.right = 'auto'
	}
	if ($("#setStyleMB").val() == '') {
		getMargin.bottom = ''
	}
	if ($("#setStyleML").val() == '') {
		getMargin.left = ''
	}
	setStyleA.margin = getMargin.top + " " + getMargin.right + " " + getMargin.bottom + " " + getMargin.left;
	console.log(setStyleA.margin);
	var addStyleTime = new Date().getTime();
	var AddStyle = 'AddClass' + addStyleTime;
	$(Obj).append('<' + getLableS + ' class=' + AddStyle + '>' + setStyleA.LableData + '</' + getLableS + '>');
	
	$('.' + AddStyle).css({
		"width": setStyleA.width,
		"height": setStyleA.height,
		"border": setStyleA.border,
		"background": setStyleA.background,
		"boxShadow": setStyleA.boxShadow,
		"margin": setStyleA.margin,
		"fontSize": setStyleA.fontSize,
		"color": setStyleA.fontColor,
		"fontWeight": setStyleA.fontBold,
		"lineHeight": setStyleA.lineHeight,
		"textAlign": setStyleA.TextAlign
	});
	
}