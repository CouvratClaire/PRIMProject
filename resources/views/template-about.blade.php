{{--
  Template Name: About Template
--}}
<!-- |||| Template pour la page "A propos" |||| -->

@extends('layouts.app')

@section('content')
@while(have_posts()) @php the_post() @endphp
@include('partials.about')
@endwhile
@endsection