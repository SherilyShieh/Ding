document.write("<script type='text/javascript' src='../../data/api/HttpUtil.js'></script>");

function TestInterface() {
    return http({
        method: 'get',
        url: '/view/aboutus/search.php',
        path: '',
        body: ''
    });
}