<?php

/*
Plugin Name: weather api block
Description: allow you to add weather report via  http://api.openweathermap.org weather api.
Version: 1.0
Author: YBD

 */

if (!defined('ABSPATH')) {
    exit;
}
// Exit if accessed directly

class weatherApiBlock
{
    public function __construct()
    {
        add_action('init', array($this, 'adminAssets'));
    }

    public function adminAssets()
    {
        // wp_register_script('ournewblocktype', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element'));
        //  register_block_type('ourplugin/weather-api-block', array(
        //  'editor_script' => 'ournewblocktype',

        //  ));

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
</div>
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