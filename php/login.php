
<?php
// Try to find login_data.json in current or parent directories

$loginDataPath = __DIR__ . '../../../login_data.json';
if (!file_exists($loginDataPath)) {
    $loginDataPath = __DIR__ . '../../login_data.json';
    if (!file_exists($loginDataPath)) {
        $loginDataPath = __DIR__ . '/var/www/login_data.json';
    }
} else {
    echo "Found 1";
}

$loginData = json_decode(file_get_contents($loginDataPath), true);
echo $loginData;
$USERNAME = $loginData['username'];
$PASSWORD = $loginData['password'];

echo "USERNAME:" .$USERNAME;
echo "PASSWORD:".$PASSWORD;

# check if the user is authenticated using server authentication
if (isset($_SERVER['PHP_AUTH_USER']) && isset($_SERVER['PHP_AUTH_PW'])) {
    if ($_SERVER['PHP_AUTH_USER'] === $USERNAME && $_SERVER['PHP_AUTH_PW'] === $PASSWORD) {
        // Authenticated
    } else {
        header('WWW-Authenticate: Basic realm="My Realm"');
        header('HTTP/1.0 401 Unauthorized');
        echo 'Unauthorized';
        exit;
    }
} else {
    header('WWW-Authenticate: Basic realm="My Realm"');
    header('HTTP/1.0 401 Unauthorized');
    echo 'Unauthorized';
    exit;
}


?>