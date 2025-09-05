<?php
// First: Update the web interface using cd .. && git pull
include_once "login.php";
include_once "config.php";
exec('cd .. && git pull 2>&1', $output, $return_var);
echo "Web Interface wurde aktualisiert.\n";
echo implode("\n", $output);
echo "\n";
// Second: Update the crawler using cd $BASE_PATH && git pull
exec('cd ' . escapeshellarg($BASE_PATH) . ' && git pull 2>&1', $output, $return_var);
echo "\nCrawler wurde aktualisiert.\n";
echo implode("\n", $output);
?>