<!-- |||| Fichier Composant Guthenberg qui gère les page Produits |||| -->

<article @php post_class() @endphp>
    <div class="entry-summary preparation">
        <?php
        // Récupère les informations du WordPress
        $descriptionENG = get_field("english_description");
        $descriptionFR = get_field("french_description");
        $year = get_field("year");
        $location = get_field("places");
        $images = get_field("images")
        ?>
        <div class="containerInside columns">
            <div class="column-small">
                <div class="product-title">{{get_the_title()}}</div>
                <div class="product-description">{{$descriptionFR}}</div>
                <div class="product-description"><span class="infos">Année : </span>{{$year}}</div>
                <div class="product-description"><span class="infos">Location : </span>{{$location}}</div>
            </div>
            <div class="column-big">
                @foreach($images as $key => $image)
                <!-- Pour chaque image, si comporte du 3D : Ouvre le fichier qui gère l'intégration 3D -->
                @if($image['image']['is_3d'])
                @include('partials.three-components', [
                'item' => $image['image']['3d_data'],
                'image' => $image['image']['image_url'],
                'first' => $key === 0,
                ])

                @else
                @if($key === 0)
                <!-- Sinon, si première image : Participe à l'animation -> Classes "visible" -->
                <div class="imageContainer visible">
                    <img src="{{$image['image']['image_url']}}" width="100%">
                </div>
                @else
                <div class="imageContainer">
                    <img src="{{$image['image']['image_url']}}" width="100%">
                </div>
                @endif
                @endif

                @endforeach
            </div>

        </div>
</article>