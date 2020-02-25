var port = whale.runtime.connect({name:"popup"});

whale.tabs.update({
    url: 'https://news.naver.com/'
});

whale.storage.local.set({'popupStatus' : true});
// 스토리지에 popup 상태 저장

var start_explain = "컨트롤과 함께 오른쪽, 왼쪽 방향키를 눌러 메뉴를 선택하세요. 컨트롤과 함께 아랫 방향키를 누르면 해당 메뉴로 이동합니다.";

whale.storage.local.get(['useExplain'], function(use){
    if(use.useExplain){
        whale.runtime.sendMessage("히어 뉴스를 실행합니다. " + start_explain + " 스페이스 바를 눌러 음성 매뉴얼을 종료 및 실행할 수 있습니다.");
    }else if(!use.useExplain){
        whale.runtime.sendMessage("히어 뉴스를 실행합니다. 스페이스 바를 눌러 음성 매뉴얼을 종료 및 실행할 수 있습니다.");
    }
});

var bgScript = whale.extension.getBackgroundPage();

document.onkeydown = function(event_key) {
    keyControl(event_key);
}

var keyControl = function(e) {
    if(e.altKey && e.ctrlKey && e.which == 39) {               
         whale.tabs.query({active: true, currentWindow: true}, function(tabs) {
            whale.tabs.sendMessage(tabs[0].id, 'end');                
        });
     }
    else if (e.ctrlKey && e.which == 39) {
        whale.tabs.query({active: true, currentWindow: true}, function(tabs) {
            whale.tabs.sendMessage(tabs[0].id, 'next');
        });
    }
    else if(e.altKey && e.ctrlKey && e.which == 37) {
         whale.tabs.query({active: true, currentWindow: true}, function(tabs) {
            whale.tabs.sendMessage(tabs[0].id, 'start');              
        });
    }
    else if(e.ctrlKey && e.which == 37) {
        whale.tabs.query({active: true, currentWindow: true}, function(tabs) {
            whale.tabs.sendMessage(tabs[0].id, 'before');
        });
    }
    else if(e.ctrlKey && e.which == 40) {
        whale.tabs.query({active: true, currentWindow: true}, function(tabs) {
            whale.tabs.sendMessage(tabs[0].id, 'select');
        });
    }
    else if(e.ctrlKey && e.which == 38) {
        whale.tabs.query({active: true, currentWindow: true}, function(tabs) {
            whale.tabs.sendMessage(tabs[0].id, 'back');
        });
    }
    else if(e.which == 32){
        whale.storage.local.get(['useExplain'], function(value){
            if(value.useExplain){
                whale.storage.local.set({'useExplain' : false});
                bgScript.intro();
                whale.runtime.sendMessage("음성 매뉴얼을 종료합니다.");
            }else if(!value.useExplain){
                whale.storage.local.set({'useExplain' : true});
                bgScript.intro();
                whale.runtime.sendMessage("음성 매뉴얼을 실행합니다.");
            }
        });
    }
};