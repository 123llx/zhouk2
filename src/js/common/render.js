define(['jquery', 'handlebars'], function($, handlebars) {
    function render(tem, target, data) {
        //获取模板
        var tpl = $(tem).html()
            //预编译
        var template = handlebars.compile(tpl);
        //传入数据
        var html = template(data);

        $(target).html(html)
    }
    return render
})