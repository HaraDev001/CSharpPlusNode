var win;
win = win || (function () {
    return {
        showPleaseWait: function () {
            $(".pleaseWaitDiv").show();
        },
        hidePleaseWait: function () {
            $(".pleaseWaitDiv").hide();
        }
    };
})();
$.extend($.expr[":"],
    {
        "contains-ci": function (elem, i, match, array) {
            return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
        }
    });
var accent_map = { 'á': 'a', 'é': 'e', 'è': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'a', 'É': 'e', 'è': 'e', 'Í': 'i', 'Ó': 'o', 'Ú': 'u' };
function accent_fold(s) {
    if (!s) { return ''; }
    var ret = '';
    for (var i = 0; i < s.length; i++) {
        ret += accent_map[s.charAt(i)] || s.charAt(i);
    }
    return ret;
};
function BuscadorGenerico(input, table) {
    var input, filter, table, tr, td, i;
    input = document.getElementById(input);
    filter = accent_fold(input.value).toUpperCase();
    table = document.getElementById(table);
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        console.log('tr'+tr)
        if (tr[i]) {
            if (accent_fold(tr[i].innerHTML).toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
var entityMap = { "'": '&#39;' };
function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}
function Message(op, t1, t2) {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "500",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    if (op == 1) {
        toastr.success(t1, t2);
        return
    }
    if (op == 2) {
        toastr.error(t1, t2);
        return
    }
}
function SelectElement(valueToSelect, select) {
    var element = document.getElementById(select);
    element.value = valueToSelect;
}
var overlay = $('<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>');
function start(box) {
    box.append(overlay);
    settings.onLoadStart.call(box);
}
function done(box) {
    box.find(overlay).remove();
    settings.onLoadDone.call(box);
}
function startOverlayLoading(box) {
    box.append(overlay);
}
function doneOverlayLoading(box) {
    box.find(overlay).remove();
}
function onKeyDecimal(e, thix) {
    var keynum = window.event ? window.event.keyCode : e.which;
    if (document.getElementById(thix.id).value.indexOf('.') != -1 && keynum == 46)
        return false;
    if ((keynum == 8 || keynum == 48 || keynum == 46))
        return true;
    if (keynum <= 47 || keynum >= 58) return false;
    return /\d/.test(String.fromCharCode(keynum));
}
function actionExecute(elementId, data) {
    if (elementId == undefined || elementId == "") return;
    var counter = 0;
    var objArray = $.parseJSON(data.d);
    var arrayLength = objArray.length;
    var elt = document.getElementById(elementId);
    if (elt.nodeName == "SELECT") {
        createSelectOption(elementId, data);
    }
    else if (elt.nodeName == "TABLE") {
        alert(data);
    }
    else if (elt.nodeName == "DIV") {
        loadHtmlString(elementId, data);
    }
    if (elementId == 'ddl_sub_nivel') {
        if (arrayLength > 0) {
            $('#ddl_sub_nivel').find('option').remove().end();
            while (counter < arrayLength) {
                if (counter == 0) {
                    var select = document.getElementById(elementId);
                    var opt = document.createElement('option');
                    opt.value = -1;
                    opt.innerHTML = "-- TODOS LOS GRUPOS --";
                    select.appendChild(opt);
                }
                var select = document.getElementById(elementId);
                var opt = document.createElement('option');
                opt.value = objArray[counter].id;
                opt.innerHTML = objArray[counter].Nombre;
                select.appendChild(opt);
                ++counter;
            }
            document.getElementById('idconsejero').value = objArray[0].idUsuarioConsejero;
            GetCustomers(1);
        }
    }
    else if (elementId == 'ddlPeriodo') {
        if (arrayLength > 0) {
            $('#ddlPeriodo').find('option').remove().end();
            while (counter < arrayLength) {
                var select = document.getElementById(elementId);
                var opt = document.createElement('option');
                opt.value = objArray[counter].id;
                opt.innerHTML = objArray[counter].Nombre;
                select.appendChild(opt);
                ++counter;
            }
            cargarSelectSubNivel();
        }
    }
}
function createSelectOption(selectId, data) {
    var counter = 0;
    var objArray = $.parseJSON(data.d);
    var arrayLength = objArray.length;
    var select = document.getElementById(selectId);
    while (counter < arrayLength) {
        var opt = document.createElement('option');
        opt.value = objArray[counter].id;
        opt.innerHTML = objArray[counter].Nombre;
        select.appendChild(opt);
        ++counter;
    }
    return counter;
}
function loadHtmlString(elementId, data) {
    var counter = 0;
    var objArray = $.parseJSON(data.d);
    var arrayLength = objArray.length;
    var strhtml;
    while (counter < arrayLength) {
        strhtml += objArray[counter];
        ++counter;
    }
    strhtml = strhtml.replace("undefined", "");
    $('#' + elementId).html(strhtml);
    $('.popovers').popover();
}
function getSelectedText(elementId) {
    var elt = document.getElementById(elementId);

    if (elt.selectedIndex == -1)
        return null;

    return elt.options[elt.selectedIndex].text;
}
// se agrega el parametro function_auxiliar es opcional para ejecutar una segunda funcion pero primero pregunta si posee valor antes de ejecutar por yase rodriguez
function jQueryAjax(webMethodUrl, parameters, requestType, returnDataType, elementId, function_auxiliar) {
    win.showPleaseWait();
    $.ajax({
        url: webMethodUrl,
        type: requestType,
        data: parameters,
        contentType: "application/json; charset=utf-8",
        dataType: returnDataType,
        success: function (data) {
            actionExecute(elementId, data);
            if (function_auxiliar != undefined) { function_auxiliar(data); }
            win.hidePleaseWait();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            win.hidePleaseWait();
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}
function jQueryAjax1(webMethodUrl, parameters, requestType, returnDataType, elementId, function_auxiliar) {
    win.showPleaseWait();
    $.ajax({
        url: webMethodUrl,
        type: requestType,
        data: parameters,
        contentType: "application/json; charset=utf-8",
        dataType: returnDataType,
        success: function (data) {
            function_auxiliar(elementId, data);
            win.hidePleaseWait();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            win.hidePleaseWait();
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}
function jQueryAjaxCallback(webMethodUrl, parameters, requestType, returnDataType, funcCallback, wait, errorFunction) {
    win.showPleaseWait();
    $.ajax({
        url: webMethodUrl,
        type: requestType,
        data: parameters,
        contentType: "application/json; charset=utf-8",
        dataType: returnDataType,
        success: function (data) {
            if (data.d != "") {
                $('.NotFound').hide();
                if (funcCallback != undefined) funcCallback(data);
            }
            else {
                $('.NotFound').show();
                //funcCallback('[{"none":-1}]');
            }
            if ((wait == undefined) || (wait == true)) {
                win.hidePleaseWait();
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (errorFunction != undefined) errorFunction(xhr)
            win.hidePleaseWait();
            //var err = eval("(" + xhr.responseText + ")");
            var err = xhr.statusText
            console.log(xhr)
            console.log(ajaxOptions)
            console.log(thrownError)
            console.log(err)
			console.log('Error en: ' + webMethodUrl, 'Contacte al Administrador de su Plataforma: ')
            Message(2, 'Error en: ' + webMethodUrl, 'Contacte al Administrador de su Plataforma: ');
            //window.location.replace("/index.cshtml");
        }
    });
}
function jQueryAjaxCallback_new(webMethodUrl, parameters, requestType, returnDataType, funcCallback, wait, item) {
    win.showPleaseWait();
    $.ajax({
        url: webMethodUrl,
        type: requestType,
        data: parameters,
        contentType: "application/json; charset=utf-8",
        dataType: returnDataType,
        success: function (data) {
            win.showPleaseWait();
            funcCallback(data);
            if ((wait == undefined) || (wait == true)) {
                console.log('hidePleaseWait')
                win.hidePleaseWait();
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log('hidePleaseWait')
            win.hidePleaseWait();
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}
function redirectUsuario(x1, x2, x3, desactivarusuarioporperiodo) {
    var html = '';
    if (desactivarusuarioporperiodo == 1)
        html = 'StudentDetail.aspx?x1=' + x1 + '&x2=' + x2 + '&x3=' + x3;
    else if (desactivarusuarioporperiodo == 0)
        html = 'StudentDetailDiurno.aspx?x1=' + x1 + '&x2=' + x2 + '&x3=' + x3;
    return html;
}
var QueryStringCustom = function () {
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
}();
var getIndexIfObjWithOwnAttr = function (array, attr, value) {
    if (array.length === 0) return -1;
    for (var i = 0; i < array.length; i++) {
        if (array[i].hasOwnProperty(attr) && array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}
////////MasterPage
function exit() {
    var parameters = { "param": "-1" };
    jQueryAjaxCallback("../Shared/Utility.aspx/CerrarSesionSistema", JSON.stringify(parameters), "POST", "json", postExi);
}
function postExi(res) {
    window.location = res.d;
}
function Init_Mensajes() {
    var parameters = {};
    jQueryAjaxCallback("../Shared/Utility.aspx/GetMensajesSinLeer", JSON.stringify(parameters), "POST", "json", cargarMensajesSinLeer, false);
}
function llenarMensajes() {
    var parameters = {};
    jQueryAjaxCallback("../Shared/Utility.aspx/getContenidoMensajesSinLer", JSON.stringify(parameters), "POST", "json", cargarContenidoMensajesSinLeer);
}
function Init_Notificaciones() {
    var parameters = {};
    jQueryAjaxCallback("../Shared/Utility.aspx/GetNotificacionesSinLeer", JSON.stringify(parameters), "POST", "json", cargarNotificacioneSinLeer, false);
}
function llenarNotificaciones() {
    var parameters = {"Leido": 0};
    jQueryAjaxCallback("../Shared/Utility.aspx/GetContenidoNotificacionesSinLeer", JSON.stringify(parameters), "POST", "json", cargarContenidoNotificacioneSinLeer);
}
function MensajeRapido() {
    var Subject = document.getElementById("faceTexto").value;
    console.log('Subject '+ Subject);
    EnviarMensajeRapido(Subject);
}
function EnviarMensajeRapido(Subject) {
    var parameters = { "Mensaje": Subject, "Fecha": GetDate() };
    console.log(parameters);
    jQueryAjaxCallback("../Shared/Utility.aspx/SetMensajeRapido", JSON.stringify(parameters), "POST", "json", PostMensajeRapido);
}
function PostMensajeRapido(data) {
    $('#faceTexto').val('');
    $('#Modalsugerencias').modal('hide');
    $('#MenuFace').show();
    $('#Opcion1Face').hide();
    console.log('Opcion1Face');
    Message(1, 'Mensaje Exitoso', 'Mensaje Exitoso');
}
function Init_Languaje_FP() {
    $("#patient_pic").val('');
    var parameters = {};
    jQueryAjaxCallback("../Shared/Utility.aspx/GetLanguaje", JSON.stringify(parameters), "POST", "json", PostSetLanguaje1, false);
}
function SaveLanguaje(l) {
    var parameters = { "languaje": String(l).replace(" ", "") };
    jQueryAjaxCallback("../Shared/Utility.aspx/PostSetLanguaje", JSON.stringify(parameters), "POST", "json", PostSetLanguaje, false);
}
function PostSetLanguaje1(data) {
    var objArray = $.parseJSON(data.d);
    cargarPhoto(objArray[0].ProfilePhoto);
    //LoadLanguaje(objArray[0].Languaje);
    //SetLanguaje(objArray[0].Languaje, 1, 0);
   // ValidateCantUsuario();
}
function PostSetLanguaje(data) {
    LoadLanguaje(data.d[0].text);
}
function saveencuesta() {
    var resp = $.trim($('#TextArea1').val());
    if (resp.length == 0) {
        document.getElementById('TextArea1').style.background = '#ffe3e5';
        document.getElementById('TextArea1').style.border = '1px solid #ff808a';
        document.getElementById('TextArea1').focus();
        alert('favor de completar y enviar.');
        return false;
    }
    $('#modenc').modal('hide');
    var parameters = { "respuesta": createJSON() };
    jQueryAjaxCallback("../Shared/Utility.aspx/Encuesta", JSON.stringify(parameters), "POST", "json", PostEncuesta, false);
}
function createJSON() {
    jsonObj = [];
    var $rows = $('#Tblenc tr.respuesta');
    $rows.each(function () {
        var $inputs = $(this).find(':input');
        $inputs.each(function () {
            var currentValue = $.trim($(this).val());
            var id = $(this).attr("title");
            var resp = $(this).val();
            item = {};
            item["title"] = id;
            item["resp"] = resp;
            jsonObj.push(item);
        });
    });
    return JSON.stringify(jsonObj);
}
function PostEncuesta(data) {
    $('#modenc').modal('hide');
}
function cargarPhoto(f, opcion) {
    if (f != "") {
        if (opcion == 1) {//modulo de usuario desde admin
            $('#img_FotoPerfilS').prop('src', f);
        }
        else if (opcion == 5) {//cambiar perfil
            $('#imgMyPhoto1, .imgMyPhoto2, #img_FotoPerfilS').prop('src', f);
            //if ($('#img_FotoPerfil') != undefined)
            //    $('#img_FotoPerfil').prop('src', f);
            if ($('#imgWelcomePhotoPerfil') != undefined)
                $('#imgWelcomePhotoPerfil').prop('src', f);
        }
        else {//opcion de inicio en el master page
            $('#imgMyPhoto1, .imgMyPhoto2').prop('src', f);
            if ($('#imgWelcomePhotoPerfil') != undefined)
                $('#imgWelcomePhotoPerfil').prop('src', f);
            //if ($('#img_FotoPerfil') != undefined)
            //    $('#img_FotoPerfil').prop('src', f);
        }
    }
    else {//inicialmente
        $('#imgMyPhoto1, .imgMyPhoto2').prop('src', '/dist/img/male.png');
        //if ($('#img_FotoPerfil') != undefined)
        //    $('#img_FotoPerfil').prop('src', '/dist/img/male.png');
        if ($('#imgWelcomePhotoPerfil') != undefined)
            $('#imgWelcomePhotoPerfil').prop('src', '/dist/img/male.png');
    }
}
function LoadLanguaje(tl) {
    var lang_en = 'en';
    var lang_es = 'es';
    var lang_pt = 'pt';
    //$("#LiLanguajeInit").empty();
    //if (tl == 'es') {
    //    $("#LiLanguajeInit").append('<a href="#" class="dropdown-toggle" data-toggle="dropdown"><span id="TypeLangajeSet" class="lang-sm" lang="es"></span></a><ul class="dropdown-menu"><li><span class="lang-sm lang-lbl" lang="es" onclick="SetLanguaje(\'' + lang_es + '\',2);"></span></li><li><span class="lang-sm lang-lbl" lang="en" onclick="SetLanguaje(\'' + lang_en + '\',2);"></span></li><li><span class="lang-sm lang-lbl" lang="pt" onclick="SetLanguaje(\'' + lang_pt + '\',2);"></span></li></ul>');
    //}
    //else if (tl == "en") {
    //    $("#LiLanguajeInit").append('<a href="#" class="dropdown-toggle" data-toggle="dropdown"><span id="TypeLangajeSet" class="lang-sm" lang="en"></span></a><ul class="dropdown-menu"><li><span class="lang-sm lang-lbl" lang="en" onclick="SetLanguaje(\'' + lang_en + '\',2);"></span></li><li><span class="lang-sm lang-lbl" lang="es" onclick="SetLanguaje(\'' + lang_es + '\',2);"></span></li><li><span class="lang-sm lang-lbl" lang="pt" onclick="SetLanguaje(\'' + lang_pt + '\',2);"></span></li></ul>');
    //}
    //else if (tl == "pt") {
    //    $("#LiLanguajeInit").append('<a href="#" class="dropdown-toggle" data-toggle="dropdown"><span id="TypeLangajeSet" class="lang-sm" lang="pt"></span></a><ul class="dropdown-menu"><li><span class="lang-sm lang-lbl" lang="pt" onclick="SetLanguaje(\'' + lang_pt + '\',2);"></span></li><li><span class="lang-sm lang-lbl" lang="es" onclick="SetLanguaje(\'' + lang_es + '\',2);"></span></li><li><span class="lang-sm lang-lbl" lang="en" onclick="SetLanguaje(\'' + lang_en + '\',2);"></span></li></ul>');
    //}
}
function translate(jsdata) {
    $("[tkey]").each(function (index) {
        var strTr = jsdata[$(this).attr('tkey')];
        $(this).html(strTr);
    });
}
function SetLanguaje(langCode, opcion, intent) {
    document.getElementById('TypeLangajeSet').lang = langCode;
    $.ajax({
        url: '../../dist/js/' + $.trim(langCode) + '.json',
        dataType: 'json',
        cache: true,
        success: function (data) {
            translate(data);
            if (opcion == 2) {
                SaveLanguaje(langCode);
            }
        }, error: function (jqXHR, status, error) {//Si existe un error al cargar la solicitud
            //Aqui entra en caso de haber error
        }, complete: function (jqXHR, status) {//Ejecucion espues de la solicitud independientemente si cargo bien o no
            intent++;
            if (intent <= 2) {
                SetLanguaje(langCode, opcion, intent);
            }

        }
    });
}
function cargarNotificacioneSinLeer(data) {
    var counter = 0;
    var obj = JSON.parse(data.d)[0];
    var notificaciones = obj.notificaciones
    $('.span_noti_cantidad').html(notificaciones);
    $('#span_noti_cantidadC').html(notificaciones);
}
function cargarContenidoNotificacioneSinLeer(data) {
    var counter = 0;
    if (String(data.d) != "") {
        var objArray = JSON.parse(data.d);
        var arrayLength = objArray.length;
        if (arrayLength > 0) {
            while (counter < arrayLength) {
            $('#li_body_notificacion').append('<a class="d-flex justify-content-between" href="Auladetalle?y_=' + objArray[counter].idTask + '&idU=-1">' +
                '<div class="media d-flex align-items-start">' +
                '<div class="media-left"><img src="' + objArray[counter].ProfilePhoto + '" class="round" alt="" width="40" height="40" /></div>' +
                '<div class="media-body">' +
                '<h6 class="primary media-heading">' + objArray[counter].idUsuarioDE_text + '</h6>' +
                '<small class="notification-text"> ' + objArray[counter].Asunto + '</small>' +
                '</div><small>' +
                '<time class="media-meta" datetime="2015-06-11T18:29:20+08:00">' + moment(objArray[counter].month_text).format('MMM D hh:mm A') + '</time></small>' +
                '</div>');
                ++counter;
            }
            }
        }
    $('#span_noti_cantidad').html(counter);
}
function AbrirSugerencias() {
    $('#Modalsugerencias').modal('show');
}
function cargarMensajesSinLeer(data) {
    var counter = 0;
    var obj = JSON.parse(data.d)[0];
    var mensajes = obj.mensajes
    $('.span_resumen_cantidad').html(mensajes);
    $('#li_header_cantidad').html(mensajes);
}

function cargarContenidoMensajesSinLeer(data) {
    var counter = 0;
    if (String(data.d) != "") {
        var objArray = JSON.parse(data.d);
        var arrayLength = objArray.length;
        if (arrayLength > 0) {            
            while (counter < arrayLength) {
                $('#li_body_mensajes').append('<a class="d-flex justify-content-between" href="Mensaje?idOpcion=1&idMensaje=' + objArray[counter].idMensaje + '">' +
                    '<div class="media d-flex align-items-start">' +
                    '<div class="media-left"><img src="' + objArray[counter].ProfilePhoto + '" class="round" alt="" width="40" height="40"/></div>' +
                    '<div class="media-body">' +
                    '<h6 class="primary media-heading">' + objArray[counter].idUsuarioDE_text + '</h6>' +
                    '<small class="notification-text"> ' + objArray[counter].Asunto + '</small>' +
                    '</div><small>' +
                    '<time class="media-meta" datetime="2015-06-11T18:29:20+08:00">' + moment(objArray[counter].Fecha).format('MMM D hh:mm A') + '</time></small>' +
                    '</div>');
                ++counter;
            }
        }
    }
    $('#li_header_cantidad').html(counter);
}
function formatearPromedioDecimales(promedio, decimales) {
    promedio = "" + promedio;
    if (promedio != "") {
        if (promedio.lastIndexOf(".") == -1) {
            promedio = promedio + ".0";
        }
        else {
            promedio = promedio.substring(0, promedio.lastIndexOf(".") + decimales);
        }
    }
    else {
        promedio = "&nbsp;";
    }
    return promedio;
}
function ConverterBool(value) {
    var new_value = true;
    if (value == true)
        new_value = true;
    else if (value == 'true')
        new_value = true;
    else if (value == 'True')
        new_value = true;
    else if (value == 'false')
        new_value = false;
    else if (value == false)
        new_value = false;
    else if (value == 'False')
        new_value = false;
    return new_value;
}
function ActiveMenu(id, opcion) {
    if (opcion == 2)
        $('#' + id).removeClass().addClass('treeview active menu-open');
    else
        $('#' + id).removeClass().addClass('active');
    var $Menu = $('#' + id)
   
    if ($Menu.find('active')) {
        if (id == 'Iho')
            $('#' + id + ' a img').prop('src', '../images/ACADEMICA_ICONS_HOME.png');
        //else if (id == 'Iaa')
        //    $('#' + id + ' a img').prop('src', '../images/ACADEMICA_ICONS_HOME.png');
            }
}
function autocompletar(nota, currentNotaMaxima) {
    var nota_autocompletada = nota;
    if (nota.length == 0)
        nota = 0;
    if (currentNotaMaxima == 5) {
        if (nota >= 10) {
            var n1 = nota.charAt(0);
            var n2 = nota.charAt(1);
            nota_autocompletada = n1 + '.' + n2;
        }
    }
    return nota_autocompletada;
}
function SetHeader(t, doc, page) {
    var margen_hor = 40;//25
    var mar_line = 65;//45
    var comodin = 0;//0
    var size_line = 550;
    if (page == 'landscape') {//vertical
        margen_hor = 10;
        size_line = 400;
        mar_line = 5;
        comodin = 10;
        var marg_vert = 20;
        doc.setFontSize(12);
        doc.setFontStyle("bold");
        var marginFromLeft = ((doc.internal.pageSize.getWidth() - (doc.getStringUnitWidth($('#lbl_colegio').text()) * doc.internal.getFontSize() / doc.internal.scaleFactor)) / 2);
        doc.text($('#lbl_colegio').text(), marginFromLeft, margen_hor);
        marginFromLeft = ((doc.internal.pageSize.getWidth() - (doc.getStringUnitWidth(t) * doc.internal.getFontSize() / doc.internal.scaleFactor)) / 2);
        doc.text(t, marginFromLeft, margen_hor + 15 - comodin);
        doc.setLineWidth(1);
        doc.setDrawColor(0);
        doc.line(mar_line, (margen_hor + 20 - comodin), size_line, (margen_hor + 20 - comodin));
    }
    else {//horizontal
        margen_hor = 20;
        size_line = 750;
        var marg_vert = 20;
        doc.setFontSize(12);
        doc.setFontStyle("bold");
        var marginFromLeft = ((doc.internal.pageSize.getWidth() - (doc.getStringUnitWidth($('#lbl_colegio').text()) * doc.internal.getFontSize() / doc.internal.scaleFactor)) / 2);
        doc.text($('#lbl_colegio').text(), marginFromLeft, margen_hor);
        marginFromLeft = ((doc.internal.pageSize.getWidth() - (doc.getStringUnitWidth(t) * doc.internal.getFontSize() / doc.internal.scaleFactor)) / 2);
        doc.text(t, marginFromLeft, margen_hor + 15 - comodin);
        doc.setLineWidth(1);
        doc.setDrawColor(0);
        doc.line(mar_line, (margen_hor + 30 - comodin), size_line, (margen_hor + 30 - comodin));
    }
}
function WindowPrintAjax(html, titulo1, titulo2, style, position) {

    var body = '<div style="float:left;"><img src="' + $('#img_logo_colegio').attr('src') + '" style="height:100px;width:100px;float: left;"></div><div style="text-align:center;font-weight: bold;font-size:15pt;">' + $("#lbl_colegio").text() + '</div>';
    body += '<div style="text-align:center;font-weight:900;font-size:15pt;">' + $("#lbl_direccion").text() + '</div>';
    body += '<div style="text-align:center;font-weight:900;font-size:15pt;">' + titulo1 + '</div>';
    body += '<div style="text-align:center;font-weight:900;font-size:15pt;">' + titulo2 + '</div>';
    body += '<br>';
    var newWin2 = window.open('http://www.academicanet.com', 'Print-Academica');
    //var newWin2 = window.open('http://www.codeproject.com', 'mywindow', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,copyhistory=yes,resizable=no,width=600,height=550');

    var HtmlComplete = '<!DOCTYPE html><html lang="en"><head><style type="text/css">p {margin-top:0; margin-bottom:1rem;} @media print .alert-danger{color: #fff; background-color:#fc4b6c;} {canvas.chart-canvas { min-height: 100%;max-width: 100%;max-height: 100%;height auto!important;width:auto!important;}} ' + style + ' </style></head><body onload="window.print();">' + body + html + '</body></html>';
    newWin2.document.write(HtmlComplete);
    newWin2.print();
    newWin2.close();
}
function ValidateCantUsuario() {
    $('#Perfil_id2').empty();
    var parameters = {};
    jQueryAjaxCallback("../Shared/Utility.aspx/ValidCountUsers", JSON.stringify(parameters), "POST", "json", PostValidateCantUsuario);
}
function PostValidateCantUsuario(data) {
    console.log(data)
    $('#Perfil_id2').show();
    $('#Perfil_id2').empty();
    var m = $.parseJSON(data.d);
    console.log(m)
    var arrayLength = m.length;
    var counter = 0;
    while (counter < arrayLength) {
        $('#Perfil_id2').append('<hr><div style="padding-top: 1px;padding-bottom: 1px;" onclick="ChangeUserNewVersion(' + m[counter].idUsuario + ',' + m[counter].idRol + ', 1);" class="d-flex justify-content-start align-items-center mb-1 dropdown-item" >'+
            '<div class="avatar mr-1">'+
            '<img src="' + m[counter].ProfilePhoto + '" alt="avtar img holder" width="45" height="45">'+
                '</div>'+
                '<div class="user-page-info">'+
            '<p class="mb-0">' + m[counter].NombreCompleto + '</p>'+
            '<span class="font-small-2">' + m[counter].NombreRol + ' - ' + m[counter].NombreEscuela + '</span>' +
            '<p class="font-small-2">' + m[counter].NombreFrase + '</p>' +
                '</div></div>');
            //< div class= "box-comment" style = "cursor:pointer;" onclick = "ChangeUserNewVersion(' + m[counter].idUsuario + ',' + m[counter].idRol + ');" > ' +
            //'<img class="rounded img-sm" src="' + m[counter].ProfilePhoto + '" alt="User Image">' +
            //'<div class="comment-text"><span class="username">' + m[counter].NombreCompleto + '</span>' + m[counter].NombreEscuela + '<span class="users-list-date">' + m[counter].NombreRol + '</span></div></div>');
        counter++;
    }
}
function ChangeUserNewVersion(idUsuario, idRol, p) {
    var parameters = { "idUsuario": idUsuario, "idRol": idRol, "p": p };
    jQueryAjaxCallback("../Shared/Utility.aspx/LoadUsuarioDifferente", JSON.stringify(parameters), "POST", "json", PostChangeNew);
}
function PostChangeNew(res) {
    window.location = res.d;
}
function print(ventana) {
    setTimeout(function () {
        ventana.print();
        ventana.close();
    }, 1000)
}
function Excell(NameTable) {
    var xml = "[", e = '';
    var counter = 0;
    var countitem = 0;
    $("#TablaNotasEst thead tr").each(function (index) {
        e = '';
        if (counter > 0) {
            xml += "{ ";
            $(this).children().each(function (index2) {
                if (countitem > 0) {
                    var er = $(this).html();
                    er = er.charAt(0);
                    if (er == '<') {
                        $(this).children().each(function (index3) {
                            e = $(this).html();
                            e = e.replace('<p>', ' ');
                            e = e.replace('</p>', ' ');
                            return false;
                        });
                    }
                    else {
                        e = $(this).html();
                    }
                    if (e == "") {
                        e = "";
                    }
                    xml += ", id" + countitem + ":'" + e + "' ";
                }
                else {
                    if ($('#idMetodoPromedio').val() == 6)
                        xml += "id0:'#', id01:'Alumnos', id02:'Final 100%' ";
                    else
                        xml += "id0:'Alumnos' ";
                }
                countitem++;
            });
        }
        counter++;
    });
    xml += "}, ";
    $("#TablaNotasEst tbody tr").each(function (index) {
        xml += "{ ";
        counter = 0;
        $(this).children().each(function (index2) {
            if (counter == 0) {
                e = $(this).attr('id');
                e = $('#' + e + ' span').html();
            }
            else
                e = $(this).html();
            var c = " ";
            if (counter > 0)
                c = ",";
            if ((e == "") || (e == "&nbsp;")) {
                e = "";
            }
            xml += c + "id" + counter + ":'" + e + "' ";
            counter++;
        });
        xml = xml.substring(0, xml.length - 1);
        xml += " ,contador:'" + counter + "'},";
    });
    xml = xml.substring(0, xml.length - 1);
    xml += "]";
    var parameters = { "xml": xml };
    jQueryAjaxCallback("../Shared/Utility.aspx/LibretaExcel", JSON.stringify(parameters), "POST", "json", PostLibretaExcel);
}
function CssComplemento(u, n) {
    var lenUrl = u.length;
    if (lenUrl == 0)
        return '';
    var css = '<a href="' + u + '" target="_blank"><div title="' + n + '" style="align-items: center;-moz-border-radius: 15px;border-radius: 15px;-moz-box-shadow: inset 0 0 0 1px rgba(100,121,143,0.302);box-shadow: inset 0 0 0 1px rgba(100,121,143,0.302);box-sizing: border-box;color: #5f6368;display: -webkit-box;display: -moz-box;display: -webkit-flex;display: -ms-flexbox;display: flex;height: 30px;padding: 0 12px;margin-right: 8px;max-width: 160px;min-width: 64px;">'
        + '<span class="bzB" style="border: 0;clip: rect(1px,1px,1px,1px);height: 1px;overflow: hidden;padding: 0;position: absolute;width: 1px;">Archivo adjunto:</span>'
        + '<img class="brf" src="https://academicanet.com/Views/images/pdfX16.png"'
        + 'style="height: 16px;margin-right: 8px;width: 16px;-moz-box-flex: 0 0 16px;flex: 0 0 16px;">'
        + '<span class="brg" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;-moz-osx-font-smoothing: grayscale;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;font-size: .875rem;letter-spacing: .2px;">' + n + '</span>'
        + '</div></a>';
    return css;
}
function ConstruirAttachCss(u, t, i, idArchivo) {
    if (u == undefined) {
        return "-"
    }
    u = codificarFileName(u);
    var n = getNombre(u);
    var filename = $.trim(n);
    var icon = getFileIconByExtension(filename.split('.').pop().toLowerCase());
    if (t == 1) {
        var css = CssComplemento(u, n);
    }
    else if (t == 2) {
        var onclick = '<small class="label label-danger pull-right" style="cursor:pointer;" onclick="EliminarAttachment(' + i + ',' + idArchivo + ');"> <i class="fa fa-close (alias)"></i> </small>';
        if (idRolA == 5)
            if (p == 89)
                onclick = '';
        var css = '<div id="' + i + '" style="border-radius: 2px;padding: 10px;background:#ebebeb;margin-bottom: 2px;color:#444;">' +
            '<span class="text" style="margin-left: 5px;max-width: 360px;min-width: 64px;display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"><a class="text-aqua" target="_blank" href="' + u + '"> ' + n + '</a></span>' +
            onclick + '</div>';
    }
    else {//if (t == 3) {
        if (icon == 'none') {
            var css = '<img class="img-fluid pad" alt="img" src="' + u + '">'
        }
        else {
            var css = CssComplemento(u, n);
        }
    }
    return css;
}
function getFileIconByExtension(extension) {
    var icon = "none";
    switch (extension) {
        case "doc":
        case "rtf":
        case "docx":
            icon = "fa fa-file-word-o fa-3x";
            break;
        case "xls":
        case "xlsx":
            icon = "fa fa-file-excel-o fa-3x";
            break;
        case "pdf":
            icon = "fa fa-file-pdf-o fa-3x";
            break;
        case "ppt":
            icon = "fa fa-file-powerpoint-o fa-3x";
            break;
        case "pptx":
            icon = "fa fa-file-powerpoint-o fa-3x";
            break;
        case "txt":
            icon = "fa fa-file-text-o fa-3x";
        case "mp4":
        case "m4a":
            icon = "fa fa-file-video-o fa-3x";
            break;
        case "mp3":
        case "amr":
        case "wav":
            icon = "fa fa-file-video-o fa-3x";
            break;
    }
    return icon;
}
function getNombre(url) {
    var partesNombre = url.split('/')
    return partesNombre[partesNombre.length - 1]
}
function codificarFileName(archivo) {
    var secciones = archivo.split('/')
    var ultimo = secciones[secciones.length - 1]
    ultimo = encodeURI(ultimo)
    secciones[secciones.length - 1] = ultimo
    archivo = secciones.join('/')
    return archivo
}
function GetDate() {
    var d = new Date();
    var strDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    return strDate
}

function esc_quot(text) {
    if (text != undefined)
        return text.replace(/"/g, "\\\'");
    return ''
}
function esc_unquot(text) {
    if (text != undefined)
        return text.replace(/\'/g, "\"");
    return ''
}

function esc_json(text) {
    if (text != undefined)
        return text.replace(/\\/g, "\\\\");
    return ''
}
function SetMomentLanguaje() {
    var lenguaje = getCookie('lenguaje')
    if (lenguaje != 'es' && lenguaje != undefined) {
        moment.locale('en');
    }
}
function debug(value) {
    //var value = window[nombreVariable];
    var nombreVariable = Object.keys(value)[0]
    console.log(nombreVariable)                          //mostramos nombre de la variable
    console.log(value)                 //mostramos su valor
}
function SetColor(val) {
    var c = '';
    if (val >= 4)
        c = 'alert-success';
    else if ((val < 4) && (val >= 3))
        c = 'alert-warning';
    else if ((val < 3) && (val > 0))
        c = 'alert-danger';
    return c;
}