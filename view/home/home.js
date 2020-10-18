createBannerView();
createHomeFilters();

function createHomeFilters() {
    GetCategories().then(data => {
                console.log(data);
                var filtersSec = '';
                if (data.length) {
                    data.forEach((item) => {
                                filtersSec += `<section class="common-div type-div">
                    <section class="type-detail">
                        <section class="type-title"><img src="${window.location.origin}${item.icon}"><span>${item.department_name}'s Fashion</span></section>
                        <section class="types">
                            ${item.types.map(type => {
                                return `<span class="type-item" onclick="quickSearch('${item.department_name}', '${type}')">${type}</span>`
                            }).join('')}
                        </section>
                    </section>
                    <section class="type-products">
                            ${item.produts.map(product => {
                                return `<section class="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-24 type-img-sec">
                                <img src="${product.product_icon}" onclick="openProduct(${product.store_id},${product.id})">
                            </section>`
                            }).join('')}
                    </section>
                </section>`
            });
        }
        canvasHomeFilters(filtersSec);
    }).catch(err => {
        console.log(err);
    })


}
function canvasHomeFilters(wid) {
    addWidegt('filters-list', wid).addP();
}