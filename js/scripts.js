$(document).on('ready', function(){
    $.getJSON('includes/json.php?table=employee', function(rows) {
        console.log(rows.th);
//        var tableList = '';
//        for (var row in row) {
//            tableList += '<span data-prod="' + row.id + '" class="red-micro">' + row.name + '</span><br />\n';
//        }
//        $('div#content').append(
//            $('<table />')
//                .addClass('table')
//                .attr({
//                    cellspacing : 0,
//                    cellpadding : 0
//                    })
//                .append(
//                )
//        );
    });
});