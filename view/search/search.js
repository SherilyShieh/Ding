var collected = '../../static/heart.png';
var uncollected = '../../static/heart1.png';
var selectedBg = '#fd4a22';
var unselectedBg = '#ffffff';
var selectedColor = 'white';
var unselectedColor = 'black';
var selectedBorder = 'solid 1px #fd4a22';
var unselectedBorder = 'solid 1px #C1C2C7';
var currentPro = {
    id: -1,
    sid: -1,
    title: '',
    size: '',
    color: '',
    price: -1,
    icon: '',
    shopName: '',
    location: '',
    count: 1,
    isCollected: false,
}
var selectedPro = {};

function createSearchList() {
    // init the pager total
    var searchList = getSearchList();
    var searchSec = '';
    if (searchList.length) {
        searchList.forEach((item, index) => {
            searchSec += `<section class="product-item">
            <img src="${item.icon}" class="product-icon" onclick="openProduct(${item.id})">
            <section class="product-info">
                <span class="product-price">NZ$${item.price}</span>
                <span class="procuct-name">${item.title}</span>
                <section class="store-info"><span>${item.shopName}</span> <span>${item.location}</span></section>
                <section class="buyer-behavior">
                    <section class="buyer-behavior">
                        <img src="../../static/cart2.png" class="common-margin-search" onclick="openActionDialog(${index}, false)">
                        <img src="../../static/buy.png" onclick="openActionDialog(${index}, true)">
                    </section>
                    <img src="${item.isCollected ? collected : uncollected }" onclick="collect(${index})" id="collected-img-${item.id}">
                </section>
            </section>
        </section>`
        });
        return searchSec;
    }

}

function createOptionDialog(product, isBuy) {
    var mydialog = `<section class="product-info-dialog">
    <img src="${product.icon}">
    <section class="dialog-price-title">
        <span class="dialog-price">NZ$${product.price}</span>
        <span>${product.title}</span>
    </section>
</section>
<span class="dialog-product-type">Size:</span>
<section class="dialog-options">
    ${product.size.map((item, index) => {
        return `<button class="dialog-product-option" onclick="changeStatus(this, '${item}', true)" id="option-size-${index}">${item}</button>`
    }).join('')}
</section>
<span class="dialog-product-type">Color:</span>
<section class="dialog-options">
    ${product.color.map((item, index) => {
        return `<button class="dialog-product-option" onclick="changeStatus(this, '${item}', false)" id="option-color-${index}"">${item}</button>`
    }).join('')}
</section>
<section class="action-dialog-count">
    <span>Quantities:</span>
    <section class="cart-product-action">
        <img src="../../static/mins1.png" onclick="changeQuantities(false)">
        <input type="number" value="1" id="action-quantities" min="1">
        <img src="../../static/add1.png"  onclick="changeQuantities(true)">
    </section>
</section>
<section class="dialog-product-action">
    <button onclick="userActions(${isBuy})">${isBuy? 'BUY' : 'ADD'}</button>
</section>`;
    return mydialog;

}

function restOptions(val, array) {
    array.forEach((item, index) => {
        var target = getElments(val + '-' + index);
        target.style.backgroundColor = unselectedBg;
        target.style.border = unselectedBorder;
        target.style.color = unselectedColor;
    });


}
function changeStatus(ele, str, isSize) {
    var isSelected = false;
    if (isSize) {
        isSelected = (str == currentPro.size);
        currentPro.size = isSelected ? '' : str;
        restOptions('option-size', selectedPro.size); 
    } else {
        isSelected = (str == currentPro.color);
        currentPro.color = isSelected ? '' : str;
        restOptions('option-color', selectedPro.color);
    }
    ele.style.backgroundColor = isSelected ? unselectedBg : selectedBg;
    ele.style.border = isSelected ? unselectedBorder : selectedBorder;
    ele.style.color = isSelected ? unselectedColor : selectedColor;

}

function canvasSearchList() {
    var wid = createSearchList();
    if (wid) {
        getElments('search-list-empty').style.display = 'none';
        getElments('search-list').style.display = 'flex';
        addWidegt('search-list', wid).addP();
    } else {
        getElments('search-list-empty').style.display = 'flex';
        getElments('search-list').style.display = 'nones';
    }

}
function changeQuantities(isAdd) {
    var target = getElments('action-quantities')
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
    currentPro.count = value;

}
function closeopenDialog(isOpen) {
    getElments('dialog-mask-buy-add').style.display = isOpen ? 'block' : 'none';
    getElments('buy-add-dialog').style.display = isOpen ? 'block' : 'none';
}

function openActionDialog(index, isBuy) {
    closeopenDialog(true);
    var item = getSearchList()[index];
    selectedPro = item;
    addWidegt('action-dialog-content', createOptionDialog(item, isBuy)).addP();
    currentPro.id = item.id;
    currentPro.sid = item.sid;
    currentPro.location = item.location;
    currentPro.shopName = item.shopName;
    currentPro.title = item.title;
    currentPro.price = item.price;
    currentPro.icon = item.icon;
}

function collect(index) {
    var list = getSearchList();
    item = list[index];
    item.isCollected = !item.isCollected;
    getElments(`collected-img-${item.id}`).src = item.isCollected ? collected : uncollected;
    modifyfunction(index, item);
    showToast('Collect success!');

}

function userActions(isBuy) {
    if (!currentPro.size) {
        showToast('Please chose the size');
        return;
    }

    if (!currentPro.color) {
        showToast('Please chose the color');
        return;
    }

    // add to cart list
    if (isBuy) {
        showToast('Purchase success!');
    } else {
        showToast('Add to cart success!');
    }
    closeopenDialog(false);
}

function openPriceSortDp(isOpen) {
    getElments('price-sort-dp').style.display = isOpen ? 'block' : 'none';
}

function changePriceSort(e) {
    openPriceSortDp(false);
    getElments('price-sort').innerText = 'Price: ' + e.innerText;
    // todo: sort the list
}

function openTimeSortDp(isOpen) {
    getElments('time-sort-dp').style.display = isOpen ? 'block' : 'none';
}

function changeTimeSort(e) {
    openTimeSortDp(false);
    getElments('time-sort').innerText = 'Time: ' + e.innerText;
    // todo: sort the list
}

function openDepartments(isOpen) {
    getElments('search-department-dp').style.display = isOpen ? 'block' : 'none';
}

function changeTimeSort(e) {
    changeDepartment(false);
    getElments('search-department').innerText = 'Type: ' + e.innerText;
    // todo: sort the list
}

function openTypes(isOpen) {
    getElments('search-types-dp').style.display = isOpen ? 'block' : 'none';
}

function changeType(e) {
    openTypes(false);
    getElments('search-types').innerText = 'Categories: ' + e.innerText;
    // todo: sort the list
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