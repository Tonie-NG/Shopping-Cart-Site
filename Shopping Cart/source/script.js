let shop = document.getElementById('shop');

console.log(shopItemsData.price);

let makeShop = () => {
    return (shop.innerHTML = shopItemsData.map((x)=> {
        let{id, name, price, desc, img}= x;
        let search = basket.find((x) => x.id===id) || [];
        return `
        <div class="item">
            <img width="224" src="./img/tm8.jpg" alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h3>$${price}</h3>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">
                        ${search.item===undefined? 0: search.item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>`
    }).join(" "));
}

let basket = JSON.parse(localStorage.getItem("tonie"))|| [];

makeShop();

let increment = (id) => {
    let seletedItem = id;
    let search = basket.find((x) => x.id === seletedItem.id);
    if(search===undefined) {
        basket.push({
            id: seletedItem.id,
            item: 1
        });
    } else {
        search.item += 1;
    }
    
    
    //console.log(basket);
    update(seletedItem.id);
    localStorage.setItem("tonie", JSON.stringify(basket));
};

let decrement = (id) => {
    let seletedItem = id;
    let search = basket.find((b) => b.id === seletedItem.id);

    if(search=== undefined) return;
    else if(search.item ===0) return; else {
        search.item -= 1;
    }
    update(seletedItem.id);
    
    //console.log(basket);
    basket = basket.filter((f) => f.item !==0);
   
    localStorage.setItem("tonie", JSON.stringify(basket));
}
let update = (id) => {
    let search = basket.find((u) => u.id === id);
    document.getElementById(id).innerHTML = search.item;
    console.log(search.item);
    caculation()
}

let caculation = () => {
    console.log('yoyur mama');
    let cartIcon = document.getElementById("cart-amount")
    cartIcon.innerHTML =(basket.map ((c) => c.item).reduce((c,y) => c+y, 0));
};

caculation();