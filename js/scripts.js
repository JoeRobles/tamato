$.ajaxSetup({
    type: "POST",
    async: false
});
var Tamato = {
    actualRow: '',
    actualRowId: '',
    table_name: 'employee',
    thead: '',
    table_attribs: {
        cellspacing : 0,
        cellpadding : 0,
        class : 'table',
        id : 'table_content'
    },
            
    showTable: function() {
        $.getJSON('includes/json.php?table=' + Tamato.table_name, function(rows) {
            var $table = $('<table />').attr(Tamato.table_attribs);
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
                var $tb = $('<tr />')
                            .attr({ id: content[rows.th[0]]});
                $(rows.th).each(function(i, name) {
                    $tb.append($('<td />').text(content[name]));
                });
                $tbody.append($tb);
            });
            $('div#content').append($table);
        });
        $('table.table tr td').on('click', function(){
            if (Tamato.actualRowId === '') {
                Tamato.actualRow = $(this).parent();
                Tamato.appendInput();
                Tamato.actualRowId = $(this).parent().attr('id');
            } else if (Tamato.actualRowId !== $(this).parent().attr('id')) {
                Tamato.removeRow();
                Tamato.actualRow = $(this).parent();
                Tamato.appendInput();
                Tamato.actualRowId = $(this).parent().attr('id');
            }
        });
    },
    appendInput: function() {
        $($(Tamato.actualRow).children()).each(function(k, row) {
            if (k !== 0) {
                var $text = $(row).text();
                if ($text !== '') {
                    $(row).text('').append(
                        $('<input />')
                            .attr({
                                type: 'text',
                                name: Tamato.thead[k],
                                value: $text
                            })
                    );
                }
            }
        });
    },
    removeRow: function() {
        $($(Tamato.actualRow).children()).each(function(k, row) {
            if (k !== 0) {
                var $value = $(row).children().val();
                if ($(row).text() === '') {
                    $(row).children().remove();
                    $(row).text($value);
                }
            }
        });
    },
    updateTable: function() {
        
    }
};
$(document).on('ready', function(){
    Tamato.showTable();
});