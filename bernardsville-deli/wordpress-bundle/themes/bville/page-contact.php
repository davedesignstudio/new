<?php
/**
 * Template Name: Contact
 */
get_header();
$shop = bville_shop_url();
?>
<header class="hero" style="padding-bottom:1rem">
  <div class="hero-inner">
    <p class="hero-kicker">Visit · Call ahead</p>
    <h1>Contact</h1>
    <p class="hero-lede"><?php echo esc_html(bville_address()); ?></p>
  </div>
</header>

<div class="contact-grid">
  <div class="contact-block">
    <p><strong>Phone</strong><br>
      <a href="tel:<?php echo esc_attr(bville_phone_raw()); ?>"><?php echo esc_html(bville_phone()); ?></a>
    </p>
    <p><strong>Address</strong><br><?php echo esc_html(bville_address()); ?></p>
    <p><strong>Hours</strong><br>Open daily — call the shop for today’s hours.</p>
    <p><strong>Instagram</strong><br>
      <a href="<?php echo esc_url(bville_instagram()); ?>" target="_blank" rel="noopener me">@bvillepizzagrill</a>
    </p>
    <p><a class="btn btn-primary" href="<?php echo esc_url($shop); ?>">Order online</a></p>
  </div>
  <div class="map-card">
    <iframe
      title="Map to Bville Pizza and Grill"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      src="https://maps.google.com/maps?q=159+Morristown+Rd,+Bernardsville,+NJ+07924&output=embed"
    ></iframe>
  </div>
</div>

<?php
while (have_posts()) :
    the_post();
    if (trim((string) get_the_content()) !== '') {
        the_content();
    }
endwhile;
get_footer();
