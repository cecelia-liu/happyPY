var  off=false;
var h = document.documentElement.clientHeight;
$("#changeinfo").click(function (e) {    //通过“修改信息”这个按钮，将修改信息的表单显示出来
    $("#change").show();    //将form表单信息显示
})
$("#changeback").click(function (e) {    //通过“返回”这个按钮将修改信息的表单重置，并隐藏
    for (var j = 0; j < 5; j++) {
        $(".tips")[j].text("");
        $(".tips")[j].css("color", 'white');
    }
    document.getElementById("change").reset();
    $("#change").hide();
    e.preventDefault();
})
function postinfo() {
    // alert("postinfo")
    var encrypt = new JSEncrypt();
    var pubkey='MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCTTxg035BIC/NNkjg67w6+uS4bx9f9CkCRM8/y8SqfC2GKA1+bq4z4ukLFhh8zaLmHexXWoxST/F7HEyfebt0y7QkuwVbF0QUyEGLNEGhV5a/WEC/E/96c/eUi1yKlZh69MbsxxvTMVldaqoPtC3N/0vlNYHmVyOBjp7gZReFb3wIDAQAB';
    encrypt.setPublicKey(pubkey);
    var phone = $("input[name='phone']").val();
    var password = encrypt.encrypt($("input[name='password2']").val());
    var email = $("input[name='email']").val();
    // alert(password);
    $.ajax({
        type: "post",
        url: "../user_info_modify/",
        data: {
            "phone": phone,
            "password": password,
            "email": email
        },
        dataType: 'json',
        success: function (data) {// 这里的data就是json格式的数据

            if (data.error == "该邮箱已用于注册") {
                $("#backinfo").text("该邮箱已用于注册！");
                $("#backinfo").css("color", 'red');
                e.preventDefault();
                return
            } else if (data.error == "该手机号已用于注册") {
                $("#backinfo").text("该手机号已用于注册！");
                $("#backinfo").css("color", 'red');
                e.preventDefault();
                return
            } else if (data.status == "密码修改成功") {
                $("#backinfo").text("修改成功！");
                $("#backinfo").css("color", 'white');
                alert("密码修改成功，请重新登录！");
                window.location.href = '../login';
                return;

            } else {
                $("#backinfo").text("修改成功！");
                $("#backinfo").css("color", 'white');
                alert("修改成功！");
                window.location.href = '../user_page';
                return;
            }


        },
        error: function () {
            alert("ajax失败");
        }


    })

}
function checkin(e){
     // alert("qwe");
    //提交时，判定手机格式及内容
    if (phonenumber != $("input[name='phone']").val()) {
        if ($("input[name='phone']").val().substr(0, 1) != 1 || $("input[name='phone']").val().length != 11 || $("input[name='phone']").val().match(/[^0-9]/g)) {
            $("input[name='phone']").parent().next("div").text("手机号格式不正确");
            $("input[name='phone']").parent().next("div").css("color", 'red');
            e.preventDefault();
            // $("#changeconfirm").attr("disabled", true);
            return off;
        }else {
            $("input[name='phone']").parent().next("div").text("");
           off=true;
         return off;
        }
    }
    //提交时，判定邮箱格式及内容
    if ($("input[name='email']").val().length == 0) {
        $("input[name='email']").parent().next("div").text("邮箱不能为空");
        $("input[name='email']").parent().next("div").css("color", 'red');
        // $("#changeconfirm").attr("disabled", true);
        e.preventDefault();
        return off;
    } else if (!$("input[name='email']").val().match(/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/)) {
        $("input[name='email']").parent().next("div").text("邮箱格式不正确");
        $("input[name='email']").parent().next("div").css("color", 'red');
        // $("#changeconfirm").attr("disabled", true);
        e.preventDefault();
        return off;
    } else {
        $("input[name='email']").parent().next("div").text("");
        off=true;
        return off;
    }

    //提交时，判定密码是否一致
    if ($("input[name='password2']").val() != $("input[name='password']").val()) {
        $("input[name='password2']").parent().next("div").text("两次密码不相同");
        $("input[name='password2']").parent().next("div").css("color", 'red');
        // $("#changeconfirm").attr("disabled", true);
        e.preventDefault();
        return off;
    } else {
        $("input[name='password2']").parent().next("div").text("");
        off=true;
        return off;
    }


}

//当光标移动时，验证手机号的格式
$("input[name='phone']").blur(function () {
    if ($(this).val().length == 0) {
        $(this).parent().next("div").text("");
        $(this).parent().next("div").css("color", 'red');
    } else if ($(this).val().length != 11) {
        $(this).parent().next("div").text("手机号格式不正确");
        $(this).parent().next("div").css("color", 'red');
        // $("#changeconfirm").attr("disabled", true);
    } else {
        $(this).parent().next("div").text("");
        // $("#changeconfirm").attr("disabled", false);
    }
})
//当光标移动时，验证邮箱的格式
$("input[name='email']").blur(function () {
    if ($(this).val().length == 0) {
        $(this).parent().next("div").text("");
        $(this).parent().next("div").css("color", '#ccc');
    } else if (!$(this).val().match(/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/)) {
        $(this).parent().next("div").text("邮箱格式不正确");
        $(this).parent().next("div").css("color", 'red');
        // $("#changeconfirm").attr("disabled", true);
    } else {
        $(this).parent().next("div").text("");
        // $("#changeconfirm").attr("disabled", false);
    }
})
//当光标移动时，验证密码的内容及格式
$("input[name='password']").blur(function () {
    if ($(this).val().length == 0) {
        $(this).parent().next("div").text("");
        $(this).parent().next("div").css("color", 'red');
    } else if ($(this).val().length > 0 && $(this).val().length < 6) {
        $(this).parent().next("div").text("长度只能在6-20个字符之间");
        $(this).parent().next("div").css("color", 'red');
    } else {
        $(this).parent().next("div").text("");
    }
})
//当光标移动时，验证两次密码是否一致
$("input[name='password2']").blur(function () {
    if ($(this).val() != $("input[name='password']").val()) {
        $(this).parent().next("div").text("两次密码不相同");
        $(this).parent().next("div").css("color", 'red');
        // $("#changeconfirm").attr("disabled", true);
    } else {
        $(this).parent().next("div").text("");
        // $("#changeconfirm").attr("disabled", false);
    }
})

$("#changeconfirm").click(function (e) {
    checkin(e);
    if(off == true) {
        postinfo();

    }
    });


$("#finishbutton").click(function (e) {      //通过“已完成课程”这个按钮，将完成课程的表单显示出来

    $("#finishcourse").show();    //将form表单信息显示
if ($("#learned1").length==0&&$("#learned2").length==0) {

    $("#faster").css({height:h+"px" });
    // alert("1")
}else {
    // alert("123")
    var fasterHeight = $('#son').height();

   		$("#faster").css({height: fasterHeight+'px'});
   		return
}

})
$("#finishback").click(function (e) {    //通过“返回”这个按钮，将完成课程的表单隐藏起来
    $("#finishcourse").hide();
    var b=$("#finishcourse").length;
    if ($("#finishcourse").length==1) {

        $("#faster").css({height:h+"px" });
    }else {

        // alert(b)
    }

    e.preventDefault();
        // var fasterHeight = $('#son').height();
        // alert(fasterHeight);
        //
   		// $("#faster").css({height: fasterHeight+'px'});

})

