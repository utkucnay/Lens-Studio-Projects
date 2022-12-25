// -----JS CODE-----
// @input Asset.Texture milkshakeTexture;
// @input Asset.Texture sundaeTeture;
// @input Asset.Texture VanillaConeTexture;
// @input Asset.Texture McFlurryTexture;

script.api.setMilkshakeTexture = function(){
    script.getSceneObject().getComponent("Component.Image").mainPass.baseTex 
        = script.milkshakeTexture;
}

script.api.setSundaeTexture = function(){
    script.getSceneObject().getComponent("Component.Image").mainPass.baseTex 
        = script.sundaeTeture;
}

script.api.setVanillaConeTexture = function(){
    script.getSceneObject().getComponent("Component.Image").mainPass.baseTex 
        = script.VanillaConeTexture;
}

script.api.setMcFlurryTexture = function(){
    script.getSceneObject().getComponent("Component.Image").mainPass.baseTex 
        = script.McFlurryTexture;
}