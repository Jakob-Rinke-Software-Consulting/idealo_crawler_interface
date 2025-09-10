<?php
include_once "login.php";
exec('sudo -n /usr/bin/systemctl restart idealo.crawler 2>&1', $output, $return_var);
echo "Crawler wurde neu gestartet:\n";
echo implode("\n", $output);
?>
