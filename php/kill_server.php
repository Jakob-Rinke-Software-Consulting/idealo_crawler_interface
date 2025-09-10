<?php
include_once "login.php";
exec('sudo -n /usr/bin/systemctl stop idealo.crawler 2>&1', $output, $return_var);
echo "Crawler wurde gestoppt.\n";
echo implode("\n", $output);
?>
