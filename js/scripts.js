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
    thead: '',
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
            Tamato.thead = rows.th;
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
        $('table.table tr').on('click', function(){
            $($(this).children()).each(function(k, row) {
                var $text = $(row).text();
                $(row).text('').append(
                    $('<input />')
                        .attr({
                            type: 'text',
                            name: Tamato.thead[k],
                            value: $text
                        })
                );
            });
        });
    }
};
$(document).on('ready', function(){
    Tamato.showTable();
});