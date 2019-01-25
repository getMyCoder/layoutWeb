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
	var CreateLableFloat = ['left', 'right', 'none'];
	$(".BIH3F").click(function () {
		setSelect('blockItemsFB', this, CreateLableFloat)
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
		$(".flageShow").html("不显示")
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
		Kui.promptBox({
			TipsMsg: "清除完成",
			TipsType: "info"
		})
	});
	// 编辑标签
	$(".EditLableBtn").click(function () {
		FStyleEdit();
		$(".FlageEditChange").toggle();
	});
	// 确定修改
	$(".yesBtnEvtEdit").click(function () {
		changeEditLable();
		$(".fatherLable").val(" ");
		Kui.promptBox({
			TipsMsg: "修改成功",
			TipsType: "info"
		})
	});
	$(".flageShow").click(function () {
		if (showFlage) {
			showFlage = false;
			$(".flageShow").html("不显示")
		} else {
			showFlage = true;
			$(".flageShow").html("显示")
		}
	})
});


// 是否显示弹窗
var showFlage = true;
// document中点击的标签对象
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
			FStyleEdit(this);
			OBJS = this;
			return false
		});
		if (itemsSom1.children().length > 0) {
			for (var j = 0; j < itemsSom1.children().length; j++) {
				itemsSom2 = itemsSom1.children().eq(j);
				itemsSom2.click(function () {
					AddFatherLableInt(this);
					FStyleEdit(this);
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
		LableData: $("#setStylesData").val(),
		float: $("#setStyleFLS").html(),
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
		"textAlign": setStyleA.TextAlign,
		'float': setStyleA.float,
	});
}

// 获取父级标签属性
function FStyleEdit() {
	$("#setStyleWidthE").val(parseFloat($(OBJS).width()));
	$("#setStyleHeightE").val(parseFloat($(OBJS).height()));
	$("#setStyleBWE").val(parseFloat($(OBJS).css('borderWidth')));
	$("#setStyleBSE").html($(OBJS).css('borderStyle'));
	$("#setStyleBCE").val($(OBJS).css('borderColor'));
	$("#setStyleBackgroundE").val($(OBJS).css('backgroundColor'));
	$("#setStyleMTE").val(parseFloat($(OBJS).css('marginTop')));
	$("#setStyleMRE").val(parseFloat($(OBJS).css('marginRight')));
	$("#setStyleMBE").val(parseFloat($(OBJS).css('marginBottom')));
	$("#setStyleMLE").val(parseFloat($(OBJS).css('marginLeft')));
	$("#setStylePTE").val(parseFloat($(OBJS).css('paddingTop')));
	$("#setStylePRE").val(parseFloat($(OBJS).css('paddingRight')));
	$("#setStylePBE").val(parseFloat($(OBJS).css('paddingBottom')));
	$("#setStylePLE").val(parseFloat($(OBJS).css('paddingLeft')));
	$("#setStyleFontSE").val(parseFloat($(OBJS).css('fontSize')));
	$("#setStyleFontCE").val($(OBJS).css('color'));
	$("#setStyleFontBE").val($(OBJS).css('fontWeight'));
	$("#setStyleLineHE").val(parseFloat($(OBJS).css('lineHeight')));
	$("#setStyleTextAlignE").val($(OBJS).css('textAlign'));
	$("#setStylesDataE").val($(OBJS).html());
	$("#setStyleFLSE").html($(OBJS).css('float'))
}

// 编辑父级标签-修改
function changeEditLable() {
	var getMargin = {
		top: $("#setStyleMTE").val() + "px",
		right: $("#setStyleMRE").val() + "px",
		bottom: $("#setStyleMBE").val() + "px",
		left: $("#setStyleMLE").val() + "px"
	};
	var setStyleA = {
		width: $("#setStyleWidthE").val() + "px",
		height: $("#setStyleHeightE").val() + "px",
		border: $("#setStyleBWE").val() + "px " + $("#setStyleBSE").html() + " " + $("#setStyleBCE").val(),
		background: $("#setStyleBackgroundE").val(),
		boxShadow: $("#setStyleBSXE").val() + "px " + $("#setStyleBSYE").val() + "px " + $("#setStyleBSmhE").val() + "px " + $("#setStyleBSSizeE").val() + "px " + $("#setStyleBSColorE").val() + " " + $("#setStyleBSnwE").val(),
		margin: null,
		padding: $("#setStylePTE").val() + "px " + $("#setStylePRE").val() + "px " + $("#setStylePBE").val() + "px " + $("#setStylePLE").val() + "px",
		fontSize: $("#setStyleFontSE").val() + "px",
		fontColor: $("#setStyleFontCE").val(),
		fontBold: $("#setStyleFontBE").val(),
		lineHeight: $("#setStyleLineHE").val() + "px",
		TextAlign: $("#setStyleTextAlignE").val(),
		float: $("#setStyleFLSE").html(),
		LableData: $("#setStylesDataE").val()
	};
	if ($("#setStyleMRE").val() == 'auto') {
		getMargin.right = 'auto'
	}
	if ($("#setStyleMBE").val() == '') {
		getMargin.bottom = ''
	}
	if ($("#setStyleMLE").val() == '') {
		getMargin.left = ''
	}
	setStyleA.margin = getMargin.top + " " + getMargin.right + " " + getMargin.bottom + " " + getMargin.left;
	console.log(setStyleA.margin);
	$(OBJS).css({
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
		"textAlign": setStyleA.TextAlign,
		"float": setStyleA.float
	});
	$(OBJS).html(setStyleA.LableData)
}



