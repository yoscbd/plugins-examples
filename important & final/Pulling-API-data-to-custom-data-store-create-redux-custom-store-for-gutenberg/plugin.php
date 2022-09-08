<?php
/**
 * Plugin Name:       Custom Data Store For Pulling API data From https://jsonplaceholder.typicode.com/
 * Description:       Create a custom data store that will allow us to fetch and edit data retrived from an api using "wp.data.select('blocks-course/todos').getTodos()". <br/>
 * we will create a datastore for getting todos items from the "jsonplaceholder" api
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Yossi B.D
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       custom-data-store
 */

function custom_data_store_plugin_enqueue_assets()
{

    $asset_file = include plugin_dir_path(__FILE__) . 'build/index.asset.php';

    wp_enqueue_script('custom-data-store-plugin-script', plugins_url('build/index.js', __FILE__), $asset_file['dependencies'], $asset_file['version']);

}

add_action('enqueue_block_editor_assets', 'custom_data_store_plugin_enqueue_assets');