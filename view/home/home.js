function createHomeFilters() {
    var filters = getFilters();
    var filtersSec = '';
    if (filters.length) {
        filters.forEach((item) => {
                    var department = item.department;
                    filtersSec += `<section class="common-div type-div">
            <section class="type-detail">
                <section class="type-title"><img src="${item.icon}"><span>${item.department}'s Fashion</span></section>
                <section class="types">
                    ${item.types.map(type => {
                        return `<span class="type-item" onclick="quickSearch('${item.department}', '${type}')">${type}</span>`
                    }).join('')}
                </section>
            </section>
            <section class="type-products">
                    ${item.productions.map(product => {
                        return `<section class="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-24 type-img-sec">
                        <img src="${product.img}" onclick="openProduct(${product.id})">
                    </section>`
                    }).join('')}
            </section>
        </section>`
        });
        return filtersSec;
    }

}
function canvasHomeFilters() {
    var wid = createHomeFilters();
    addWidegt('filters-list', wid).addP();
}

// window.onload = function() {
//     canvasHomeFilters();
// };