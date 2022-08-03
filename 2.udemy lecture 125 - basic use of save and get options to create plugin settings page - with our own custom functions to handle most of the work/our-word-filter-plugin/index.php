<?php

/*
Plugin Name: Our Word Filter Plugin
Description: Replaces a list of words.
Version 1.0
Author: YBD

 */

if (!defined('ABSPATH')) {
    exit;
}
// Exit if accessed directly

//Generating php class for our plugin so we can avoid having same functions \ variables name on different sections of our site code:
class OurPluginMainClass
{
    // This is our constractor function and we will fire it on the bottom of this file where you can see : line|82: '$ourPluginMainClass = new OurPluginMainClass();'
    public function __construct()
    { // we hook to the admin-menu action and add the "ourMenu" function that include all relevant functionality
        add_action('admin_menu', array($this, 'ourMenu'));
    }

    public function ourMenu()
    { // we assign the first add_menu_page() function to a variable so later on we can use it in order to include a css file that will be loaded for this page only ('Word Filter' page)
        $mainPageHook = add_menu_page('Words To Filter', 'Word Filter', 'manage_options', 'ourwordfilter', array($this, 'wordFilterPage'), 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMCAyMEMxNS41MjI5IDIwIDIwIDE1LjUyMjkgMjAgMTBDMjAgNC40NzcxNCAxNS41MjI5IDAgMTAgMEM0LjQ3NzE0IDAgMCA0LjQ3NzE0IDAgMTBDMCAxNS41MjI5IDQuNDc3MTQgMjAgMTAgMjBaTTExLjk5IDcuNDQ2NjZMMTAuMDc4MSAxLjU2MjVMOC4xNjYyNiA3LjQ0NjY2SDEuOTc5MjhMNi45ODQ2NSAxMS4wODMzTDUuMDcyNzUgMTYuOTY3NEwxMC4wNzgxIDEzLjMzMDhMMTUuMDgzNSAxNi45Njc0TDEzLjE3MTYgMTEuMDgzM0wxOC4xNzcgNy40NDY2NkgxMS45OVoiIGZpbGw9IiNGRkRGOEQiLz4KPC9zdmc+', 100);
        //Optional**: we can also us dash icons insted of converted SVG:
        //$mainPageHook = add_menu_page('Words To Filter', 'Word Filter', 'manage_options', 'ourwordfilter', array($this, 'wordFilterPage'), 'dashicons-smiley', 100);

        // adding the first item in the sub menue that will have the same functionlity as the parent menu
        add_submenu_page('ourwordfilter', 'Words To Filter', 'Words List', 'manage_options', 'ourwordfilter', array($this, 'wordFilterPage'));

        // adding another sub menu that will also create a second options page
        add_submenu_page('ourwordfilter', 'Word Filter Options', 'Options', 'manage_options', 'word-filter-options', array($this, 'optionsSubPage'));

        // hooking to our $mainPageHook which is the  add_menu_page() function on line 27
        add_action("load-{$mainPageHook}", array($this, 'mainPageAssets'));
    }

    public function mainPageAssets()
    { // including a css file that will be loaded in the "Word Filter" page.
        wp_enqueue_style('filterAdminCss', plugin_dir_url(__FILE__) . 'styles.css');
    }

    // we are going to use this function every time a user will submit anything from the options page
    public function handleForm()
    {
        // First we verify the post request contains a nonce we hve generated in our main form on line:71 ( wp_nonce_field('saveFilterWords', 'ourNonce'))
        // we also make sure the user who sent this request have the relevant permissions.
        if (wp_verify_nonce($_POST['ourNonce'], 'saveFilterWords') and current_user_can('manage_options')) {

            //If our security check is ok we now update the DB the option value that was posted by the user:
            update_option('plugin_words_to_filter', sanitize_text_field($_POST['plugin_words_to_filter']));

            // adding the HTML for displaying sucsess or error message to the user after he is posting the form:
            ?>
<div class="updated">
    <p>Your filtered words were saved.</p>
</div>
<?php } else {?>
<div class="error">
    <p>Sorry, you do not have permission to perform that action.</p>
</div>
<?php }
    }

    public function wordFilterPage()
    {?>
<div class="wrap">
    <h1>Word Filter</h1>
    <?php
// We added an hidden input field that allow us to know if the user has submited the form (input name: "justsubmitted" , line 77)
        if ($_POST['justsubmitted'] == "true") {
            // If the user has submit the form we call the function that wil handle the validation and update of the new values in the DB:
            $this->handleForm();
        }

        //the HTML content for out <Form>:
        ?>
    <form method="POST">
        <input type="hidden" name="justsubmitted" value="true">
        <?php wp_nonce_field('saveFilterWords', 'ourNonce')?>
        <label for="plugin_words_to_filter">
            <p>Enter a <strong>comma-separated</strong> list of words to filter from your site's content.</p>
        </label>
        <div class="word-filter__flex-container">
            <textarea name="plugin_words_to_filter" id="plugin_words_to_filter"
                placeholder="bad, mean, awful, horrible"><?php echo esc_textarea(get_option('plugin_words_to_filter')) ?></textarea>
        </div>
        <input type="submit" name="submit" id="submit" class="button button-primary" value="Save Changes">
    </form>
</div>
<?php }

    public function optionsSubPage()
    {?>
Hello world from the options page.
<?php }

}

$ourPluginMainClass = new OurPluginMainClass();