function ScrollTable(tableid) {
    inicializar(tableid)
    window.onresize = function () {
        inicializar(tableid)
    }
    $("body").on("tableready", function (event) {
        reformatTable(tableid);
    });
    $('#' + tableid + ' tbody').scroll(function (e) { //detect a scroll event on the tbody
        desplazamiento = $('#' + tableid + ' tbody').scrollLeft() - 1;
        $('#' + tableid + ' thead').css("left", -desplazamiento); //fix the thead relative to the body scrolling
        $('#' + tableid + ' thead th:nth-child(1)').css("left", desplazamiento); //fix the first cell of the header
        $('#' + tableid + ' tbody td:nth-child(1)').css("left", desplazamiento); //fix the first column of tdbody
    });
}
function setTableWidth(tableid) {   
    ancho = window.innerWidth * .95;
    ancho = ancho + 'px';   
    document.getElementById(tableid).style.width = ancho;
    $('#' + tableid + ' tbody').css('width', ancho);
    $('#' + tableid + ' thead').css('width', ancho);
    $('body').trigger('tableready');
}
function reformatColumn(tableid, column) {
    ancho = $('#' + tableid + ' th:nth-child(' + column + ')').css('width');
    $('#' + tableid + ' td:nth-child(' + column + ')').css('min-width', ancho);
    $('#' + tableid + ' td:nth-child(' + column + ')').css('max-width', ancho);
}
function reformatRow(tableid) {
    alto = $('#' + tableid + ' td:nth-child(2)').css('height');
    $('#' + tableid + ' td:nth-child(1)').css('min-height', alto);
}
function reformatTable(tableid) {
    columns = $('#' + tableid + " tr:nth-child(1) td").length;
    for (i = 1; i <= columns; i++)
        reformatColumn(tableid, i);
    reformatRow(tableid);
}
function inicializar(tableid) {
    setTableWidth(tableid);
    reformatTable(tableid);
}