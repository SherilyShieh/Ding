var collected = '../../static/heart.png';
var uncollected = '../../static/heart1.png';
var selectedBg = '#fd4a22';
var unselectedBg = '#ffffff';
var selectedColor = 'white';
var unselectedColor = 'black';
var selectedBorder = 'solid 1px #fd4a22';
var unselectedBorder = 'solid 1px #C1C2C7';
var currentPro = {
    buyer_id: initUser().id,
    buyer_name: initUser().nickname,
    product_id: -1,
    store_id: -1,
    product_name: '',
    product_size: '',
    product_color: '',
    product_price: -1,
    product_icon: '',
    product_count: 1,
    isCollected: false,
}
var selectedPro = {};
var currentList;
var current_page = 1;
var total_page = 0;

function createSearchList(searchList) {
    // init the pager total
    currentList = searchList;
    var searchSec = '';
    if (currentList && currentList.length) {
        currentList.forEach((item, index) => {
            searchSec += `<section class="product-item">
            <img src="${window.location.origin}${item.product_icon}" class="product-icon" onclick="openProduct(${item.store_id},${item.id})">
            <section class="product-info">
                <span class="product-price">NZ$${item.product_price}</span>
                <span class="procuct-name">${item.product_name}</span>
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
    <img src="${product.product_icon}">
    <section class="dialog-price-title">
        <span class="dialog-price">NZ$${product.product_price}</span>
        <span style="max-width: 400px; min-width: 300px; display:inline-block;">${product.product_name}</span>
    </section>
</section>
<span class="dialog-product-type">Size:</span>
<section class="dialog-options">
    ${JSON.parse(product.product_size).map((item, index) => {
        return `<button class="dialog-product-option" onclick="changeStatus(this, '${item}', true)" id="option-size-${index}">${item}</button>`
    }).join('')}
</section>
<span class="dialog-product-type">Color:</span>
<section class="dialog-options">
    ${JSON.parse(product.product_color).map((item, index) => {
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
        isSelected = (str == currentPro.product_size);
        currentPro.product_size = isSelected ? '' : str;
        restOptions('option-size', JSON.parse(selectedPro.product_size)); 
    } else {
        isSelected = (str == currentPro.product_color);
        currentPro.product_color = isSelected ? '' : str;
        restOptions('option-color', JSON.parse(selectedPro.product_color));
    }
    ele.style.backgroundColor = isSelected ? unselectedBg : selectedBg;
    ele.style.border = isSelected ? unselectedBorder : selectedBorder;
    ele.style.color = isSelected ? unselectedColor : selectedColor;

}

function canvasSearchList() {
    let query = GetCurrentRequest();
    if (!query) {
        showToast("Illegal connection");
        window.open(`${window.location.origin}/view/home/Home.html`, '_self');
        return;
    }
    if (window.location.pathname === '/view/mystore/mystore.html') {
        let temp = {
            storeid: Number(query.sid),
            keyword: query.keyword
        }
        let request = formatObject(temp);
        // debugger;
        SearchInStore(request).then(data=>{
            drawListView(data)
        }).catch(err=> {
            showToast(err);
        });
    } else {
        // debugger;
        let temp2 = {
            department: query.dep,
            type: query.type,
            keyword: query.keyword,
            timeorder: query.tod,
            priceorder: query.pod,
            starttime: timestrampToStr(Number(query.st)),
            endtime: timestrampToStr(Number(query.et)),
            lowprice: query.lp,
            highprice: query.hp,
            page: query.page
        }
        let request2 = formatObject(temp2);
        Search(request2).then(data=>{
            // set other view
            total_page = Math.ceil(data.count/10);
            resetPager();
            drawListView(data.list);
        }).catch(err=> {
            showToast(err);
        });
    }

}

function resetPager() {
    getElments('search-pager').innerText = current_page+'/'+total_page;
}

function drawListView(list) {
    var wid = createSearchList(list);
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
    let item = currentList[index];
    selectedPro = item;
    addWidegt('action-dialog-content', createOptionDialog(item, isBuy)).addP();
    currentPro.id = item.id;
    currentPro.sid = item.store_id;
    // currentPro.location = item.location;
    // currentPro.shopName = item.shopName;
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
    if (!currentPro.product_size) {
        showToast('Please chose the size');
        return;
    }

    if (!currentPro.product_color) {
        showToast('Please chose the color');
        return;
    }


    // add to cart list
    if (isBuy) {
        // create order
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
    let pod = e.innerText === 'Low to High' ? 'ASC' : 'DESC';
    let query = GetCurrentRequest();
    query.pod = pod;
    let newq = '';
    query.page = 1;
    for (key in query){
        newq += `${key}=${query[key]}&`;
    }
    newq = newq.substr(0,newq.length-1);
    window.open(`${window.location.origin}/view/search/search.html?${newq}`, '_self');
    // todo: sort the list
}

function openTimeSortDp(isOpen) {
    getElments('time-sort-dp').style.display = isOpen ? 'block' : 'none';
}

function changeTimeSort(e) {
    openTimeSortDp(false);
    getElments('time-sort').innerText = 'Time: ' + e.innerText;
    let tod = e.innerText === 'Latest to Old' ? 'DESC' : 'ASC';
    let query = GetCurrentRequest();
    query.tod = tod;
    let newq = '';
    query.page = 1;
    for (key in query){
        newq += `${key}=${query[key]}&`;
    }
    newq = newq.substr(0,newq.length-1);
    window.open(`${window.location.origin}/view/search/search.html?${newq}`, '_self');
    // todo: sort the list
}

function openDepartments(isOpen) {
    getElments('search-department-dp').style.display = isOpen ? 'block' : 'none';
}

function changeDepartment(e) {
    openDepartments(false);
    getElments('search-department').innerText = 'Type: ' + e.innerText;
    // todo: sort the list
}

function openTypes(isOpen) {
    getElments('search-types-dp').style.display = isOpen ? 'block' : 'none';
}

function changeType(e) {
    openTypes(false);
    getElments('search-types').innerText = 'Categories: ' + e.innerText;
    let query = GetCurrentRequest();
    if (query.type) {
        if(e.innerText === 'All') {
            delete(query['type']);
        } else {
            query.type = e.innerText;
        }
    } else {
        if(e.innerText != 'All') {
            query.type = e.innerText;
        } 
    }
    query.page = 1;
    let newq = '';
    for (key in query){
        newq += `${key}=${query[key]}&`;
    }
    newq = newq.substr(0,newq.length-1);
    window.open(`${window.location.origin}/view/search/search.html?${newq}`, '_self');
    // todo: sort the list
}

function previous() {
    if (current_page <= 1) {
        showToast('The page index should at least 1!');
        return;
    }
    current_page++;
    resetPager();
    let query = GetCurrentRequest();
    query.page = current_page;
    let newq = '';
    for (key in query){
        newq += `${key}=${query[key]}&`;
    }
    newq = newq.substr(0,newq.length-1);
    window.open(`${window.location.origin}/view/search/search.html?${newq}`, '_self');

}

function next() {
    if (current_page >= total_page) {
        showToast('The page index could not higher than total page!');
        return;
    }
    current_page--;
    resetPager();
    let query = GetCurrentRequest();
    query.page = current_page;
    let newq = '';
    for (key in query){
        newq += `${key}=${query[key]}&`;
    }
    newq = newq.substr(0,newq.length-1);
    window.open(`${window.location.origin}/view/search/search.html?${newq}`, '_self');
}

function goToPage(event, elem) {
    var evt = window.event || event; 
    if (evt.keyCode == 13) {
        showToast(`go to page ${elem.value}`);
        if (elem.value < 1) {
            showToast('The page index should at least 1!');
            return;
        }
        if (elem.value > total_page) {
            showToast('The page index should at least 1!');
            return;
        }
        current_page = elem.value;
        resetPager();
        let query = GetCurrentRequest();
        query.page = current_page;
        let newq = '';
        for (key in query){
            newq += `${key}=${query[key]}&`;
        }
        newq = newq.substr(0,newq.length-1);
        window.open(`${window.location.origin}/view/search/search.html?${newq}`, '_self');
    }
}

function strToTimestramp(str) {
    if (str) {
        return Date.parse(new Date(str))/1000;
    }
}

function timestrampToStr(tsp) {
    if (tsp) {
        // return new Date().setTime(tsp).toJSON().substr(0,19).replace('T', ' ');
        return new Date((tsp + 13  * 3600)*1000).toISOString().substr(0,19).replace('T', ' ');
    }
}

function searchwithrange() {
    let lowprice = getElments('low-price').value;
    let highprice = getElments('high-price').value;
    let starttime = getElments('start-time').value;
    let endtime = getElments('end-time').value;

    if (!lowprice && !highprice && !starttime && !endtime) {
        showToast('Please input range!');
        return;
    }
    if ((lowprice || highprice) && (!lowprice || !highprice)) {
        showToast('Please complete the price range!');
        return;
    } else if (Number(lowprice) > Number(highprice)) {
        showToast('The start price should be lower than the end price!');
        return;
    }
    if ((starttime || endtime) && (!starttime || !endtime)) {
        showToast('Please complete the time range!');
        return;
    } else if (strToTimestramp(starttime + ' 00:00:00') > strToTimestramp(endtime + ' 23:59:59')) {
        showToast('The start time should be earlier than the end time!');
        return;
    }
    let query = GetCurrentRequest();
    let newquery = '';
    if (query.st) {
        delete(query['st']);
        delete(query['et']);
    }
    if (query.lp) {
        delete(query['lp']);
        delete(query['hp']);
    }
    query.page = 1;
    for (key in query) {
        newquery += `&${key}=${query[key]}`;
    }
    if (lowprice) {
        newquery = `lp=${lowprice}&hp=${highprice}&${newquery}`;
    } 
    if (starttime) {
        newquery = `st=${strToTimestramp(starttime+" 00:00:00")}&et=${strToTimestramp(endtime+" 23:59:59")}&${newquery}`;
    } 
    window.open(`${window.location.origin}/view/search/search.html?${newquery}`, '_self');

}

function initSubViewWithQuery() {
    let query = GetCurrentRequest();
    current_page = query.page;
    if (query.st) {
        getElments('start-time').value = timestrampToStr(Number(query.st)).substr(0,10);
        getElments('end-time').value = timestrampToStr(Number(query.et)).substr(0,10);
    }

    if (query.lp) {
        getElments('low-price').value = query.lp;
        getElments('high-price').value = query.hp;
    }

    getElments('time-sort').innerText = (query.tod === 'DESC') ? 'Time: Latest to Old' : 'Time: Old to Latest';
    getElments('price-sort').innerText = (query.pod === 'ASC') ? 'Time: Low to High' : 'Time: High to Low';

    getElments('search-types').innerText = query.type === undefined ? 'Categories: All' : 'Categories: ' + query.type;
     
}