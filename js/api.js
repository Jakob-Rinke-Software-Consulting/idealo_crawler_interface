
var cachedUsername = null;
var cachedPassword = null;

async function login(username, password) {
    const response = await fetch('php/check_login.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(username + ':' + password)
        },
    });
    const result = await response.text();
    if (result.trim() === 'true') {
        cachedUsername = username;
        cachedPassword = password;
    }
    console.log('Login result:', result);
    return result.trim() === 'true';
}

function logout() {
    cachedUsername = null;
    cachedPassword = null;
}

function isLoggedIn() {
    return cachedUsername !== null && cachedPassword !== null;
}

async function callApi(endpoint, data) {
    if (!isLoggedIn()) {
        throw new Error('Not logged in');
    }

    data.username = cachedUsername;
    data.password = cachedPassword;

    const response = await fetch(`php/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(cachedUsername + ':' + cachedPassword)
        },
        body: JSON.stringify(data)
    });
    return await response.text();
}

function getFileContent(file) {
    return callApi('get_file.php', { file: file });
}

function saveFileContent(file, newContent) {
    return callApi('set_file.php', { file: file, new_content: newContent });
}

function restartCrawler() {
    return callApi('restart_server.php', {});
}

function killCrawler() {
    return callApi('kill_server.php', {});
}

