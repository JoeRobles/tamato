$.ajaxSetup({
    type: "POST",
    async: false
});
var Tamato = {
    table_name: 'employee',
    table_attribs: {
        id : 'table_content',
        cellspacing : 0,
        cellpadding : 0
    },
    showTable: function() {
        $.getJSON('includes/json.php?table=' + Tamato.table_name, function(rows) {
            var $table = $('<table />')
                .addClass('table')
                .attr(Tamato.table_attribs);
            var $thead = $('<thead />');
            var $tbody = $('<tbody />');
            var $tr = $('<tr />');

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
    }
};
$(document).on('ready', function(){
    Tamato.showTable();
});