<?php

/*
Plugin Name: weather api block 424
Description: allow you to add weather report via  http://api.openweathermap.org weather api.
Version: 1.0.1
Author: YBD

 */

if (!defined('ABSPATH')) {
    exit;
}
// Exit if accessed directly

include 'inc/weather-ajaxapi.php';

class weatherApiBlock
{
    public function __construct()
    {
        add_action('init', array($this, 'adminAssets'));
    }

    public function adminAssets()
    {
        wp_enqueue_script('weather-scripts', plugin_dir_url(__FILE__) . 'build/front.js', array('jquery'), $js_version, true);
        wp_localize_script('weather-scripts', 'weather_script_vars', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('reg-nonce'),
            'root_url' => get_site_url(),
        )
        );

        register_block_type_from_metadata(__DIR__, [
            'render_callback' => array($this, 'theHTML'),
        ]);

    }

    public function theHTML($attributes) // this function will render our HTML and PHP:

    {
        ob_start();?>
<div class="weather-block-api">




    <h3>Today in <?php echo strstr(esc_html($attributes['selectedCountry']), ',', true);
        ?> the sky are <?php
echo esc_html($attributes['skyColor']) ?> and the grass is <?php echo esc_html($attributes['grassColor'])
        ?>
    </h3>
    <hr />
    <?php

        echo ybd_get_weather(esc_html($attributes['selectedCountry']));
//echo do_shortcode('[weather location="' . esc_html($attributes['selectedCountry']) . '"]');
         ?>

    <p class="cta">
        <select name="cities" id="cities">
            <option value="tel-aviv,il">Tel-Aviv</option>
            <option value="london,uk">London</option>
            <option value="paris,fr">Paris</option>
        </select>
        <button id="weather-cta">Update Forcast</button>
    </p>
</div>


<script>
// this content was moved to the wheater api block plugin index.php main file
</script>
<style>
.weather-block-api {
    padding: 1rem;
    background: #dadaff;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.weather-block-api h3 {
    font-size: 2rem;
}

.weather-block-api .forcast p,
.weather-block-api .forcast a {
    font-size: 1.3rem;
    color: #0c00c5;
}
</style>
<?php
return ob_get_clean();
    }
}

$WeatherApiBlock = new weatherApiBlock();

// get the api code for generationg weater report block:

include 'inc/weather-apii.php';