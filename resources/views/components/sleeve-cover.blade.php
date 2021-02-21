<!-- |||| Fichier Composant Guthenberg qui gère le slider principal |||| -->

<article @php post_class() @endphp>
    <div class="entry-summary">
        <!-- Les classes carousel et carousel-cell permettent de gèrer le slider Javascript -->
        <div class="carousel gallery block-home">
            <?php $rows = get_field('covers'); ?>
            @if($rows)
            @foreach($rows as $row)
            <?php $image = $row["image"];
            $color = $row['menu_color'] ?>
            <div class="carousel-cell cover-block" style='background:url({{$image}})' data-color="{{$color}}">
            </div>
            @endforeach
            @endif
        </div>
</article>