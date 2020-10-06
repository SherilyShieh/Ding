document.write("<script type='text/javascript' src='../../data/api/mypromise.js'></script>")

const baseUrl = "http://localhost:8088/";
const ajax = (method, path, body, headers) => {
    return new MyPromise((resolve, reject) => {
        var request;
        if (window.XMLHttpRequest) {
            //  IE7+, Firefox, Chrome, Opera, Safari 
            request = new XMLHttpRequest();
            request.timeout = 2000;

        } else {
            // IE6, IE5 
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }
        request.open(method || 'get', path);
        if (headers) {
            for (const key in headers) {
                let value = headers[key];
                request.setRequestHeader(key, value);
            }
        } else {
            request.setRequestHeader('Content-Type', 'application/json');
        }
        request.send(body);
        request.onreadystatechange = () => {
            console.log(request);

            if (request.readyState === 4) {
                if (request.status === 200) {
                    resp = JSON.parse(request.response);
                    console.log(resp);
                    resolve(resp);
                } else {
                    reject(resp);
                }

            }
        }

    });
}

function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
}

function createQuery(key, arr) {
    let query = `${key}=${arr[0]}`;
    arr.forEach((item, index) => {
        if (index > 0) {
            query += `&${key}=${item}`;
        }
    });
    return query;
}

function http(params) {
    params.body = params.body || {};
    let url = baseUrl + params.url + params.path;
    let querys = '?';
    let method = params.method;
    let data = {};
    if (method === 'get') {
        for (let key in params.body) {
            if (params.body[key] !== undefined) {
                if (isArray(params.body[key])) {
                    let query = createQuery(key, params.body[key]);
                    if (count === 0) {
                        querys += query;
                    } else {
                        querys += `&${query}`;
                    }
                    count += 1;
                } else {
                    data[key] = params.body[key];
                }
            }
        }
        url += querys;

    } else {
        data = params.body;
    }
    count = 0;

    return ajax(method, url, data, null);

}