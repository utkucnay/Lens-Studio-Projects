// -----JS CODE-----

// -----JS CODE-----
// @input SceneObject[] objects
// @input string baseTweenName
// @input string uniqueTweenName


var objectIndex = 0;
var updateIndex = 0;
var startIndex = 0;
var endIndex = 0;
var startCommandIndex = 0;
var endCommandIndex = 0;
var pauseCommandIndex = 0;
var resetTweenIndex = 0;
var InitIndex = 0;

var Updates = [];
var Starts = [];
var Ends = [];
var StartCommands = [];
var EndCommands = [];
var PauseCommands = [];
var resetTweens = [];
var Inits = [];

script.api.tweenName = script.uniqueTweenName;

script.api.AddUpdate = function (update){
    Updates[updateIndex++] = update; 
}

script.api.AddStart = function (start){
    Starts[startIndex++] = start; 
}

script.api.AddEnd = function (end){
    Ends[endIndex++] = end; 
}

script.api.AddStartCommand = function (startCommand){
    StartCommands[startCommandIndex++] = startCommand; 
}

script.api.AddEndCommand = function (endCommand){
    EndCommands[endCommandIndex++] = endCommand; 
}

script.api.AddPauseCommand = function (pauseCommand){
    PauseCommands[pauseCommandIndex++] = pauseCommand; 
}

script.api.AddResetTween = function (resetTween){
    resetTweens[resetTweenIndex++] = resetTween; 
}

script.api.AddInit = function (init){
    Inits[InitIndex++] = init; 
}

const Stage = {
  kStart: 0,
  kUpdate: 1,
  kEnd: 2,
  kWait: 3,
  kFinish: 4,
  kInit: 5
};

var stage = Stage.kInit;

function Update()
{
    print("Update");
    stage = Stage.kWait;
    
    if(script.objects.length <= objectIndex) 
    {
        stage = Stage.kEnd;
        return;
    }
    
    for(var i = 0; i < updateIndex; i++){
        Updates[i](script.objects, objectIndex);
    }
    global.tweenManager.startTween(script.objects[objectIndex], "Move"
        , EndCommand, StartCommand, PauseCommand);
}

function Init(){
    for(var i = 0; i < InitIndex; i++){
        Inits[i](script.objects, objectIndex);
    }
}

function Start(){
    print("Start");
    
    objectIndex = 0;    
    
    stage = Stage.kStart;    
    
    for(var i = 0; i < startIndex; i++){
        Starts[i](script.objects, objectIndex);
    }
}

function End(){
    print("End");
    
    stage = Stage.kFinish;    
    
    for(var i = 0; i < endIndex; i++){
        Ends[i](script.objects, objectIndex);
    }
}

function StartCommand(){
    print("StartCommand");    
    for(var i = 0; i < startCommandIndex; i++){
        StartCommands[i](script.objects, objectIndex);
    }
}

function EndCommand(){
    print("EndCommand");
    
    for(var i = 0; i < endCommandIndex; i++){
        EndCommands[i](script.objects, objectIndex);
    }
    
    objectIndex++;
    stage = Stage.kUpdate;
    script.api.Exec();
}

function PauseCommand(){
    print("PauseCommand");
    
    for(var i = 0; i < pauseCommandIndex; i++){
        PauseCommands[i](script.objects, objectIndex);
    }
}

script.api.Exec = function Exec(){
    switch(stage){
        case Stage.kInit:
            Init();
        case Stage.kStart:
            Start();
        case Stage.kUpdate:
            Update();
            break;
    }
    switch(stage){
        case Stage.kEnd:
            End();
    }
}

script.api.ResetTween = function (){
    if(stage != Stage.kFinish) return;
    
    for(var i = 0; i < resetTweenIndex; i++){
        resetTweens[i](script.objects, objectIndex);
    }
    
    stage = Stage.kStart;    
}