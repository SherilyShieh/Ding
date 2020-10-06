var shop = {
    sid: 0,
    shopName: 'Alexander'
}

function createStoreView() {
    var storeView = `
    <section class="store-name"> <img src="../../static/store.png"><span>${shop.shopName}'s Store</span></section>
    <section class="store-search">
        <span class="store-home" onclick="openStore(${shop.sid})">Store Home</span>
        <section class="store-search-bar">
            <input type="text" name="product" placeholder="search in this store">
            <img src="../../static/search.png">
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
}