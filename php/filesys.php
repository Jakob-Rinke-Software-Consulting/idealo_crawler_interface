<?php
include_once "login.php";
include_once "config.php";

function printTextfile($filename) {
    global $SETTINGS_PATH;
    $file = $SETTINGS_PATH . $filename;
    if (file_exists($file)) {
        readfile($file);
    } else {
        echo "File not found: $file";
    }
}

function saveTextfile($filename, $content) {
    global $SETTINGS_PATH;
    $file = $SETTINGS_PATH . $filename;
    file_put_contents($file, $content);
}