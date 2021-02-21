@extends('layouts.app')

<!-- |||| Fichier qui gère la création de page |||| -->

@section('content')
<div class="overlay"></div>
@while(have_posts()) @php the_post() @endphp
@include('partials.content-page')

@endwhile
@endsection