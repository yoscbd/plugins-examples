<?php
/**
 * Plugin Name: YBD ajax search
 * Description: preform ajax search using wp-ajax.
 * Text Domain: ybd-ajax-search
 * Author:      YBD
 *
 */

// Standard plugin security, keep this line in place.
defined('ABSPATH') or die();

$ybd_search_dir = plugin_dir_path(__DIR__);

// 1.add the search form html to the header:
function ajax_search_html()
{
    ?>
<h4>
    <n><?php esc_html_e('Search in articles:', 'ybd-ajax-search')?></n>
</h4>
<form>
    <input type="text" class="userInput">
</form>
<p><?php esc_html_e('Search Results:', 'ybd-ajax-search')?> <br />
<div id="txtHint"></div>
</p>
<?php

}
add_action('wp_head', 'ajax_search_html');

// 2.add the js script:

function _ybd_ajax_search_script()
{

    wp_register_script('ybd-custom-search-script', plugin_dir_url(__FILE__) . 'js/custom.js', array('jquery'), false, true);

    $script_data_array = array(
        'url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('search_titles_nonce'),
    );
    wp_localize_script('ybd-custom-search-script', 'ajax_object', $script_data_array);

    wp_enqueue_script('ybd-custom-search-script');
}
add_action('wp_enqueue_scripts', '_ybd_ajax_search_script');

// 3. the ajax function hook for looged in \ logged out users:

add_action('wp_ajax_get_articles_titles', 'get_articles_titles');
add_action('wp_ajax_nopriv_get_articles_titles', 'get_articles_titles');

function get_articles_titles()
{

    check_ajax_referer('search_titles_nonce', 'nonce'); // security: check the nonce to make sure the Ajax request is not processed externally.

    $input = $_POST['search_text'];
    $args = array(
        'posts_per_page' => -1,
        'post_type' => 'post',
    );
    $the_query = new WP_Query($args);
    $number_of_results = 0; // count the number of matching items
    if ($the_query->have_posts()) {
        while ($the_query->have_posts()) {
            $the_query->the_post();
            $title = get_the_title(get_the_ID());
            $post_url = get_permalink(get_the_ID());

            if (strpos(strtolower($title), strtolower($input)) !== false) {

                ob_start();
                $number_of_results += 1; // increase the count the number of matching items
                echo "<br/>";

                // constract the html for each item:
                ?>

<a href="<?php echo esc_url($post_url) ?>"> <?php esc_html_e($title, 'ybd-ajax-search')?> </a>


<?php

            }
        }
        wp_reset_postdata();

        if ($number_of_results < 1) {
            ?>
<div>
    <?php esc_html_e('Sorry, no matching posts for this search query, please try again....', 'ybd-ajax-search')?>
</div>
<?php
} else {
            ?>

<div id="results"> <?php
esc_html_e('number of results: ', 'ybd-ajax-search');
            echo $number_of_results
            ?>
</div>
<?php
}
    }

    wp_die();
    return ob_get_clean();

}