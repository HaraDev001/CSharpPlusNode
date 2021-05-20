var doomGlobal = '';
function validatePreSend(file, doom, type) {
    console.log('validatePreSend')
    if (type == undefined)
        type = 'ALL_VALID_FORMAT';
    $("#" + doom + " ul").empty();
    startOverlayLoading($('#' + doom));
    if (validateFile(file, type)) {
        sendFile(file);
    }
}
function validatePreSendImages(file, doom, type) {
    if (type == undefined)
        type = 'ALL_VALID_FORMAT';
    $("#" + doom + " ul").empty();
    startOverlayLoading($('#' + doom));
    console.log(type)
    if (validateFile(file, type)) {
        sendFileImages(file);
    }
}
function validateFile(inputFile, type) {
    var resp = false;
    var validFileExtensions;
    switch (type) {
        case 'ALL_VALID_FORMAT':
            validFileExtensions = ["wmv","avi","doc", "docx", "xls", "xlsx", "ppt", "pptx", "pdf", "jpg", "jpeg", "bmp", "gif", "png", "txt", "zip", "rar"];
            break;
        case 'PICTURES':
            validFileExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
            resp = true;
            break;
        case 'EXCEL':
            validFileExtensions = ["xls", "xlsx"];
            break;
        default:
            resp = true;
            break;
    }
    var isValidFileType = checkExtension(inputFile.name, validFileExtensions);
    var isValidFileSize = checkSize(inputFile.size);
    if (isValidFileType && isValidFileSize) {
        $('.divMsgAttachError').hide();
        resp = true;
    }
    else {
        if (!isValidFileType && !isValidFileSize)
            $('.msgAttachError').text('The file type is not valid (Valid type: ' + validFileExtensions.join(', .') + ') and file size exceeds 5MB.');
        else if (!isValidFileType)
            $('.msgAttachError').text('The file type is not valid (Valid type: ' + validFileExtensions.join(', .') + ').');
        else if (!isValidFileSize)
            $('.msgAttachError').text('The file size exceeds 5MB.');
        $('.divMsgAttachError').show();
        doneOverlayLoading($("#" + doomGlobal));
    }
    return resp;
}
function fileUploadCompleted(filename, doom, id, typeModulo) {
    doomGlobal = doom;
    if (filename != undefined) {
        if (filename != '') {
            if (id == undefined)
                id = -1;
            $("#" + doomGlobal + " ul").empty();
            filename = $.trim(filename);
            var icon = getFileIconByExtension(filename.split('.').pop().toLowerCase());
            var _ruta = 'http://www.academicanet.com/Documents/Attachment/' + filename;
            var url = '<a class="mailbox-attachment-name" href="#" onclick="openFile(\'' + _ruta + '\');"><i class="' + icon + '"></i> ' + filename + '</a>';
            doneOverlayLoading($("#" + doomGlobal));
            if (typeModulo == 'AGENDA')
                $("#" + doomGlobal + " ul").append('<li id="' + filename.split('.')[0] + '"><span class="text" style="margin-left:5px;">' + url + '  </span><div class="tools" style="display:inline;"><a href="#" title="Delete" onclick="deleteFile(' + id + ',\'' + filename + '\',\'' + typeModulo + '\');"> <i class="fa fa-trash-o"></i></a></div></li>');
            else if (typeModulo == 'AULAVIRTUAL') {
                $("#" + doomGlobal + " ul").append('<li id="' + filename.split('.')[0] + '"><span class="text" style="margin-left:5px;">' + url + '  </span><div class="tools" style="display:inline;"><a href="#" title="Delete" onclick="deleteFile(' + id + ',\'' + filename + '\',\'' + typeModulo + '\');"> <i class="fa fa-trash-o"></i></a></div></li>');
            }
            else {
                typeModulo = '';
                $("#" + doomGlobal + " ul").append('<li id="' + filename.split('.')[0] + '"><span class="text" style="margin-left:5px;">' + url + '  </span><div class="tools" style="display:inline;"><a href="#" title="Delete" onclick="deleteFile(' + id + ',\'' + filename + '\',\'' + typeModulo + '\');"> <i class="fa fa-trash-o"></i></a></div></li>');
            }
        }
    }
}
function getFileAttachedList() {
    var fileName = '';
    $('#' + doomGlobal + ' ul').each(function () {
        $(this).find('li').each(function () {
            var current = $(this);
            fileName += current.text();
        });
    });
    fileName = $.trim(fileName);
    return fileName;
}
function fileLeer(filename, div, multiFiles) {
    if (filename != '') {
        var icon = getFileIconByExtension(filename.split('.').pop().toLowerCase());
        $('#' + div).empty();
        filename = $.trim(filename);
        ruta = 'http://www.academicanet.com/Documents/Attachment/' + filename;
        archive = '<a class="link" target="_blank" href="' + ruta + '">' + filename + '<a>';
        $('#' + div).append('<div class="attachment-block clearfix"><img style="max-width:50px;" class="attachment-img" src="/Views/images/doc.png" alt="">' +
            '<div class="attachment-pushed"><h4 class="attachment-heading">' + archive + '</h4>' +
            '<div class="attachment-text"><a class="link" target="_blank" href="' + ruta + '">Darle Click para ver el archivo.</a></div></div></div>');
        if (multiFiles != true) {
            $('.link').attr('href', ruta);
        }
    }
    else
        $('#' + div).empty();
}
function checkExtension(sFileName, validFileExtensions) {
    if (sFileName.trim() == '') return false;
    var blnValid = false;
    var fileExtension = sFileName.split('.').pop().toLowerCase();
    for (var j = 0; j < validFileExtensions.length; j++) {
        var sCurExtension = validFileExtensions[j];
        if (fileExtension == sCurExtension.toLowerCase()) {
            blnValid = true;
            break;
        }
    }
    return blnValid;
}
function checkSize(fileSize) {
    return ((fileSize > 25242880) ? false : true);
} 
function sendFileImages(file) { 
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
        type: 'post',
        url: '../../dist/WebImages.ashx',
        data: formData,
        success: function (status) {      
            console.log(status)
            if (status != 'error') {
                console.log(doomGlobal)
                if (doomGlobal == 'divAttachmentContainer1') {
                    $('#conserve1').html(status);
                    ActualizarLogo(1);
                }
                else if (doomGlobal == 'divAttachmentContainer2')
                    //ActualizarLogo();
                    $('#conserve2').html(status);
                else if (doomGlobal == 'divAttachmentContainer3') {
                    $('#conserve1').html(status);
                    ActualizarLogo(2);
                }
                else if (doomGlobal == 'divAttachmentContainer4') {
                    $('#conserve2').html(status);
                    ActualizarLogo(3);
                }
                    ////
                else if (doomGlobal == 'divAttachmentContainer5') {
                    $('#conserve5').html(status);
                    ActualizarLogo(5);
                }
                else if (doomGlobal == 'divAttachmentContainer6') {
                    $('#conserve6').html(status);
                    ActualizarLogo(6);
                }
                else if (doomGlobal == 'divAttachmentContainer7') {
                    $('#conserve7').html(status);
                    ActualizarLogo(7);
                }
            }
        },
        processData: false,
        contentType: false,
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.responseText);
        }
    });
}
function sendFile(file) {
    var formData = new FormData();
    formData.append('file', file);
    console.log(file);
    $.ajax({
        type: 'post',
        url: '../../dist/FileUploadController.ashx',
        data: formData,
        success: function (status) {
            console.log(status)
            if (status != 'error') {
                fileUploadCompleted(status, doomGlobal);
            }
        },
        processData: false,
        contentType: false,
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.responseText);
        }
    });
}
function openFile(path) {
    window.open(path, "_blank");
}
function getFileIconByExtension(extension) {
    var icon = "fa-file-o fa-3x";
    switch (extension) {
        case "doc":
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
            break;
    }
    return icon;
}