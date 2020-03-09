whale.runtime.sendMessage(location.href);

var vod;

setTimeout(function() {
    vod = document.querySelector('div.vod_area');
    whale.storage.local.get(['popupStatus'], function(items){
        if(vod != null && items.popupStatus) document.querySelector('div.vod_area').remove();
    });
}, 1500);

var index = 0;

var img_areaCount = document.getElementsByClassName('end_photo_org').length;

for(cnt = 0; cnt < img_areaCount; cnt++){
    document.getElementsByClassName('end_photo_org')[cnt].style.display = "none";    
}

// 사진 및 동영상을 처음에 숨김, 동영상이 없으면 아무것도 안함

var article_Title = document.getElementById("articleTitle").innerText;
// 기사의 제목
var article_BodyContents = document.getElementById("articleBodyContents").innerText;
// 기사의 본문 내용 
var article_ContentsList = article_BodyContents.split("\n\n");
// 기사의 본문 내용을 문단 별로 나눔

var regExpEmail = /[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/gim;
// ex) 이메일 검증 정규식

var regExpEmail2 = /[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/gim;
// ex) 이메일(co.kr 2자리 포함) 검증 정규식

var regExpURL = /(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?/gim;
var regVideoInfo = /(동영상 뉴스)/;

var regExpSpec = /\-|\\|\[|\]|\(|\)|\{|\}/;

var maxLineCharCnt = 100;

var contentTemp = "";

// 문단 하나의 문자열의 길이가 짧은 것을 임시로 저장하기 위한 변수

for(cnt = 0; cnt < article_ContentsList.length; cnt++){

    if(contentTemp != ""){
        article_ContentsList[cnt] = contentTemp + "\n" + article_ContentsList[cnt];    
        if(article_ContentsList[cnt].length < maxLineCharCnt){  

            if(cnt != article_ContentsList.length - 1){

                contentTemp = article_ContentsList[cnt];
                article_ContentsList.splice(cnt,1);
                // 배열에서 해당 요소를 지운다.
                cnt = cnt - 1;

                continue;
            }else if(cnt == article_ContentsList.length - 1){

                article_ContentsList[cnt - 1] = article_ContentsList[cnt - 1] + "\n" + article_ContentsList[cnt];
                article_ContentsList.splice(cnt, 1);

                cnt = cnt - 1;
                // 해당 기사의 마지막 문단이면 앞전의 것과 합치고 해당 마지막 문장을 없애버림

            }

        }else{
            contentTemp = "";
        }  
    }

    article_ContentsList[cnt] = article_ContentsList[cnt].replace(regExpEmail2,"");
    article_ContentsList[cnt] = article_ContentsList[cnt].replace(regExpEmail,"");
    article_ContentsList[cnt] = article_ContentsList[cnt].replace(regExpURL,"");
    article_ContentsList[cnt] = article_ContentsList[cnt].replace(regVideoInfo,"");
    article_ContentsList[cnt] = article_ContentsList[cnt].replace(regExpSpec," ");



    // 이메일 패턴, 특수문자 등 쓸데 없는 문자를 거름



    if(article_ContentsList[cnt].length < maxLineCharCnt){
        // 한 문단에서 글자수가 두줄 이상 되지 않을 경우 문단으로 인식하지 않음,
        // 다음 문단의 첫 부분과 합침

        if(cnt != article_ContentsList.length-1){
            contentTemp = article_ContentsList[cnt];
            article_ContentsList.splice(cnt,1);
            // 배열에서 해당 요소를 지운다.

            cnt = cnt -1;
            continue;
        }else if(cnt == article_ContentsList.length - 1){
            //alert(article_ContentsList[cnt]);
            article_ContentsList[cnt - 1] = article_ContentsList[cnt - 1] + "\n" + article_ContentsList[cnt];
            article_ContentsList.splice(cnt, 1);
            // 해당 기사의 마지막 문단이면 앞전의 것과 합치고 해당 마지막 문장을 없애버림
            cnt = cnt -1;


        }

    }

}

for(cnt = 0; cnt < article_ContentsList.length; cnt++){
    if(article_ContentsList[cnt] == ''){
        article_ContentsList.splice(cnt,1);
        cnt = cnt - 1;
    }

    // 공백 문단으로 없어지는 것들 문단 목록에서 삭제
    // alert(article_ContentsList[cnt]);
}

article_ContentsList[article_ContentsList.length - 1] = article_ContentsList[article_ContentsList.length - 1].replace(regExpSpec," ");
// 혹시나 모를 짧은 문단에서 읽게 될 특수 문자 제거

var lastContent = article_ContentsList[article_ContentsList.length - 1].split(/▶|☞|ⓒ|\-/);
article_ContentsList[article_ContentsList.length - 1] = lastContent[0];
// 마지막 문단에서 광고글 같은거 제거


for(cnt = 0; cnt < article_ContentsList.length; cnt++){
    if(article_ContentsList[cnt] == ''){
        article_ContentsList.splice(cnt,1);
        cnt = cnt - 1;
    }
    // 공백 문단으로 없어지는 것들 문단 목록에서 삭제
    // alert(article_ContentsList[cnt]);
}

article_Title = article_Title.replace(regExpSpec, " ");
// 제목에서도 특수문자 제거

article_ContentsList.unshift(article_Title);
// 본문 문단 리스트 앞에 타이틀까지 추가

for(cnt = 0; cnt < img_areaCount; cnt++){
    document.getElementsByClassName('end_photo_org')[cnt].style.display = "block";    
}
// 사진 숨긴거 다시 보여줌  



/*
for(cnt = 0; cnt < vod_areaCount; cnt++){
    document.getElementsByClassName('vod_area')[cnt].style.display = "block";
}
*/



// 출력부
//for(cnt = 0; cnt < article_ContentsList.length; cnt++){
//    alert(article_ContentsList[cnt]);
//}
// 본문 문단 영역만 배열에 저장되어 있음



// 출력부
//for(cnt = 0; cnt < article_ContentsList.length; cnt++){
//    alert(article_ContentsList[cnt]);
//}
// 제목까지 모든거 읽어줌

// 함수에서 도출되는 리턴값 : 제목 글을 포함한 문단 까지 리턴

//////////////////////////////제목 문자열 추가 및 이전 문단, 다음 문단, 다시 듣기 기능/////////////////////////////////////



article_ContentsList[0] = "제목, " + article_ContentsList[0];

whale.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message == 'next') {
        if(vod != null && index == 0){
            whale.runtime.sendMessage("동영상이 있는 기사입니다. 들으시려면 컨트롤과 함께 아랫 방향키를 누르고, 넘어가시려면 컨트롤과 함께 오른쪽 방향키를 눌러주세요.");
            index++;
        }
        else if(vod != null && index == 1){
            vod = null;
            whale.runtime.sendMessage(article_ContentsList[index-1]);
        }
        else{
            if(index == article_ContentsList.length) index = 1;
            else index++;
            var vod_btn;
            if(document.querySelector('div.vod_area') != null) {
                vod_btn = document.querySelector('div.vod_area').querySelector('iframe').contentWindow.document.querySelector('button.u_rmc_pause_btn');
            }
            if(vod_btn != null) vod_btn.click();
            whale.runtime.sendMessage(article_ContentsList[index-1]);
            if(index != 1) document.querySelector('div#articleBodyContents').scrollIntoView();
        }
    }
    else if(message == 'before') {
        if(vod != null){
            whale.runtime.sendMessage("동영상이 있는 기사입니다. 들으시려면 컨트롤과 함께 아랫 방향키를 누르고, 넘어가시려면 컨트롤과 함께 오른쪽 방향키를 눌러주세요.");
            index = 1;
        }
        else {
            if(index == 1 || index == 0) index = article_ContentsList.length;
            else index--;
            if(document.querySelector('div.vod_area') != null) {
                vod_btn = document.querySelector('div.vod_area').querySelector('iframe').contentWindow.document.querySelector('button.u_rmc_pause_btn');
            }
            if(vod_btn != null) vod_btn.click();
            whale.runtime.sendMessage(article_ContentsList[index-1]);
            if(index != 1) document.querySelector('div#articleBodyContents').scrollIntoView();
        }
    }
    else if(message == 'select') {
        if(vod != null && index == 0){
            whale.runtime.sendMessage("동영상이 있는 기사입니다. 들으시려면 컨트롤과 함께 아랫 방향키를 누르고, 넘어가시려면 컨트롤과 함께 오른쪽 방향키를 눌러주세요.");
            index++;
        }
        else if(vod != null && index == 1) {
            whale.runtime.sendMessage(" ");
            document.querySelector('div#articleBodyContents').prepend(vod);
            document.querySelector('div.vod_area').scrollIntoView();
            vod = null;
            index = 0;
        }
        else {
            if(document.querySelector('div.vod_area') != null) {
                vod_btn = document.querySelector('div.vod_area').querySelector('iframe').contentWindow.document.querySelector('button.u_rmc_pause_btn');
            }
            if(vod_btn != null) vod_btn.click();
            
            if(index == 0) whale.runtime.sendMessage("다시 들을 문단을 선택하세요.");
            else whale.runtime.sendMessage(article_ContentsList[index-1]);
        }
    }
    else if(message == 'back') {
        if(document.referrer == 'https://news.naver.com/main/home.nhn') {
            whale.storage.local.get(['hdline'], function(items){
                whale.runtime.sendMessage(items.hdline);
            });
        }
        else if(document.referrer.includes('sid1=100') || document.referrer.includes('sectionId=100')) {
            whale.storage.local.get(['list'], function(items){
                whale.runtime.sendMessage("정치" + items.list);
            });
        }
        else if(document.referrer.includes('sid1=101') || document.referrer.includes('sectionId=101')) {
            whale.storage.local.get(['list'], function(items){
                whale.runtime.sendMessage("경제" + items.list);
            });
        }
        else if(document.referrer.includes('sid1=102') || document.referrer.includes('sectionId=102')) {
            whale.storage.local.get(['list'], function(items){
                whale.runtime.sendMessage("사회" + items.list);
            });
        }
        else if(document.referrer.includes('sid1=103') || document.referrer.includes('sectionId=103')) {
            whale.storage.local.get(['list'], function(items){
                whale.runtime.sendMessage("생활 문화" + items.list);
            });
        }
        else if(document.referrer.includes('sid1=104') || document.referrer.includes('sectionId=104')) {
            whale.storage.local.get(['list'], function(items){
                whale.runtime.sendMessage("세계" + items.list);
            });
        }
        else if(document.referrer.includes('sid1=105') || document.referrer.includes('sectionId=105')) {
            whale.storage.local.get(['list'], function(items){
                whale.runtime.sendMessage("아이티 과학" + items.list);
            });
        }

        history.back();
    }
    
});
