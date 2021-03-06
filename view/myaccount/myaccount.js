var navmenu = ["profile", "store", "orders", "collections"];
changeStyle('profile', true);
registerNav(0);
registerNav(1);
registerNav(2);
registerNav(3);
GetRequest();

// ====================== common tools in account page start================================
/**
 * get query info refresh page
 */
function GetRequest() {
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

    let nav = Number(theRequest.nav);
    changeNav(nav)
}

/**
 * 
 * @param {*} val 
 * change navigation bar & sub view
 */
function changeNav(val) {
    var i = 0;
    for (i = 0; i < 4; i++) {
        if (i == val) {
            changeStyle(navmenu[val], true);
        } else {
            changeStyle(navmenu[i], false);
        }
    }
    if (val == 0) {
        initProfileView();
    } else if (val == 1) {
        createProductsView(1);
    } else if (val == 2) {
        createOrderView(1);
    } else if (val == 3) {
        createCollectionView(1);
    }
}

/**
 * Add onclick listener for each nav button
 * @param {*} val 
 */
function registerNav(val) {
    getElments(navmenu[val]).addEventListener("click", () => openNav(val));
}

/**
 * show different type sub view via query
 * @param {*} val 
 */
function openNav(val) {
    let location = window.location;
    let link = `${location.origin}${location.pathname}?nav=${val}`;
    window.open(link, '_self')
}

/**
 * change sub view
 * @param {*} val 
 * @param {*} isSelected 
 */
function changeStyle(val, isSelected) {
    var title = val + "-title";
    var icon = val + "-icon";
    var info = val + "-info";
    if (isSelected) {
        getElments(val).style.background = '#1C748B';
        getElments(title).style.color = 'white';
        getElments(icon).src = `../../static/${val}_selected.png`;
        getElments(info).style.display = 'flex';
        return;
    } else {
        getElments(val).style.background = 'white';
        getElments(title).style.color = '#666666';
        getElments(icon).src = `../../static/${val}_unselected.png`;
        getElments(info).style.display = 'none';
        return;
    }
}



function openAccountDp(isOpen, dp) {
    getElments(dp).style.display = isOpen ? 'block' : 'none';
}

function changeDpTitle(el, dp, title, str, code) {
    getElments(title).innerText = str + el.innerText;
    openAccountDp(false, dp);
    switch (code) {
        case 1:
            createProductsView(1);
            break;
        case 2:
            createOrderView(1);
            break;
        case 3:
            createCollectionView(1);
            break;

    }
}

function strCovertToList(val) {
    if (val) {
        return val.split('/');
    }
    return null;

}

// ====================== common tools in account page end================================


// ======================== profile start=============================
function updateProfile() {
    let phone_nz = $('#profile-phone').val().trim();
    let email = $('#profile-email').val().trim();
    let nickname = $('#profile-nickname').val().trim();
    let address = $('#profile-address').val().trim();
    if (!phone_nz && !email && !nickname && !address) {
        showToast("Please input some information!")
        return;
    }
    let modify = {
        phone_nz,
        email,
        nickname,
        address
    }
    let tt = formatObject(modify);
    let user = initUser();
    let requet = { userid: user.id, info: tt }
    ModifyProfile(requet).then(data => {
        for (var key in tt) {
            if (key == 'phone_nz') {
                user['phone'] = tt['phone_nz'];
            } else {
                user[key] = tt[key];
            }
        }
        setCookie('LOGIN_USER', JSON.stringify(user), 0, '', '/');
        reset();
        initProfileView()
    }).catch(err => {
        showToast(err);
    });
}

function initProfileView() {
    let user = initUser();
    $('#profile-name').attr('value', user.legalName);
    $('#profile-phone').attr('placeholder', user.phone);
    $('#profile-email').attr('placeholder', user.email);
    $('#profile-nickname').attr('placeholder', user.nickname);
    $('#profile-address').attr('placeholder', user.address);
}

function checkUpdatePhone(el) {
    if (el.value.trim()) {
        if (!isTelCode(el.value.trim())) {
            el.style.border = errorBorder;
            getElments('error-update-phone').style.display = 'block';
        }
    }
}

function cancelErrorUpdatePhone(el) {
    el.style.border = defaultBorder;
    getElments('error-update-phone').style.display = 'none';
}

function checkUpdateEmail(el) {
    if (el.value.trim()) {
        if (!isEmail(el.value.trim())) {
            el.style.border = errorBorder;
            getElments('error-update-email').style.display = 'block';
        }
    }
}

function cancelErrorUpdateEmail(el) {
    el.style.border = defaultBorder;
    getElments('error-update-email').style.display = 'none';
}
// ======================== profile end=============================



// ======================== product start ==========================
var isCreate = false;
var modifyPId = 0;

function addProduct(isAdd, id) {
    isCreate = isAdd;
    modifyPId = id;
    getElments('account-dialog-title').innerText = isAdd ? 'Add Product' : 'Edit Product';
    getElments('dialog-mask-account').style.display = 'block';
    getElments('add-dialog-account').style.display = 'block';
}

function closeDialog() {
    restForm();
    getElments('dialog-mask-account').style.display = 'none';
    getElments('add-dialog-account').style.display = 'none';

}

function previousProduct() {

    if (productCount == 0) {
        showToast("Current list is empty!")
        return;
    } else if (currentIndex <= 1) {
        showToast("Current page is the first page!")
        return;
    } else {
        currentIndex--;
        createProductsView(currentIndex);

    }
}

function nextProduct() {
    console.log('totalProductPage', totalProductPage)
    if (currentIndex < totalProductPage) {
        currentIndex++;
        createProductsView(currentIndex);
    } else {
        showToast('This is the last page');
    }

}

function goToProductPage(event, elem) {
    var evt = window.event || event;
    if (evt.keyCode == 13) {
        let index = elem.value;
        if (index && index <= totalProductPage) {
            createProductsView(index);
        } else {
            showToast('Please enter a valid number!');
        }
    }
}

function restForm() {
    getElments('product-title').value = "";
    getElments('product-price').value = "";
    getElments('product-color').value = "";
    getElments('product-department').value = "";
    getElments('product-type').value = "";
    getElments('product-size').value = "";
    getElments('product-description').value = "";

    var file = getElments('product-icon');
    file.outerHTML = file.outerHTML;
    var file2 = getElments('product-icon');
    file2.outerHTML = file2.outerHTML;
    $('#icon-canvas-div').hide();
    $('#img-canvas-div').hide();

}

function validForm(name, price, icon, color, department, type, size, img, detail) {
    if (isCreate) {
        if (!name || !price || !icon || !department || !type || !size || !img || !detail || !color) {
            showToast("Please fill out the form with complete information!");
            return false;
        }
        return true;
    } else {
        if (!name && !price && !icon && !department && !type && !size && !img && !detail && !color) {
            showToast("Please input some information to modify the product!");
            return false;
        }
        return true;
    }


}

function cancel() {
    closeDialog();
}

function createProduct(user, product_name, product_price, icon, product_color, department, type, product_size, content_img, product_detail) {
    var product_icon;
    var product_content_img;
    var formdata = new FormData();
    formdata.append('pic', icon);
    UploadFile(formdata).then(data => {
        console.log('icon', data);
        product_icon = data;
        var formdata2 = new FormData();
        formdata2.append('pic', content_img);
        UploadFile(formdata2).then(data => {
            console.log('img', data);
            product_content_img = data;
            CreateProduct({
                userid: user.id,
                department,
                type,
                product_name: formatStr(product_name),
                product_icon,
                product_content_img,
                product_size: JSON.stringify(product_size),
                product_price,
                product_color: JSON.stringify(product_color),
                product_detail: formatStr(product_detail)
            }).then(data => {
                console.log('create', data);
                closeDialog();
                showToast('success');
                createProductsView(1);
            }).catch(err => {
                console.log(err);
                closeDialog();
                showToast(err);
            });
        }).catch(err => {
            console.log(err);
            closeDialog();
            showToast(err);
        });

    }).catch(err => {
        console.log(err);
        closeDialog();
        showToast(err);
    });
}

function modifySub(product_name, product_price, product_icon, color, department, type, size, product_content_img, product_detail) {
    let product_color = color ? JSON.stringify(color) : '';
    let product_size = size ? JSON.stringify(size) : '';
    let modify = formatObject({
        product_name: formatStr(product_name),
        product_price,
        product_icon,
        product_color,
        department,
        type,
        product_size,
        product_content_img,
        product_detail: formatStr(product_detail)
    });
    ModifyProduct({ product_id: modifyPId, info: modify }).then(data => {
        console.log('modify-data', data);
        closeDialog();
        createProductsView(1);
    }).catch(err => {
        console.log('modify-err', err);
        showToast(err);
        closeDialog();
    });
}

function modifyProduct(product_name, product_price, icon, color, department, type, size, content_img, product_detail) {
    console.log(icon, content_img);
    if (icon && content_img) {
        var product_icon;
        var product_content_img;
        var formdata = new FormData();
        formdata.append('pic', icon);
        UploadFile(formdata).then(data => {
            console.log('icon', data);
            product_icon = data;
            var formdata2 = new FormData();
            formdata2.append('pic', content_img);
            UploadFile(formdata2).then(data => {
                console.log('img', data);
                product_content_img = data;
                modifySub(product_name, product_price, product_icon, color, department, type, size, product_content_img, product_detail);

            }).catch(err => {
                showToast(err);
                closeDialog();
            });
        }).catch(err => {
            showToast(err);
            closeDialog();
        });
    } else if (!icon && content_img) {
        var product_content_img;
        var formdata = new FormData();
        formdata.append('pic', content_img);
        UploadFile(formdata).then(data => {
            console.log('img', data);
            product_content_img = data;
            modifySub(product_name, product_price, '', color, department, type, size, product_content_img, product_detail);
        }).catch(err => {
            showToast(err);
            closeDialog();
        });
    } else if (!content_img && icon) {
        var product_icon;
        var formdata = new FormData();
        formdata.append('pic', icon);
        UploadFile(formdata).then(data => {
            console.log('icon', data);
            product_icon = data;
            modifySub(product_name, product_price, product_icon, color, department, type, size, '', product_detail);
        }).catch(err => {
            showToast(err);
            closeDialog();
        });
    } else {
        modifySub(product_name, product_price, '', color, department, type, size, '', product_detail);
    }
}

function submit() {
    let user = checkLoginStatus();
    let product_name = $('#product-title').val();
    let product_price = $('#product-price').val();
    let icon = $('#product-icon')[0].files[0];
    let color = $('#product-color').val();
    let department = $('#product-department').val();
    let type = $('#product-type').val();
    let size = $('#product-size').val();
    let content_img = $('#product-content-img')[0].files[0];
    let product_detail = $('#product-description').val();
    if (validForm(product_name, product_price, icon, color, department, type, size, content_img, product_detail)) {
        let product_color = strCovertToList(color);
        let product_size = strCovertToList(size);
        if (isCreate) {
            createProduct(user, product_name, product_price, icon, product_color, department, type, product_size, content_img, product_detail);
        } else {
            modifyProduct(product_name, product_price, icon, product_color, department, type, product_size, content_img, product_detail);
        }
    }

}

function updateProductPager(index) {
    $('#product-pager').text(`${index}/${totalProductPage}`);
}

/**
 * read img from local & show it
 * @param {*} id1 
 * @param {*} id2 
 * @param {*} id3 
 */
function showIcon(id1, id2, id3) {

    let icon = $(id1)[0].files[0];
    var reader = new FileReader();
    reader.readAsDataURL(icon);
    reader.onloadend = function() {
        /// deal data.
        var img = new Image();
        /// after loader, result storage the file content result.
        img.src = this.result;
        img.onload = function() {
            var myCanvas = document.getElementById(id2);
            document.getElementById(id3).style.display = "flex";
            myCanvas.style.display = "block";
            var cxt = myCanvas.getContext('2d');
            cxt.drawImage(img, 0, 0, 100, 100);
        }
    }

}
var productCount = 0;
var currentIndex = 0;
var totalProductPage = 0;

function createProductsView(pageIndex) {
    let priceorder = getElments('account-price-sort-text').innerText === "Price: Low to High" ? 'ASC' : 'DESC';
    let timeorder = getElments('account-time-sort-text').innerText === "Time: Old to Latest" ? 'ASC' : 'DESC';
    var productsView = '';
    // var list = getSearchList();
    let user = checkLoginStatus();
    GetProductsInStore({
        userid: user.id,
        priceorder,
        timeorder,
        page: pageIndex
    }).then(data => {
        productCount = data.count;
        currentIndex = pageIndex;
        totalProductPage = Math.ceil(productCount / 10);
        updateProductPager(currentIndex);
        if (data.count) {
            getElments('my-product-list').style.display = 'flex';
            getElments('my-product-list-empty').style.display = 'none';
            data.list.forEach((item, index) => {
                let img = `${window.location.origin}${item.product_icon}`;
                productsView += `
                <section class="my-product-item">
                <img src="${img}" class="product-img" onclick="openProduct(${item.store_id},${item.id})">
                <section class="item-detail">
                    <span class="item-name">${item.product_name}</span>
                    <span class="item-price">NZ$${item.product_price}</span>
                    <span class="item-size">Size: ${ JSON.parse(item.product_size).join('/')}</span>
                    <span class="item-color"> Color: ${ JSON.parse(item.product_color).join('/')}</span>
                    <section class="item-action">
                        <img src="../../static/edit.png" onclick="addProduct(false, ${item.id})">
                        <img src="../../static/bin3.png" onclick="deleteProduct(${item.id})">
                    </section>
                </section>
                </section>`;
            });
            addWidegt('my-product-list', productsView).addP();
        } else {
            getElments('my-product-list').style.display = 'none';
            getElments('my-product-list-empty').style.display = 'flex';
        }
    }).catch(err => {
        showToast(err);
    });

}


// ----------- delete product ----------------
var deleteTargetId;

function deleteProduct(index) {
    deleteTargetId = index;
    getElments('dialog-mask-delete').style.display = 'block';
    getElments('delete-dialog-product').style.display = 'block';
}

function closeDeleteDialog() {
    getElments('dialog-mask-delete').style.display = 'none';
    getElments('delete-dialog-product').style.display = 'none';
}

function cancelDelete() {
    closeDeleteDialog();
}

function Confirm() {
    DeleteProduct({ id: deleteTargetId }).then(data => {
        closeDeleteDialog();
        showToast(data);
        createProductsView(1);
    }).catch(err => {
        closeDeleteDialog();
        showToast(data);
    });
}
// ----------- delete product ----------------

// ====================== product end ==================================

// ====================== order start ==================================
var total_order_count = 0;
var total_order_page = 0;
var current_order_page = 1;

function changeOrderType(el, dp, title, str) {
    current_order_page = 0;
    total_order_count = 0;
    total_order_page = 0;
    changeDpTitle(el, dp, title, str, 2);

    // createOrderView(isSold);
}

function updateOrderPager(index) {
    $('#order-pager').text(`${index}/${total_order_page}`);
}

function previousOrder() {

    if (total_order_count == 0) {
        showToast("Current list is empty!")
        return;
    } else if (current_order_page <= 1) {
        showToast("Current page is the first page!")
        return;
    } else {
        current_order_page--;
        createOrderView(current_order_page);

    }
}

function nextOrder() {
    if (current_order_page < total_order_page) {
        current_order_page++;
        createOrderView(current_order_page);
    } else {
        showToast('This is the last page');
    }
}

function goToOrderPage(event, elem) {
    var evt = window.event || event;
    if (evt.keyCode == 13) {
        let index = elem.value;
        if (index && index <= total_order_page) {
            createOrderView(index);
        } else {
            showToast('Please enter a valid number!');
        }
    }
}

function createOrderView(page) {
    let user = checkLoginStatus();
    var productsView = '';
    let priceorder = getElments('order-price-sort-text').innerText === "Price: Low to High" ? 'ASC' : 'DESC';
    let timeorder = getElments('order-time-sort-text').innerText === "Time: Old to Latest" ? 'ASC' : 'DESC';
    let isSold = getElments('order-type-title').innerText === 'Sold';
    console.log('isSold', isSold);
    current_order_page = page;
    var request = {
        priceorder,
        timeorder,
        page
    }
    if (isSold) {
        request['salerid'] = user.id;
    } else {
        request['buyerid'] = user.id;
    }
    GetOrders(request).then(data => {
                total_order_count = Number(data.count);
                total_order_page = Math.ceil(total_order_count / 10);
                updateOrderPager(current_order_page);
                if (data.list && data.list.length) {
                    getElments('my-order-list').style.display = 'flex';
                    getElments('my-order-list-empty').style.display = 'none';
                    data.list.forEach((item, index) => {
                                productsView += `
                <section class="my-product-item">
                <img src="${window.location.origin}${item.product_icon}" class="product-img" onclick="openProduct(${item.store_id},${item.product_id})">
                <section class="item-detail">
                    <span class="item-name">${item.product_name}</span>
                    <span class="item-price">NZ$${item.product_price}</span>
                    <span class="item-size">Size: ${item.product_size}</span>
                    <span class="item-color"> Color: ${item.product_color}</span>
                    <span class="item-color"> Count: ${item.product_count}</span>
                    <span class="item-color"> Deal Time: ${item.create_time}</span>
                    ${isSold ? `<span class="item-color"> Buyer: ${item.buyer_name}</span>` : `<span class="item-color"> Shop: ${item.store_name}</span>`}
                </section>
                </section>`;
            });
            addWidegt('my-order-list', productsView).addP();
        } else {
            total_order_count = data.count;
            totalProductPage = Math.ceil(productCount / 10);
            updateOrderPager(current_order_page);
            getElments('my-order-list').style.display = 'none';
            getElments('my-order-list-empty').style.display = 'flex';
        }

    }).catch(err => {
        showToast(err);
    });

}

function previousCollect() {

    if (total_collect_count == 0) {
        showToast("Current list is empty!")
        return;
    } else if (current_collect_page <= 1) {
        showToast("Current page is the first page!")
        return;
    } else {
        current_collect_page--;
        createCollectionView(current_collect_page);

    }
}

function nextCollect() {
    if (current_collect_page < total_collect_page) {
        current_collect_page++;
        createCollectionView(current_collect_page);
    } else {
        showToast('This is the last page');
    }
}

function goToCollectPage(event, elem) {
    var evt = window.event || event;
    if (evt.keyCode == 13) {
        let index = elem.value;
        if (index && index <= total_collect_page) {
            createCollectionView(index);
        } else {
            showToast('Please enter a valid number!');
        }
    }
}

// ====================== order end ==================================

// ====================== collections start ==================================
var total_collect_count = 0;
var total_collect_page = 0;
var current_collect_page = 1;

function updateCollectPager(index) {
    $('#collect-pager').text(`${index}/${total_order_page}`);
}

function createCollectionView(page) {
    let user = checkLoginStatus();
    let priceorder = getElments('collect-price-sort-text').innerText === "Price: Low to High" ? 'ASC' : 'DESC';
    let timeorder = getElments('collect-time-sort-text').innerText === "Time: Old to Latest" ? 'ASC' : 'DESC';
    current_collect_page = page;
    var productsView = '';
    GetCollections({user_id: user.id, page, priceorder, timeorder}).then(data => {
        total_collect_count = Number(data.count);
        total_collect_page = Math.ceil(total_collect_count / 10);
        updateCollectPager(current_order_page);
        if (data.list && data.list.length) {
            getElments('my-collect-list').style.display = 'flex';
            getElments('my-collect-list-empty').style.display = 'none';
            data.list.forEach((item, index) => {
                        productsView += `
                <section class="my-product-item">
                <img src="${window.location.origin}${item.product_icon}" class="product-img" onclick="openProduct(${item.store_id},${item.id})">
                <section class="item-detail">
                    <span class="item-name">${item.product_name}</span>
                    <span class="item-price">NZ$${item.product_price}</span>
                    <span class="item-size">Size: ${JSON.parse(item.product_size).join('/')}</span>
                    <span class="item-color"> Color: ${JSON.parse(item.product_color).join('/')}</span>
                    <span class="item-color"> Shop: ${item.store_name}</span>
                </section>
                </section>`;
            });
            addWidegt('my-collect-list', productsView).addP();
        } else {
            getElments('my-collect-list').style.display = 'none';
            getElments('my-collect-list-empty').style.display = 'flex';
        }
    }).catch(err=>{
        showToast(err);
    })
 

}
// ====================== collections end ==================================