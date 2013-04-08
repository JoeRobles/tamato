<?php
if (isset($_GET['table']) && $_GET['table'] != '') {
    require_once 'config.php';
    $sql = "SHOW COLUMNS FROM `" . $_GET['table'] . "`;";
    $result = mysql_query($sql);
    $tables = array();
    while ($table = mysql_fetch_assoc($result)) {
        $tables[] = $table['Field'];
    }
    
    $sql = "SELECT `" . implode('`, `', $tables) . "`
            FROM `" . $_GET['table'] . "`;";
    $result = mysql_query($sql);
    $response = array();
    $response['th'] = $tables;
    while ($array = mysql_fetch_assoc($result)) {
        $response['td'] = $array;
    }
    echo json_encode($response);
}