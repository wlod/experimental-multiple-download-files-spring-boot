const COOKIE_NAME = "DOWNLOAD";

function multipleDownload(clickedDomElement) {
		
	const rawFilesToDownload = clickedDomElement.getAttribute('data-files');
	const filesToDownload = rawFilesToDownload.split(",").map(file => file.trim());
	
	if(filesToDownload.length === 0) {
	    return;
	}
	
	if(filesToDownload.length === 1) {
    	appendLink(filesToDownload[0]);
	}
	
	if(filesToDownload.length > 1) {
	    eraseCookie(COOKIE_NAME);
	    appendLinks(filesToDownload, 0);
	}
}

function appendLinks(filesToDownload, index) {
    if(index > (filesToDownload.length - 1)) {
        return;
    }
    
    let file = filesToDownload[index];
    
    createCookie(COOKIE_NAME, file);
    listenCookieChange(COOKIE_NAME, function() {
        appendLinks(filesToDownload, ++index);
    });
    appendLink(file);
}


function appendLink(file) {
    const linkId = "download-" + _genId(file);
	document.getElementById("right").innerHTML += '<a href="/download?file='+ file +'" id="'+ linkId +'" download="'+ file +'">' + file + '</a><br />';
	document.getElementById(linkId).click();
}

function _genId(file) {
	return btoa(file).replace(/\=/g, "");;
}