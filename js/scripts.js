$.ajaxSetup({
    type: "POST",
    async: false
});

var Tamato = {
    actual_row: '',
    actual_row_id: '',
    delete_image: '',
    JSON_file: 'includes/json.php',
    table_name: 'employee',
    table_attribs: {
        cellspacing: 0,
        cellpadding: 0,
        class: 'table',
        id: 'table_content'
    },
    thead: '',
            
    appendInput: function() {
        $($(Tamato.actual_row).children()).each(function(k, row) {
            var $text = $(row).text();
            if ($text !== '') {
                if (k !== 0) {
                    $(row).text('').append(
                        $('<input />')
                            .attr({
                                type: 'text',
                                name: Tamato.thead[k],
                                value: $text
                            })
                    );
                } else {
                    var $a = $('<a />')
                            .attr({
                                href: Tamato.JSON_file + '?delete=' + $text,
                                alt: 'Delete row',
                                title: 'Delete row'
                            }).text('Delete row')
                    $(row).text('').append($a);
                    if (Tamato.delete_image !== '') {
                        $a.append(
                        )
                    }
                }
            }
        });
    },
    createRow: function() {
        
    },
    deleteRow: function() {
        
    },
    getTables: function() {

    },
    removeInput: function() {
        $($(Tamato.actual_row).children()).each(function(k, row) {
            var $row = $(row);
            var $children = $row.children();
            if (k !== 0) {
                var $new_text = $children.val();
            } else {
                var $value = $children.attr('href');
                var $new_text = $value.split('=').slice(-1)[0];
            }
            $children.remove();
            $row.text($new_text);
        });
    },
    selectRow: function() {
        $('table.table tr td').on('click', function(){
            if (Tamato.actual_row_id !== '' && Tamato.actual_row_id !== $(this).parent().attr('id')) {
                Tamato.updateRow();
                Tamato.removeInput();
            }
            Tamato.actual_row = $(this).parent();
            Tamato.appendInput();
            Tamato.actual_row_id = $(this).parent().attr('id');
        });
    },
    setTable: function (name) {
        
    },
    showTable: function() {
        $.getJSON(Tamato.JSON_file + '?table=' + Tamato.table_name, function(rows) {
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
                var $tb = $('<tr />').attr({ id: content[rows.th[0]]});
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
        var row_values = new Array();
        $($('table.table tr#' + Tamato.actual_row_id).children()).each(function(k, row) {
            var o = {
                field_name: $('input', row).attr('name'),
                value: $('input', row).val()
            };
            row_values.push(o);
        });
        var row_content = {
            table: Tamato.table_name,
            values: row_values
        };
        $.ajax({
            url: Tamato.JSON_file + '?id=' + Tamato.actual_row_id,
            dataType: 'json',
            data: { to_process: JSON.stringify(row_content) }
        }).done(function(){
            console.log('done');
        });
    }
};

$(document).on('ready', function(){
    Tamato.showTable();
});