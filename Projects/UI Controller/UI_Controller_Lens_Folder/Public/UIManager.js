// -----JS CODE-----

// @input Component.Image product; 
// @input Asset.Texture[] lipsProducts
// @input Asset.Texture[] faceProducts
// @input Asset.Texture[] eyesProducts

// @input Component.ScriptComponent eyesButton
// @input Component.ScriptComponent faceButton
// @input Component.ScriptComponent lipsButton

var lipsProductIndex = 0;
var faceProductIndex = 0;
var eyesProductIndex = 0;

const UIStage = {
    kLips: 0,
    kFace: 1,
    kEyes: 2
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function UpdateProduct(){
    switch(uiStage){
        case UIStage.kLips:
            script.product.mainPass.baseTex = script.lipsProducts[lipsProductIndex];
            break;
        case UIStage.kFace:
            script.product.mainPass.baseTex = script.faceProducts[faceProductIndex];
            break;
        case UIStage.kEyes:
            script.product.mainPass.baseTex = script.eyesProducts[eyesProductIndex];
            break;
    }
}

var uiStage = UIStage.kLips;

global.ChangeUIStageFace = function(){
    uiStage = UIStage.kFace;
    UpdateProduct();
    script.eyesButton.api.SetUnselectedButtonImage();
    script.faceButton.api.SetSelectedButtonImage();
    script.lipsButton.api.SetUnselectedButtonImage();
}

global.ChangeUIStageLips = function(){
    uiStage = UIStage.kLips;
    UpdateProduct();
    script.eyesButton.api.SetUnselectedButtonImage();
    script.faceButton.api.SetUnselectedButtonImage();
    script.lipsButton.api.SetSelectedButtonImage();
}

global.ChangeUIStageEyes = function(){
    uiStage = UIStage.kEyes;
    UpdateProduct();
    script.eyesButton.api.SetSelectedButtonImage();
    script.faceButton.api.SetUnselectedButtonImage();
    script.lipsButton.api.SetUnselectedButtonImage();
}

global.NextProduct = function(){
    switch(uiStage){
        case UIStage.kLips:
            lipsProductIndex++;
            lipsProductIndex = mod(lipsProductIndex, script.lipsProducts.length);
            script.product.mainPass.baseTex = script.lipsProducts[lipsProductIndex];
            break;
        case UIStage.kFace:
            faceProductIndex++;
            faceProductIndex = mod(faceProductIndex, script.faceProducts.length);
            script.product.mainPass.baseTex = script.faceProducts[faceProductIndex];
            break;
        case UIStage.kEyes:
            eyesProductIndex++;
            eyesProductIndex = mod(eyesProductIndex, script.eyesProducts.length);
            script.product.mainPass.baseTex = script.eyesProducts[eyesProductIndex];
            break;
    }
    
    
}

global.PreviousProduct = function(){
    switch(uiStage){
        case UIStage.kLips:
            lipsProductIndex--;
            lipsProductIndex = mod(lipsProductIndex, script.lipsProducts.length);
            script.product.mainPass.baseTex = script.lipsProducts[lipsProductIndex];
            break;
        case UIStage.kFace:
            faceProductIndex--;
            faceProductIndex = mod(faceProductIndex, script.faceProducts.length);
            script.product.mainPass.baseTex = script.faceProducts[faceProductIndex];
            break;
        case UIStage.kEyes:
            eyesProductIndex--;
            eyesProductIndex = mod(eyesProductIndex, script.eyesProducts.length);
            script.product.mainPass.baseTex = script.eyesProducts[eyesProductIndex];
            break;
    }
    
}

UpdateProduct();
