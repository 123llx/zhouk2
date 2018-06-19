require(['jquery', 'render'], function($, render) {
    $.ajax({
        url: './api/list',
        dataType: 'json',
        success: function(data) {
            console.log(data)
            render('#tpl', '.list', data)
        },
        error: function(error) {
            console.error(error);
        }
    })
})