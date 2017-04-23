function wrapSelectedText() {
    
    var sel = window.getSelection().getRangeAt(0);

    var anchor = window.getSelection().anchorNode;
    

    if( anchor.parentNode.tagName == "SPAN" ) {

        //console.log( anchor.parentNode.tagName +" -> "+ anchor.length );
        
        var p = $(anchor);
        if( p.parent("span").length ) p.unwrap("span");

        window.getSelection().removeAllRanges();
        
        return;

    }

    var selectedText = sel.extractContents();

    if( selectedText.childNodes[0] === undefined || !selectedText.childNodes[0].length ) return;


    if( $(selectedText).find("span").length ) {



        var span = document.createTextNode( $(selectedText).text() );

    } else {

        var span = document.createElement("span");
        span.appendChild(selectedText);

    }
    
    
    sel.insertNode(span);
    window.getSelection().removeAllRanges();
    
}