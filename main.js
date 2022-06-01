let timer= document.getElementById("timer")
let start= document.getElementById("start")
let stop= document.getElementById("stop")
let reset= document.getElementById("reset")
let startTime;
let elapsedTime = 0;
let intervalID = null;

function updateTime() {
    let ms = elapsedTime % 1000;
    let s = Math.floor(elapsedTime / 1000) % 60;
    let m = Math.floor(elapsedTime / (1000*60)) % 60;
    let h = Math.floor(elapsedTime / (1000*60*60)) % 60;
    
    let msStr = ms.toString().slice(0, 1);
    let sStr = s.toString().slice(0, 2);
    let mStr = m.toString().slice(0, 2);
    let hStr = h.toString().slice(0, 2);
    
    timer.innerHTML = `${hStr}:${mStr}:${sStr}.${msStr}`;
}

//ボタンの活性/非活性
$(function() {
    $("#start").click(function() {
        $(this).prop("disabled", true);
        $("#stop, #reset").prop("disabled", false);
    });
});

$("#stop").click(function() {
    $(this).prop("disabled", true);
    $("#start").prop("disabled", false);
});

$("#reset").click(function() {
    $(this).prop("disabled", true);
});

//スタートボタン
start.addEventListener("click",function(){
    if (intervalID !== null) {return;}
    let pre = new Date();
    intervalID = setInterval(function() {
        let now = new Date();
        elapsedTime += now - pre;
        pre = now;
        updateTime()
    }, 100);
});

//ストップボタン
stop.addEventListener("click",function(){
    clearInterval(intervalID);
    intervalID = null;
});

//リセットボタン
reset.addEventListener("click",function(){
    elapsedTime = 0;
    updateTime();
});

