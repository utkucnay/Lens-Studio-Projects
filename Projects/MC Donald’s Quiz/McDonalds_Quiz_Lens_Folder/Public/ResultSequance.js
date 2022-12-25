// -----JS CODE-----

// @input Asset.Texture[] resultTextureUnselected
// @input Asset.Texture[] resultTextureSelected

script.api.getResultTextureUnselected = function (index){
    return script.resultTextureUnselected[index];
}

script.api.getResultTextureSelected = function(index){
    return script.resultTextureSelected[index];
}