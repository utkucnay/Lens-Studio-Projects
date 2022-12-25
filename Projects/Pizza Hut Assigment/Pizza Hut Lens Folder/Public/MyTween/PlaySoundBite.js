// -----JS CODE-----
// @input SceneObject object
// @input string tweenName;
// @input Component.AudioComponent biteAudio


function PlaySound(object, index){
    script.biteAudio.play(1);
}

global.tweenManager.findTween(script.object, script.tweenName).api.AddEndCommand(PlaySound);