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
    $values = array();
    foreach ($_GET['values'] as $id => $value) {
        $values[] = "`" . $id . "` = '" . $value . "'";
    }
    $sql = "UPDATE `" . $_GET['table'] . "` " .
           "SET " . implode(', ', $values) . " " .
           "WHERE `id` = '" . $_GET['id'] . "';";
    mysql_query($sql);
    $affected_rows = mysql_affected_rows();
}