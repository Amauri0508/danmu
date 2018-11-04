//初始化
$("#danmu").danmu({
    left: 0,
    top: 0,
    height: "100%",
    width: "100%",
    speed: 20000,
    opacity: 1,
    font_size_small: 16,
    font_size_big: 24,
    top_botton_danmu_time: 6000
});

//一个定时器，监视弹幕时间并更新到页面上
function timedCount() {
    $("#time").text($('#danmu').data("nowTime"));
    t = setTimeout("timedCount()", 50)
}
timedCount();


function starter() {
    $('#danmu').danmu('danmuStart');
}

function pauser() {
    $('#danmu').danmu('danmuPause');
}

function resumer() {
    $('#danmu').danmu('danmuResume');
}

function stoper() {
    $('#danmu').danmu('danmuStop');
}

function getime() {
    alert($('#danmu').data("nowTime"));
}

function getpaused() {
    alert($('#danmu').data("paused"));
}


function add(newd) {
    $('#danmu').danmu("addDanmu", newd);
}

var ws = new WebSocket("ws://127.0.0.1:9502");

ws.onopen = function(evt) {
    console.log("Connection open ...");
};

ws.onmessage = function(evt) {
    var data = evt.data;
    var data_obj = eval("(" + data + ")");
    add(data_obj);
};

ws.onclose = function(evt) {
    console.log("Connection closed.");
};


function send() {
    var text = document.getElementById('text').value;
    var color = document.getElementById('color').value;
    var position = document.getElementById('position').value;
    var time = $('#danmu').data("nowTime") + 1;;
    var size = document.getElementById('text_size').value;
    var text_obj = '{"text":"' + text + '","color":"' + color + '","size":"' + size + '","position":"' + position + '","time":' + time + '}';
    // 发送到后端
    ws.send(text_obj);
    document.getElementById('text').value = '';
}

//调整透明度函数
function op() {
    var op = document.getElementById('op').value;
    $('#danmu').danmu("setOpacity", op / 100);
}

//调隐藏 显示
function changehide() {
    var op = document.getElementById('op').value;
    op = op / 100;
    if (document.getElementById("ishide").checked) {
        $("#danmu").danmu("setOpacity", 1)
    } else {
        $("#danmu").danmu("setOpacity", 0)

    }
}

//设置弹幕时间
function settime() {
    var t = document.getElementById("set_time").value;
    t = parseInt(t)
    $('#danmu').danmu("setTime", t);
}