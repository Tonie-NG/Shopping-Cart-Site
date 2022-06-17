let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");







let basket = JSON.parse(localStorage.getItem("tonie"))|| [];

let caculation = () => {
    console.log('yoyur mama');
    let cartIcon = document.getElementById("cart-amount")
    cartIcon.innerHTML =(basket.map ((c) => c.item).reduce((c,y) => c+y, 0));
};

caculation();

let makeCart = () => {
    if(basket.length !==0) {
        return (shoppingCart.innerHTML = basket.map((x) => {
            let{id, item} = x;
            let search = shopItemsData.find((y) => y.id=== id) || [];
            return ` 
            <div class="cart-item">
            <img width=100 src=${search.img} alt="" />
            <div class="details">
            <div class="title-price-x">
                <h4 class="title-price">
                    <p>${search.name}</p>
                    <p class="cart-item-price">$ ${search.price}</p>
                </h4>
                <i onclick= "removeItem(${id})" class="bi bi-x-lg"></i>
            </div>
            <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
            <h3>$ ${item * search.price }</h3>
            </div>
            </div>
            `;
        }).join(''));
    } else {
        label.innerHTML = ` 
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="homeBtn">Back to Home</button>
        </a>
        
        `
    }
};

makeCart();
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
    
    
    makeCart();
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
    basket = basket.filter((f) => f.item !==0);

    makeCart();
   
    localStorage.setItem("tonie", JSON.stringify(basket));
}
let update = (id) => {
    let search = basket.find((u) => u.id === id);
    document.getElementById(id).innerHTML = search.item;
    makeCart();

   
}


let removeItem = (id) => {
    let seletedItem = id;
    //console.log(seletedItem.id);
    basket =basket.filter((v) => v.id !==seletedItem.id);
    localStorage.setItem("tonie", JSON.stringify(basket));
    makeCart();
}