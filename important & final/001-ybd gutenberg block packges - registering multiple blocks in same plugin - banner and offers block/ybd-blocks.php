<?php
/**
 * Plugin Name:       Ybd Blocks Package
 * Description:       Gutenberg Banner block nad offers block
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Yossi Ben David
 * License:           GPL-2.0-or-later
 * Text Domain:       ybd-blocks
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
function create_block_ybd_blocks_block_init()
{
    //register_block_type(__DIR__ . '/build/banner-block');
    register_block_type(__DIR__ . '/build/offers-block');

    register_block_type(__DIR__ . '/build/banner-block', array(

        'render_callback' => 'render_banner',
    ));

}
add_action('init', 'create_block_ybd_blocks_block_init');

/*Banner block:*/

function render_banner($attributes)
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
                <h3 style="color: <?php echo $attributes['banner_text_color']; ?>">
                    <?php echo $attributes['main_title']; ?>


                </h3>
                <p style="color: <?php echo $attributes['banner_text_color']; ?>">
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

function jc_block_patterns()
{
//block_patterns example:
    register_block_pattern(
        'jc-block-patterns/jc-content-upgrade',
        array(
            'title' => __('Content Upgrade', 'jc-block-patterns'),

            'description' => _x('A simple set of blocks to encourage people to join the membership', 'jc-block-patterns'),

            'content' => "<!-- wp:create-block/banner-block /-->\r\n\r\n<!-- wp:create-block/offers-block {\"main_text\":\"Hello world!\"} -->\r\n<section class=\"wp-block-create-block-offers-block section-second\" style=\"height:auto\"><div class=\"grid-container\"><div class=\"item item1\"><h3 placeholder=\"Main Title...\">Hello world!</h3></div><div class=\"item item2\"><h4 placeholder=\"First Item Title...\">New lease accounting standard</h4><p placeholder=\"First Item Title...\">IFRS 16, the new lease accounting standard, brings sweeping changes to how we account for leases, and affects every company and industry. Ensuring compliance is a challenge that grows with each additional lease you have in place.</p></div><div class=\"item item3\"><h4 placeholder=\"Second Item Title...\">Relooking at your reports</h4><p placeholder=\"Second Item Title...\">From office and other real estate leases to employee vehicles, equipment and even contracts you were unaware had a lease element within them – IFRS 16 means completely relooking at howyour organization calculates, accounts for and reports on leases. This now includesrecognizing lease assets and liabilities on the balance sheet.</p></div><div class=\"item item4\"><h4 placeholder=\"Third Item Title...\">Manual work increases the risk</h4><p placeholder=\"Third Item Title...\">Manually dealing with leases has not only become inefficient, it also exponentially increases the risk of error and non-compliance, not to mention using up the precious time of you and your team.</p></div></div></section>\r\n<!-- /wp:create-block/offers-block -->",

            'categories' => array('buttons'),
        )
    );

}

add_action('init', 'jc_block_patterns');