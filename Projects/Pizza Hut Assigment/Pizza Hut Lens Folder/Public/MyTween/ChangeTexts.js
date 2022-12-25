// -----JS CODE-----
// @input SceneObject object
// @input string tweenName;
// @input SceneObject[] textObjects
// @input int[] ChangeSeqIndex


function ChangeText(objects, index){
    for(var i = 0; i < script.ChangeSeqIndex.length; i++){
        if(index == script.ChangeSeqIndex[i]){
            script.textObjects[i].enabled = true;
            if(script.ChangeSeqIndex[i] != 0){
                script.textObjects[i - 1].enabled = false;
            }
        }
    }
}

function ChangeTextReset(objects, index){
    script.textObjects[script.ChangeSeqIndex.length - 1 ].enabled = false;
    script.textObjects[0].enabled = true;
}

global.tweenManager.findTween(script.object, script.tweenName).api.AddStartCommand(ChangeText);
global.tweenManager.findTween(script.object, script.tweenName).api.AddResetTween(ChangeTextReset);