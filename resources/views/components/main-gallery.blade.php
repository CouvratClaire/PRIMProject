<article @php post_class() @endphp>
  <div class="entry-summary">
    <?php $images = get_field("images");
    $len = count($images);
    $firsthalf = array_slice($images, 0, $len / 2);
    $secondhalf = array_slice($images, $len / 2);
    ?>
    <div class="container row big">
      <div class="column-double left">
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