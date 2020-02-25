whale.runtime.sendMessage(location.href);

document.querySelector("#today_main_news").scrollIntoView();

var index = 0;

whale.storage.local.get(['savedIndex'], function(items){
    if(items.savedIndex != 0) index = items.savedIndex;
});

var classList = document.getElementsByClassName('hdline_article_tit');
var contentTitle = [];
var contentLink = [];

for(cnt = 0; cnt < classList.length; cnt++){

    contentTitle.push(document.getElementsByClassName('hdline_article_tit')[cnt].querySelector('a').innerText);
    contentLink.push("https://news.naver.com" + document.getElementsByClassName('hdline_article_tit')[cnt].querySelector('a').getAttribute('href'));

}

whale.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message == 'next') {
        if(index == 5) index = 1;
        else index++;
        whale.runtime.sendMessage(contentTitle[index-1]);
    }
    else if(message == 'before') {
        if(index == 1 || index == 0) index = 5;
        else index--;
        whale.runtime.sendMessage(contentTitle[index-1]);
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
        whale.storage.local.get(['home'], function(items){
            whale.runtime.sendMessage(items.home);
        });
        history.back();
    }
});