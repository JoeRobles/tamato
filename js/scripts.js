$.ajaxSetup({
    type: "POST",
    async: false
});

var Tamato = {
    actualRow: '',
    actualRowId: '',
    JSONfile: 'includes/json.php',
    table_name: 'employee',
    table_attribs: {
        cellspacing : 0,
        cellpadding : 0,
        class : 'table',
        id : 'table_content'
    },
    thead: '',
            
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
    createRow: function() {
        
    },
    deleteRow: function() {
        
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
    selectRow: function() {
        $('table.table tr td').on('click', function(){
            if (Tamato.actualRowId !== '' && Tamato.actualRowId !== $(this).parent().attr('id')) {
                Tamato.updateRow();
                Tamato.removeRow();
            }
            Tamato.actualRow = $(this).parent();
            Tamato.appendInput();
            Tamato.actualRowId = $(this).parent().attr('id');
        });
    },
    showTable: function() {
        $.getJSON(Tamato.JSONfile + '?table=' + Tamato.table_name, function(rows) {
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
        Tamato.selectRow();
    },
    updateRow: function() {
        var rowValues = new Array();
        $($('table.table tr#' + Tamato.actualRowId).children()).each(function(k, row) {
            var o = { field_name: $('input', row).attr('name'), value: $('input', row).val() };
            rowValues.push(o);
        });
        var process = {
            table: Tamato.table_name,
            values: rowValues
        }
        $.ajax({
            url: Tamato.JSONfile + '?id=' + Tamato.actualRowId,
            dataType: 'json',
            data: { to_process: JSON.stringify(process) }
        }).done(function(){
            console.log('done');
        });
    }
};

$(document).on('ready', function(){
    Tamato.showTable();
});