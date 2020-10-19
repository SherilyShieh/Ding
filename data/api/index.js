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

function ModifyProfile(opt) {
    return http({
        method: 'POST',
        url: '/view/interface/modifyprofile.php',
        path: '',
        body: opt,
        header: '',
        isFile: false
    });
}

function GetProductsInStore(opt) {
    return http({
        method: 'GET',
        url: '/view/interface/getproductsinstore.php',
        path: '',
        body: opt,
        header: '',
        isFile: false
    });
}

function CreateProduct(opt) {
    return http({
        method: 'POST',
        url: '/view/interface/createproduct.php',
        path: '',
        body: opt,
        header: '',
        isFile: false
    });
}

function ModifyProduct(opt) {
    return http({
        method: 'POST',
        url: '/view/interface/modifyproduct.php',
        path: '',
        body: opt,
        header: '',
        isFile: false
    });
}

function DeleteProduct(opt) {
    return http({
        method: 'POST',
        url: '/view/interface/deleteproduct.php',
        path: '',
        body: opt,
        header: '',
        isFile: false
    });
}

function CreateFeedback(opt) {
    return http({
        method: 'POST',
        url: '/view/interface/createfeedback.php',
        path: '',
        body: opt,
        header: '',
        isFile: false
    });
}

function GetStoreInfo(opt) {
    return http({
        method: 'GET',
        url: '/view/interface/getstoreinfo.php',
        path: '',
        body: opt,
        header: '',
        isFile: false
    });
}

function GetProductInfo(opt) {
    return http({
        method: 'GET',
        url: '/view/interface/getproductinfo.php',
        path: '',
        body: opt,
        header: '',
        isFile: false
    });
}

function GetCategories() {
    return http({
        method: 'GET',
        url: '/view/interface/gethomecategory.php',
        path: '',
        body: '',
        header: '',
        isFile: false
    });
}

function CreateBanner(opt) {
    return http({
        method: 'POST',
        url: '/view/interface/createbanner.php',
        path: '',
        body: opt,
        header: '',
        isFile: false
    });
}

function GetBanners() {
    return http({
        method: 'GET',
        url: '/view/interface/getbanners.php',
        path: '',
        body: '',
        header: '',
        isFile: false
    });
}

function SearchInStore(opt) {
    return http({
        method: 'GET',
        url: '/view/interface/searchinstore.php',
        path: '',
        body: opt,
        header: '',
        isFile: false
    });
}

function Search(opt) {
    return http({
        method: 'GET',
        url: '/view/interface/search.php',
        path: '',
        body: opt,
        header: '',
        isFile: false
    });
}

function AddToCart(opt) {
    return http({
        method: 'POST',
        url: '/view/interface/addtocart.php',
        path: '',
        body: opt,
        header: '',
        isFile: false
    });
}

function GetWishList(opt) {
    return http({
        method: 'GET',
        url: '/view/interface/getwishlist.php',
        path: '',
        body: opt,
        header: '',
        isFile: false
    });
}

function DeleteWishs(opt) {
    return http({
        method: 'POST',
        url: '/view/interface/deletewishs.php',
        path: '',
        body: opt,
        header: '',
        isFile: false
    });
}

function ModifyWish(opt) {
    return http({
        method: 'POST',
        url: '/view/interface/modifywish.php',
        path: '',
        body: opt,
        header: '',
        isFile: false
    });
}

function CreateOrders(opt) {
    return http({
        method: 'POST',
        url: '/view/interface/createorders.php',
        path: '',
        body: opt,
        header: '',
        isFile: false
    });
}

function GetOrders(opt) {
    return http({
        method: 'GET',
        url: '/view/interface/getorders.php',
        path: '',
        body: opt,
        header: '',
        isFile: false
    });
}