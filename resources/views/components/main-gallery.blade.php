<!-- |||| Fichier Composant Guthenberg qui gère la gallerie principale|||| -->

<article @php post_class() @endphp>
  <div class="entry-summary">
    <?php
    // Récupère les images et sépare en 2 groupes pour la grille
    $images = get_field("images");
    $len = count($images);
    $firsthalf = array_slice($images, 0, $len / 2);
    $secondhalf = array_slice($images, $len / 2);
    ?>
    <!-- Les classes "column-double left" et "column-double right" gèrent la disposition des images dans la grille -->
    <div class="container row big">
      <div class="column-double left">
        <!-- Ouvre le fichier object-image pour le placement et la gestion des vidéos d'animation/liens -->
        @foreach($firsthalf as $key => $object)
        @include('partials.object-image', [
        'object' => $object
        ])
        @endforeach

      </div>
      <div class="column-double right">
        @foreach($secondhalf as $key => $object)
        @include('partials.object-image', [
        'object' => $object
        ])
        @endforeach
      </div>
    </div>
  </div>
</article>