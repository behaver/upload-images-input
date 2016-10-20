/* 添加上传图片 */
var uiiAddUploadImage = function (event) {
    var addButton = $(event.currentTarget);
    var wrap = addButton.parents('.uii');
    var hiBox = wrap.find('.uii-file-inputs');
    var name = wrap.attr('data-name');

    // 添加新的input:file并指定为目标input
    var length = hiBox.find('input:file').length;
    if (length < 7) { // 限定用户最多可上传6张图片
        var new_input_name = name + (length + 1);
        $('<input type="file" name="' + new_input_name + '">')
            .appendTo(hiBox)
            .click();
        // console.log(hiBox.find('input:file'));
    } else {
        alert('最多可上传6张图片！');
    }
}

/* 删除上传图片 */
var uiiDelUploadImage = function (event) {
    event.preventDefault();
    /* Act on the event */
    var name = $(this).find('img').attr('data-input-name');
    $(this).parents('.uii').find('.uii-file-inputs input[name=' + name + ']').remove();
    $(this).remove();
}

/* 上传 */
var uiiChangeUploadFile = function (event) {
    var input = $(event.currentTarget);
    var wrap = input.parents('.uii');
    var uiDisplay = wrap.find('.uii-upload-images-display');
    var hiBox = wrap.find('.uii-file-inputs');

    var file = this.files[0];
    if (window.FileReader) {
        var fr = new FileReader();
        fr.readAsDataURL(file); // 获取准备上传图片的data协议的url地址
        fr.onload = function (e) {
            $(uiDisplay).append('<div class="uii-img-box"><img src="' + e.target.result + '" data-input-name="' + wrap.attr('data-name') + $(hiBox).find('input:file').length + '"></div>');
        };
    } else {
        alert("Not supported by your browser!");
    }
}

jQuery(document).ready(function($) {
    $('.uii').append('<div class="uii-upload-images-display"></div><div class="uii-add-button"></div><div class="uii-file-inputs"></div>');
    $('.uii').on('click', '.uii-add-button', uiiAddUploadImage);
    $('.uii').on('click', '.uii-upload-images-display .uii-img-box', uiiDelUploadImage);
    $('.uii').on('change', '.uii-file-inputs input:file', uiiChangeUploadFile);
});