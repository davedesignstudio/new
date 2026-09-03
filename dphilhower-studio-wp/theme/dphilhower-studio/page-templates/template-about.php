<?php
/**
 * Template Name: About
 *
 * @package DPhilhowerStudio
 */

get_header();

$about_src = dps_image_url( 'ember-menu-after.png' );
?>
<main id="main">
	<header class="page-hero">
		<p class="section-label"><?php esc_html_e( 'Studio', 'dphilhower-studio' ); ?></p>
		<h1><?php esc_html_e( 'About the studio', 'dphilhower-studio' ); ?></h1>
		<p><?php esc_html_e( 'We help independent restaurants look as exceptional as the food they serve. The first conversation is at your table.', 'dphilhower-studio' ); ?></p>
	</header>
	<section class="section about-layout" style="padding-top:0">
		<div class="about-copy">
			<p><?php esc_html_e( 'The first conversation is a meal, not a pitch. We sit at your restaurant — a two-top, the bar, or the pass — and talk the way hospitality people talk: who walks in, what they order, what the block already thinks you are.', 'dphilhower-studio' ); ?></p>
			<p><?php esc_html_e( 'Hospitality studios that last do discovery on the property. After the meal we write back what we heard, then draw and build so the room, the board, and the site feel like the same place. First talks are rarely about logos. They are about the guest, the food, and what has to live on glass.', 'dphilhower-studio' ); ?></p>
			<p><?php esc_html_e( 'Clear messaging over clutter. Modular systems over one-off assets. Collaboration over ego.', 'dphilhower-studio' ); ?></p>
			<p><?php esc_html_e( 'The site you are on is built the same way. Maroon rails, a black stage, gold as a rule — one construction, many scales. Type splits the labor. Color is relative to the field it sits on. We studied how modern workshops set books and rooms: steal the system, leave the costume. A pizza window does not need someone else’s alphabet.', 'dphilhower-studio' ); ?></p>
			<p><?php esc_html_e( 'D Philhower Studio is David Philhower’s practice. From 2018 to 2021 he was the graphic designer at Bville Pizza & Grill in Bernardsville. Freelance work as D Philhower design has run since 2019. Associate of Arts in Graphic Design, Sussex County Community College, 2017–2019. Based in Morris County, New Jersey.', 'dphilhower-studio' ); ?></p>
			<p><a class="btn btn-dark" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Invite us to the restaurant', 'dphilhower-studio' ); ?></a></p>
		</div>
		<div class="about-media">
			<img src="<?php echo esc_url( $about_src ); ?>" alt="<?php esc_attr_e( 'Cream restaurant menu on a table with a candle and a fork', 'dphilhower-studio' ); ?>" width="1536" height="1024">
		</div>
	</section>
	<section class="section" style="padding-top:0">
		<p class="section-label"><?php esc_html_e( 'How we look', 'dphilhower-studio' ); ?></p>
		<h2 class="section-title is-wide"><?php esc_html_e( 'The book, not the moodboard', 'dphilhower-studio' ); ?></h2>
		<div class="method-grid">
			<article class="method-item">
				<strong><?php esc_html_e( 'The stage', 'dphilhower-studio' ); ?></strong>
				<p><?php esc_html_e( 'A dark field with wine margins, like a bound volume on a table. Gold is the rule, not a texture dump. If the chrome shouts, the food cannot.', 'dphilhower-studio' ); ?></p>
			</article>
			<article class="method-item">
				<strong><?php esc_html_e( 'The index', 'dphilhower-studio' ); ?></strong>
				<p><?php esc_html_e( 'Numbers, labels, hours, and navigation stay grotesque and small. The sentence — the thing a guest remembers — stays serif. Two jobs. One page.', 'dphilhower-studio' ); ?></p>
			</article>
			<article class="method-item">
				<strong><?php esc_html_e( 'The brands', 'dphilhower-studio' ); ?></strong>
				<p><?php esc_html_e( 'Bville keeps orange and green. Cow Lick keeps the tongue. Philhower & O’Krogly keeps the blade. The studio does not sand them into one international style.', 'dphilhower-studio' ); ?></p>
			</article>
		</div>
	</section>
</main>
<?php
get_footer();
