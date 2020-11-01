<?php
namespace Frontend;

/**
 * Register the initial theme setup.
 *
 * @return void
 */
add_action('after_setup_theme', function () {
  add_theme_support('post-thumbnails');
  remove_image_size('1536x1536');
  remove_image_size('2048x2048');

  register_nav_menus([
    'primary_navigation' => __('Primary Navigation', 'frontend')
  ]);

  add_theme_support('post-formats', [
    'status',
    'link',
    'image',
    'gallery',
    'video',
    'audio',
    'quote',
  ]);

  add_theme_support('structured-post-formats', [
    'status',
    'link',
    'image',
    'gallery',
    'video',
    'audio',
    'quote',
  ]);

  register_post_meta('post', '_format_audio_embed', [
    'type' => 'string',
    'description' => 'Audio URL for audio formats',
    'single' => true,
    'show_in_rest' => true,
  ]);

  register_post_meta('post', '_format_link_url', [
    'type' => 'string',
    'description' => 'Link URL for link formats',
    'single' => true,
    'show_in_rest' => true,
  ]);

  register_post_meta('post', '_url_embedly_retrieved', [
    'type' => 'boolean',
    'description' => 'Whether the URL has been retrieved from Embedly',
    'single' => true,
    'show_in_rest' => true,
  ]);

  register_post_meta('post', '_url_embedly_provider_url', [
    'type' => 'string',
    'description' => 'Provider URL for link formats',
    'single' => true,
    'show_in_rest' => true,
  ]);

  register_post_meta('post', '_url_embedly_provider_name', [
    'type' => 'string',
    'description' => 'Provider name for link formats',
    'single' => true,
    'show_in_rest' => true,
  ]);

  register_post_meta('post', '_url_embedly_description', [
    'type' => 'string',
    'description' => 'Link description for link formats',
    'single' => true,
    'show_in_rest' => true,
  ]);

  register_post_meta('post', '_format_quote_source_url', [
    'type' => 'string',
    'description' => 'Quote source url for quote formats',
    'single' => true,
    'show_in_rest' => true,
  ]);

  register_post_meta('post', '_format_quote_source_name', [
    'type' => 'string',
    'description' => 'Quote source name for quote formats',
    'single' => true,
    'show_in_rest' => true,
  ]);

  register_post_meta('post', '_format_video_embed', [
    'type' => 'string',
    'description' => 'Video URL for video formats',
    'single' => true,
    'show_in_rest' => true,
  ]);
});

/**
 * Remove the built-in WordPress image sizes
 */
$remove_sizes = function($sizes) {
  $disabled = [
    'thumbnail',
    'medium',
    'medium_large',
    'large',
    '1536x1536',
    '2048x2048',
  ];

  foreach($sizes as $index => $size) {
    if(in_array($size, $disabled)) {
      unset($sizes[$index]);
    }
  }

  return $sizes;
};
add_filter('intermediate_image_sizes', $remove_sizes);
add_filter('intermediate_image_sizes_advanced', $remove_sizes);
