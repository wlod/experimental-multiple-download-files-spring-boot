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
	    eraseCookie(COOKIE_DOWNLOAD_STATUS);
	    appendLinks(filesToDownload, 0);
	}
}

function appendLinks(filesToDownload, index) {
    if(index > (filesToDownload.length - 1)) {
        return;
    }
    
    let file = filesToDownload[index];
    
    createCookie(COOKIE_DOWNLOAD_STATUS, file);
    
    listenCookieChange(COOKIE_DOWNLOAD_STATUS, () => {
        appendLinks(filesToDownload, ++index);
    });
    appendLink(file);
}


function appendLink(file) {
    logCookieValueByName("Cookie before create link:", COOKIE_DOWNLOAD_STATUS);
    const linkId = "download-" + _genId(file);
	_appendLogContainer('Append link to DOM: <a href="/download?file='+ file +'" id="'+ linkId +'" download="'+ file +'">' + file + '</a>');
	_clickElementId(linkId);
	logCookieValueByName("Cookie after click link:", COOKIE_DOWNLOAD_STATUS, true);
}

function _genId(file) {
	return btoa(file).replace(/\=/g, "");
}

function _clickElementId(domId) {
    document.getElementById(domId).click();
}