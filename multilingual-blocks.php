<?php

/**
 * Plugin Name: Multilingual blocks
 * Description: Adds option to display Gutenberg block only in one language
 * Version:     1.0.0
 * Author:      Maja Kochanowska
 * Text Domain: multilingual-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue scripts
 */
function multilingual_blocks_enqueue_editor() {

	wp_enqueue_script( 'multilingual-blocks', esc_url( plugin_dir_url( __FILE__ ) . 'dist/main.min.js' ), array( 'wp-hooks', 'wp-element', 'wp-block-editor', 'wp-i18n', 'wp-compose', 'wp-components', 'wp-blocks' ), '1.0.0', true );
}

add_action( 'enqueue_block_editor_assets', 'multilingual_blocks_enqueue_editor' );

/**
 * Don't display block if language of page doesn't match block attribute language
 */
function multilingual_blocks_display_in_one_language( $block_content, $block ) {

	if ( ! isset( $block['attrs']['language'] ) ) {
		return $block_content;
	}

	if ( $block['attrs']['language'] !== get_locale() ) {
		return;
	}

	return $block_content;
}

add_filter( 'render_block', 'multilingual_blocks_display_in_one_language', 10, 2 );
