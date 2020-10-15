var navmenu = ["profile", "store", "orders", "collections"];
changeStyle('profile', true);
registerNav(0);
registerNav(1);
registerNav(2);
registerNav(3);
GetRequest();
console.log("account:", initUser());


function GetRequest() {
    let user = initUser();
    if (!user) {
        showToast("Please login!")
        window.open('http://localhost:8088/view/home/Home.html', '_self');
        return;
    }
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

function registerNav(val) {
    getElments(navmenu[val]).addEventListener("click", () => openNav(val));
}

function openNav(val) {
    let location = window.location;
    let link = `${location.origin}${location.pathname}?nav=${val}`;
    window.open(link, '_self')
}

function getElments(val) {
    return document.getElementById(val);
}

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
    for (var key in modify) {
        if (modify[key] === '') {
            delete modify[key]
        }
    }
    let user = initUser();
    let requet = { userid: user.id, info: modify }
    ModifyProfile(requet).then(data => {
        for (var key in modify) {
            if (key == 'phone_nz') {
                user['phone'] = modify['phone_nz'];
            } else {
                user[key] = modify[key];
            }
        }
        setCookie('LOGIN_USER', JSON.stringify(user), 0, '', '/');
        reset();
        initProfileView()
            // console.log(user);
    }).catch(err => {
        showToast(err);
    });
    // console.log(modify);
}

function initProfileView() {
    let user = initUser();
    $('#profile-name').attr('value', user.legalName);
    $('#profile-phone').attr('placeholder', user.phone);
    $('#profile-email').attr('placeholder', user.email);
    $('#profile-nickname').attr('placeholder', user.nickname);
    $('#profile-address').attr('placeholder', user.address);
}


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
        createOrderView(true);
    } else if (val == 3) {
        createCollectionView();
    }
}


function addProduct(isAdd, id) {
    getElments('account-dialog-title').innerText = isAdd ? 'Add Product' : 'Edit Product';
    getElments('dialog-mask-account').style.display = 'block';
    getElments('add-dialog-account').style.display = 'block';
}

function closeDialog() {
    getElments('dialog-mask-account').style.display = 'none';
    getElments('add-dialog-account').style.display = 'none';
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



function openAccountDp(isOpen, dp) {
    getElments(dp).style.display = isOpen ? 'block' : 'none';
}

function changeDpTitle(el, dp, title, str) {
    getElments(title).innerText = str + el.innerText;
    openAccountDp(false, dp);
}

function previouspRoduct() {
    showToast('previous');

    if (productCount == 0) {
        showToast("Current list is empty!")
        return;
    } else if (currentIndex <= 1) {
        showToast("Current page is the first page!")
        return;
    } else {
        currentIndex++;
        createProductsView(currentIndex);

    }
}

function nextProduct() {
    showToast('next');
}

function previous() {
    showToast('previous');
}

function next() {
    showToast('next');
}

function goToPage(event, elem) {
    var evt = window.event || event;
    if (evt.keyCode == 13) {
        showToast(`go to page ${elem.value}`);
    }
}

function cancel() {
    // todo: reset form
    closeDialog();
}

function submit() {
    // todo: reset form
    closeDialog();
    showToast('success')
}

function updateProductPager(index) {
    $('#product-pager').text(`${index}/${totalProductPage}`);
}
var productCount = 0;
var currentIndex = 0;
var totalProductPage = 0;

function createProductsView(index) {
    var productsView = '';
    var list = getSearchList();
    let user = initUser();
    GetProductsInStore({
        userid: user.id,
        priceorder: 'DESC',
        timeorder: 'ASC',
        page: index
    }).then(data => {
        productCount = data.count;
        currentIndex = productCount ? 1 : 0;
        totalProductPage = Math.ceil(productCount / 10);
        updateProductPager(currentIndex);
        if (data.count) {
            getElments('my-product-list').style.display = 'flex';
            getElments('my-product-list-empty').style.display = 'none';
            list.forEach((item, index) => {
                productsView += `
                <section class="my-product-item">
                <img src="${item.icon}" class="product-img" onclick="openProduct(${item.id})">
                <section class="item-detail">
                    <span class="item-name">${item.title}</span>
                    <span class="item-price">NZ$${item.price}</span>
                    <span class="item-size">Size: ${item.size.join('/')}</span>
                    <span class="item-color"> Color: ${item.color.join('/')}</span>
                    <section class="item-action">
                        <img src="../../static/edit.png" onclick="addProduct(false, ${index})">
                        <img src="../../static/bin3.png" onclick="deleteProduct(${index})">
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

function createOrderView(isSold) {
    var productsView = '';
    var list = getSearchList();

    if (list.length) {
        getElments('my-order-list').style.display = 'flex';
        getElments('my-order-list-empty').style.display = 'none';
        list.forEach((item, index) => {
                    productsView += `
            <section class="my-product-item">
            <img src="${item.icon}" class="product-img" onclick="openProduct(${item.id})">
            <section class="item-detail">
                <span class="item-name">${item.title}</span>
                <span class="item-price">NZ$${item.price}</span>
                <span class="item-size">Size: ${item.orderColor}</span>
                <span class="item-color"> Color: ${item.orderSize}</span>
                <span class="item-color"> Count: ${item.dealCount}</span>
                <span class="item-color"> Deal Time: ${item.DealTime}</span>
                ${isSold ? `<span class="item-color"> Buyer: ${item.buyer}</span>` : `<span class="item-color"> Shop: ${item.shopName}</span>`}
            </section>
            </section>`;
        });
        addWidegt('my-order-list', productsView).addP();
    } else {
        getElments('my-order-list').style.display = 'none';
        getElments('my-order-list-empty').style.display = 'flex';
    }

}

function createCollectionView() {
    var productsView = '';
    var list = getSearchList();
    if (list.length) {
        getElments('my-collect-list').style.display = 'flex';
        getElments('my-collect-list-empty').style.display = 'none';
        list.forEach((item, index) => {
                    productsView += `
            <section class="my-product-item">
            <img src="${item.icon}" class="product-img" onclick="openProduct(${item.id})">
            <section class="item-detail">
                <span class="item-name">${item.title}</span>
                <span class="item-price">NZ$${item.price}</span>
                <span class="item-size">Size: ${item.size.join('/')}</span>
                <span class="item-color"> Color: ${item.color.join('/')}</span>
                <span class="item-color"> Shop: ${item.shopName}</span>
            </section>
            </section>`;
        });
        addWidegt('my-collect-list', productsView).addP();
    } else {
        getElments('my-collect-list').style.display = 'none';
        getElments('my-collect-list-empty').style.display = 'flex';
    }

}

function deleteProduct(index) {
    if (deleteFromList(index)) {
        showToast('Delete success');
        createProductsView();
    }
}

function changeOrderType(el, dp, title, str, isSold) {
    changeDpTitle(el, dp, title, str);
    createOrderView(isSold);
}