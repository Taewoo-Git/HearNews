whale.runtime.sendMessage(location.href);

var index = 0;
var arrMenu = new Array("헤드라인 뉴스", "속보", "랭킹뉴스");

whale.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message == 'next') {
        if(index == 3) index = 1;
        else index++;
        whale.runtime.sendMessage(arrMenu[index-1]);
    }
    else if(message == 'before') {
        if(index == 1 || index == 0) index = 3;
        else index--;
        whale.runtime.sendMessage(arrMenu[index-1]);
    }
    else if(message == 'select') {
        if(index == 0) {
            whale.runtime.sendMessage("메뉴를 선택해 주세요.");
        }
        else if(index == 1){
            location.href='https://news.naver.com/main/home.nhn';
            whale.storage.local.get(['hdline'], function(items){
                whale.runtime.sendMessage(items.hdline);
            });
        }
        else if(index == 2){
            location.href='https://news.naver.com/main/list.nhn?mode=LSD&mid=sec&sid1=001';
            whale.storage.local.get(['bknews'], function(items){
                whale.runtime.sendMessage(items.bknews);
            });
        }
        else if(index == 3){
            location.href='https://news.naver.com/main/ranking/popularDay.nhn?mid=etc&sid1=111';
            whale.storage.local.get(['rknews'], function(items){
                whale.runtime.sendMessage(items.rknews);
            });
        }
    }
    else if(message == 'back') {
        whale.runtime.sendMessage("");
        history.back();
    }
});

