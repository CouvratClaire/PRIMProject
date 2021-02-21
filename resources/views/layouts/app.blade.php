<!-- |||| Fichier qui gère le layout de l'application |||| -->

<!doctype html>
<html {!! get_language_attributes() !!}>
@include('partials.head')

<body @php body_class() @endphp>
  @php do_action('get_header') @endphp
  <!-- Importe le header -->
  @include('partials.header')
  <div class="wrap" role="document">
    <div class="content">
      <main class="main">
        <!-- Affiche le contenu de la page -->
        @yield('content')
      </main>
    </div>
  </div>
  @php do_action('get_footer') @endphp
  <!-- Importe le footer -->
  @include('partials.footer')
  @php wp_footer() @endphp
</body>

</html>