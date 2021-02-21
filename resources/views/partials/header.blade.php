<!-- |||| Fichier qui gère le header et menu |||| -->

<header class="banner js-menu">
  <div class="header-container">
    <?php
    // Va chercher le lien de la page "A propos"
    $pageAbout = get_page_by_title("A propos")->guid;
    ?>
    <nav class="nav-primary">
      <div class="row main-menu">
        <a class="home" href="/"><img class="logo" src="@asset('images/test_3.svg')" width="60px" /></a>
        <ul class="menu">
          <li class="menu-item"><a href="{{$pageAbout}}">A propos</a></li>
          <li class="menu-item">Savoir-Faire</li>
        </ul>
        <div class="contact">Contacter</div>
      </div>
    </nav>
  </div>
</header>