whale.runtime.sendMessage(location.href);

var getUrl = window.location.href.split("?");

var index = 0;

whale.storage.local.get(['savedIndex'], function(items){
    if(items.savedIndex != 0) index = items.savedIndex;
});

var contentList;
var contentTitle = [];
var contentLink = [];

var contentObject = [];


var regExpSpec = /\-|\\|\[|\]|\(|\)|\{|\}/;
// 해당 부분에서도 제목 부분에서 특수문자를 제거하기 위한 코드 추가



////////////////////////////////////////////////////////////////////////////// 여기부터 ///////////////////////////////////////////////////////////////////////////////////

if(getUrl[0] == 'https://news.naver.com/main/list.nhn') {

    contentList = document.querySelector('div.list_body').querySelectorAll('li');
    // 해당 dt 의 갯수를 가져옴

    for(cnt = 0; cnt < contentList.length; cnt++){

        var dtCount = document.querySelectorAll('dl')[cnt].querySelectorAll('dt').length-1;
        // dt 태그 갯수중 마지막 요소를 가져오기 위한 갯수 카운트

        contentTitle.push(document.querySelectorAll('dl')[cnt].querySelectorAll('dt')[dtCount].innerText.replace(regExpSpec," "));
        contentLink.push(document.querySelectorAll('dl')[cnt].querySelector('a').getAttribute('href'));
        
        contentObject.push(document.querySelectorAll('dl')[cnt].querySelectorAll('dt')[dtCount]);

    }
}

////////////////////////////////////////////////////////////////////////여기까지 속보 구역입니당!/////////////////////////////////////////////////////////////////////////////

else if(getUrl[0] == 'https://news.naver.com/main/ranking/popularDay.nhn') {

    contentList = document.getElementsByClassName('ranking_headline');

    for(cnt = 0; cnt < contentList.length; cnt++){

        contentTitle.push(document.getElementsByClassName('ranking_headline')[cnt].querySelector('a').innerText.replace(regExpSpec," "));
        contentLink.push("https://news.naver.com" +  document.getElementsByClassName('ranking_headline')[cnt].querySelector('a').getAttribute('href'));
        
        contentObject.push(document.getElementsByClassName('ranking_headline')[cnt].querySelector('a'));

    }
}

//////////////////////////////////////////////////////////////////여기까지는 랭킹뉴스 구역입니당!/////////////////////////////////////////////////////////////////////////////

whale.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message == 'end') {
        index = contentList.length;
        whale.runtime.sendMessage(contentTitle[index-1]);
        contentObject[index-1].scrollIntoView();
    }
    else if (message == 'start') {
         index = 1;
         whale.runtime.sendMessage(contentTitle[index-1]);
         contentObject[index-1].scrollIntoView();
    }
    else if (message == 'next') {
        if(index == contentList.length) {
            
            if(getUrl[0] == 'https://news.naver.com/main/list.nhn') { // 속보 페이징
                if(document.querySelector('div.paging').querySelector('strong').nextElementSibling != null) {
                    whale.runtime.sendMessage("다음 페이지로 넘어갑니다.");
                    document.querySelector('div.paging').querySelector('strong').nextElementSibling.click();
                }
                else {
                    index = contentList.length;
                    whale.runtime.sendMessage(contentTitle[index-1]);
                }
            }
            else if(getUrl[0] == "https://news.naver.com/main/ranking/popularDay.nhn") { // 랭킹뉴스 목록 처음으로
                index = 1;
                whale.runtime.sendMessage(contentTitle[index-1]);
                contentObject[index-1].scrollIntoView();
            }
            
        }
        else {
            index++;
            whale.runtime.sendMessage(contentTitle[index-1]);
            contentObject[index-1].scrollIntoView();
        }
    }
    else if(message == 'before') {
        if(index == 1 || index == 0) {
            
            if(getUrl[0] == 'https://news.naver.com/main/list.nhn') { // 속보 페이징
                if(document.querySelector('div.paging').querySelector('strong').previousElementSibling != null) {
                    document.querySelector('div.paging').querySelector('strong').previousElementSibling.click();
                    whale.runtime.sendMessage("이전 페이지로 돌아갑니다.");
                }
                else {
                    index = 1;
                    whale.runtime.sendMessage(contentTitle[index-1]);
                }
            }
            else if(getUrl[0] == 'https://news.naver.com/main/ranking/popularDay.nhn') { // 랭킹뉴스 목록 마지막으로
                index = contentList.length;
                whale.runtime.sendMessage(contentTitle[index-1]);
                contentObject[index-1].scrollIntoView();
            }
            
        }
        else {
            index--;
            whale.runtime.sendMessage(contentTitle[index-1]);
            contentObject[index-1].scrollIntoView();
        }
    }
    else if(message == 'select') {
        if(index == 0) whale.runtime.sendMessage("제목을 선택해 주세요.");
        else {
            location.href = contentLink[index-1];
            whale.storage.local.set({'savedIndex' : index});
            whale.storage.local.get(['page'], function(items){
                whale.runtime.sendMessage(items.page);
            });
        }
    }
    else if(message == 'back') {
        whale.storage.local.set({'savedIndex' : 0});
        if(getUrl[0] == 'https://news.naver.com/main/list.nhn') {
            whale.storage.local.get(['bknews'], function(items){
                whale.runtime.sendMessage(items.bknews);
                location.href = 'https://news.naver.com/main/list.nhn?mode=LSD&mid=sec&sid1=001';
            });
        }
        else if(getUrl[0] == 'https://news.naver.com/main/ranking/popularDay.nhn') {
            whale.storage.local.get(['rknews'], function(items){
                whale.runtime.sendMessage(items.rknews);
                history.back();
            });
        }
    }
});