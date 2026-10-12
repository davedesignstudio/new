<?php
/**
 * Template Name: Restaurant order system
 *
 * Design system for a restaurant brand: identity, menu, WooCommerce order, kitchen ticket, printer.
 *
 * @package DPhilhowerStudio
 */

get_header();

$received = null;
if ( isset( $_GET['received'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	$token    = sanitize_text_field( wp_unslash( $_GET['received'] ) );
	$received = get_transient( 'dps_ticket_' . $token );
}
$catalog  = dps_sample_menu_catalog();
$groups   = array();
foreach ( $catalog as $sku => $item ) {
	$groups[ $item['category'] ][ $sku ] = $item;
}
?>
<main id="main">
	<header class="page-hero">
		<p class="section-label"><?php esc_html_e( 'Design system', 'dphilhower-studio' ); ?></p>
		<h1><?php esc_html_e( 'Build the brand. Take the order. Print the ticket.', 'dphilhower-studio' ); ?></h1>
		<p><?php esc_html_e( 'Five layers, one restaurant. WooCommerce records the pickup order. The kitchen ticket is sent to the printer at the restaurant when the order is placed.', 'dphilhower-studio' ); ?></p>
	</header>

	<section class="section" style="padding-top:0">
		<div class="system-layers">
			<?php foreach ( dps_restaurant_system_layers() as $layer ) : ?>
				<article>
					<span class="process-num"><?php echo esc_html( $layer['num'] ); ?></span>
					<h3><?php echo esc_html( $layer['title'] ); ?></h3>
					<p><?php echo esc_html( $layer['copy'] ); ?></p>
				</article>
			<?php endforeach; ?>
		</div>
	</section>

	<section class="section" id="order">
		<p class="section-label"><?php esc_html_e( 'Studio sample', 'dphilhower-studio' ); ?></p>
		<h2 class="section-title"><?php esc_html_e( 'Ember Pie Co. pickup', 'dphilhower-studio' ); ?></h2>
		<p class="order-note"><?php esc_html_e( 'Ember Pie Co. is a studio identity, not a live account. The menu prices are set on the server. With WooCommerce active, this form creates a real order and the processing status sends the ticket. Without it, the same ticket still goes to the kitchen spool or the printer address in Customize → Kitchen printer.', 'dphilhower-studio' ); ?></p>
		<div class="order-desk">
			<div>
				<?php foreach ( $groups as $category => $items ) : ?>
					<div class="menu-group">
						<h3><?php echo esc_html( $category ); ?></h3>
						<?php foreach ( $items as $sku => $item ) : ?>
							<button class="menu-item" type="button" data-sku="<?php echo esc_attr( $sku ); ?>">
								<span>
									<b><?php echo esc_html( $item['name'] ); ?><span class="qty-badge"></span></b>
									<small><?php echo esc_html( $item['kitchen'] ); ?></small>
								</span>
								<span><?php echo esc_html( '$' . number_format( (float) $item['price'], 2 ) ); ?></span>
							</button>
						<?php endforeach; ?>
					</div>
				<?php endforeach; ?>
			</div>
			<form class="order-panel" id="order-form" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
				<h2><?php esc_html_e( 'Ticket', 'dphilhower-studio' ); ?></h2>
				<ul class="order-lines" id="order-lines"></ul>
				<p class="order-total"><span><?php esc_html_e( 'Total', 'dphilhower-studio' ); ?></span><span id="order-total">$0.00</span></p>
				<input type="hidden" name="action" value="dps_place_order">
				<?php wp_nonce_field( 'dps_place_order', 'dps_order_nonce' ); ?>
				<input type="hidden" name="items" id="order-items" value="[]">
				<label><?php esc_html_e( 'Name on the ticket', 'dphilhower-studio' ); ?>
					<input name="guest" required maxlength="80" autocomplete="name">
				</label>
				<label><?php esc_html_e( 'Phone', 'dphilhower-studio' ); ?>
					<input name="phone" type="tel" maxlength="24" autocomplete="tel">
				</label>
				<label><?php esc_html_e( 'Ready window', 'dphilhower-studio' ); ?>
					<input name="ready" maxlength="40" placeholder="<?php esc_attr_e( '6:30 PM', 'dphilhower-studio' ); ?>">
				</label>
				<label><?php esc_html_e( 'Note for the kitchen', 'dphilhower-studio' ); ?>
					<textarea name="note" rows="3" maxlength="240"></textarea>
				</label>
				<div class="order-actions">
					<button class="btn btn-primary" type="submit"><?php esc_html_e( 'Place order', 'dphilhower-studio' ); ?></button>
					<button class="btn btn-ghost" type="button" id="order-sample"><?php esc_html_e( 'Send a sample ticket', 'dphilhower-studio' ); ?></button>
					<button class="btn btn-ghost" type="button" id="order-clear"><?php esc_html_e( 'Clear', 'dphilhower-studio' ); ?></button>
				</div>
				<p class="order-status" id="order-status" role="status">
					<?php
					if ( isset( $_GET['order_error'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
						echo esc_html( sanitize_text_field( wp_unslash( $_GET['order_error'] ) ) );
					}
					?>
				</p>
			</form>
		</div>
		<section class="printer-slip" id="printer-received" <?php echo $received ? '' : 'hidden'; ?>>
			<h2><?php esc_html_e( 'Printer received', 'dphilhower-studio' ); ?></h2>
			<p><?php esc_html_e( 'This is the ticket that went to the restaurant printer.', 'dphilhower-studio' ); ?></p>
			<pre id="printer-ticket"><?php echo esc_html( $received && ! empty( $received['plain'] ) ? $received['plain'] : '' ); ?></pre>
		</section>
	</section>
</main>
<?php
get_footer();
