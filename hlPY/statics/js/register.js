$(function() {
	//聚焦失焦input
	$("input[name='username']").focus(function() {
		if($(this).val().length == 0) {
			$(this).parent().next("div").text("支持中文，字母，数字，'-'，'_'的多种组合");
		}
	})
	$("input[name='age']").focus(function() {
		if($(this).val().length == 0) {
			$(this).parent().next("div").text("未成年人请由家长注册");
		}
		})
	$("input[name='password']").focus(function() {
		if($(this).val().length == 0) {
			$(this).parent().next("div").text("建议使用字母、数字和符号两种以上的组合，6-20个字符");
		}
	})
	$("input[name='password2']").focus(function() {
		if($(this).val().length == 0) {
			$(this).parent().next("div").text("请再次输入密码");
		}
	})
	$("input[name='phone']").focus(function() {
		if($(this).val().length == 0) {
			$(this).parent().next("div").text("验证完后，该手机将收到最新课程信息");
		}
	})
	$("input[name='email']").focus(function() {
		if($(this).val().length == 0) {
			$(this).parent().next("div").text("验证完后，你可以使用该邮箱登陆和找回密码");
		}
	})
	$("input[name='identify']").focus(function() {
		if($(this).val().length == 0) {
			$(this).parent().next().next("div").text("看不清？点击图片更换验证码");
		}
	})
	//input各种判断
	//用户名：
	$("input[name='username']").blur(function() {
		if($(this).val().length == 0) {
			$(this).parent().next("div").text("");
			$(this).parent().next("div").css("color", '#ccc');
		} else if($(this).val().length > 0 && $(this).val().length < 4) {
			$(this).parent().next("div").text("长度只能在4-20个字符之间");
			$(this).parent().next("div").css("color", 'red');

		} else if($(this).val().length >= 4 && !isNaN($(this).val())) {
			$(this).parent().next("div").text("用户名不能为纯数字");
			$(this).parent().next("div").css("color", 'red');
		} else {
//			for(var m = 0; m < stuList.length; m++) {
//				if($(this).val() == stuList[m].name) {
//					$(this).parent().next("div").text("该用户名已被注册");
//					$(this).parent().next("div").css("color", 'red');
//					return;
//				}
//			}
			$(this).parent().next("div").text("");
		}
			
		
	})
	$("input[name='age']").blur(function() {
		if($(this).val().length == 0) {
			$(this).parent().next("div").text("");
			$(this).parent().next("div").css("color", '#ccc');
		} else if($(this).val().length  >2 ) {
			$(this).parent().next("div").text("长度只能在2个字符以内");
			$(this).parent().next("div").css("color", 'red');
		} else {
			$(this).parent().next("div").text("");
		}
	})
	//密码
	$("input[name='password']").blur(function() {
		if($(this).val().length == 0) {
			$(this).parent().next("div").text("");
			$(this).parent().next("div").css("color", '#ccc');
		} else if($(this).val().length > 0 && $(this).val().length < 6) {
			$(this).parent().next("div").text("长度只能在6-20个字符之间");
			$(this).parent().next("div").css("color", 'red');
		} else {
			$(this).parent().next("div").text("");
		}
	})
	//	确认密码
	$("input[name='password2']").blur(function() {
		if($(this).val().length == 0) {
			$(this).parent().next("div").text("");
			$(this).parent().next("div").css("color", '#ccc');
		} else if($(this).val() != $("input[name='password']").val()) {
			$(this).parent().next("div").text("两次密码不匹配");
			$(this).parent().next("div").css("color", 'red');
		} else {
			$(this).parent().next("div").text("");
		}
	})
	//	手机号
	$("input[name='phone']").blur(function() {
		if($(this).val().length == 0) {
			$(this).parent().next("div").text("");
			$(this).parent().next("div").css("color", '#ccc');
		} else if($(this).val().length != 11) {
			$(this).parent().next("div").text("手机号格式不正确");
			$(this).parent().next("div").css("color", 'red');
		} else {
			$(this).parent().next("div").text("");
		}
	})
	$("input[name='email']").blur(function() {
		if($(this).val().length == 0) {
			$(this).parent().next("div").text("");
			$(this).parent().next("div").css("color", '#ccc');
		} else if(!$(this).val().match(/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/)) {
			$(this).parent().next("div").text("邮箱格式不正确");
			$(this).parent().next("div").css("color", 'red');
		} else {
			$(this).parent().next("div").text("");
		}
	})
	// 	验证码
	//	 验证码刷新
	function code() {
		var str = "qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPLKJHGFDSAZXCVBNM";
		var str1 = 0;
		for(var i = 0; i < 4; i++) {
			str1 += str.charAt(Math.floor(Math.random() * 62))
		}
		str1 = str1.substring(1)
		$("#code").text(str1);
	}
	code();
	$("#code").click(code);
	//	验证码验证
	$("input[name='identify']").blur(function() {
		if($(this).val().length == 0) {
			$(this).parent().next().next("div").text("");
			$(this).parent().next().next("div").css("color", '#ccc');
		} else if($(this).val().toUpperCase() != $("#code").text().toUpperCase()) {
			$(this).parent().next().next("div").text("验证码不正确");
			$(this).parent().next().next("div").css("color", 'red');
		} else {
			$(this).parent().next().next("div").text("");
		}
	})
	//	提交按钮
	$("#submit_btn").click(function(e) {
		for(var j = 1; j < 6; j++) {
			if($('input').eq(j).val().length == 0) {
				$('input').eq(j).focus();
				if(j == 5) {
					$('input').eq(j).parent().next().next("div").text("此处不能为空");
					$('input').eq(j).parent().next().next("div").css("color", 'red');
					return;
				}
				$('input').eq(j).parent().next(".tips").text("此处不能为空");
				$('input').eq(j).parent().next(".tips").css("color", 'red');
				// return;

			}
		}
		//协议
		if($("#xieyi")[0].checked) {
			//向变量stuList数组添加一个数值，数值内部格式Student(name,password,tel,id)
			//发送用户信息
			stuList.push(new Student($('input').eq(1).val(), $('input').eq(2).val(), $('input').eq(4).val(), stuList.length + 1));
			localStorage.setItem('stuList', JSON.stringify(stuList));
			alert("注册成功");
			window.open("userlist.html", "_blank");
		} else {
			$("#xieyi").next().next().next(".tips").text("请勾选协议");
			$("#xieyi").next().next().next(".tips").css("color", 'red');
			return;
		}
	})
	// function registerState() {
	// 	$.ajax({
	// 		url:"/",
	// 		type:"post",
	// 		dataType:"html",
	// 		async:false,
	// 		success:function (result) {
	// 			alert("注册成功！")
	// 		}
	// 	});
	//
	// }

})