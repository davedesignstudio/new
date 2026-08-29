<?php
/**
 * Project inquiry form.
 *
 * @package DPhilhowerStudio
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handle contact form POST.
 */
function dps_handle_contact_form() {
	if ( empty( $_POST['dps_contact_submit'] ) ) {
		return;
	}

	$redirect = wp_get_referer() ? wp_get_referer() : home_url( '/contact/' );

	if ( ! isset( $_POST['dps_contact_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['dps_contact_nonce'] ) ), 'dps_contact' ) ) {
		wp_safe_redirect( add_query_arg( 'contact', 'error', $redirect ) );
		exit;
	}

	$honeypot = isset( $_POST['dps_company_url'] ) ? sanitize_text_field( wp_unslash( $_POST['dps_company_url'] ) ) : '';
	if ( '' !== $honeypot ) {
		wp_safe_redirect( add_query_arg( 'contact', 'sent', $redirect ) );
		exit;
	}

	$name     = isset( $_POST['dps_name'] ) ? sanitize_text_field( wp_unslash( $_POST['dps_name'] ) ) : '';
	$email    = isset( $_POST['dps_email'] ) ? sanitize_email( wp_unslash( $_POST['dps_email'] ) ) : '';
	$business = isset( $_POST['dps_business'] ) ? sanitize_text_field( wp_unslash( $_POST['dps_business'] ) ) : '';
	$need     = isset( $_POST['dps_need'] ) ? sanitize_text_field( wp_unslash( $_POST['dps_need'] ) ) : '';
	$notes    = isset( $_POST['dps_notes'] ) ? sanitize_textarea_field( wp_unslash( $_POST['dps_notes'] ) ) : '';

	if ( '' === $name || ! is_email( $email ) ) {
		wp_safe_redirect( add_query_arg( 'contact', 'error', $redirect ) );
		exit;
	}

	$to      = dps_contact_email();
	$subject = sprintf( '[D Philhower Studio] Project inquiry from %s', $name );
	$body    = "Name: {$name}\nEmail: {$email}\nRestaurant / town: {$business}\nNeed: {$need}\n\n{$notes}\n";
	$headers = array(
		'Content-Type: text/plain; charset=UTF-8',
		'Reply-To: ' . $name . ' <' . $email . '>',
	);

	$sent = wp_mail( $to, $subject, $body, $headers );
	wp_safe_redirect( add_query_arg( 'contact', $sent ? 'sent' : 'error', $redirect ) );
	exit;
}
add_action( 'template_redirect', 'dps_handle_contact_form' );

/**
 * Render the inquiry form.
 */
function dps_render_contact_form() {
	$status = isset( $_GET['contact'] ) ? sanitize_key( wp_unslash( $_GET['contact'] ) ) : '';
	if ( 'sent' === $status ) {
		echo '<p class="form-success">' . esc_html__( 'Thanks — the studio received your note and will reply with a time to sit down at the restaurant.', 'dphilhower-studio' ) . '</p>';
	} elseif ( 'error' === $status ) {
		echo '<p class="form-success" style="border-color:#8a3b2b">' . esc_html__( 'Something went wrong. Please check your name and email, or write hello@dphilhower.com directly.', 'dphilhower-studio' ) . '</p>';
	}
	?>
	<form class="contact-form" action="<?php echo esc_url( get_permalink() ); ?>" method="post">
		<?php wp_nonce_field( 'dps_contact', 'dps_contact_nonce' ); ?>
		<p class="dps-honeypot">
			<label>Company URL<input type="text" name="dps_company_url" value="" tabindex="-1" autocomplete="off"></label>
		</p>
		<label>
			<?php esc_html_e( 'Name', 'dphilhower-studio' ); ?>
			<input type="text" name="dps_name" required autocomplete="name">
		</label>
		<label>
			<?php esc_html_e( 'Email', 'dphilhower-studio' ); ?>
			<input type="email" name="dps_email" required autocomplete="email">
		</label>
		<label>
			<?php esc_html_e( 'Restaurant / town', 'dphilhower-studio' ); ?>
			<input type="text" name="dps_business" placeholder="<?php esc_attr_e( 'e.g. Tuesday lunch, two-top by the window', 'dphilhower-studio' ); ?>" autocomplete="organization">
		</label>
		<label>
			<?php esc_html_e( 'What do you need?', 'dphilhower-studio' ); ?>
			<select name="dps_need">
				<option value="sitdown" selected><?php esc_html_e( 'Meet at the restaurant', 'dphilhower-studio' ); ?></option>
				<option value="brand"><?php esc_html_e( 'Identity', 'dphilhower-studio' ); ?></option>
				<option value="web"><?php esc_html_e( 'Website', 'dphilhower-studio' ); ?></option>
				<option value="both"><?php esc_html_e( 'Identity + website', 'dphilhower-studio' ); ?></option>
				<option value="print"><?php esc_html_e( 'Menus, windows, print', 'dphilhower-studio' ); ?></option>
				<option value="other"><?php esc_html_e( 'Something else', 'dphilhower-studio' ); ?></option>
			</select>
		</label>
		<label>
			<?php esc_html_e( 'Where should we sit?', 'dphilhower-studio' ); ?>
			<textarea name="dps_notes" placeholder="<?php esc_attr_e( 'What to eat, what has to live on the window, when you want to meet…', 'dphilhower-studio' ); ?>"></textarea>
		</label>
		<button class="btn btn-dark" type="submit" name="dps_contact_submit" value="1"><?php esc_html_e( 'Invite us over', 'dphilhower-studio' ); ?></button>
		<p class="form-note"><?php esc_html_e( 'Messages go to the studio inbox. Typical reply: a time to sit down at your restaurant.', 'dphilhower-studio' ); ?></p>
	</form>
	<?php
}
