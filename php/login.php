
<?php
// Try to find login_data.json in current or parent directories
$loginDataPath = __DIR__ . '../../../../login_data.json';
if (!file_exists($loginDataPath)) {
    $loginDataPath = __DIR__ . '../../../login_data.json';
    if (!file_exists($loginDataPath)) {
        $loginDataPath = __DIR__ . '../../login_data.json';
        if (!file_exists($loginDataPath)) {
            $loginDataPath = __DIR__ . '/var/www/login_data.json';
        }
    }
}
$loginData = json_decode(file_get_contents($loginDataPath), true);
$USERNAME = $loginData['username'];
$PASSWORD = $loginData['password'];

echo $USERNAME;
echo $PASSWORD;

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