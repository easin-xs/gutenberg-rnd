<?php
/**
  * Plugin Name: Gutenberg Sidebar
  * Description: Sidebar for the block editor.
  * Author: Md. Easin
  */
if( ! defined( 'ABSPATH') ) {
    exit;
}

// enqueue
function xs_enqueue_assets() {
    wp_enqueue_script(
      'xs-gutenberg-sidebar',
      plugins_url( 'build/index.js', __FILE__ ),
      array( 'wp-plugins', 'wp-edit-post', 'wp-i18n', 'wp-element' )
    );
    wp_enqueue_style(
      'xs-gutenberg-style',
      plugins_url( 'style.css', __FILE__ )
    );
  }
  add_action( 'enqueue_block_editor_assets', 'xs_enqueue_assets' );

  
// custom meta
  function xs_register_meta()
{
    register_post_meta('post', '_xs_text_metafield', array(
        'show_in_rest' => true,
        'type' => 'string',
        'single' => true,
        'sanitize_callback' => 'sanitize_text_field',
        'auth_callback' => function () {
            return current_user_can('edit_posts');
        }
    ));
}
add_action('init', 'xs_register_meta');