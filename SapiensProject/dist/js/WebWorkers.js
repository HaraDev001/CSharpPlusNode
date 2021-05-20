function WorkersAusencias() {
    onmessage = function (e) {
        var http = new XMLHttpRequest();
        http.open('POST', '../../Views/Shared/Utility.aspx/guardarDataAusencia', false);
        http.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                postMessage(http.responseText);
            }
        }
        http.send(JSON.stringify(e.data));
    };
}
WorkersAusencias();
