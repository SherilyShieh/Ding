document.write("<script type='text/javascript' src='../../data/api/mypromise.js'></script>")
document.write("<script src='../../data/jquery-3.5.1.min.js'></script>")
    // var data_model = {
    //     data: {

//     },
//     status: {
//         code: 200, // 404, 503, 500
//         msg: ""
//     }
// }
const baseUrl = "http://localhost:8088/"; // if you wanna run on your compute, please change this to your database address 
const ajax = (method, path, body, header, isFile) => {
    return new MyPromise((resolve, reject) => {
        data = (method === "POST" && !isFile) ? JSON.stringify(body) : body;
        $.ajax({
            type: method,
            contentType: isFile ? false : header,
            processData: !isFile,
            url: path,
            data: data,
            success: function(result) {
                console.log(result);
                if (result.status.code === 200) {
                    resolve(result.data);
                } else {
                    reject(result.status.msg);
                }

            },
            error: function(e) {
                console.log(e.status);
                console.log(e.responseText);
                reject(e.responseText);
            }
        });

    });
}


function http(params) {
    params.body = params.body || {};
    let url = baseUrl + params.url + params.path;
    let method = params.method;
    let data = params.body;
    let header = params.header || "application/json;charset=UTF-8";
    let isFile = params.isFile;

    return ajax(method, url, data, header, isFile);

}