<?php

/*
Plugin Name: Are You Paying Attention Quiz
Description: Give your readers a multiple choice question.
Version: 1.0
Author: ybd

 */

if (!defined('ABSPATH')) {
    exit;
}
// Exit if accessed directly

class AreYouPayingAttention
{
    public function __construct()
    {
        add_action('init', array($this, 'adminAssets'));
    }

    public function adminAssets()
    {
        wp_register_style('quizeditcss', plugin_dir_url(__FILE__) . 'build/index.css');
        wp_register_script('ournewblocktype', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
        register_block_type('ybdplugin/are-you-paying-attention', array(
            'editor_script' => 'ournewblocktype',
            'editor_style' => 'quizeditcss',
            'render_callback' => array($this, 'theHTML'), // using "render_callback" wordpress fucntion that will allow us to render react on the from end
        ));
    }

    public function theHTML($attributes)
    {
        if (!is_admin()) { // we add the next script and css only on the front end:
            wp_enqueue_script('attentionFrontend', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-element'));
            wp_enqueue_style('attentionFrontendStyles', plugin_dir_url(__FILE__) . 'build/frontend.css');
        }

        ob_start(); //  ob starting point

        ?>
<div class="paying-attention-update-me">
    <pre style="display: none;"><?php echo wp_json_encode($attributes) ?></pre>
</div>
<?php return ob_get_clean(); //ob end point that will now return our rendered html starting after " ob_start()" line 41
    }
}

$areYouPayingAttention = new AreYouPayingAttention(); // envoke our new class by creating "areYouPayingAttention" via the "AreYouPayingAttention" constractor