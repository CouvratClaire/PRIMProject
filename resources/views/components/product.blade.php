<article @php post_class() @endphp>
    <div class="entry-summary">
        <?php
        $descriptionENG = get_field("english_description");
        $descriptionFR = get_field("french_description");
        $year = get_field("year");
        $location = get_field("places");
        $images = get_field("images")
        ?>
        <div class="containerInside columns">
            <div class="column-big">
                @foreach($images as $image)

                @if($image['image']['is_3d'])
                @include('partials.three-components', [
                'item' => $image['image']['3d_data'],
                'image' => $image['image']['image_url'],
                ])

                @else
                <div class="imageContainer">
                    <img src="{{$image['image']['image_url']}}" width="100%">
                </div>
                @endif

                @endforeach
            </div>
            <div class="column-small">
                <div class="product-title">{{get_the_title()}}</div>
                <!-- <div class="canvasDescription">{{$descriptionENG}}</div> -->
                <div class="product-description">{{$descriptionFR}}</div>
                <div class="product-description"><span class="infos">Année : </span>{{$year}}</div>
                <div class="product-description"><span class="infos">Location : </span>{{$location}}</div>
            </div>
        </div>
</article>