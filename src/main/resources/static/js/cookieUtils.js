/**************************************************************
 * included from http://www.quirksmode.org/js/cookies.html
 *************************************************************/

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

/**************************************************************
 * included from http://jsfiddle.net/ArondeParon/5RsTm/4/ - modified by @wlodi
 *************************************************************/
const cookieRegistry = [];

function listenCookieChange(cookieName, callback) {
    
    if (!cookieRegistry[cookieName]) {
        cookieRegistry[cookieName] = readCookie(cookieName);
    }
    
    var intervalListener = setInterval(function() {
        const currentCookieValue = readCookie(cookieName);
        if (currentCookieValue !== cookieRegistry[cookieName]) {
            logCookieValue("Cookie after change:", currentCookieValue);
            console.info("Read cookie: " + cookieName + ", value: " + currentCookieValue + ", by intervalListener: " + intervalListener);
            // update registry so we dont get triggered again
            eraseCookie(cookieName);
            cookieRegistry[cookieName] = null;
            window.clearInterval(intervalListener);
            return callback();
        }
    }, 3000);
}