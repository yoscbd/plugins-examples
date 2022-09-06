<?php
/**
 * Plugin Name:       Banner Block
 * Description:       Example static block scaffolded with Create Block tool.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       banner-block
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
function create_block_banner_block_block_init()
{
    register_block_type(__DIR__ . '/build', array(

        'render_callback' => 'theHTML',

    ));

}
add_action('init', 'create_block_banner_block_block_init');

function theHTML($attributes)
{
    if (!is_admin()) {
        wp_enqueue_script('bannerScript', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-element', 'wp-block-editor'));
        //wp_enqueue_style('attentionFrontendStyles', plugin_dir_url(__FILE__) . 'build/frontend.css');
    }

    ob_start();?>
<section class="section-first">
    <div class="section-container">
        <div class="hero-wrap">
            <div class="hero-content">
                <h1 style="color: <?php echo $attributes["text_color"] ?> !important;">
                    <?php echo $attributes["main_title"] ?>
                </h1>
                <p>
                    <?php echo $attributes["sub_title_first"] ?> <br />
                    <?php echo $attributes["sub_title_second"] ?>
                </p>
                <button class="js-search-trigger" type="button">
                    <a href=<?php echo $attributes["cta_url"] ?>
                        target="_blank"><?php echo $attributes["cta_text"] ?></a>
                </button>

            </div>


            <img width="1920" height="600" src="<?php echo $attributes["imgURL"] ?>" class="desktop" alt=""
                loading="lazy" />
            <img width="767" height="442" src="<?php echo $attributes["MobileImgURL"] ?>" class="mobile" alt=""
                loading="lazy" />




        </div>
    </div>
    </div>
</section>
<?php echo ("<pre>" . wp_json_encode($attributes) . "</pre>"); ?>

<?php return ob_get_clean();
}