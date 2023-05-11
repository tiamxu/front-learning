/**
 * Created by chen on 2017/1/9.
 */
window.onload=function () {
    var oLogin=document.getElementsByClassName("login")[0];
    var oQRCode=document.getElementsByClassName("QRCode")[0];
    var oError=document.getElementsByClassName("error")[0];
    var btnQRCode=oLogin.getElementsByClassName("select")[0].getElementsByTagName("a")[1];
    var btnLogin=oQRCode.getElementsByClassName("select")[0].getElementsByTagName("a")[0];
    var oUserName=document.getElementsByClassName("data")[0].getElementsByTagName("input")[0];
    var oPassWord=document.getElementsByClassName("data")[0].getElementsByTagName("input")[1];
    var oSubmit=document.getElementsByClassName("data")[0].getElementsByTagName("input")[2];
    var reUserName=/^\w{6,15}$/,rePassWord=/^[a-zA-Z0-9]{5,15}$/;
    btnQRCode.addEventListener('click',change,false);  //切换到二维码界面
    btnLogin.addEventListener('click',change,false);  //切换到账号密码登录界面
    oSubmit.addEventListener('click',re,false);     //提交按钮添加账号，密码的验证函数

    /*添加/删除包含display:none的class*/
    function change(e) {
        var e=e||window.event;
        if(e.preventDefault){
            e.preventDefault();
        }else {
            e.returnVale="true";
        }
        changeCls(oLogin,"hid");
        changeCls(oQRCode,"hid");
    }
    oUserName.addEventListener('input',write,false);    //修改账号栏信息取消错误提示
    oPassWord.addEventListener('input',write,false);    //修改密码栏信息取消错误提示

    /*验证函数*/
    function re(e) {
        var e=e||window.event;
        if(e.preventDefault){
            e.preventDefault();
        }else {
            e.returnVale="true";
        }
       if(oUserName.value==""){
            oError.innerHTML="<span>!</span>请输入账号";
           oUserName.style.border="1px solid #f56600";
            return;
        }else if(oPassWord.value==""){
            oError.innerHTML="<span>!</span>请输入密码";
           oPassWord.style.border="1px solid #f56600";
            return;
        }else  if(!reUserName.test(oUserName.value)||!rePassWord.test(oPassWord.value)){
           if(!reUserName.test(oUserName.value)){
               oError.innerHTML="<span>!</span>用户名不正确";
               oUserName.style.border="1px solid #f56600";
           }else if(!rePassWord.test(oPassWord.value)){
               oError.innerHTML="<span>!</span>用户名或密码不正确";
           }
       }else {
           oError.innerHTML="";
       }
    }

    /*清除错误提示*/
    function write() {
        oUserName.style.border="none";
        oPassWord.style.border="none";
        oError.innerHTML="";
    }

    /*添加或删除class函数*/
    function changeCls(obj,cls) {
        var clsArr=obj.className.split(" ");
        if(clsArr.indexOf(cls)==-1){
            clsArr.push(cls);
            obj.className=clsArr.join(" ");
        }else {
            clsArr.splice(clsArr.indexOf(cls),1);
            obj.className=clsArr.join(" ");
        }
    }
}