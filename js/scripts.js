$.ajaxSetup({
    type: "POST",
    async: false
});

var Tamato = {
    actual_row:      '',
    actual_row_id:   '',
    confirm_message: "¿Esta seguro de eliminar este registro?",
    delete_id:       'delete_row',
    delete_text:     'Eliminar registro',
    JSON_file:       'includes/json.php',
    table_name:      'employee',
    table_attribs: {
        cellspacing: 0,
        cellpadding: 0,
        class:       'table'
    },
    thead: '',
            
    appendInput: function() {
        $($(Tamato.actual_row).children()).each(function(k, row) {
            var $text = $(row).text();
            if ($text !== '') {
                if (k !== 0) {
                    var $app = $('<input />')
                        .attr({
                            type:  'text',
                            name:  Tamato.thead[k],
                            value: $text
                        });
                } else {
                    var $app = $('<a />')
                        .attr({
                            alt:   Tamato.delete_text,
                            class: Tamato.delete_class,
                            href:  Tamato.JSON_file + '?delete=' + $text,
                            id:    Tamato.delete_id,
                            title: Tamato.delete_question
                        }).text(Tamato.delete_text);
                }
                $(row).text('').append($app);
            }
        });
    },
    createRow: function() {
        
    },
    deleteRow: function() {
        $('table.table tr td').on('click', 'a#' + Tamato.delete_id, function(e) {
            e.preventDefault();
            var $this = $(this);
            var $confirm = confirm(Tamato.confirm_message);
            if ($confirm === true) {
                $.ajax({
                    url:      $this.attr('href'),
                    dataType: 'json',
                    data:     { to_process: JSON.stringify({ table: Tamato.table_name }) }
                }).done(function(){
                    $this.parent().parent().remove();
                });
            } 
        });
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
    removeTable: function() {
        $('div#content table').remove();
    },
    selectRow: function() {
        $('table.table tr').on('click', 'td', function(){
            if (Tamato.actual_row_id !== $(this).parent().attr('id')) {
                if (Tamato.actual_row_id !== '') {
                    Tamato.updateRow();
                    Tamato.removeInput();
                }
                Tamato.actual_row    = $(this).parent();
                Tamato.appendInput();
                Tamato.actual_row_id = $(this).parent().attr('id');
            }
        });
        Tamato.deleteRow();
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
                value:      $('input', row).val()
            };
            row_values.push(o);
        });
        var row_content = {
            table:  Tamato.table_name,
            values: row_values
        };
        $.ajax({
            url:      Tamato.JSON_file + '?id=' + Tamato.actual_row_id,
            dataType: 'json',
            data:     { to_process: JSON.stringify(row_content) }
        }).done(function() {
            console.log('Update done!');
        });
    }
};

$(document).on('ready', function(){
    Tamato.showTable();
});