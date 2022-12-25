// -----JS CODE-----

var firstPos;

var event = script.createEvent("TouchStartEvent");
event.bind(function(eventData)
{
    firstPos = eventData.getTouchPosition();
});

var event = script.createEvent("TouchEndEvent");
event.bind(function(eventData)
{
    var lastPos = eventData.getTouchPosition();
    
    var deltaMoveX = firstPos.x - lastPos.x;
    
    if(deltaMoveX > 0){
        global.NextProduct();
    }
    else if(deltaMoveX < 0){
        global.PreviousProduct();
    }
});