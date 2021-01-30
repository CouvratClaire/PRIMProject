<article @php post_class() @endphp>
    <div class="entry-summary">
        <div class="carousel gallery block-home">
            <?php $rows = get_field('covers'); ?>
            @if($rows)
            @foreach($rows as $row)
            <?php $image = $row["image"];
            $color = $row['menu_color'] ?>
            <!-- <div class="carousel-cell cover"> -->
            <div class="carousel-cell cover-block" style='background:url({{$image}})' data-color="{{$color}}">
            </div>
            <!-- </div>     -->
            @endforeach
            @endif
        </div>
</article>