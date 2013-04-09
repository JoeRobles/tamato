<?php
if (isset($_GET['table']) && $_GET['table'] != '') {
    require_once 'config.php';
    $field_names = $response = array();
    
    $sql = "SHOW COLUMNS " .
           "FROM `" . $_GET['table'] . "`;";
    $result = mysql_query($sql);
    while ($table = mysql_fetch_assoc($result)) {
        $field_names[] = $table['Field'];
    }
    $response['th'] = $field_names;
    
    $sql = "SELECT `" . implode('`, `', $field_names) . "` " .
           "FROM `" . $_GET['table'] . "`;";
    $result = mysql_query($sql);
    while ($row = mysql_fetch_assoc($result)) {
        $response['td'][] = $row;
    }
    
    echo json_encode($response);
    
} else if (isset($_GET['id']) && $_GET['id'] != '') {
    require_once 'config.php';
    $to_process = json_decode($_POST['toProcess'], true);
    $values = array();
    foreach ($to_process['values'] as $value) {
        if (!empty($value)) {
            $values[] = "`" . $value['field_name'] . "` = '" . $value['value'] . "'";
        }
    }
    $sql = "UPDATE `" . $to_process['table'] . "` " .
           "SET " . implode(', ', $values) . " " .
           "WHERE `id` = '" . $_GET['id'] . "';";
    mysql_query($sql)or exit(mysql_error());
    $affected_rows = mysql_affected_rows();
}