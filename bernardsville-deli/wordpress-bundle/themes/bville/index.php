<?php
get_header();
?>
<section class="hero">
  <div class="hero-inner">
    <h1><?php esc_html_e('Updates', 'bville'); ?></h1>
  </div>
</section>
<?php
if (have_posts()) :
    while (have_posts()) :
        the_post();
        ?>
        <article <?php post_class(); ?> style="margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:1px solid rgba(20,40,32,.16)">
          <h2 class="line-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
          <?php the_excerpt(); ?>
        </article>
        <?php
    endwhile;
endif;
get_footer();
