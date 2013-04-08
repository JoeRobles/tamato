<?php
if (isset($_GET['table']) && $_GET['table'] != '') {
    require_once 'config.php';
    $tables = $response = array();
    
    $sql = "SHOW COLUMNS FROM `" . $_GET['table'] . "`;";
    $result = mysql_query($sql);
    while ($table = mysql_fetch_assoc($result)) {
        $tables[] = $table['Field'];
    }
    $response['th'] = $tables;
    
    $sql = "SELECT `" . implode('`, `', $tables) . "`
            FROM `" . $_GET['table'] . "`;";
    $result = mysql_query($sql);
    while ($array = mysql_fetch_assoc($result)) {
        $response['td'][] = $array;
    }

    echo json_encode($response);
}