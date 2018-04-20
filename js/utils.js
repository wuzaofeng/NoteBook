//压缩和展示和上传图片
//参数,上传的Url,文件输入框选择器,图片容器选择器,压缩比率(0为不压缩,100为最大值)
function uploadImg(url, fileSlt, imgSlt) {
    $(fileSlt).change(function () {
        var file = $(fileSlt)[0].files[0];
        if (!file) { //如果没有文件
            return fasle;
        } else if (file.type.indexOf("image") < 0) {
            alert("请选择图片");
            return false;
        }
        var reader = new FileReader();  //创建文件读取对象
        reader.readAsDataURL(file);     //读取文件
        var blob;
        reader.onload = function (fe) { //读取成功事件
            var type = file.type;
            var dataUrl = this.result;    //读取文件结果
            var img = $(imgSlt)[0];       //展示目标img
            var tempImg = document.createElement("img");    //临时仅用于压缩的img
            tempImg.src = dataUrl;              //创建一个带数据的img
            var rate = computeRate(file);
            var newDataUrl = compress(tempImg, rate);
            blob = dataUrlToBlob(newDataUrl);
            var rsp = upload(url, blob);
            if (rsp) {        //如果上传成功,替换显示图片,todo未成功
                img.src = newDataUrl;
            }
        }
    });
}
//上传文件
function upload(url, file) {
    var fdata = new FormData();
    fdata.append("file", file);
    var success = "0";
    $.ajax({
        url: url,
        type: "post",
        data: fdata,
        async: false,
        contentType: false,
        processData: false,
        success: function (e) {
            if (e.indexOf("error") != -1) { //注意: 不可以有响应页面的地址作为请求url
                alert(e);       //打印服务器输出的错误信息
            } else {
                alert("上传成功");
                success = 1;
            }
        },
        error: function (e) {
            alert("上传错误");
        }
    });
    return success;
}
//计算压缩比率, 期望图片200k
function computeRate(file) {
    var wishSize = 200 * 1024;
    if (file.size < wishSize) {
        return 1;
    } else {
        return wishSize / file.size;
    }
}
//通过canvas压缩
function compress(img, qualitiy) {
    var cvs = document.createElement('canvas');
    cvs.width = img.naturalWidth;
    cvs.height = img.naturalHeight;
    cvs.getContext("2d").drawImage(img, 0, 0);
    var newDataUrl = cvs.toDataURL("image/jpeg", qualitiy);
    return newDataUrl;
}
//转换dataUrl成Blob类型的数据
function dataUrlToBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}
