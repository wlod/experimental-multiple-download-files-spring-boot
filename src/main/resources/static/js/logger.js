function logCookieValueByName(message, cookieName, breakSection) {
    _appendLogContainer("<span>" + message + "</span> <span>cookie value: [" + readCookie(cookieName) + "]</span>", breakSection);
}

function logCookieValue(message, cookieValue, breakSection) {
    _appendLogContainer("<span>" + message + "</span> <span>cookie value: [" + cookieValue + "]</span>", breakSection);
}

function _appendLogContainer(innerHTML, breakSection) {
    const logContainer = document.getElementById("right");
    logContainer.innerHTML += innerHTML;
    
    let isSection = breakSection || false;
    if(isSection) {
        logContainer.innerHTML += "<hr/>";
    }
    else {
        logContainer.innerHTML += "<br/>";        
    }
    
}