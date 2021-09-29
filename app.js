//http://localhost:3000/items
const searchInput = document.querySelector("#search");
const productsDOM = document.querySelector(".products-center");
const btns = document.querySelectorAll(".btn");
let allProductsdata = [];
const filters = {
    searchItems: "",
};

document.addEventListener("DOMContentLoaded" , ()=>{
    //console.log("loaded... ");
    axios
    .get("http://localhost:3000/items")
    .then((res) => {
        allProductsdata = res.data;
        //renedr products on DOM :
        renderProducts(res.data,filters);
    })
    .catch((err) => console.log(err));
});

function renderProducts(_products,_filters){
    const filteredProducts = _products.filter( p => {
        return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase());
    });
    productsDOM.innerHTML = "";
    //console.log(filteredProducts);
    //render to DOM
    filteredProducts.forEach((item,index) => {
        //create
        //content
        const productsDiv = document.createElement("div");
        productsDiv.classList.add("product");
        productsDiv.innerHTML = 
        `<div class="img-container">
            <img src=${item.image} alt="p-${index}"/>
          </div>
          <div class="product-desc">
            <p class="product-price">${item.price} $</p>
            <p class="product-title">${item.title}</p>
          </div>`;
          //append to DOM
          productsDOM.appendChild(productsDiv);
        });
}

searchInput.addEventListener("input" ,(e)=>{
    //console.log(e.target.value);
    filters.searchItems = e.target.value;
    renderProducts(allProductsdata,filters);
});

// filter based groups:
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
        const filter = e.target.dataset.filter;
        //console.log(filter);
        filters.searchItems = filter;
        renderProducts(allProductsdata,filters);
    });
});