// -----JS CODE-----

// @input Component.Image button; 
// @input Asset.Texture SelectedButtonImage
// @input Asset.Texture UnselectedButtonImage

script.api.SetSelectedButtonImage = function (){
    script.button.mainPass.baseTex = script.SelectedButtonImage;
}

script.api.SetUnselectedButtonImage = function (){
     script.button.mainPass.baseTex = script.UnselectedButtonImage;
}