<header class="banner js-menu">
  <div class="header-container">
    <!-- <a class="brand" href="{{ home_url('/') }}">{{ get_bloginfo('name', 'display') }}</a> -->
    <?php $pageAbout = get_page_by_title("A propos")->guid; ?>
    <nav class="nav-primary">
      <div class="row main-menu">
        <a class="home" href="/"><img src="@asset('images/test_3.svg')" width="60px" /></a>
        <ul class="menu">
          <li class="menu-item"><a href="{{$pageAbout}}">A propos</a></li>
          <li class="menu-item">Savoir-Faire</li>
        </ul>
        <div class="contact">Contacter</div>
      </div>
      <!-- @if (has_nav_menu('primary_navigation'))
        {!! wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'nav']) !!}
      @endif -->
    </nav>
  </div>
</header>