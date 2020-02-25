whale.runtime.sendMessage(location.href);

var index = 0;
var arrList = new Array("정치", "경제", "사회", "생활 문화", "세계", "아이티 과학");

var varLink = "https://news.naver.com/main/list.nhn?mode=LSD&mid=sec&sid1=10";

whale.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message == 'next') {
        if(index == 6) index = 1;
        else index++;
        whale.runtime.sendMessage(arrList[index-1]);
    }
    else if(message == 'before') {
        if(index == 1 || index == 0) index = 6;
        else index--;
        whale.runtime.sendMessage(arrList[index-1]);
    }
    else if(message == 'select') {
        if(index == 0) whale.runtime.sendMessage("분야를 선택해 주세요.");
        else {
            location.href = varLink + (index-1);
            whale.storage.local.get(['list'], function(items){
                whale.runtime.sendMessage(arrList[index-1] + items.list);
            });
        }
    }
    else if(message == 'back') {
        whale.storage.local.get(['home'], function(items){
            whale.runtime.sendMessage(items.home);
        });
        location.href = 'http://news.naver.com/';
    }
});