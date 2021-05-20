$("#patient_pic").fileinput({
    showUpload: false,
    language: "es",
    uploadExtraData: function () {
        return {
            userid: $("#userid").val(),
            username: $("#username").val()
        };
    },
    //showPreview: true,
    minFileCount: 1,
    maxFileCount: 1,
    allowedFileExtensions: ["jpg", "png"],
    minImageWidth: 25,
    minImageHeight: 25,
    elErrorContainer: "#errorBlock"
}); 