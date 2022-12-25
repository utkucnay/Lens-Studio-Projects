// -----JS CODE-----
// @input SceneObject binding

const TiltStage = {
    kTiltEnter: 0,
    kTiltUpdate: 1,
    kTiltExit: 2,
    kTiltNone: 3
}

const TiltDir = {
    kTiltLeft: "L",
    kTiltRight: "R"
}

var tiltStage = TiltStage.kTiltNone; 
var tiltDir = TiltDir.kTiltLeft;

function tiltEnter(tiltDir){
    print("Tilt enter");
    global.tiltEnterHead(tiltDir);
}

function tiltUpdate(tiltDir, bindRot){
    print("Tilt update");
    
    
    switch(tiltDir){
        case TiltDir.kTiltRight:
            if(bindRot.z > -0.05){
                tiltStage = TiltStage.kTiltExit; 
            }
            break;
        case TiltDir.kTiltLeft:
            if(bindRot.z < 0.05){
                tiltStage = TiltStage.kTiltExit; 
            }
            break;
    }    
    
}

function tiltExit(tiltDir){
    print("Tilt exit");
    global.tiltExitHead();
    
    
     tiltStage = TiltStage.kTiltNone; 
}

function onUpdate(){
    var bindRot = script.binding.getTransform().getWorldRotation();    
    
    if(bindRot.z < -0.15){
        tiltDir = TiltDir.kTiltRight;
         switch(tiltStage){
            case TiltStage.kTiltNone:
            tiltStage = TiltStage.kTiltEnter; 
        } 
    }
    
    if(0.15 < bindRot.z){
        tiltDir = TiltDir.kTiltLeft;
        switch(tiltStage){
            case TiltStage.kTiltNone:
            tiltStage = TiltStage.kTiltEnter; 
        }
    }   
    
    switch(tiltStage){
        case TiltStage.kTiltEnter:
        tiltEnter(tiltDir);
        tiltStage = TiltStage.kTiltUpdate;
        case TiltStage.kTiltUpdate:
        tiltUpdate(tiltDir, bindRot);
        break;
        case TiltStage.kTiltExit:
        tiltExit(tiltDir);
        tiltStage = TiltStage.kTiltNone;
        break;
    }  
    
    //print(bindRot);
}

var event = script.createEvent("UpdateEvent");
event.bind(onUpdate);