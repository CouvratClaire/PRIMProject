<?php
$castShadow = $item['cast_shadow'];
$sceneName = $item["three_scene_name"];
$hdri = json_encode($item["background_image"]);
$ambientLight = $item["ambient_light"];
$directionalLight = $item["directional_light"];
$spotlight = $item["spotlight_light"];
$lightsArray = array("ambient" => $ambientLight, "directional" => $directionalLight, "spotlight" => $spotlight);
$lights = json_encode($lightsArray);
?>
@if($first)
<div class="canvasContainer visible" data-castShadow="{{$castShadow}}" data-sceneName="{{$sceneName}}" data-hdri="{{$hdri}}" data-lights="{{$lights}}">
    <div class="imageContainer">
        <img class="canvasImage" src="{{$image}}" width="100%">
    </div>
</div>
@else
<div class="canvasContainer" data-castShadow="{{$castShadow}}" data-sceneName="{{$sceneName}}" data-hdri="{{$hdri}}" data-lights="{{$lights}}">
    <div class="imageContainer">
        <img class="canvasImage" src="{{$image}}" width="100%">
    </div>
</div>
@endif