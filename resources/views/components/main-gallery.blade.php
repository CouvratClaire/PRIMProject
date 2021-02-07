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
        <?php $page = get_page_by_title($object['name']); ?>
        <div class="gallery_item-{{$key%2}} anim-on-click">
          @if($page->guid)
          <a class="item-click" href="{{$page->guid}}">
            <img class="gallery_image" src="{{$object['image']}}" />
          </a>
          @else
          <img class="gallery_image" src="{{$object['image']}}" />
          @endif
        </div>
        @endforeach
      </div>
      <div class="column-double right">
        @foreach($secondhalf as $key => $object)
        <?php $page = get_page_by_title($object['name']); ?>
        <div class="gallery_item-{{$key%2}} anim-on-click">
          @if($page->guid)
          <a class="item-click" href="{{$page->guid}}">
            <img class="gallery_image" src="{{$object['image']}}" />
          </a>
          @else
          <img class="gallery_image" src="{{$object['image']}}" />
          @endif
        </div>
        @endforeach
      </div>
    </div>
  </div>
</article>