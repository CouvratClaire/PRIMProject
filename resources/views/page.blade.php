@extends('layouts.app')

@section('content')
<div class="overlay"></div>
@while(have_posts()) @php the_post() @endphp
@include('partials.content-page')

@endwhile
@endsection