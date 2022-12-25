// -----JS CODE-----
// @input SceneObject object
// @input string tweenName;
// @input SceneObject[] disableObjectsWhenStart

function DisableFaceIncest(object, index){
    for(var i = 0; i < script.disableObjectsWhenStart.length; i++){
        script.disableObjectsWhenStart[i].enabled = false;
    }
}

function EnableFaceIncest(object, index){
    for(var i = 0; i < script.disableObjectsWhenStart.length; i++){
        script.disableObjectsWhenStart[i].enabled = true;
    }
}

global.tweenManager.findTween(script.object, script.tweenName).api.AddStart(DisableFaceIncest);
global.tweenManager.findTween(script.object, script.tweenName).api.AddResetTween(EnableFaceIncest);