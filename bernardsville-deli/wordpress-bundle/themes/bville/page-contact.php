<?php
/**
 * Template Name: Contact
 */
get_header();
$shop = function_exists('wc_get_page_id') ? get_permalink(wc_get_page_id('shop')) : home_url('/shop/');
?>
<header class="hero" style="padding-bottom:1rem">
  <div class="hero-inner">
    <p class="hero-kicker">Bville Pizza &amp; Grill</p>
    <h1>Contact</h1>
    <p class="hero-lede">Call ahead, or order online for pickup.</p>
  </div>
</header>

<div class="contact-block" style="display:grid;gap:1.25rem;max-width:36rem;margin-bottom:2rem">
  <p><strong>Phone</strong><br>
    <a href="tel:<?php echo esc_attr(bville_phone_raw()); ?>"><?php echo esc_html(bville_phone()); ?></a>
  </p>
  <p><strong>Address</strong><br><?php echo esc_html(bville_address()); ?></p>
  <p><strong>Hours</strong><br>Call the shop for today’s hours.</p>
  <p><a class="btn btn-primary" href="<?php echo esc_url($shop); ?>">Order online</a></p>
</div>

<?php while (have_posts()) : the_post(); the_content(); endwhile; ?>

<?php get_footer(); ?>
