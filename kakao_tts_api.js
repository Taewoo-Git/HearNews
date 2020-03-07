/* 'background.js'에 스크립트 전체 넣었으므로 참고만 하세요. */

function tts_play(content) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
            retVal = xhr.responseText;
            var parsedJson = JSON.parse(retVal);
            var ttsSound = new Audio(parsedJson.ttsURL);
            ttsSound.play();
        } else {
            console.log(xhr.responseText);
        }
    };
    xhr.open('POST', 'https://demo-vox-proxy.i.kakao.com/v1/ttsURL'); // 카카오에서 데모로 제공하는 TTS URL
    xhr.setRequestHeader('Content-Type', 'application/json'); // 컨텐츠타입을 json으로
    xhr.send('{"text":"'+content+'", "engine":"deep", "voiceType":"spring", "toneType":"default", "outputType":"http"}');
}