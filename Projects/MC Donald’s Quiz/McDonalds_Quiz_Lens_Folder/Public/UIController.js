// -----JS CODE-----
// @input Component.ScriptComponent questionScript
// @input Component.ScriptComponent leftAnswerScript
// @input Component.ScriptComponent rightAnswerScript
// @input SceneObject StartObject
// @input SceneObject questionObject
// @input SceneObject AnswerObject
// @input SceneObject EndObject
// @input int answerCount

// @input Component.ScriptComponent resultGradient
// @input Component.ScriptComponent resultBackdrop
// @input Component.ScriptComponent resultText

// @input SceneObject tiltImage
// @input SceneObject headImage
// @input SceneObject tiltText

var decisions = "";

const Stage = {
    kStart: 0,
    kQuest: 1,
    kEnd: 2
}

const Result = {
    kMilkshake: 0,
    kVanillaCone: 1,
    kMcFlurry: 2,
    kSundae: 3
}

var stage = Stage.kStart; 

var questionIndex = 0;
var answerIndex = 0;

function setResultImage(result){
    switch(result){
        case Result.kMilkshake:
        script.resultGradient.api.setMilkshakeTexture();
        script.resultBackdrop.api.setMilkshakeTexture();
        script.resultText.api.setMilkshakeTexture();
        break;
        case Result.kVanillaCone:
        script.resultGradient.api.setVanillaConeTexture();
        script.resultBackdrop.api.setVanillaConeTexture();
        script.resultText.api.setVanillaConeTexture();
        break;
        case Result.kMcFlurry:
        script.resultGradient.api.setMcFlurryTexture();
        script.resultBackdrop.api.setMcFlurryTexture();
        script.resultText.api.setMcFlurryTexture();
        break;
        case Result.kSundae:
        script.resultGradient.api.setSundaeTexture();
        script.resultBackdrop.api.setSundaeTexture();
        script.resultText.api.setSundaeTexture();
        break;
    }
    
}

function changeStageStart(){
    stage = Stage.kStart;
    script.StartObject.enabled = true;
    script.questionObject.enabled = true;
    script.AnswerObject.enabled = false;
    script.EndObject.enabled = false;    
    questionIndex = 0;
    changeImageQuestion(questionIndex);
}

function changeStageQuest(){
    stage = Stage.kQuest;
    script.StartObject.enabled = false;
    script.questionObject.enabled = true;
    script.AnswerObject.enabled = true;
    script.EndObject.enabled = false;    
    questionIndex = 1;
    answerIndex = 0;
    changeImageQuestion(questionIndex);
    changeImageAnswer(script.leftAnswerScript,answerIndex);
    changeImageAnswer(script.rightAnswerScript,answerIndex);
}

function changeStageEnd(){
    stage = Stage.kEnd;
    script.StartObject.enabled = false;
    script.questionObject.enabled = false;
    script.AnswerObject.enabled = false;
    script.EndObject.enabled = true;  
    setResultImage();
         var result;
        switch(decisions){
            case "LLLLL":
            print("VanillaCone");
            result = Result.kVanillaCone;
            break;
            case "LLLLR":
            print("VanillaCone");
            result = Result.kVanillaCone;
            break;
            case "LLLRR":
            print("VanillaCone");
            result = Result.kVanillaCone;
            break;
            case "LLRRR":
            print("McFlurry");
            result = Result.kMcFlurry;
            break;
            case "LRRRR":
            print("McFlurry");
            result = Result.kMcFlurry;
            break;
            case "RRRRR":
            print("McFlurry");
            result = Result.kMcFlurry;
            break;
            case "RRRRL":
            print("Sundae");
            result = Result.kSundae;
            break;
            case "RRRLL":
            print("Sundae");
            result = Result.kSundae;
            break;
            case "RRLLL":
            print("Milkshake");
            result = Result.kMilkshake;
            break;
            case "RLLLL":
            print("VanillaCone");
            result = Result.kVanillaCone;
            break;
            default:
            result = Result.kMilkshake;
            break;
        }
            setResultImage(result);
}

function changeImageQuestion(index){
    script.questionScript.getSceneObject().getComponent("Component.Image").mainPass.baseTex 
        = script.questionScript.api.getQuestionTexture(index); 
}

function changeImageAnswer(answerScript, index){
    answerScript.getSceneObject().getComponent("Component.Image").mainPass.baseTex 
        = answerScript.api.getResultTextureUnselected(index); 
}

function changeImageAnswerSelected(answerScript, index){
    answerScript.getSceneObject().getComponent("Component.Image").mainPass.baseTex 
        = answerScript.api.getResultTextureSelected(index); 
}

function NextQuest(){
    if(stage != Stage.kQuest) return;
    questionIndex++;
    answerIndex++;
    if(answerIndex >= script.answerCount){
        changeStageEnd();
        return;
    }
    changeImageQuestion(questionIndex);
    changeImageAnswer(script.leftAnswerScript,answerIndex);
    changeImageAnswer(script.rightAnswerScript,answerIndex);
    
}

function AddDecision(decision){
    if(answerIndex >= script.answerCount){
        changeStageEnd();
        return;
    }
    decisions += decision;
    switch(decision){
        case "L":
        changeImageAnswerSelected(script.leftAnswerScript ,answerIndex);
        break;
        case "R":
        changeImageAnswerSelected(script.rightAnswerScript ,answerIndex);
        break;
    }
}

changeStageStart();

global.tiltEnterHead = function(decision){
    switch(stage){
        case Stage.kStart:
        global.tweenManager.startTween(script.tiltImage, "AlphaToZero");
        global.tweenManager.startTween(script.tiltText, "AlphaToZero");
        global.tweenManager.startTween(script.headImage, "AlphaToZero");
        break;
        case Stage.kQuest:
        AddDecision(decision);
        break;
    }
}

global.tiltExitHead = function(){
    switch(stage){
        case Stage.kStart:
        changeStageQuest();
        break;
        case Stage.kQuest:
        NextQuest();
        break;
    }
}