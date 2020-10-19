document.write("<script type='text/javascript' src='../../data/mockdata.js'></script>");
document.write("<script src='../../data/jquery-3.5.1.min.js'></script>")
document.write("<script type='text/javascript' src='../../data/api/index.js'></script>");

var unselectedIcon = '../../static/unselected.png';
var selectedIcon = '../../static/selected.png';

var unselectedIdicator = '../../static/dot_unselected.png';
var selectedIndicator = '../../static/dot_selected.png';

var errorBorder = 'solid 1px red';
var defaultBorder = 'solid 1px #C1C2C7';


var isShowRLoginPwd = false;
var isShowRegisterPwd = false;
var isShowRegisterConfirm = false;

var curwishlist = [];
var totalwish = 0;
var selectedwish = [];
/**
 * convert the str which contain '/' into array
 * @param {*} str 
 */
function formatStr(str) {
    if (str) {
        let arr = str.split('\'');
        let name = '';
        arr.forEach((item, index) => {
            if (index === 0) {
                name = item;
            } else {
                name = `${name}''${item}`;
            }

        });
        return name;
    }
    return '';

}
/**
 * delete the key whoes value is empty in the object
 * @param {*} obj 
 */
function formatObject(obj) {
    if (obj) {
        for (var key in obj) {
            if (obj[key] === '' || obj[key] === undefined || obj[key] === null) {
                delete obj[key]
            }
        }
        return obj;
    }
    return null;

}

function checkLoginStatus() {
    let user = initUser();
    if (user) {
        return user;
    }
    showToast("Please Login");
    window.open(`${window.location.origin}/view/home/Home.html`, '_self');
    return null;

}

function GetCurrentRequest() {
    checkLoginStatus();
    const url = location.search;
    let theRequest = new Object();
    if (url.indexOf("?") != -1) {
        let str = url.substr(1);
        strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    console.log(theRequest);

    return theRequest;
}

function initViewWithQuery() {
    if (window.location.pathname == '/view/search/search.html') {
        let query = GetCurrentRequest();
        getElments('header-filter').innerText = query.dep ? query.dep : 'All';
        getElments('common-search-bar').value = query.keyword ? query.keyword : '';
    }

}

// common header
var header = ['    <div class="header col-24">',
    '        <section class="col-xs-24 col-sm-20 col-md-16 col-lg-12 col-xl-12 head-left">',
    '            <section class="ding-logo" onclick="backHome()">',
    '                <img src="../../static/star.png">',
    '                <span>Ding</span>',
    '            </section>',
    '            <section class="head-search">',
    '                <section class="dropdown">',
    '                    <section class="dropbtn" onclick="openHeaderFilterDropdown()">',
    '                        <span id="header-filter">All</span>',
    '                        <img src="../../static/down.png" id="filter-open-arrow">',
    '                    </section>',
    '                    <section class="dropdown-content" id="filter-dropdown">',
    '                        <p id="header-dd-0" onclick="selectedFilter(0)">All</p>',
    '                        <p id="header-dd-1" onclick="selectedFilter(1)">Women</p>',
    '                        <p id="header-dd-2" onclick="selectedFilter(2)">Men</p>',
    '                        <p id="header-dd-3" onclick="selectedFilter(3)">Girls</p>',
    '                        <p id="header-dd-4" onclick="selectedFilter(4)">Boys</p>',
    '                    </section>',
    '                </section>',
    '                <!-- todo: click trigge the dropdown -->',
    '                <input type="text" name="key" placeholder="please input the keyword" id="common-search-bar">',
    '                <img src="../../static/search.png" onclick="search()">',
    '            </section>',
    '        </section>',
    '        <section class="col-sm-4 col-md-8 col-lg-12 col-xl-12 head-right">',
    '            <section class="dropdown">',
    '                <section class="my-account" onclick="openDropdown()">',
    '                    <img src="../../static/me.png">',
    '                    <span id="account-name-dp">My Account</span>',
    '                </section>',
    '                <section class="dropdown-content" id="unlogin-dropdown">',
    '                    <p onclick="register()">Register</p>',
    '                    <p onclick="login()">Login</p>',
    '                </section>',
    '                <section class="dropdown-content" id="logined-dropdown">',
    '                    <p onclick="openMyaccount(0)">Profile</p>',
    '                    <p onclick="openMyaccount(1)">Store</p>',
    '                    <p onclick="openMyaccount(2)">Orders</p>',
    '                    <p onclick="openMyaccount(3)">Collections</p>',
    '                    <p onclick="logout()">Logout</p>',
    '                </section>',
    '            </section>',
    '            <!-- todo: different type dropdown -->',
    '            <section class="my-account" onclick="openAboutus()">',
    '                <img src="../../static/aboutus.png">',
    '                <span>Abbout Us</span>',
    '            </section>',
    '            <section class="my-account" onclick="openCart()">',
    '                <img src="../../static/cart.png">',
    '                <span>My Cart</span>',
    '            </section>',
    '        </section>',
    '    </div>',
    '    <section class="cart-red-num-div" id="cart-red-num-sec" onclick="openCart()">',
    '        <span id="cart-red-num">99+</span>',
    '    </section>',
    '    <section class="dialog-mask" id="dialog-mask">',
    '        <section class="cart-drawers">',
    '            <img src="../../static/delete.png" class="cart-drawers-close" onclick="closeCart()">',
    '            <section class="my-cart">',
    '                <section class="my-cart-header">',
    '                    <span>My Cart</span>',
    '                    <span id="cart-count">Total: 0</span>',
    '                </section>',
    '                <section id="cart-list">',
    '                </section>',
    '                <section id="cart-list-empty">',
    '                    <section class="cart-empty-sec">',
    '                        <section class="cart-empty">',
    '                            <img src="../../static/empty.png">',
    '                            <spn>Empty Cart~!</spn>',
    '                        </section>',
    '                    </section>',
    '                </section>',
    '                <section class="my-cart-footer">',
    '                    <img src="../../static/bin3.png" onclick="deleteSelected()">',
    '                    <section class="my-cart-buy">',
    '                        <section>',
    '                            <span>Total:</span>',
    '                            <span id="total-money">NZ$0.00</span>',
    '                        </section>',
    '                        <button type="button" id="cart-buy" onclick="purchase()">',
    '                        BUY',
    '                    </button>',
    '                    </section>',
    '                </section>',
    '            </section>',
    '        </section>',
    '    </section>',
    '    <section class="dialog-mask" id="dialog-mask-login">',
    '        <section class="dialog-position">',
    '            <section class="dialog" id="login-dialog">',
    '                <img src="../../static/delete1.png" class="close-dialog" onclick="closeLoginDialog()">',
    '                <p class="dialog-title">Login</p>',
    '                <section class="dialog-form">',
    '                    <span id="error-login" class="error-msg-top">Wrong password or wrong user information</span>',
    '                    <section class="dialog-form-item2">',
    '                        <label>Email/Phone</label>',
    '                        <input type="email|phone" name="accountName" id="account-name-login" placeholder="Please enter your Email or Phone." required autofocus onblur="CheckUserName()" oninput="cancleError()">',
    '                    </section>',
    '                    <span id="error-user" class="error-msg-user">Please enter the correct email or phone number!</span>',
    '                    <section class="dialog-form-item2">',
    '                        <label>Password</label>',
    '                        <section class="password-status-sec" i id="hide-password">',
    '                            <input type="password" name="password" id="password-login-hide" placeholder="Please enter your password!" required onblur="checkPasswordRegister(this)" oninput="cancleErrorPwd(this)">',
    '                            <img src="../../static/eye_close.png" onclick="showpwd()" class="password-status">',
    '                        </section>',
    '                        <section class="password-status-sec default" id="show-password">',
    '                            <input type="text" name="password" id="password-login-show" placeholder="Please enter your password!" required onblur="checkPasswordRegister(this)" oninput="cancleErrorPwd(this)">',
    '                            <img src="../../static/eye_open.png" onclick="hidepwd()" class="password-status">',
    '                        </section>',
    '                    </section>',
    '                    <span id="error-password-login" class="error-msg-user">Please enter your password!</span>',
    '                    <section class="dialog-form-item-btn">',
    '                        <button onclick="loginU()">Login</button>',
    '                    </section>',
    '                </section>',
    '            </section>',
    '        </section>',
    '    </section>',
    '    <section class="dialog-mask" id="dialog-mask-register">',
    '        <section class="dialog-position">',
    '            <section class="dialog" id="register-dialog">',
    '                <img src="../../static/delete1.png" class="close-dialog" onclick="closeRegisterDialog()">',
    '                <p class="dialog-title">Register</p>',
    '                <section class="dialog-form">',
    '                    <section class="dialog-form-item2">',
    '                        <label>Legal Name</label>',
    '                        <input type="text" name="legalName" id="legal-name" placeholder="Please enter your name." required autofocus onblur="checkLName(this)" oninput="cancleErrorLName(this)">',
    '                    </section>',
    '                    <span id="error-legal-name" class="error-msg-user">Please enter your name</span>',
    '                    <section class="dialog-form-item2">',
    '                        <label>Address</label>',
    '                        <input type="text" name="address" id="register-address" placeholder="Please enter your address." required onblur="checkAddress(this)" oninput="cancleErrorAddress(this)">',
    '                    </section>',
    '                    <span id="error-address" class="error-msg-user">Please enter your address</span>',
    '                    <section class="dialog-form-item2">',
    '                        <label>Email</label>',
    '                        <input type="email" name="emial" id="register-emial" placeholder="Please enter your emial." required onblur="checkEmail(this)" oninput="cancleErrorEmail(this)">',
    '                    </section>',
    '                    <span id="error-emial" class="error-msg-user">Please enter your Email</span>',
    '                    <section class="dialog-form-item2">',
    '                        <label>Phone</label>',
    '                        <input type="number" name="phone" id="register-phone" placeholder="Please enter your phone number." required onblur="checkPhone(this)" oninput="cancleErrorPhone(this)">',
    '                    </section>',
    '                    <span id="error-phone" class="error-msg-user">Please enter your address</span>',
    '                    <section class="dialog-form-item2">',
    '                        <label>Nickname</label>',
    '                        <input type="text" name="nickname" id="register-nickname" placeholder="Please set a nickname of 3-11 characters." required onblur="checkNickname(this)" oninput="cancleErrorNickname(this)" maxlength="11">',
    '                    </section>',
    '                    <span id="error-nickname" class="error-msg-user">Please enter 3-10 characters.</span>',
    '                    <span class="dialoig-notice">Set your password</span>',
    '                    <section class="dialog-form-item2">',
    '                        <label>Password</label>',
    '                        <section class="password-status-sec" id="hide-password-register">',
    '                            <input type="password" name="password" id="password-register-hide" placeholder="Please enter your password!" oninput="cancleErrorPwdRegistewr(this)" onblur="checkPassword(this)">',
    '                            <img src="../../static/eye_close.png" onclick="showRegisterpwd()" class="password-status">',
    '                        </section>',
    '                        <section class="password-status-sec default" id="show-password-register">',
    '                            <input type="text" name="password" id="password-register-show" placeholder="Please enter your password!" oninput="cancleErrorPwdRegistewr(this)" onblur="checkPassword(this)">',
    '                            <img src="../../static/eye_open.png" onclick="hideRegisterpwd()" class="password-status">',
    '                        </section>',
    '                    </section>',
    '                    <span id="error-passowrd" class="error-msg-user">Please set your password!</span>',
    '                    <ul class="pwdStrength">',
    '                        <li class="weak"></li>',
    '                        <li class="middle"></li>',
    '                        <li class="strong"></li>',
    '                        <li class="result"></li>',
    '                    </ul>',
    '                    <section class="dialog-form-item2">',
    '                        <label>Comfirm</label>',
    '                        <section class="password-status-sec" id="hide-confirm">',
    '                            <input type="password" name="password" id="confirm-hide" placeholder="Please enter your password!" required oninput="cancelErrorConfirm(this)" onblur="checkConfirmInfo(this)">',
    '                            <img src="../../static/eye_close.png" onclick="showConfirmpwd()" class="password-status">',
    '                        </section>',
    '                        <section class="password-status-sec default" id="show-confirm">',
    '                            <input type="text" name="password" id="confirm-show" placeholder="Please enter your password!" required oninput="cancelErrorConfirm(this)" onblur="checkConfirmInfo(this)">',
    '                            <img src="../../static/eye_open.png" onclick="hideConfirmpwd()" class="password-status">',
    '                        </section>',
    '                    </section>',
    '                    <span id="error-confirm" class="error-msg-user">Please enter your password!</span>',
    '                    <section class="dialog-form-item-btn">',
    '                        <button onclick="RegisterU()">Register</button>',
    '                    </section>',
    '                </section>',
    '            </section>',
    '        </section>',
    '    </section>'
].join("");

// common footer
var footer = ['    <div class="bottom">',
    '        <section class="back-to-top" onclick="backToTop()">',
    '            <img src="../../static/backtotop.png">',
    '            <span>Back To Top</span>',
    '        </section>',
    '        <section class="footer-link">',
    '            <img src="../../static/instgram.png" onclick="openIns()">',
    '            <img src="../../static/facebook.png" class="middle-icon" onclick="openFace()">',
    '            <img src="../../static/email.png" onclick="openEmail()">',
    '        </section>',
    '        <p>Ding © Sherily Inc</p>',
    '    </div>'
].join("");

function setCookie(key, value, expiredays, domain, path) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    var str = expiredays ? `;expires=${exdate.toGMTString()}` : '';
    str += domain ? `;domain=${domain}` : '';
    str += path ? `;path=${path}` : '';
    document.cookie = `${key}=${escape(value)}${str}`;
}

function getCookie(key) {
    var reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`);
    var arr = document.cookie.match(reg);
    if (arr) {
        return unescape(arr[2]);
    }
    return '';
}

function clearCookie(name, domain, path) {
    setCookie(name, '', 0, domain, path);
}

function getSessionStorage(key) {
    let value = window.sessionStorage.getItem(key);
    if (value) {
        try {
            return JSON.parse(value);
        } catch (e) {
            return null;
        }
    }
    return null;
}

function showToast(val) {
    var toast = `<div class="common-toast">
                    <span>${val}</span>
                </div>`;
    addWidegt('my-toast', toast).addP();
    setTimeout(function() {
        addWidegt('my-toast', '').addP();
    }, 3000);

}

function getElments(val) {
    return document.getElementById(val);
}

function addWidegt(elem, sub) {
    var _self = getElments(elem);
    this.addP = function() {
        if (_self)
            _self.innerHTML = sub;
    }
    return this;
}

function addCommonHeader() {
    var t = new addWidegt('my-head', header);
    t.addP();
}

function addCommonFooter() {
    var t = new addWidegt('my-footer', footer);
    t.addP();
}

// Cart-drawer
function openCart() {
    if (initUser()) {
        getElments('dialog-mask').style.display = 'block';
    } else {
        showToast('Please Login first!');
    }

}

function closeCart() {
    getElments('dialog-mask').style.display = 'none';
}

function refreshTotal() {
    let total_count = 0;
    let money = 0;
    if (selectedwish.length) {
        selectedwish.forEach(element => {
            total_count += Number(element.product_count);
            money += Number(element.product_count) * Number(element.product_price);
        });
        getElments('cart-count').innerText = 'Total: ' + total_count;
        getElments('total-money').innerText = `NZ$${money}`;
    } else {
        getElments('cart-count').innerText = 'Total: 0';
        getElments('total-money').innerText = 'NZ$0.00';
    }

}

function refreshRedNum(val) {
    if (val > 0) {
        getElments('cart-red-num-sec').style.display = 'flex';
    } else {
        getElments('cart-red-num-sec').style.display = 'none';
    }
    var num = val + '';
    if (val > 99) {
        num = '99+';
    }
    getElments('cart-red-num').innerText = num;

}

function addCartItemWidget() {
    var t = new addWidegt('my-head', header);
    t.addP('cart-list');
}


function createCartList() {
    // var cartList = getCartList();
    selectedwish = [];
    let user = initUser();
    if (user) {
        GetWishList({ user_id: user.id }).then(data => {
                    var mycart = '';
                    totalwish = data.count;
                    refreshRedNum(data.count);
                    if (data.list && data.list.length) {
                        curwishlist = data.list;
                        data.list.forEach((item, index) => {
                                    item['isSelected'] = false;
                                    mycart += `<div class="cart-item">
                <section class="cart-shop">
                    <img src="../../static/unselected.png" id="cart-shop-selection-${item.store_id}" class="cart-selection-btn" onclick="changeSelected(${index})">
                    <span id="cart-shop-name" onclick="openStore(${item.store_id})">${item.store_name}</span>
                </section>
                <section id="cart-product-list">
                    ${item.products.map((pro, pindex) => {
                        pro['isSelected'] = false;
                        return `<section class="cart-product-item" id="cart-product-item-${pro.id}">
                        <img src="../../static/unselected.png" id="cart-product-selection-${pro.id}" class="cart-selection-btn" onclick="changeItemSelected(${index}, ${pindex})">
                        <img src="${window.location.origin}${pro.product_icon}" class="cart-product-icon" onclick="openProduct(${item.store_id},${pro.product_id})">
                        <section class="cart-product-info">
                            <span class="cart-product-name">${pro.product_name}</span>
                            <span>Size: ${pro.product_size}</span>
                            <span>Color: ${pro.product_color}</span>
                            <section class="cart-product-price">
                                <span>NZ$${pro.product_price}</span>
                                <section class="cart-product-action">
                                    <img src="../../static/mins1.png" onclick="deleteCount(${index}, ${pindex})">
                                    <input type="number" value="${pro.product_count}" id="cart-product-number-${pro.id}" min="1">
                                    <img src="../../static/add1.png"  onclick="addCount(${index}, ${pindex})">
                                </section>
                            </section>
                        </section>
                    </section>`
                    }).join('')}
                </section>
            </div>`;
            });
        }
        canvasMycart(mycart);
        }).catch(err=>{
            showToast(err);
        });
    } else {
        refreshRedNum(0);
    }
    

}
function canvasMycart(wid) {
    var list = getElments('cart-list');
    var empty = getElments('cart-list-empty');
    if (wid) {
        list.style.display = 'block';
        empty.style.display = 'none';
        addWidegt('cart-list', wid).addP();
    } else {
        list.style.display = 'none';
        empty.style.display = 'block';
    }
}

function openProduct(val1, val2) {
    // alert(val);
    window.open(`${window.location.origin}/view/product/product.html?sid=${val1}&pid=${val2}`, '_self');
}

function openStore(val) {
    // alert(val);
    window.open(`${window.location.origin}/view/mystore/mystore.html?sid=${val}`, '_self');
}


function changeSelected(val) {
    // change radio status, add or remove into/form selectedlist
    var shop = curwishlist[val];
    shop.isSelected = !shop.isSelected;
    if (shop.isSelected) {
        getElments(`cart-shop-selection-${shop.store_id}`).src = selectedIcon;
    } else {
        getElments(`cart-shop-selection-${shop.store_id}`).src = unselectedIcon;
    }
    shop.products.map((item) => {
        if (shop.isSelected) {
            item.isSelected = true;
            getElments(`cart-product-selection-${item.id}`).src = selectedIcon;
        } else {
            item.isSelected = false;
            getElments(`cart-product-selection-${item.id}`).src = unselectedIcon; 
        }
    });
    console.log('curwishlist', curwishlist);
    refreshselstedList(shop);
    
}
function findposition(e) {
    for (var i = 0; i < selectedwish.length; i++) {
        var item = selectedwish[i];
        if (e.id == item.id) {
            return i;
        }
    }
    return -1;
}
function refreshselstedList(shop) {
    if (selectedwish && selectedwish.length) {
        shop.products.forEach((e) => {
            var fIndex = findposition(e);
            if (fIndex >= 0 && !e.isSelected) {
                selectedwish.splice(fIndex, 1);
            } else if (fIndex < 0 && e.isSelected) {
                selectedwish.push(e);
            }
        });
    } else {
        shop.products.forEach((e) => {
            if (e.isSelected) {
                selectedwish.push(e);
            }
        });
    }
    refreshTotal();
}

function refreshSelectedCount(product, isDelete) {
    if (selectedwish && selectedwish.length) {
        if (!isDelete) {
            selectedwish.forEach(e => {
                if (e.id === product.id) {
                    e.product_count = product.product_count;
                }
            });
        } else {
            let index = findposition(product);
            if (index >= 0) {
                selectedwish.splice(index, 1);
            }
        }
    }
    refreshTotal();
    
}

function changeItemSelected(val1, val2) {
    // change radio status, add or remove into/form selectedlist
    var shop = curwishlist[val1];
    shop.products[val2].isSelected = !shop.products[val2].isSelected;
    if (shop.products[val2].isSelected) {
        getElments(`cart-product-selection-${shop.products[val2].id}`).src = selectedIcon;
    } else {
        getElments(`cart-product-selection-${shop.products[val2].id}`).src = unselectedIcon;
    }
    var isSelected = true;
    shop.products.forEach((item) => {
        isSelected = isSelected && item.isSelected;
    });
    shop.isSelected = isSelected;
    
    if (isSelected) {
        getElments(`cart-shop-selection-${shop.store_id}`).src = selectedIcon;
    } else {
        getElments(`cart-shop-selection-${shop.store_id}`).src = unselectedIcon;
    }
    console.log('curwishlist', curwishlist);
    refreshselstedList(shop);
}

function addCount(val1, val2) {
    // change item count and total price
    var shop = curwishlist[val1];
    var product = shop.products[val2];
    let count = Number(product.product_count) 
    product.product_count = count + 1;
    getElments(`cart-product-number-${product.id}`).value = product.product_count;
    shop.products.splice(val2, 1, product);
    refreshSelectedCount(product, false);
    modifywish(product.id, product.product_count);
}

function deleteCount(val1, val2) {
    // change item count and total price, if count = 0, remove item and refresh item
    var shop = curwishlist[val1];
    var product = shop.products[val2];
    let count = Number(product.product_count) 
    if ( count > 1) {
        product.product_count = count - 1;
        getElments(`cart-product-number-${product.id}`).value = product.product_count;
        shop.products.splice(val2, 1, product);
        refreshSelectedCount(product, false);
        modifywish(product.id, product.product_count);
    } else {
        shop.products.splice(val2, 1);
        refreshSelectedCount(product, true);
        let ids = [];
        ids.push(product.id);
        Deletewishs({ids}).then(data => {
            console.log(data);
            createCartList();
        }).catch(err=>{
            showToast(err);
        });
        
 
    }
}

function modifywish(id, count) {
    ModifyWish({
        wish_id: id,
        count
    }).then(data=>{
        console.log(data);
    }).catch(err=>{
        showToast(err);
    });
}

function deletewishs(ids) {
    // now won't remeber the selected status.
    DeleteWishs({
        ids
    }).then(data=>{
        console.log(data);
        createCartList();
    }).catch (err=>{
        console.log(err);
        showToast(err);
    });
}


function purchase() {
    if (selectedwish && selectedwish.length) {
        // notify sucess
        CreateOrders({orders: selectedwish}).then(data=>{
            console.log(data);
            closeCart();
            showToast('Purchase success!');
            deleteSelected();
            refreshTotal();
        }).catch(err=>{
            console.log(err);
            showToast(err);
        })

    } else {
        // todo s
        showToast('No items are currently selected!');
    }
}

function deleteSelected() {
    // remove item and refresh item
    if (!selectedwish.length) {
        showToast("No items are currently selected!");
        return;
    }
    let ids = [];
    selectedwish.forEach(e => {
        ids.push(e.id);
    });
    DeleteWishs({ids}).then(data=>{
        showToast(data);
        createCartList();
        selectedwish = [];
        refreshTotal();
    }).catch(err=>{
        showToast(err);
    });

}

// footer function
function backToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function openIns() {
    window.open('https://www.instagram.com/', '_blank');
}

function openFace() {
    window.open('https://www.facebook.com/', '_blank');
}

function openEmail() {
    window.open('https://mail.google.com/mail/', '_blank');
}

// Common header actions
function openAboutus() {
    window.open(`${window.location.origin}/view/aboutus/aboutus.html`, '_self');
    closeDropdown();
}

function backHome() {
    window.open(`${window.location.origin}/view/home/Home.html`, '_self');
    closeDropdown();
}

function quickSearch(dep, type) {
    window.open(`${window.location.origin}/view/search/search.html?dep=${dep}&type=${type}&page=1&tod=DESC&pod=ASC`, '_self');
}
function search() {
    let key = getElments('common-search-bar').value;
    let dep = getElments('header-filter').innerText;
    let depquery = dep === 'All' ? '' : `dep=${dep}&`
    if (key) {
    // alert(key);
        
        window.open(`${window.location.origin}/view/search/search.html?${depquery}keyword=${key}&page=1&tod=DESC&pod=ASC`, '_self');
        // window.open(`${window.location.origin}/view/search/search.html?keyword=${key}`, '_self');
    } else {
        showToast("please input keyword!")
    }
    closeDropdown();

}

function openMyaccount(val) {
    // todo
    window.open(`${window.location.origin}/view/myaccount/myaccount.html?nav=${val}`, '_self');
    closeDropdown();

}

function logout() {
    // todo
    Logout().then(data => {
        console.log(data);
        clearCookie('LOGIN_USER', '', '/');
        showToast("Logout successfully!");
        reset();
        window.open(`${window.location.origin}/view/home/Home.html`, '_self');
    }).catch(err => {
        showToast(err);
    });
    closeDropdown();

}


var downMenClose = "../../static/down.png";
var downMenOpen = "../../static/up.png";

function openHeaderFilterDropdown() {
    var dd = getElments('filter-dropdown');
    var narrow = getElments('filter-open-arrow');
    console.log($(dd).css('display'))
    // alert(dd.style)
    if ($(dd).css('display') == 'none') {
        dd.style.display = 'block';
        narrow.src = downMenOpen;
    } else {
        dd.style.display = 'none';
        narrow.src = downMenClose;
    }
}

var department = ['All', 'Women', 'Men', 'Girls', 'Boys'];
function selectedFilter(val) {
    setFilterCurrentType(val);
    initFilterDorp();
    getElments('header-filter').innerText = department[val];
    getElments('filter-dropdown').style.display = 'none';
    getElments('filter-open-arrow').src = downMenClose;

}


function initFilterDorp() {
    for (var i = 0; i < 5; i++) {
        if (getFilterCurrentType() == i) {
            getElments(`header-dd-${i}`).style.color = 'yellow';
        } else {
            getElments(`header-dd-${i}`).style.color = 'white';
        }
    }
}
// myaccount dropdown depend on the isLogin status show different dialog
function openDropdown() {
    if (isLogin) {
        getElments('logined-dropdown').style.display = 'block';
    } else {
        getElments('unlogin-dropdown').style.display= 'block';
    }
}

function closeDropdown() {
    getElments('logined-dropdown').style.display = 'none';
    getElments('unlogin-dropdown').style.display= 'none';
}


/* valid NZ phone number  */
function isTelCode(str) {
	var reg=/^[0][2][1579]{1}\d{6,7}$/;
	return reg.test(str);
}

/* valid emial address  */
function isEmail(str) {
	var reg= /^\w[-\w.+]*@([A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/;
	return reg.test(str);
}

// Login Dialog
function restLoginDialog() {
    getElments('account-name-login').value = '';
    getElments('account-name-login').style.border = defaultBorder;
    getElments('error-user').style.display = 'none';
    getElments('error-login').style.display = 'none';
    getElments('password-login-show').value = '';
    getElments('password-login-hide').value = '';
    getElments('hide-password').style.display = 'felx';
    getElments('show-password').style.display = 'none';

}

function showErrorForUser(msg) {
    getElments('error-user').style.display = 'block';
    getElments('account-name-login').style.border = errorBorder;
    getElments('error-user').innerText = msg;
}
function showErrorForLogin(msg) {
    getElments('error-login').style.display = 'block';
    getElments('error-login').innerText = msg;
}

function CheckUserName() {
    var userinfo =  getElments('account-name-login').value;
    if (!userinfo) {
        showErrorForUser('Please enter your email or phone number！');
        return false;
    } else if (isTelCode(userinfo) || isEmail(userinfo)) {
        cancleError();
        return true;
    } else {
        showErrorForUser('Invalid email or phone number！');
        return false;
    }
}

function cancleError() {
    getElments('error-user').style.display = 'none';
    getElments('account-name-login').style.border = defaultBorder;
}

function checkPassword(e) {
    var pwd = e.value.trim();
    if (!pwd) {
        e.style.border = errorBorder;
        getElments('error-password-login').style.display = 'block';
        return false;
    }
    return true;

}

function cancleErrorPwd(e) {
    e.style.border = defaultBorder;
    getElments('error-password-login').style.display = 'none';
}

function closeLoginDialog() {
    getElments('dialog-mask-login').style.display = 'none';
    getElments('login-dialog').style.display = 'none';
    restLoginDialog();
}
function loginU() {
    if (CheckUserName() && (isShowRLoginPwd ? checkPassword(getElments('password-login-show')) : checkPassword(getElments('password-login-hide')))) {
        var loginUser = {
            username: '',
            password: ''
        };
        loginUser.username = getElments('account-name-login').value;
        loginUser.password = getElments('password-login-hide').value;
        Login(loginUser).then((data) => {
            closeLoginDialog();
            setCookie('LOGIN_USER', JSON.stringify(data), 0, '', '/');
            console.log(data);
            reset();
        }).catch((err) => {
            showErrorForLogin('Incorrect user account or password!');
            console.log(err);
        });
    }

}

function login() {
    getElments('dialog-mask-login').style.display = 'block';
    getElments('login-dialog').style.display = 'block';
    closeDropdown();
    
}


function hidepwd() {
    isShowRLoginPwd = false;
    var pwd = getElments('password-login-show').value;
    var hp = getElments('password-login-hide');
    hp.style.display = "";
    hp.value = pwd;
    hp.focus();
    getElments('hide-password').style.display = 'flex';
    getElments('show-password').style.display = 'none';
}

function showpwd() {
    isShowRLoginPwd = true;
    var pwd = getElments('password-login-hide').value;
    var sp = getElments('password-login-show');
    sp.style.display = "";
    sp.value = pwd;
    sp.focus();
    getElments('hide-password').style.display = 'none';
    getElments('show-password').style.display = 'flex';
}

// register dialog
function register() {
    getElments('dialog-mask-register').style.display = 'block';
    getElments('register-dialog').style.display = 'block';
    closeDropdown();
}

function closeRegisterDialog() {
    getElments('dialog-mask-register').style.display = 'none';
    getElments('register-dialog').style.display = 'none';
    resetRegisterDialog();
}

function resetRegisterDialog() {
    // todo
    var legalName = getElments('legal-name');
    legalName.value = '';
    cancleErrorLName(legalName);

    var address = getElments('register-address');
    address.value = '';
    cancleErrorAddress(address);

    var email = getElments('register-emial');
    email.value = '';
    cancleErrorEmail(email);

    var phone = getElments('register-phone');
    phone.value = '';
    cancleErrorPhone(phone);

    var nickname = getElments('register-nickname');
    nickname.value = '';
    cancleErrorPhone(nickname);

    var pwdHideSec = getElments('hide-password-register');
    pwdHideSec.style.display = 'flex';
    var passwordHide = getElments('password-register-hide');
    passwordHide.value = '';

    var pwdShowSec = getElments('show-password-register');
    pwdShowSec.style.display = 'none';
    var passwordShow = getElments('password-register-show');
    passwordShow.value = '';
    cancleErrorPwdRegistewr(passwordHide);

    var confrimHideSec = getElments('hide-confirm');
    confrimHideSec.style.display = 'flex';
    var confirmHide = getElments('confirm-hide');
    confirmHide.value = '';

    var confrimShowSec = getElments('show-confirm');
    confrimShowSec.style.display = 'none';
    var confirmShow = getElments('confirm-show');
    confirmShow.value = '';
    cancelErrorConfirm(confirmHide);

}
// The password is eight or more characters and includes all three of the following: letters, numbers and special characters.
var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
// Password of seven or more characters and two out of three letters, numbers, special characters, medium strength.
var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
// If you enter a password with a strength of less than 6, it will not be verified, and only if the password strength is 6-20 
// will it be verified.
var enoughRegex = new RegExp("(?=.{6,}).*", "g");
function cancleErrorPwdRegistewr(e) {
    e.style.border = defaultBorder;
    getElments('error-passowrd').style.display = "none";
    passValidate(e);
}
function passValidate(e) {
    var flag = false;
    var pwd = e.value.trim();
    if (pwd === '') {
        $('.pwdStrength').css({'display':'none'});
        $('.weak').css({
            'background': 'rgb(238, 238, 238)'
        });
        $('.middle').css({
            'background': 'rgb(238, 238, 238)'
        });
        $('.strong').css({
            'background': 'rgb(238, 238, 238)'
        });
        $('.result').text('');
        flag = false;
    } else {
        $('.pwdStrength').css({'display':'flex'})

        if (false == enoughRegex.test(pwd)) {
            flag = false;
        } else if (strongRegex.test(pwd)) {
            $('.strong').css({
                'background': '#33ff33'
            });
            $('.result').text('强');
            flag = true;
        } else if (mediumRegex.test(pwd)) {

            $('.middle').css({
                'background': '#FFC125'
            });
            $('.strong').css({
                'background': 'rgb(238, 238, 238)'
            });
            $('.result').text('中');
            flag = true;
        } else {

            $('.weak').css({
                'background': '#EE4000'
            });
            $('.middle').css({
                'background': 'rgb(238, 238, 238)'
            });
            $('.strong').css({
                'background': 'rgb(238, 238, 238)'
            });
            $('.result').text('弱');
            flag = true;
        }
    }
    return true;
}

function checkLName(e){
    if (!e.value.trim()) {
        e.style.border = errorBorder;
        getElments('error-legal-name').style.display = "block";
        return false;
    }
    return true;
} 
function cancleErrorLName(e) {
    e.style.border = defaultBorder;
    getElments('error-legal-name').style.display = "none";
}

function checkAddress(e){
    if (!e.value.trim()) {
        e.style.border = errorBorder;
        getElments('error-address').style.display = "block";
        return false;
    }
    return true;
} 
function cancleErrorAddress(e) {
    e.style.border = defaultBorder;
    getElments('error-address').style.display = "none";
}
function checkEmail(e){
    if (!e.value.trim()) {
        e.style.border = errorBorder;
        showErrorInfo('error-emial', 'Please enter your emial!');
        return false;
    } else if (!isEmail(e.value.trim())) {
        showErrorInfo('error-emial', 'Invalid email address!');
        return false;
    }
    return true;
}

function cancleErrorEmail(e) {
    e.style.border = defaultBorder;
    getElments('error-emial').style.display = "none";
}

function checkPhone(e){
    if (!e.value.trim()) {
        e.style.border = errorBorder;
        showErrorInfo('error-phone', 'Please enter your phone number!');
        return false;
    } else if (!isTelCode(e.value.trim())) {
        showErrorInfo('error-phone', 'Invalid NZ phone number!');
        return false;
    }
    return true;
}

function cancleErrorPhone(e) {
    e.style.border = defaultBorder;
    getElments('error-nickname').style.display = "none";
}

function checkNickname(e){
    var enoughRegex = new RegExp("(?=.{3,}).*", "g");
    var text = e.value.trim();
    if (!text || !enoughRegex.test(text)) {
        e.style.border = errorBorder;
        showErrorInfo('error-nickname', 'Please enter 3 - 11 characters!');
        return false;
    }
    return true;
}

function cancleErrorNickname(e) {
    // e.value=e.value.replace(/[^\d]/g,'')
    e.style.border = defaultBorder;
    getElments('error-nickname').style.display = "none";
}

function checkPasswordRegister(e) {
    if (!e.value.trim()) {
        e.style.border = errorBorder;
        getElments('error-passowrd').style.display = "block";
        return false;
    }
    return true;
}

function showErrorInfo(val, msg) {
    var target = getElments(val);
    target.style.display = 'block';
    if (msg) {
        target.innerText = msg;
    }

}

function cancelErrorConfirm(e) {
    e.style.border = defaultBorder;
    getElments('error-confirm').style.display = 'none';
}

function checkConfirmInfo(e) {
    var password = '';
    if (isShowRegisterPwd) {
        password = getElments('password-register-show').value.trim();
    } else {
        password = getElments('password-register-hide').value.trim();
    }
    var target = e.value.trim();
    var flag = true;
    if (!target) {
        e.style.border = errorBorder;
        showErrorInfo('error-confirm', 'Please enter your password!');
        flag = false;
    } else if (target != password) {
        e.style.border = errorBorder;
        showErrorInfo('error-confirm', 'Two different entries.!');
        flag = false;
    }
    return flag;

}

function showRegisterpwd() {
    isShowRegisterPwd = true;
    getElments('hide-password-register').style.display = 'none';
    getElments('show-password-register').style.display = 'flex';
    getElments('password-register-show').value = getElments('password-register-hide').value;
}

function hideRegisterpwd() {
    isShowRegisterPwd = false;
    getElments('hide-password-register').style.display = 'flex';
    getElments('show-password-register').style.display = 'none';
    getElments('password-register-hide').value = getElments('password-register-show').value;
}

function showConfirmpwd() {
    isShowRegisterConfirm = true;
    getElments('hide-confirm').style.display = 'none';
    getElments('show-confirm').style.display = 'flex';
    getElments('confirm-show').value = getElments('confirm-hide').value;
}

function hideConfirmpwd() {
    isShowRegisterConfirm = false;
    getElments('hide-confirm').style.display = 'flex';
    getElments('show-confirm').style.display = 'none';
    getElments('confirm-hide').value = getElments('confirm-show').value;
}

function RegisterU() {
    if (checkLName(getElments('legal-name')) && checkAddress(getElments('register-address')) && checkEmail(getElments('register-emial')) && checkPhone(getElments('register-phone'))
    && checkNickname(getElments('register-nickname')) && 
    (isShowRegisterPwd ? checkPasswordRegister(getElments('password-register-show')) : checkPasswordRegister(getElments('password-register-hide')))
    && (isShowRegisterConfirm ? checkConfirmInfo(getElments('confirm-show')) : checkConfirmInfo(getElments('confirm-hide')))) {
        var request = {
            legalName: getElments('legal-name').value.trim(),
            address:getElments('register-address').value.trim(),
            email: getElments('register-emial').value.trim(),
            phone: getElments('register-phone').value.trim(),
            nickName: getElments('register-nickname').value.trim(),
            password: isShowRegisterPwd ? getElments('password-register-show').value.trim() : getElments('password-register-hide').value.trim()
        };
        Register(request).then((data) => {
            closeRegisterDialog();
            showToast(data + 'Please login!');
            login();
            
        }).catch(err => {
            closeRegisterDialog();
            showToast('Registration failed!');
        });
    }
}

function initUser() {
    let jsonuser = getCookie('LOGIN_USER');
    if (jsonuser) {
        let user = JSON.parse(jsonuser);
        isLogin = true;
        return user;
    }
    isLogin = false;
    return null;
   
}
var isLogin = false;
function reset() {
    let user = initUser();
    if (user && isLogin) {
        getElments('account-name-dp').innerText = user.nickname;
    } else {
        getElments('account-name-dp').innerText = 'My Account';
    }
}
// =========================== header ===================================


// =========================== feedback center ===================================
function createFeedbackCenter() {
    feedbackcenter = `<div class="feedback-center" onclick="openorcloseFeedback(true)">
        <img src="../../static/feed_back.png" class="feedback-center-icon">
    </div>
    <section class="dialog-mask" id="dialog-mask-feedback">
        <section class="dialog-position">
            <section class="dialog" id="feedback-dialog">
                <img src="../../static/delete1.png" class="close-dialog" onclick="openorcloseFeedback(false)">
                <p class="dialog-title">Feedback Center</p>
                <section class="dialog-form">
                    <section class="dialog-form-item">
                        <label>Name</label>
                        <input type="text" name="size" style="width: 300px;" id="feedback-name" placeholder="Please enter your name!" onblur="checkFeedback(this, 'error-feedback-name', false)" oninput="cancelFeedbackError(this, 'error-feedback-name')">
                    </section>
                    <span id="error-feedback-name" class="error-msg-user" style="margin-left: 100px;">Please enter your name!</span>
                    <section class="dialog-form-item">
                        <label>Email</label>
                        <input type="text" name="color" style="width: 300px;" id="feedback-email" placeholder="Please enter your emial!" onblur="checkFeedback(this, 'error-feedback-email', true)" oninput="cancelFeedbackError(this, 'error-feedback-email')">
                    </section>
                    <span id="error-feedback-email" class="error-msg-user" style="margin-left: 100px;">Please enter your email!</span>
                    <section class="dialog-form-item">
                        <label>Feedback</label>
                        <textarea name="description" cols="40" rows="8" id="feedback-content" placeholder="Please enter your feedback!" onblur="checkFeedback(this, 'error-feedback-content', false)" oninput="cancelFeedbackError(this, 'error-feedback-content')"></textarea>
                    </section>
                    <span id="error-feedback-content" class="error-msg-user" style="margin-left: 100px;">Please enter the feedback detail!</span>
                    <section class="dialog-form-item-btn">
                        <button onclick="sendFeedback()">Send</button>
                    </section>
                </section>
            </section>
        </section>
    </section>`;
    addWidegt('feedback-center', feedbackcenter).addP();

}

function restFeedbackForm() {
    getElments('feedback-name').value = '';
    getElments('feedback-email').value = '';
    getElments('feedback-content').value = '';
}

function openorcloseFeedback(isOpen) {
    getElments('dialog-mask-feedback').style.display = isOpen ? 'block' : 'none';
    getElments('feedback-dialog').style.display = isOpen ? 'block' : 'none';
    restFeedbackForm();
}

function sendFeedback() {
    let user = initUser();
    if (checkFeedback(getElments('feedback-name'), 'error-feedback-name', false) 
    && checkFeedback(getElments('feedback-email'), 'error-feedback-email', true) 
    && checkFeedback(getElments('feedback-content'), 'error-feedback-content', false)) {
        CreateFeedback({
            user_id: user ? user.id : '',
            cur_webpage: window.location.pathname,
            name: getElments('feedback-name').value,
            email: getElments('feedback-email').value,
            content: formatStr(getElments('feedback-content').value)
        }).then(data => {
            openorcloseFeedback(false);
            showToast(data);
        }).catch(err => {
            openorcloseFeedback(false);
            showToast(err);
        });
        
    }

}

function checkFeedback(el, error, isemail) {
    flag = true;
    if (!el.value.trim()) {
        el.style.border = errorBorder;
        if (isemail) {
            showErrorInfo(error, 'Please enter your email!');
        }
        showErrorInfo(error, 'Please enter your infomation!');
        flag = false;
    } else if (isemail && !isEmail(el.value.trim())){
        showErrorInfo(error, 'Invalid emial!');
        flag = false;
        
    }
    return flag;
} 

function cancelFeedbackError(el, error) {
    el.style.border = defaultBorder;
    getElments(error).style.display = 'none';
}
// =========================== feedback center ===================================

// =========================== banners ===================================
function formatLink(link) {
    return `'${window.location.origin}${link}'`;
}
function createBannerView() {
    GetBanners().then(data => {
        var bannerview = `
        <section class="banner-contanier">
            ${
                data.map((item, index) => {
                    let link = formatLink(item.link);
                   return `<img onclick="openBanner(${link})" src="${window.location.origin}${item.img}" id="product-banner-${index}" style="display: ${index == 0 ? 'block' : 'none'}">` 
                }).join('')
            }
        </section>
        <section class="banner-indicator">
            ${
                data.map((item, index) => {
                    return `<img src="${index == 0 ? selectedIndicator : unselectedIdicator}" id="product-indicator-${index}" onclick="showBanner(${index})">` 
                 }).join('')
            }
        </section>
        `;
        addWidegt('banner', bannerview).addP();
    }).catch(err => {
        showToast(err);
    });

}
function openBanner(link) {
    window.open(link, '_self');
}
function showBanner(index) {
    for (var i = 0; i < 6; i++) {
        getElments(`product-banner-${i}`).style.display = (i == index) ? 'block' : 'none';
        getElments(`product-indicator-${i}`).src = (i == index) ? selectedIndicator : unselectedIdicator
        if(i == index) {

        }
    }
}

function initBanner() {
    if (window.location.origin === '/view/home/Home.html') {
        createBannerView();
    }
}
// =========================== banners ===================================
window.onload = function() {
    addCommonHeader();
    addCommonFooter();
    reset();
    initFilterDorp();
    createCartList();
    createFeedbackCenter();
    initViewWithQuery();
};