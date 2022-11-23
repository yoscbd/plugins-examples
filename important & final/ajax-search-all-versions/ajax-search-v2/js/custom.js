jQuery(function ($) {

    $('.userInput').on('keyup', function () {
        var input = $(this).val();
        if (input != '') {
            var data = {
                'action': 'get_articles_titles',
                'search_text': input,
                'nonce': ajax_object.nonce
            }
            $.post(ajax_object.url, data, function (response) {
                $('#txtHint').html(response);
            });
        }
    });

});