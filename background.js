//whale.commands.onCommand.addListener(function (command) {
//    if (command === `Home`){
//        whale.tabs.update({
//            url: `http://news.naver.com/`
//        });
//    }
//});

whale.tts.speak("컨트롤과 함께 스페이스 바를 누르면 히어뉴스를 실행 및 종료할 수 있습니다.", {
    'lang': 'ko',
    'pitch': 1.5,
    'rate': 1.5,
    'enqueue': false
});

whale.storage.local.set({'useExplain' : true});
// 스토리지에 useExplain 초기화

whale.storage.local.set({'savedIndex' : 0});
// 스토리지에 인덱스 저장

var explain = [
        "컨트롤과 함께 오른쪽, 왼쪽 방향키를 눌러 메뉴를 선택하세요. 컨트롤과 함께 아랫 방향키를 누르면 해당 메뉴로 이동합니다.",
    
        "컨트롤과 함께 오른쪽, 왼쪽 방향키를 눌러 제목을 선택하세요. 컨트롤과 함께 아랫 방향키를 누르면 해당 본문으로 이동합니다. 네이버 뉴스로 돌아가려면 컨트롤과 함께 윗 방향키를 눌러주세요.",
    
        "컨트롤과 함께 오른쪽, 왼쪽 방향키를 눌러 분야를 선택하세요. 컨트롤과 함께 아랫 방향키를 누르면 해당 분야로 이동합니다. 네이버 뉴스로 돌아가려면 컨트롤과 함께 윗 방향키를 눌러주세요.",
    
        "컨트롤과 함께 오른쪽, 왼쪽 방향키를 눌러 분야를 선택하세요. 컨트롤과 함께 아랫 방향키를 누르면 해당 분야로 이동합니다. 네이버 뉴스로 돌아가려면 컨트롤과 함께 윗 방향키를 눌러주세요.",
    
        "컨트롤과 함께 오른쪽, 왼쪽 방향키를 눌러 기사 제목을 선택하세요. 컨트롤과 알트 그리고 오른쪽, 왼쪽 방향키를 함께 누르면 페이지 내 마지막과 처음 기사를 선택할 수 있습니다. 컨트롤과 함께 아랫 방향키를 누르면 해당 기사의 본문으로 이동합니다. 다른 분야를 선택하려면 컨트롤과 함께 윗 방향키를 눌러주세요.",
    
        "컨트롤과 함께 오른쪽 방향키를 누르면 다음 문단, 컨트롤과 함께 왼쪽 방향키를 누르면 이전 문단으로 이동합니다. 해당 문단을 다시 들으려면 컨트롤과 함께 아랫 방향키를 눌러주세요. 다른 기사를 선택하려면 컨트롤과 함께 윗 방향키를 눌러주세요."
];

var intro = function() {
    whale.storage.local.get(['useExplain'], function(value){
        if(value.useExplain){
            
            whale.storage.local.set({
                
                home: "히어 뉴스 홈으로 이동합니다. " + explain[0] + " 스페이스 바를 눌러 음성 매뉴얼을 종료 및 실행할 수 있습니다.",
                
                hdline: "헤드라인뉴스 메뉴입니다. " + explain[1] + " 스페이스 바를 눌러 음성 매뉴얼을 종료 및 실행할 수 있습니다.",
                
                bknews: "속보 메뉴입니다. " + explain[2] + " 스페이스 바를 눌러 음성 매뉴얼을 종료 및 실행할 수 있습니다.",
                
                rknews: "랭킹뉴스 메뉴입니다. " + explain[3] + " 스페이스 바를 눌러 음성 매뉴얼을 종료 및 실행할 수 있습니다.",
                
                list: "분야입니다. " + explain[4] + " 스페이스 바를 눌러 음성 매뉴얼을 종료 및 실행할 수 있습니다.",
                
                page: "선택한 기사로 들어왔습니다. " + explain[5] + " 스페이스 바를 눌러 음성 매뉴얼을 종료 및 실행할 수 있습니다."
                
            });
        }
        else if(!value.useExplain){
            
            whale.storage.local.set({
                
                home: "히어 뉴스 홈으로 이동합니다. 스페이스 바를 눌러 음성 매뉴얼을 종료 및 실행할 수 있습니다.",
                
                hdline: "헤드라인뉴스 메뉴입니다. 스페이스 바를 눌러 음성 매뉴얼을 종료 및 실행할 수 있습니다.",
                
                bknews: "속보 메뉴입니다. 스페이스 바를 눌러 음성 매뉴얼을 종료 및 실행할 수 있습니다.",
                
                rknews: "랭킹뉴스 메뉴입니다. 스페이스 바를 눌러 음성 매뉴얼을 종료 및 실행할 수 있습니다.",
                
                list: "분야입니다. 스페이스 바를 눌러 음성 매뉴얼을 종료 및 실행할 수 있습니다.",
                
                page: "선택한 기사로 들어왔습니다. 스페이스 바를 눌러 음성 매뉴얼을 종료 및 실행할 수 있습니다."
                
            });
        }
    });
}

intro();

whale.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.includes('http')){
        var msgArray;
        
        if(message.includes('&')) msgArray = message.split('&');
        
        var views = whale.extension.getViews({
            type: 'popup'
        });
        
        for (var i = 0; i < views.length; i++) {
            if(message == 'https://news.naver.com/') {
                
                 
                views[i].document.getElementById('popup_ctrl').innerHTML = "<b>Ctrl + →<p>Ctrl +  ←<p>Ctrl + ↓<p>Ctrl + ↑<p>Ctrl + Space  <p>Space Bar</b>"
                views[i].document.getElementById('popup_text').innerHTML = "<b>다음 메뉴<p>이전 메뉴<p>메뉴 선택  <p>뒤로 가기<p>히어뉴스 실행/종료<p>음성 매뉴얼 종료/실행</b>";
            }
            else if(message.includes('home.nhn')) {
                views[i].document.getElementById('popup_ctrl').innerHTML = "<b>Ctrl + →<p>Ctrl +  ←<p>Ctrl + ↓<p>Ctrl + ↑<p>Ctrl + Space<p>Space Bar</b>";
                
                views[i].document.getElementById('popup_text').innerHTML = "<b>다음 기사<p>이전 기사<p>기사 선택<p>네이버 뉴스로 이동<p>히어뉴스 실행/종료<p>음성 매뉴얼 종료/실행</b>";
                    
            }
            
            else if(message.includes('sid1=001')) {
                views[i].document.getElementById('popup_ctrl').innerHTML = "<b>Ctrl + →<p>Ctrl +  ←<p>Ctrl + ↓<p>Ctrl + ↑<p>Ctrl + Space<p>Space Bar</b>";
                
                views[i].document.getElementById('popup_text').innerHTML =  "<b>다음 분야<p>이전 분야<p>분야 선택<p>네이버 뉴스로 이동<p>히어뉴스 실행/종료<p>음성 매뉴얼 종료/실행</b>";
                    
            } else if(message.includes('sid1=111')) {
                views[i].document.getElementById('popup_ctrl').innerHTML = "<b>Ctrl + →<p>Ctrl +  ←<p>Ctrl + ↓<p>Ctrl + ↑<p>Ctrl + Space<p>Space Bar</b>";  
                
                 views[i].document.getElementById('popup_text').innerHTML =  "<b>다음 분야<p>이전 분야<p>분야 선택<p>네이버 뉴스로 이동<p>히어뉴스 실행/종료<p>음성 매뉴얼 종료/실행</b>";
            }
            
                else if(msgArray[msgArray.length - 1].includes('sid1=10') || msgArray[msgArray.length - 1].includes('sectionId=10') || msgArray[msgArray.length - 1].includes('page')) {
                views[i].document.getElementById('popup_ctrl').innerHTML = "<b>Ctrl + →<p>Ctrl +  ←<p>Ctrl + ↓<p>Ctrl + ↑<p>Ctrl + Alt + →  <p>Ctrl + Alt + ←<p>Ctrl + Space<p>Space Bar</b>";
                views[i].document.getElementById('popup_text').innerHTML = "<b>다음 기사(다음 페이지)<p>이전 기사(이전 페이지)<p>기사 선택<p>분야 선택으로 이동<p>페이지 내 마지막 기사<p> 페이지  내 첫 번째 기사<p>히어뉴스 실행/종료<p>음성 매뉴얼 종료/실행</b>";
            }
            
            else if(message.includes('read.nhn')) {
                 views[i].document.getElementById('popup_ctrl').innerHTML ="<b>Ctrl + →<p>Ctrl +  ←<p>Ctrl + ↓<p>Ctrl + ↑<p>Ctrl + Space<p>Space Bar</b>";
                views[i].document.getElementById('popup_text').innerHTML = " <b>다음 문단<p>이전 문단<p>다시 듣기<p>기사 목록으로 이동<p>히어뉴스 실행/종료<p>음성 매뉴얼 종료/실행</b>";
            }
        }
    }
    else {
        whale.tts.speak(message, {
            'lang': 'ko',
            'pitch': 1.5,
            'rate': 1.5,
            'enqueue': false

        });
    }
});

whale.runtime.onConnect.addListener(function(port) {
    port.onDisconnect.addListener(function() {
        whale.tts.speak("히어 뉴스를 종료합니다.", {
            'lang': 'ko',
            'pitch': 1.5,
            'rate': 1.5,
            'enqueue': false

        });
        whale.storage.local.set({'popupStatus' : false});
    });
});