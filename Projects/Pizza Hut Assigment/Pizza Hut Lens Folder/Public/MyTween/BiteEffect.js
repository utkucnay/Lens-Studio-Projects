// -----JS CODE-----
// @input SceneObject object
// @input string tweenName;
// @input float biteSpeed
// @input SceneObject[] parallelObjects
// @input int[] parallelIndexs


var locDatas =[];
var locDataIndex = 0;

var locParallelDatas =[];
var locParallelDataIndex = 0;

function GetBaseData(objects,index){
    var i = 0;
    for(; i < objects.length; i++){
        locDatas[i] = objects[i].getTransform().getWorldPosition();
    }
    locDataIndex = i;
    
    i = 0;
    for(; i < script.parallelIndexs.length; i++){
        locParallelDatas[i] = script.parallelObjects[i].getTransform().getWorldPosition();
    }
    locParallelDataIndex = i;
}

function Update(objects,index){
    print("BiteEffect")
    
    global.tweenManager.findTween(objects[index], "Move").api.time = script.biteSpeed;
    global.tweenManager.findTween(objects[index], "Scale").api.time = script.biteSpeed;
    
    global.tweenManager.setEndValue(objects[index], "Move", 
        new vec3(0, -14.0, 0));
    global.tweenManager.setEndValue(objects[index], "Scale", 
        new vec3(0.5, 0.5, 1));
    global.tweenManager.startTween(objects[index], "Scale");
}

function DisableBite(objects,index){
    objects[index].enabled = false;
}

function ResetPizzaSlice(objects,index){
    for(var i = 0; i < locDataIndex; i++){
        objects[i].getTransform().setWorldPosition(locDatas[i]);
        objects[i].getTransform().setWorldScale(new vec3(5,5,1));
        objects[i].enabled = true;
    }
    for(var i = 0; i < locParallelDataIndex; i++){
        script.parallelObjects[i].getTransform().setWorldPosition(locParallelDatas[i]);
        script.parallelObjects[i].getTransform().setWorldScale(new vec3(5,5,1));
        script.parallelObjects[i].enabled = true;
    }
}

function parallelTween(objects, index){
    print("BiteEffect")
    var findIndex = -1;
    for(var i = 0; i < script.parallelIndexs.length; i++){
        if(script.parallelIndexs[i] == index){
            findIndex = i;
            break;
        }
    }    
    if(findIndex == -1) return;    
    
    global.tweenManager.findTween(script.parallelObjects[findIndex], "Move").api.time = script.biteSpeed;
    global.tweenManager.findTween(script.parallelObjects[findIndex], "Scale").api.time = script.biteSpeed;
    
    global.tweenManager.setEndValue(script.parallelObjects[findIndex], "Move", 
        new vec3(0, -14.0, 0));
    global.tweenManager.setEndValue(script.parallelObjects[findIndex], "Scale", 
        new vec3(0.5, 0.5, 1));
    global.tweenManager.startTween(script.parallelObjects[findIndex], "Scale");
    global.tweenManager.startTween(script.parallelObjects[findIndex], "Move");
}

function disableParallelTween(objects, index){
    print("BiteEffect")
    var findIndex = -1;
    for(var i = 0; i < script.parallelIndexs.length; i++){
        if(script.parallelIndexs[i] == index){
            findIndex = i;
            break;
        }
    }    

    if(findIndex == -1) return;    
    
    script.parallelObjects[findIndex].enabled = false;
}

var tweenSequance = global.tweenManager.findTween(script.object, script.tweenName); 
tweenSequance.api.AddUpdate(Update);
tweenSequance.api.AddEndCommand(DisableBite);
tweenSequance.api.AddInit(GetBaseData);
tweenSequance.api.AddResetTween(ResetPizzaSlice);
tweenSequance.api.AddStartCommand(parallelTween);
tweenSequance.api.AddEndCommand(disableParallelTween);