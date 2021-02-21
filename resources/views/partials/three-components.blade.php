<!-- |||| Fichier qui gère les photos avec intégration 3D |||| -->

<?php
// Récupère les informations du WordPress
$castShadow = $item['cast_shadow'];
$sceneName = $item["three_scene_name"];
$hdri = json_encode($item["background_image"]);
$ambientLight = $item["ambient_light"];
$directionalLight = $item["directional_light"];
$spotlight = $item["spotlight_light"];
$lightsArray = array("ambient" => $ambientLight, "directional" => $directionalLight, "spotlight" => $spotlight);
$lights = json_encode($lightsArray);
?>
<!-- Si première photo de la page : Participe à l'animation donc classe "visible" -->
@if($first)
<!-- La classe canvasContainer est celle responsable pour la création de la fenềtre 3D.
    La classe closeCanvas est responsable pour la fermeture de la fenêtre 3D.
    La classe canvasImage gère la disparition / apparition de l'image en fonction de la fenêtre 3D.
-->
<div class="canvasContainer visible" data-castShadow="{{$castShadow}}" data-sceneName="{{$sceneName}}" data-hdri="{{$hdri}}" data-lights="{{$lights}}">
    <img class="closeCanvas" src="@asset('images/close.svg')" width="30px">
    <div class="imageContainer">
        <img class="canvasImage" src="{{$image}}" width="100%">
    </div>
</div>
@else
<div class="canvasContainer" data-castShadow="{{$castShadow}}" data-sceneName="{{$sceneName}}" data-hdri="{{$hdri}}" data-lights="{{$lights}}">
    <img class="closeCanvas" src="@asset('images/close.svg')" width="30px">
    <div class="imageContainer">

        <img class="canvasImage" src="{{$image}}" width="100%">
    </div>
</div>
@endif