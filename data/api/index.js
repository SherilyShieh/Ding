document.write("<script type='text/javascript' src='../../data/api/HttpUtil.js'></script>");

function TestInterface(opt) {
    return http({
        method: 'GET',
        url: '/view/aboutus/search.php',
        path: '',
        body: opt,
        header: '',
        isFile: false
    });
}

function Register(opt) {
    return http({
        method: 'POST',
        url: '/view/interface/register.php',
        path: '',
        body: opt,
        header: '',
        isFile: false
    });
}

function Login(opt) {
    return http({
        method: 'GET',
        url: '/view/interface/login.php',
        path: '',
        body: opt,
        header: '',
        isFile: false
    });
}

function Logout() {
    return http({
        method: 'POST',
        url: '/view/interface/logout.php',
        path: '',
        body: '',
        header: '',
        isFile: false
    });
}

function UploadFile(file) {
    return http({
        method: 'POST',
        url: '/view/interface/fileupload.php',
        path: '',
        body: file,
        header: '',
        isFile: true
    });
}

function CreateDepartment(opt) {
    return http({
        method: 'POST',
        url: '/view/interface/createdepartment.php',
        path: '',
        body: opt,
        header: '',
        isFile: false
    });
}