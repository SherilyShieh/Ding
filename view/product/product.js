var productObj = {
    id: 0,
    sid: 1,
    title: "ASICS Women's Gel-Venture 6 Running-Shoes",
    size: ['5.5', '5.0', '6.0', '6.5'],
    selectedSize: '',
    color: ['red', 'white', 'black'],
    selectedColor: '',
    count: -1,
    price: 200.00,
    icon: '../../static/boys_boot.png',
    shopName: 'Alexander',
    location: 'Wellington',
    contentImg: '../../static/detail.png',
    contentInfo: 'Get out and explore in the redesigned GEL-VENTURE 6. Designed to take on rugged terrain, this model comes complete with a trail-specific outsole and high-abrasion rubber for confidence-inspiring traction. Rearfoot GEL cushioning absorbs shock to keep you comfortable as you pound along the path, while the removable sockliner lets you insert custom orthotics for an even more personalized fit. Weight: 9.0 oz.'
}

var selectedBg = '#F1442A';
var unselectedBg = '#ffffff';
var selectedColor = 'white';
var unselectedColor = 'black';
var selectedBorder = 'solid 2px #F1442A';
var unselectedBorder = 'solid 2px #C1C2C7';

function createProductInfo() {
    var proInfo = `<section class="store-name"> <img src="../../static/store.png"><span>${productObj.shopName}'s Store</span></section>
    <section class="store-search">
        <span class="store-home" onclick="openStore(${productObj.sid})">Store Home</span>
        <section class="store-search-bar">
            <input type="text" name="product" placeholder="search in this store">
            <img src="../../static/search.png" onclick="openStore(${productObj.sid})">
        </section>
    </section>
    <section class="product-detail">
        <img src="${productObj.icon}" class="product-main-img">
        <section class="product-purchase-info">
            <span class="product-name">${productObj.title}</span>
            <span class="product-price">NZ$${productObj.price}</span>
            <section class="product-size">
                <span class="product-size-title">Size:</span>
                <section class="product-size-list">
                    ${
                        productObj.size.map((item, index)=> {
                            return `<section class="product-size-info" id="detail-size-${index}" onclick="changeInfoStatus(this, true, '${item}')"><span>${item}</span></section>`
                        }).join('')
                    }
                </section>
            </section>
            <section class="product-size">
                <span class="product-size-title">Color:</span>
                <section class="product-size-list">
                    ${
                        productObj.color.map((item, index)=> {
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
                <section class="product-btn" onclick="detailAction(true)"><span>ADD</span></section>
                <section class="product-btn" onclick="detailAction(false)"><span>BUY</span></section>
            </section>
        </section>
    </section>
    <section class="product-description">
        <section class="description-title"><span>Product Description</span></section>
        <img src="${productObj.contentImg}">
        <p>${productObj.contentInfo}</p>
    </section>`;
    addWidegt('product-detail-info', proInfo).addP();
}
function resetInfoStatus(val, array) {
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
        isSelected = (str == productObj.selectedSize);
        productObj.selectedSize = isSelected ? '' : str;
        resetInfoStatus('detail-size', productObj.size);
    } else {
        isSelected = (str == productObj.selectedColor);
        productObj.selectedColor = isSelected ? '' : str;
        resetInfoStatus('detail-color', productObj.color);
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
    productObj.count = value;
}
function detailAction(isBuy) {
    if (!productObj.selectedSize) {
        showToast('Please chose the size');
        return;
    }

    if (!productObj.selectedColor) {
        showToast('Please chose the color');
        return;
    }

    if (productObj.count < 0) {
        showToast('Please input count!');
        return;
    }

    // add to cart list
    if (isBuy) {
        showToast('Purchase success!');
    } else {
        showToast('Add to cart success!');
    }
}