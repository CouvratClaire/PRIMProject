 <article @php post_class() @endphp>
   <div class="entry-summary">
     <?php
      $image = get_field('image');
      $castShadow = get_field('cast_shadow');
      $sceneName = get_field("three_scene_name");
      $descriptionENG = get_field("english_description");
      $descriptionFR = get_field("french_description");
      $hdri = json_encode(get_field("background_image"));
      $ambientLight = get_field("ambient_light");
      $directionalLight = get_field("directional_light");
      $spotlight = get_field("spotlight_light");
      $lightsArray = array("ambient" => $ambientLight, "directional" => $directionalLight, "spotlight" => $spotlight);
      $lights = json_encode($lightsArray); ?>

     <div class="containerInside columns">
       <div class="column-big">
         <div class="canvasContainer" data-castShadow="{{$castShadow}}" data-sceneName="{{$sceneName}}" data-hdri="{{$hdri}}" data-lights="{{$lights}}">
           <img class="canvasImage" src="{{$image}}">
         </div>
       </div>
       <div class="column-small">
         <div class="canvasDescription">{{$descriptionENG}}</div>
         <div class="canvasDescription">{{$descriptionFR}}</div>
       </div>
     </div>
   </div>
 </article>