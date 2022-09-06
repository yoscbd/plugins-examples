<?php

if (!defined('ABSPATH')) {
    exit;
}
// Exit if accessed directly
/**
 * Plugin Name:       Custom Banner
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       custom-banner
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_custom_banner_block_init()
{

    register_block_type(__DIR__ . '/build', array(

        'render_callback' => 'render_callback',

    ));

}
//add_action('init', 'create_block_custom_banner_block_init');

class CustomBannerBlock
{
    public function __construct()
    {
        add_action('init', array($this, 'adminAssets'));
    }

    public function adminAssets()
    {

        register_block_type(__DIR__ . '/build', array(

            'render_callback' => array($this, 'theHTML'),
        ));
    }

    public function theHTML($attributes)
    {
        if (!is_admin()) {
            // wp_enqueue_script('attentionFrontend', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-element'));
            // wp_enqueue_style('attentionFrontendStyles', plugin_dir_url(__FILE__) . 'build/frontend.css');
        }

        ob_start();?>
<div class="paying-attention-update-me">
    Hi from render php function
    <pre style="display: none;"><?php echo wp_json_encode($attributes) ?></pre>
</div>
<?php return ob_get_clean();
    }
}

$customBannerBlock = new CustomBannerBlock();