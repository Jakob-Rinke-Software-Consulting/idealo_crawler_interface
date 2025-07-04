<?php
include "filesys.php";
include_once "config.php";

$raw = file_get_contents('php://input');
$data = json_decode($raw, true) ?? [];

if (!isset($data['file'])) {
    http_response_code(400);
    echo "No file specified.";
    exit;
}

$file = $data['file'];

if (in_array($file, $ALLOWED_FILES, true)) {
    printTextfile($file);
} else {
    http_response_code(403);
    echo "File not allowed.";
}
