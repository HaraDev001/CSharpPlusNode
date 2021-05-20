//Se necesitan de los dos elementos estos para poder llamar a la funcion tablaToExcel, solo funciona en google y firefox
//<a id="dlink" style="display:none;"></a>
//<input class="bnt btn-success form-control" type="button" onclick="tableToExcel('tbJson', 'name', 'myfile.xls')" value="Exportar a Excel
var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    return function (table, name, filename) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
        document.getElementById("dlink").href = uri + base64(format(template, ctx));
        document.getElementById("dlink").download = filename;
        document.getElementById("dlink").click();
    }
})()
$('#export').click(function () {
    $('#tablaWork').empty();
    var _dataTabla = [];
    for (var tr = 0; tr < $('#TablaNotasEst tbody tr').length; tr++) {
        var _datathText = [];
        for (var td = 0; td < $('#TablaNotasEst tbody tr:eq(' + tr + ') th').length; td++) {
            _datathText.push($('#TablaNotasEst tbody tr:eq(' + tr + ') th:eq(' + td + ')').text());
        }
        _dataTabla.push(_datathText);
    }
    var htmltable = '';
    for (var i = 0; i < _dataTabla.length; i++) {
        htmltable += '<tr>';
        for (var k = 0; k < _dataTabla[i].length; k++) {
            htmltable += '<td>' + _dataTabla[i][k] + '</td>';
        }
        htmltable += '</tr>';
    }
    $('#tablaWork').append(htmltable);

    var html, link, blob, url, css;

    // EU A4 use: size: 841.95pt 595.35pt;
    // US Letter use: size:11.0in 8.5in;

    css = (
      '<style>' +
      '@page WordSection1{size: 11.0in 8.5in;mso-page-orientation: portrait;}' +
      'div.WordSection1 {page: WordSection1;}' +
      'table{border-collapse:collapse;}td{border:1px gray solid;width:5em;padding:1px;}</style>');

    html = window.docx.innerHTML;
    blob = new Blob(['\ufeff', css + html], {
        type: 'application/msword'
    });
    url = URL.createObjectURL(blob);
    link = document.createElement('A');
    link.href = url;
    // Set default file name. 
    // Word will append file extension - do not add an extension here.
    link.download = 'Document';
    document.body.appendChild(link);
    if (navigator.msSaveOrOpenBlob) navigator.msSaveOrOpenBlob(blob, 'Document.doc'); // IE10-11
    else link.click();  // other browsers
    document.body.removeChild(link);
});
function ImprimirPDFLibretaNotas() {     
    
    //currently should be wraped in tag div or span    
    var table = $('#TablaNotasEst').prop('outerHTML');
    table = table.replace('<tfoot>', '');
    table = table.replace('</tfoot>', '');
    table = table.replace('<thead>', '');
    table = table.replace('</thead>', '');
    var simpleHtm = "<div>";
    simpleHtm += "This is <u>simple</u> html parser demo.<br>";
    simpleHtm += "<p style='font-size:20px; text-align:center'>You can set font size and align from style</p > ";
    simpleHtm += table;
    simpleHtm += "</div>";
    content = [];
    ParseHtml(content, simpleHtm);
    pdfMake.createPdf({ content: content }).download();
}
function ParseContainer(cnt, e, p, styles) {
    var elements = [];
    var children = e.childNodes;
    if (children.length != 0) {
        for (var i = 0; i < children.length; i++) p = ParseElement(elements, children[i], p, styles);
    }
    if (elements.length != 0) {
        for (var i = 0; i < elements.length; i++) cnt.push(elements[i]);
    }
    return p;
}
function ComputeStyle(o, styles) {
    for (var i = 0; i < styles.length; i++) {
        var st = styles[i].trim().toLowerCase().split(":");
        if (st.length == 2) {
            switch (st[0]) {
                case "font-size": {
                    o.fontSize = parseInt(st[1]);
                    break;
                }
                case "text-align": {
                    switch (st[1]) {
                        case "right": o.alignment = 'right'; break;
                        case "center": o.alignment = 'center'; break;
                    }
                    break;
                }
                case "font-weight": {
                    switch (st[1]) {
                        case "bold": o.bold = true; break;
                    }
                    break;
                }
                case "text-decoration": {
                    switch (st[1]) {
                        case "underline": o.decoration = "underline"; break;
                    }
                    break;
                }
                case "font-style": {
                    switch (st[1]) {
                        case "italic": o.italics = true; break;
                    }
                    break;
                }
            }
        }
    }
}
function ParseElement(cnt, e, p, styles) {
    if (!styles) styles = [];
    if (e.getAttribute) {
        var nodeStyle = e.getAttribute("style");
        if (nodeStyle) {
            var ns = nodeStyle.split(";");
            for (var k = 0; k < ns.length; k++) styles.push(ns[k]);
        }
    }
    switch (e.nodeName.toLowerCase()) {
        case "#text": {
            var t = { text: e.textContent.replace(/\n/g, "") };
            if (styles) ComputeStyle(t, styles);
            p.text.push(t);
            break;
        }
        case "b": case "strong": {
            //styles.push("font-weight:bold");
            ParseContainer(cnt, e, p, styles.concat(["font-weight:bold"]));
            break;
        }
        case "u": {
            //styles.push("text-decoration:underline");
            ParseContainer(cnt, e, p, styles.concat(["text-decoration:underline"]));
            break;
        }
        case "i": {
            //styles.push("font-style:italic");
            ParseContainer(cnt, e, p, styles.concat(["font-style:italic"]));
            //styles.pop();
            break;
            //cnt.push({ text: e.innerText, bold: false });
        }
        case "a": {
            ParseContainer(cnt, e, p, styles);
            break;
        }
        case "input": {
            ParseContainer(cnt, e, p, styles);
            break;
        }
        case "span": {
            ParseContainer(cnt, e, p, styles);
            break;
        }
        case "label": {
            ParseContainer(cnt, e, p, styles);
            break;
        }
        case "br": {
            p = CreateParagraph();
            cnt.push(p);
            break;
        }
        case "table":
            {
                var t = {
                    table: {
                        widths: [],
                        body: []
                    }
                }
                var border = e.getAttribute("border");
                var isBorder = false;
                if (border) if (parseInt(border) == 1) isBorder = true;
                if (!isBorder) t.layout = 'noBorders';
                ParseContainer(t.table.body, e, p, styles);

                var widths = e.getAttribute("widths");
                if (!widths) {
                    if (t.table.body.length != 0) {
                        if (t.table.body[0].length != 0) for (var k = 0; k < t.table.body[0].length; k++) t.table.widths.push("*");
                    }
                } else {
                    var w = widths.split(",");
                    for (var k = 0; k < w.length; k++) t.table.widths.push(w[k]);
                }
                cnt.push(t);
                break;
            }
        case "tbody": {
            ParseContainer(cnt, e, p, styles);
            //p = CreateParagraph();
            break;
        }
        case "tr": {
            var row = [];
            ParseContainer(row, e, p, styles);
            cnt.push(row);
            break;
        }
        case "td": {
            p = CreateParagraph();
            var st = { stack: [] }
            st.stack.push(p);

            var rspan = e.getAttribute("rowspan");
            if (rspan) st.rowSpan = parseInt(rspan);
            var cspan = e.getAttribute("colspan");
            if (cspan) st.colSpan = parseInt(cspan);

            ParseContainer(st.stack, e, p, styles);
            cnt.push(st);
            break;
        }
        case "th": {
            p = CreateParagraph();
            var st = { stack: [] }
            st.stack.push(p);

            var rspan = e.getAttribute("rowspan");
            if (rspan) st.rowSpan = parseInt(rspan);
            var cspan = e.getAttribute("colspan");
            if (cspan) st.colSpan = parseInt(cspan);

            ParseContainer(st.stack, e, p, styles);
            cnt.push(st);
            break;
        }
        case "div": case "p": {
            p = CreateParagraph();
            var st = { stack: [] }
            st.stack.push(p);
            ComputeStyle(st, styles);
            ParseContainer(st.stack, e, p);

            cnt.push(st);
            break;
        }
        default: {
            console.log("Parsing for node " + e.nodeName + " not found");
            break;
        }
    }
    return p;
}
function ParseHtml(cnt, htmlText) {
    var html = $(htmlText.replace(/\t/g, "").replace(/\n/g, ""));
    var p = CreateParagraph();
    for (var i = 0; i < html.length; i++) ParseElement(cnt, html.get(i), p);
}
function CreateParagraph() {
    var p = { text: [] };
    return p;
}