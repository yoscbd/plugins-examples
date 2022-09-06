<?php

// Exit if accessed directly.
defined('ABSPATH') || exit;

// create admin ajax action for client side api requests:
add_action('wp_ajax_weather_api', 'weather_handler_service');
add_action('wp_ajax_nopriv_weather_api', 'weather_handler_service');

function weather_handler_service()
{
    check_ajax_referer('reg-nonce', 'nonce');
    $params = array(
        'location' => isset($_POST['selectedlocation']) ? $_POST['selectedlocation'] : "london,uk",
    );

    // build the URL for wp_remote_get() function
    $forecast = wp_remote_get(add_query_arg(array(
        'q' => $params['location'], // City,Country code
        'APPID' => '016a21ad4aca7fca4e3224e7ca18393a', // do not forget to set your API key here
        'units' => 'metric', // if I want to show temperature in Degrees Celsius
    ), 'http://api.openweathermap.org/data/2.5/weather'));

    if (!is_wp_error($forecast) && wp_remote_retrieve_response_code($forecast) == 200) {
        $forecast = json_decode(wp_remote_retrieve_body($forecast));
        $forecast_str = '<h3>Weather Forcat for ' . $forecast->name . '</h3> ';
        $forecast_str .= '<p>' . $forecast->main->temp . ' °С </p> ';
        $forecast_str .= '<p>Humidity: ' . $forecast->main->humidity . ':</p> ';
        $forecast_str .= '<p>Wind speed: ' . $forecast->wind->speed . 'KM </p>';
        $forecast_str .= '<p class="credit">Data source: <a href="https://openweathermap.org/api">openweathermap</a> </p>';

        //icon:
        $forecast_icon = $forecast->weather[0]->icon;
        $icon_url = 'http://openweathermap.org/img/wn/' . $forecast_icon . '@2x.png';
        $icon_img = '<img src="' . $icon_url . '" loading="lazy">';

        $obj_to_return = "";

        $obj_to_return = '<div><div class="weather"><div class="icon">' . $icon_img . '</div><div class="forcast">' . $forecast_str . '</div></div>';

        echo $obj_to_return;
        wp_die();
    } else {

        echo 'error establishing connection to openweathermap.org, please try later';
        wp_die();
    }

}