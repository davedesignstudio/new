<?php
get_header();
?>
<section class="hero">
  <div class="hero-inner">
    <h1 class="line-title" style="border:0;padding:0"><?php the_title(); ?></h1>
  </div>
</section>
<?php
if (have_posts()) :
    while (have_posts()) :
        the_post();
        the_content();
    endwhile;
endif;
get_footer();
