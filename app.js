//http://localhost:3000/items

let allProductsdata = [];

document.addEventListener("DOMContentLoaded" , ()=>{
    //console.log("loaded... ");
    axios
    .get("http://localhost:3000/items")
    .then((res) => {
        allProductsdata = res.data;
        //renedr products on DOM :
    })
    .catch((err) => console.log(err));
});