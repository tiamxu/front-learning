/**
 * Created by chen on 2017/1/9.
 */
window.onload=function () {
    var oPhone=document.getElementsByTagName("input")[0];
    var oYzm=document.getElementById("yzm");
    var oPhError=document.getElementsByClassName("error")[0];
    var oYzmError=document.getElementsByClassName("error")[1];
    var oArea=document.getElementsByClassName("area")[0];
    var oAreaSelect=document.getElementsByClassName("areaSelect")[0];
    var oText=document.getElementById('yzm');  //获取输入框
    var oYz=document.getElementById('yz');      //获取验证码框
    var oBtn=document.getElementById('btn');    //获取提交按钮
    var aSpan=oYz.getElementsByTagName('span'); //获取生成的验证码
    var yz,str2,num1,num2,fh='-',val='',rePhone=/^\d{6,20}$/,reYzm=/^\w{4,15}$/;

    oPhone.addEventListener('blur',phoneBlur,false); //添加焦点移除手机号码栏事件
    oYzm.addEventListener('blur',yzmBlur,false);    //添加焦点移除验证码栏事件
    oPhone.addEventListener('input',write,false);   //手机号内容改动清除错误提示
    oYzm.addEventListener('input',write,false);     //验证码内容改动清除错误提示

    /*手机号码栏验证*/
    function phoneBlur() {
        if(oPhone.value==""){
            oPhError.innerHTML="<span>!</span>请输入手机号码";
        }else if(!rePhone.test(oPhone.value)){
            oPhError.innerHTML="<span>!</span>手机号码格式错误";
        }
    }

    /*验证码输入栏验证*/
    function yzmBlur() {
        if(oYzm.value==""){
            oYzmError.innerHTML="<span>!</span>请输入图片验证码";
        }else if(!reYzm.test(oYzm.value)){
            oYzmError.innerHTML="<span>!</span>图片验证码错误";
        }
    }

    /*清除错误提示*/
    function write() {
        if(this==oPhone){
            oPhError.style.border="none";
            oPhError.innerHTML="";
        }else {
            oYzmError.style.border="none";
            oYzmError.innerHTML="";
        }
    }

    /*验证码函数*/
    yzm();  //初始验证码
    oYz.onclick=function () { //点击验证码更换
        yzm();
    }
    oBtn.onclick=function (e) {  //点击提交判断
        var e=e||window.event;
        if(e.preventDefault){
            e.preventDefault();
        }else {
            e.returnValue=true;
        }
        phoneBlur();
        var num =oText.value;
        var re=new RegExp("^"+val+"$",'i');//正则判断输入验证码，忽略大小写
        if(re.test(num)&&rePhone.test(oPhone.value)){
            window.location.href="./index.html";
        }else if(!re.test(num)){
            alert("验证码错误");
            yzm();
        }else if(!rePhone.test(oPhone.value)){
            if(oPhone.value==""){
                oPhError.innerHTML="<span>!</span>请输入手机号码";
            }else if(!rePhone.test(oPhone.value)){
                oPhError.innerHTML="<span>!</span>手机号码格式错误";
            }
            yzm();
        }
    }
    function yzm() {    //生成验证码
        str2='';    //重新赋值
        val='';
        for(var i=0;i<5;i++){
            yz=Math.round(Math.random()*100)+48;    //随机48-148的数
            //[48-57]为0-9; [65-90]为A-Z; [97-122]为a-z;
            if(yz>57&&yz<65){
                yz=Math.round(Math.random()*9)+48;
            }else if(yz>90&&yz<97){
                yz=Math.round(Math.random()*25)+65;
            }else if(yz>122){
                yz=Math.round(Math.random()*25)+97;
            }
            val+=String.fromCharCode(yz);       //val值加等字符编码为yz的字符 用于验证判断。 //[48-57]为0-9; [65-90]为A-Z; [97-122]为a-z;
            str2+="<span>"+String.fromCharCode(yz)+"</span>";
        }
        oYz.innerHTML=str2;
        for(var j=0;j<aSpan.length;j++){  //span添加转动角度
            num1=Math.round(Math.random()*30);
            num2=Math.round(Math.random()*100);
            if(num2<=50){   //判断添加正负号
                fh='+';
            } else {
                fh='-';
            }
            aSpan[j].style.transform="rotate("+fh+num1+"deg)";
        }
    }
    /*手机国家区号选择事件*/
    oArea.onclick=function (e) {
        var e=e||window.event;
        var target=e.target||e.srcElement;
        if(oAreaSelect.className.split(" ").indexOf("hid")!=-1){
            delCls(oAreaSelect,"hid");
        }else {
            addCls(oAreaSelect,"hid");
        }
        if(target.tagName.toLowerCase()=="li"){
            oArea.children[0].innerHTML=target.children[0].innerText+"("+target.children[1].innerText+")";
        }
    }
}