<?php
include "filesys.php";

$raw = file_get_contents('php://input');
$data = json_decode($raw, true) ?? [];

$file = $data['file'] ?? null;
$new  = $data['new_content'] ?? null;

if (!$file) {
    http_response_code(400);
    echo "No file specified.";
    exit;
}
if (!in_array($file, $ALLOWED_FILES, true)) {
    http_response_code(403);
    echo "File not allowed.";
    exit;
}

saveTextfile($file, $new);
echo "OK";
