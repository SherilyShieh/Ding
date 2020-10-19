GetRequest();

var selectedBg = '#F1442A';
var unselectedBg = '#ffffff';
var selectedColor = 'white';
var unselectedColor = 'black';
var selectedBorder = 'solid 2px #F1442A';
var unselectedBorder = 'solid 2px #C1C2C7';
var myproduct = {
    buyer_id: initUser().id,
    buyer_name: initUser().nickname,
    store_id: -1,
    product_id: -1,
    product_name: '',
    product_size: '',
    product_color: '',
    product_price: -1,
    product_icon: '',
    product_count: 1,
    isCollected: false,
}
var productinfo;

function initMyproduct(data) {
    myproduct.store_id = data.store_id;
    myproduct.product_id = data.id;
    myproduct.product_name = formatStr(data.product_name);
    myproduct.product_price = data.product_price;
    myproduct.product_icon = data.product_icon;
}
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

    let sid = Number(theRequest.sid);
    let pid = Number(theRequest.pid);
    let storeInfo;
    if (sid && pid) {
        GetStoreInfo({ storeid: sid }).then(data => {
            console.log(data);
            storeInfo = data;
            GetProductInfo({ productid: pid }).then(data => {
                productinfo = data;
                initMyproduct(data);
                console.log(data);
                createProductInfo(storeInfo, data)
            }).catch(err => {
                console.log(err);
                showToast(err);
            });
        }).catch(err => {
            console.log(err);
            showToast(err);
        });
    } else {
        showToast("Illegal connection");
        window.open(`${window.location.origin}/view/home/Home.html`, '_self');
    }


}


function createProductInfo(storeinfo, productinfo) {
    var proInfo = `<section class="store-name"> <img src="../../static/store.png"><span>${storeinfo.store_name}'s Store</span></section>
    <section class="store-search">
        <span class="store-home" onclick="openStore(${storeinfo.id})">Store Home</span>
        <section class="store-search-bar">
            <input type="text" name="product" placeholder="search in this store">
            <img src="../../static/search.png" onclick="openStore(${storeinfo.id})">
        </section>
    </section>
    <section class="product-detail">
        <img src="${window.location.origin}${productinfo.product_icon}" class="product-main-img">
        <section class="product-purchase-info">
            <span class="product-name">${productinfo.product_name}</span>
            <span class="product-price">NZ$${productinfo.product_price}</span>
            <section class="product-size">
                <span class="product-size-title">Size:</span>
                <section class="product-size-list">
                    ${
                        JSON.parse(productinfo.product_size).map((item, index)=> {
                            return `<section class="product-size-info" id="detail-size-${index}" onclick="changeInfoStatus(this, true, '${item}')"><span>${item}</span></section>`
                        }).join('')
                    }
                </section>
            </section>
            <section class="product-size">
                <span class="product-size-title">Color:</span>
                <section class="product-size-list">
                    ${
                        JSON.parse(productinfo.product_color).map((item, index)=> {
                            return `<section class="product-size-info" id="detail-color-${index}" onclick="changeInfoStatus(this, false, '${item}')"><span>${item}</span></section>`
                        }).join('')
                    }
                </section>
            </section>
            <section class="product-quantities">
                <img src="../../static/min.png" onclick="changeCount(false)">
                <section class="product-quantities-box"><input type="number" name="count" placeholder="1" id="detail-count"></section>
                <img src="../../static/add.png" onclick="changeCount(true)">
            </section>
            <section class="behavior-on-product">
                <section class="product-btn" onclick="detailAction(false)"><span>ADD</span></section>
                <section class="product-btn" onclick="detailAction(true)"><span>BUY</span></section>
            </section>
        </section>
    </section>
    <section class="product-description">
        <section class="description-title"><span>Product Description</span></section>
        <img src="${window.location.origin}${productinfo.product_content_img}">
        <p>${productinfo.product_detail}</p>
    </section>`;
    addWidegt('product-detail-info', proInfo).addP();
}
function resetInfoStatus(val, array) {
    console.log(array);
    array.forEach((item, index) => {
        var target = getElments(val + '-' + index);
        target.style.backgroundColor = unselectedBg;
        target.style.border = unselectedBorder;
        target.style.color = unselectedColor;
    });
}
function changeInfoStatus(el, isSize, str) {
    var isSelected = false;
    if (isSize) {
        isSelected = (str == myproduct.product_size);
        myproduct.product_size = isSelected ? '' : str;
        resetInfoStatus('detail-size', JSON.parse(productinfo.product_size));
    } else {
        isSelected = (str == myproduct.product_color);
        myproduct.product_color = isSelected ? '' : str;
        resetInfoStatus('detail-color', JSON.parse(productinfo.product_color));
    }
    el.style.backgroundColor = isSelected ? unselectedBg : selectedBg;
    el.style.border = isSelected ? unselectedBorder : selectedBorder;
    el.style.color = isSelected ? unselectedColor : selectedColor;
}
function changeCount(isAdd) {
    var target = getElments('detail-count');
    var value = Number(target.value);
    if (isAdd) {
        value += 1;
        target.value = value;
    } else if (value <= 1) {
        showToast('Quantity of products is at least 1~!');
    } else {
        value -= 1;
        target.value = value;
    }
    myproduct.product_count = value;
}
function detailAction(isBuy) {
    if (!myproduct.product_size) {
        showToast('Please chose the size');
        return;
    }

    if (!myproduct.product_color) {
        showToast('Please chose the color');
        return;
    }

    if (myproduct.product_count < 0) {
        showToast('Please input count!');
        return;
    }

    // add to cart list
    if (isBuy) {
        // todo
        showToast('Purchase success!');
    } else {
        // todo
        AddToCart(myproduct).then(data => {
            showToast(data);
        }).catch(err => {
            showToast(err);
        })
    }
}