function createStoreView() {
    let request = GetCurrentRequest();
    GetStoreInfo({ storeid: request.sid }).then(data => {
        var storeView = `
        <section class="store-name"> <img src="../../static/store.png"><span>${data.store_name}</span></section>
        <section class="store-search">
            <span class="store-home" onclick="openStore(${data.id})">Store Home</span>
            <section class="store-search-bar">
                <input type="text" name="product" placeholder="search in this store" id="store-search" value="${request.keyword ? request.keyword : ''}">
                <img src="../../static/search.png" onclick="searchInStore('store-search')">
            </section>
        </section>
        <section class="search-result" id="search-list">
        </section>
        <section class="empty-margin" id="search-list-empty">
            <section class="cart-empty">
                <img src="../../static/empty.png">
                <spn>Empty Cart~!</spn>
            </section>
        </section>`;
        addWidegt('store-detail-info', storeView).addP();
    }).catch(err => {
        showToast(err);
    })

}

function searchInStore(val) {
    let key = getElments(val).value;
    if (key) {
        let sid = GetCurrentRequest().sid
        window.open(`${window.location.origin}${window.location.pathname}?sid=${sid}&keyword=${key}`, '_self');
    } else {
        showToast("Please input some information to search!")
    }

}