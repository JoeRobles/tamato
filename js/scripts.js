$(document).on('ready', function(){
    $.getJSON('includes/json.php?table=employee', function(rows) {
        var $table = $('<table />')
            .addClass('table')
            .attr({
                id : 'table_content',
                cellspacing : 0,
                cellpadding : 0
                });
        var $thead = $('<thead />');
        var $tr = $('<tr />');
        var $tbody = $('<tbody />');
        
        $table.append($thead);
        $thead.append($tr);
        $(rows.th).each(function(i, name) {
            $tr.append($('<th />').text(name));
        });
        
        $table.append($tbody);
        $(rows.td).each(function(j, content) {
            var $tb = $('<tr />');
            $(rows.th).each(function(i, name) {
                $tb.append($('<td />').text(content[name]));
            });
            $tbody.append($tb);
        });
        $('div#content').append($table);
    });
});