var navmenu = ["profile", "store", "orders", "collections"];
changeStyle('profile', true);
registerNav(0);
registerNav(1);
registerNav(2);
registerNav(3);

function registerNav(val) {
    getElments(navmenu[val]).addEventListener("click", () => changeNav(val));
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

function changeNav(val) {
    var i = 0;
    for (i = 0; i < 4; i++) {
        if (i == val) {
            changeStyle(navmenu[val], true);
        } else {
            changeStyle(navmenu[i], false);
        }
    }
    if (val == 1) {
        createProductsView();
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
        if (!isTelCode(el.value.trim())) {
            el.style.border = errorBorder;
            getElments('error-update-email').style.display = 'block';
        }
    }
}

function cancelErrorUpdateEmail(el) {
    el.style.border = defaultBorder;
    getElments('error-update-email').style.display = 'none';
}

function updateProfile() {
    showToast('Update success');
}

function openAccountDp(isOpen, dp) {
    getElments(dp).style.display = isOpen ? 'block' : 'none';
}

function changeDpTitle(el, dp, title, str) {
    getElments(title).innerText = str + el.innerText;
    openAccountDp(false, dp);
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

function createProductsView() {
    var productsView = '';
    var list = getSearchList();
    if (list.length) {
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