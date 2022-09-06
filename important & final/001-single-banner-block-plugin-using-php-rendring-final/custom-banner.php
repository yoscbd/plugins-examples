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
/* function create_block_custom_banner_block_init()
{

register_block_type(__DIR__ . '/build', array(

'render_callback' => 'render_callback',

));

} */
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

        if (!$attributes['imgID']) {
            $attributes['imgID'] = 54;
        }

        if (!$attributes['imgURL']) {
            $attributes['imgURL'] = 'http://127.0.0.1/custom/wp-content/uploads/2022/08/Group-2074-2222.webp';
        }

        if (!$attributes['first_title']) {
            $attributes['first_title'] = "Lease Accounting Software for IFRS 16";
        }
        if (!$attributes['main_title']) {
            $attributes['main_title'] = "IFRS 16 compliance just got a whole lot easier thanks to AI-enhanced automated lease accounting software powered by Trullion";
        }
        if (!$attributes['main_text']) {
            $attributes['main_text'] = "Lease accounting software can keep you ahead of IFRS 16-related changes thanks to seamless automation and smart AI-enhanced capabilities. Say goodbye to errors and regulatory risk, and hello to painless compliance.";
        }
        if (!$attributes['btn_text']) {
            $attributes['btn_text'] = "Accelerate your compliance now";
        }
        if (!is_admin()) {
            // wp_enqueue_script('attentionFrontend', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-element'));
            // wp_enqueue_style('attentionFrontendStyles', plugin_dir_url(__FILE__) . 'build/frontend.css');
        }

        ob_start();?>
<section class="section-first">
    <div>
        <div class="banner-title">
            <h4 style="color: <?=$attributes['banner_title_color'];?>"><?php echo $attributes['first_title']; ?></h4>
        </div>
    </div>
    <div>
        <div class="banner-main-section">
            <div class="left">
                <h3 style="color: <?=$attributes['banner_text_color'];?>">
                    <?php echo $attributes['main_title']; ?>


                </h3>
                <p style="color: <? $attributes['banner_text_color'];   ?>">
                    <?php echo $attributes['main_text']; ?>
                </p>
            </div>
            <div class="right">
                <?php

        echo wp_get_attachment_image($attributes['imgID'], 'full');
        ?>
            </div>
        </div>
    </div>
    <div>
        <div class="banner-cta">
            <button type="button"> <?php echo $attributes['btn_text']; ?>
            </button>
        </div>
    </div>
</section>
<?php return ob_get_clean();
    }
}

$customBannerBlock = new CustomBannerBlock();