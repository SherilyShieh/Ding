

var mycart = new Array();
var selectedList = new Array();
var total = 10;
var filterCurrentType = 0;
var user = null;
var isLogin = false;
var filters = [{
            department: "Women",
            icon: '../../static/lady.png',
            types: ['Boots', 'Slippers', 'Sneakers', 'Outdoor', 'Runners', 'Sandals'],
            productions: [{
                    id: 0,
                    img: '../../static/women_sneaker.png'
                },
                {
                    id: 1,
                    img: '../../static/women_running.png'
                },
                {
                    id: 2,
                    img: '../../static/women_boots.png'
                },
                {
                    id: 3,
                    img: '../../static/women_slippers.png'
                },

            ]

        },
        {
            department: "Men",
            icon: '../../static/men.png',
            types: ['Boots', 'Slippers', 'Sneakers', 'Outdoor', 'Runners', 'Sandals'],
            productions: [{
                    id: 4,
                    img: '../../static/men_sneaker.png'
                },
                {
                    id: 5,
                    img: '../../static/men_running.png'
                },
                {
                    id: 6,
                    img: '../../static/men_boots.png'
                },
                {
                    id: 7,
                    img: '../../static/men_slipper.png'
                },

            ]

        }, {
            department: "Girls",
            icon: '../../static/girl.png',
            types: ['Boots', 'Slippers', 'Sneakers', 'Outdoor', 'Runners', 'Sandals'],
            productions: [{
                    id: 8,
                    img: '../../static/girls_sneaker.png'
                },
                {
                    id: 9,
                    img: '../../static/girls_runing.png'
                },
                {
                    id: 10,
                    img: '../../static/girls_boot.png'
                },
                {
                    id: 11,
                    img: '../../static/girl_slipper.png'
                },

            ]

        }, {
            department: "Boys",
            icon: '../../static/boy.png',
            types: ['Boots', 'Slippers', 'Sneakers', 'Outdoor', 'Runners', 'Sandals'],
            productions: [{
                    id: 12,
                    img: '../../static/boys_sneaker.png'
                },
                {
                    id: 13,
                    img: '../../static/boys_runing.png'
                },
                {
                    id: 14,
                    img: '../../static/boys_sneaker.png'
                },
                {
                    id: 15,
                    img: '../../static/boy_slipper.png'
                },

            ]

        }
    ]
    // database is the products list (each products include shop info)
mycart.push({
    sid: 0,
    store: "Alexander's Store",
    unique: '1C', // combine each products id-pid-sid then 10 to 62 and put the userid in the front: 0,000,100
    isSelected: false,
    products: [{
            id: 0,
            pid: 0,
            sid: 0,
            title: "ASICS Women's Gel-Venture 6 Running-Shoes",
            size: '6.5',
            color: 'red',
            price: 200.00,
            icon: '../../static/boys_boot.png',
            count: 1,
            isSelected: false
        },
        {
            id: 1,
            pid: 0,
            sid: 0,
            title: "ASICS Women's Gel-Venture 6 Running-Shoes",
            size: '6.5',
            color: 'blue',
            price: 200.00,
            icon: '../../static/boys_boot.png',
            count: 1,
            isSelected: false,
        }
    ]
});
var searchlist = [{
        id: 0,
        sid: 1,
        title: "ASICS Women's Gel-Venture 6 Running-Shoes",
        size: ['5.5', '5.0', '6.0', '6.5'],
        color: ['red', 'white', 'black'],
        price: 200.00,
        icon: '../../static/boys_boot.png',
        shopName: 'Alexander',
        location: 'Wellington',
        isCollected: false,
        DealTime: '2020/08/17 12:00pm',
        buyer: 'Lucy',
        orderSize: '5.0',
        orderColor: 'Black',
        dealCount: 2

    },
    {
        id: 1,
        sid: 0,
        title: "ASICS Women's Gel-Venture 6 Running-Shoes",
        size: ['5.5', '5.0', '6.0', '6.5'],
        color: ['red', 'white', 'black'],
        price: 200.00,
        icon: '../../static/women_boots.png',
        shopName: 'Alexander',
        location: 'Wellington',
        isCollected: false,
        DealTime: '2020/08/17 12:00pm',
        buyer: 'Lucy',
        orderSize: '5.0',
        orderColor: 'Black',
        dealCount: 2
    },
    {
        id: 2,
        sid: 3,
        title: "ASICS Women's Gel-Venture 6 Running-Shoes",
        size: ['5.5', '5.0', '6.0', '6.5'],
        color: ['red', 'white', 'black'],
        price: 200.00,
        icon: '../../static/women_slippers.png',
        shopName: 'Alexander',
        location: 'Wellington',
        isCollected: false,
        DealTime: '2020/08/17 12:00pm',
        buyer: 'Lucy',
        orderSize: '5.0',
        orderColor: 'Black',
        dealCount: 2
    },
    {
        id: 3,
        sid: 6,
        title: "ASICS Women's Gel-Venture 6 Running-Shoes",
        size: ['5.5', '5.0', '6.0', '6.5'],
        color: ['red', 'white', 'black'],
        price: 200.00,
        icon: '../../static/women_sneaker.png',
        shopName: 'Alexander',
        location: 'Wellington',
        isCollected: false,
        DealTime: '2020/08/17 12:00pm',
        buyer: 'Lucy',
        orderSize: '5.0',
        orderColor: 'Black',
        dealCount: 2
    },
    {
        id: 4,
        sid: 3,
        title: "ASICS Women's Gel-Venture 6 Running-Shoes",
        size: ['5.5', '5.0', '6.0', '6.5'],
        color: ['red', 'white', 'black'],
        price: 200.00,
        icon: '../../static/girl_slipper.png',
        shopName: 'Alexander',
        location: 'Wellington',
        isCollected: false,
        DealTime: '2020/08/17 12:00pm',
        buyer: 'Lucy',
        orderSize: '5.0',
        orderColor: 'Black',
        dealCount: 2
    },
    {
        id: 5,
        sid: 0,
        title: "ASICS Women's Gel-Venture 6 Running-Shoes",
        size: ['5.5', '5.0', '6.0', '6.5'],
        color: ['red', 'white', 'black'],
        price: 200.00,
        icon: '../../static/girls_boot.png',
        shopName: 'Alexander',
        location: 'Wellington',
        isCollected: false,
        DealTime: '2020/08/17 12:00pm',
        buyer: 'Lucy',
        orderSize: '5.0',
        orderColor: 'Black',
        dealCount: 2
    },
    {
        id: 6,
        sid: 5,
        title: "ASICS Women's Gel-Venture 6 Running-Shoes",
        size: ['5.5', '5.0', '6.0', '6.5'],
        color: ['red', 'white', 'black'],
        price: 200.00,
        icon: '../../static/girls_runing.png',
        shopName: 'Alexander',
        location: 'Wellington',
        isCollected: false,
        DealTime: '2020/08/17 12:00pm',
        buyer: 'Lucy',
        orderSize: '5.0',
        orderColor: 'Black',
        dealCount: 2
    },
];

var banners = [{
        bannerimg: '../../static/images.jpeg',
        bannerType: 0, //0: product, 1: quick-search, 2: store, 3:others
        product: {
            id: 0,

        }
    },
    {
        bannerimg: '../../static/images1.jpeg',
        bannerType: 0, //0: product, 1: quick-search, 2: store, 3:others
        product: {
            id: 0,

        }
    },
    {
        bannerimg: '../../static/images2.jpeg',
        bannerType: 0, //0: product, 1: quick-search, 2: store, 3:others
        product: {
            id: 0,
        }
    },
    {
        bannerimg: '../../static/images3.jpeg',
        bannerType: 0, //0: product, 1: quick-search, 2: store, 3:others
        product: {
            id: 0,
        }
    },
    {
        bannerimg: '../..//static/images4.jpeg',
        bannerType: 0, //0: product, 1: quick-search, 2: store, 3:others
        product: {
            id: 0,
        }
    },
    {
        bannerimg: '../../static/images5.jpeg',
        bannerType: 0, //0: product, 1: quick-search, 2: store, 3:others
        product: {
            id: 0,
        }
    }

];

function getBanners() {
    return banners;
}

function addToCartList() {
    // todo

}

function deleteFromList(index) {
    searchlist.splice(index, 1);
    return true;
}

function getSearchList() {
    return searchlist;
}

function modifyfunction(index, obj) {
    searchlist.splice(index, 1, obj);

}

function getFilters() {
    return filters;
}

function registerWithUser(val) {
    user = val;
    isLogin = true;
    return true;
}

function getUser() {
    return user;
}

function loginWithUser(val) {
    if (user) {
        if ((val.accountName == user.email || val.accountName == user.phone) && val.password == user.password) {
            isLogin = true;
            return {
                success: true,
                message: 'login successfully!'
            }
        } else {
            isLogin = false;
            return {
                success: false,
                errorCode: 1,
                message: 'login failed!'
            }
        }
    } else {
        isLogin = false;
        return {
            success: false,
            errorCode: 2,
            message: 'No user, please register!'
        }
    }
}

function logoutAction() {
    isLogin = false;
    return isLogin;
}

function isLoggedIn() {
    return isLogin;
}


function setFilterCurrentType(val) {
    filterCurrentType = val;
}

function getFilterCurrentType() {
    return filterCurrentType;
}

var cartSelected = new Array();

function changeSelectedList(item, index) {
    updateStatus(item, index);
    if (selectedList.length) {
        item.products.forEach((e) => {
            var fIndex = findIndex(e, item);
            if (fIndex >= 0 && !e.isSelected) {
                selectedList.slice(fIndex, 1, e);
            } else if (fIndex < 0 && e.isSelected) {
                selectedList.push(e);
            }
        });
    } else {
        item.products.forEach((e) => {
            if (e.isSelected) {
                selectedList.push(e);
            }
        });
    }
    console.log("selected:", selectedList)
}

function findIndex(e) {
    for (var i = 0; i < selectedList.length; i++) {
        var item = selectedList[i];
        if (e.id == item.id) {
            return i;
        }
    }
    return -1;
}

function updateStatus(item, index) {

    if (item) {
        mycart.splice(index, 1, item);
    } else {
        mycart.splice(index, 1);
    }
    console.log("mycart", item);
}

function findInArray(item, temp) {
    for (var i = 0; i < temp.length; i++) {
        var e = temp[i];
        if (e.id == item.id) {
            return i;
        }
    }
    return -1;
}

function deleteSelectedList() {
    var empty = [];
    selectedList.forEach(product => {
        mycart.map((shop, sindex) => {
            if (shop.sid == product.sid) {
                var index = findInArray(product, shop.products);
                if (index > -1) {
                    shop.products.splice(index, 1);
                }
                if (!shop.products.length) {
                    empty.push(sindex);
                }
            }
        });
    });
    empty.forEach(item => {
        mycart.splice(item, 1);
    });
    selectedList = [];
    console.log('mycart', mycart);
    return true;

}

function getCartList() {
    return mycart;
}

function getCartTotal() {
    return total;
}

function getSelected() {
    return cartSelected;
}

function addToCart(val) {
    var found = mycart.find(item => item.sid == val.sid);
    if (found) {
        mycart.map(item => {
            if (item.sid == val.sid) {
                var tp = val.products[0];
                var temp = item.products;
                var ft = temp.find(item2 => item2.sid == val.products[0].sid);
                if (ft) {
                    item.products.map(item3 => {
                        if (item3.sid == tp.sid) {
                            if (item3.size == tp.size && item3.color == tp.color) {
                                item3.count += tp.count;
                            } else {
                                item.products.push(val.products[0]);
                            }
                        }
                    })
                } else {
                    item.products.push(val.products[0]);
                }
            }
        });
    } else {
        mycart.push(val);
    }

}