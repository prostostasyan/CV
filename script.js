function SaveAsPdf() {
    const api_endpoint = "https://selectpdf.com/api2/convert/";
    const api_key = "c5801d0e-c696-41f3-9285-d074507915df";

    const url = window.location.href; // current page

    const params = {
        key: api_key,
        url: url,
        web_page_width: 1200
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', api_endpoint, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.responseType = 'arraybuffer';

    xhr.onload = function () {
        if (this.status === 200) {
            //console.log('Conversion to PDF completed ok.');
            const blob = new Blob([this.response], { type: 'application/pdf' });
            const url = window.URL || window.webkitURL;
            const fileURL = url.createObjectURL(blob);
            //window.location.href = fileURL;

            //console.log('File url: ' + fileURL);

            const fileName = "CV_ZebekSE.pdf";

            if (navigator.appVersion.toString().indexOf('.NET') > 0) {
                // This is for IE browsers, as the alternative does not work
                window.navigator.msSaveBlob(blob, fileName);
            }
            else {
                // This is for Chrome, Firefox, etc.
                const a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                a.href = fileURL;
                a.download = fileName;
                a.click();
            }
        }
        else {
            //console.log("An error occurred during conversion to PDF: " + this.status);
            alert("An error occurred during conversion to PDF.\nStatus code: " + this.status + ", Error: " + String.fromCharCode.apply(null, new Uint8Array(this.response)));
        }
    };

    xhr.send(JSON.stringify(params));
}