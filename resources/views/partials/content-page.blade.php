<!-- |||| Fichier de base - Nécessaire au fonctionnement |||| -->

@php the_content() @endphp
{!! wp_link_pages(['echo' => 0, 'before' => '<nav class="page-nav">
    <p>' . __('Pages:', 'sage'), 'after' => '</p>
</nav>']) !!}