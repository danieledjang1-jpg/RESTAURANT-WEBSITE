console.log("Welcome to D-KITCHEN!");

console.log("Restaurant Website Started!");









const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

const updateCounter = () => {

const target = +counter.getAttribute("data-target");

const count = +counter.innerText;

const increment = target / 100;

if(count < target){

counter.innerText = Math.ceil(count + increment);

setTimeout(updateCounter,20);

}

else{

counter.innerText = target;

}

}

updateCounter();

});






const orderButtons=document.querySelectorAll(".food-card button");

orderButtons.forEach(button=>{

button.addEventListener("click",()=>{

alert("Thank you for choosing D-Kitchen!");

});

});









console.log("Video Section Loaded");









const video = document.getElementById("restaurantVideo");

const button = document.getElementById("playPauseBtn");

button.addEventListener("click", function(){

if(video.paused){

video.play();

button.innerHTML='<i class="fa-solid fa-pause"></i>';

}else{

video.pause();

button.innerHTML='<i class="fa-solid fa-play"></i>';

}

});

video.addEventListener("ended",function(){

button.innerHTML='<i class="fa-solid fa-play"></i>';

});









const menuButtons = document.querySelectorAll(".menu-btn");
const menuItems = document.querySelectorAll(".menu-item");

menuButtons.forEach(button => {

button.addEventListener("click", () => {

menuButtons.forEach(btn => {

btn.classList.remove("active");

btn.classList.remove("btn-danger");

btn.classList.add("btn-outline-danger");

});

button.classList.add("active");

button.classList.remove("btn-outline-danger");

button.classList.add("btn-danger");

const category = button.dataset.category;

menuItems.forEach(item => {

if(category === "all"){

item.style.display = "block";

}else{

if(item.classList.contains(category)){

item.style.display = "block";

}else{

item.style.display = "none";

}

}

});

});

});









const reservationForm = document.getElementById("reservationForm");

reservationForm.addEventListener("submit",function(e){

e.preventDefault();

alert("🎉 Thank you! Your reservation request has been received.");

reservationForm.reset();

});









const today = new Date().toISOString().split("T")[0];

document.getElementById("date").setAttribute("min", today);










const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(e){

e.preventDefault();

alert("Thank you! Your message has been sent successfully.");

contactForm.reset();

});








// let cart=[];

// const cartItems=document.getElementById("cart-items");

// const cartTotal=document.getElementById("cart-total");

// const cartCount=document.getElementById("cart-count");

// document.querySelectorAll(".add-cart").forEach(button=>{

// button.addEventListener("click",()=>{

// const item={

// name:button.dataset.name,

// price:Number(button.dataset.price)

// };

// cart.push(item);

// saveCart();

// displayCart();

// });

// });

// function displayCart(){

// cartItems.innerHTML="";

// let total=0;

// cart.forEach((item,index)=>{

// total+=item.price;

// cartItems.innerHTML+=`

// <div class="cart-item">

// <div>

// <strong>${item.name}</strong>

// <br>

// $${item.price}

// </div>

// <button
// class="btn btn-sm btn-danger"
// onclick="removeItem(${index})">

// Remove

// </button>

// </div>

// `;

// });

// if(cart.length===0){

// cartItems.innerHTML="<p>Your cart is empty.</p>";

// }

// cartTotal.innerText=total;

// cartCount.innerText=cart.length;

// }

// function removeItem(index){

// cart.splice(index,1);

// saveCart();

// displayCart();

// }

// function saveCart(){

// localStorage.setItem("restaurantCart",JSON.stringify(cart));

// }

// function loadCart(){

// const saved=localStorage.getItem("restaurantCart");

// if(saved){

// cart=JSON.parse(saved);

// displayCart();

// }

// }

// loadCart();








//============================
// SHOPPING CART
//============================

let cart = JSON.parse(localStorage.getItem("restaurantCart")) || [];

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

document.querySelectorAll(".add-cart").forEach(button=>{

button.addEventListener("click",()=>{

const name = button.dataset.name;

const price = Number(button.dataset.price);

const existing = cart.find(item=>item.name===name);

if(existing){

existing.quantity++;

}else{

cart.push({

name,

price,

quantity:1

});

}

saveCart();

displayCart();

});

});

function displayCart(){

cartItems.innerHTML="";

let total = 0;

cart.forEach((item,index)=>{

total += item.price * item.quantity;

cartItems.innerHTML += `

<div class="cart-item">

<div>

<h6>${item.name}</h6>

<p>$${item.price}</p>

<div>

<button class="btn btn-sm btn-secondary"

onclick="decreaseQuantity(${index})">

-

</button>

<span class="mx-2">

${item.quantity}

</span>

<button class="btn btn-sm btn-success"

onclick="increaseQuantity(${index})">

+

</button>

</div>

</div>

<div>

<button

class="btn btn-danger btn-sm"

onclick="removeItem(${index})">

Remove

</button>

</div>

</div>

`;

});

if(cart.length===0){

cartItems.innerHTML="<p>Your cart is empty.</p>";

}

cartTotal.innerText = total.toFixed(2);

cartCount.innerText = cart.reduce((sum,item)=>sum+item.quantity,0);

}

function increaseQuantity(index){

cart[index].quantity++;

saveCart();

displayCart();

}

function decreaseQuantity(index){

cart[index].quantity--;

if(cart[index].quantity<=0){

cart.splice(index,1);

}

saveCart();

displayCart();

}

function removeItem(index){

cart.splice(index,1);

saveCart();

displayCart();

}

function clearCart(){

cart=[];

saveCart();

displayCart();

}

function saveCart(){

localStorage.setItem("restaurantCart",JSON.stringify(cart));

}

displayCart();









function checkout(){

if(cart.length===0){

alert("Your cart is empty.");

return;

}

let receipt="";

let total=0;

cart.forEach(item=>{

receipt+=`${item.name}

x${item.quantity}

= $${item.price*item.quantity}

\n`;

total+=item.price*item.quantity;

});

receipt+="\n";

receipt+="Total = $"+total;

alert(receipt);

}









const searchInput = document.getElementById("searchFood");

searchInput.addEventListener("keyup", function(){

const value = this.value.toLowerCase();

document.querySelectorAll(".menu-item").forEach(food=>{

const name = food.innerText.toLowerCase();

food.style.display = name.includes(value) ? "block" : "none";

});

});









document.querySelectorAll(".favorite").forEach(button=>{

button.addEventListener("click",()=>{

button.classList.toggle("btn-danger");

button.classList.toggle("btn-outline-danger");

const icon=button.querySelector("i");

icon.classList.toggle("far");

icon.classList.toggle("fas");

});

});








function checkout(){

if(cart.length===0){

alert("Your cart is empty.");

return;

}

let subtotal=0;

let receipt="";

cart.forEach(item=>{

subtotal+=item.price*item.quantity;

receipt+=`${item.name}

x${item.quantity}

= $${item.price*item.quantity}

\n`;

});

const delivery=5;

const total=subtotal+delivery;

receipt+=`

-----------------

Subtotal : $${subtotal}

Delivery : $${delivery}

Total : $${total}

`;

alert(receipt);

}








let discount=0;

function applyCoupon(){

const code=document.getElementById("coupon").value;

if(code==="DKITCHEN10"){

discount=10;

alert("Coupon Applied!");

}else{

alert("Invalid Coupon");

}

}









// receipt+=`

// Payment Method:

// ${document.getElementById("paymentMethod").value}

// `;









// const darkBtn=document.getElementById("darkModeBtn");

// darkBtn.addEventListener("click",()=>{

// document.body.classList.toggle("dark-mode");

// });








// document.addEventListener("DOMContentLoaded", () => {

//     const darkBtn = document.getElementById("darkModeBtn");

//     if (darkBtn) {

//         darkBtn.addEventListener("click", () => {

//             document.body.classList.toggle("dark-mode");

//         });

//     }

// });









document.addEventListener("DOMContentLoaded", () => {

    const darkBtn = document.getElementById("darkModeBtn");

    // Load saved theme
    if(localStorage.getItem("theme") === "dark"){
        document.body.classList.add("dark-mode");
        darkBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    darkBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if(document.body.classList.contains("dark-mode")){

            localStorage.setItem("theme","dark");

            darkBtn.innerHTML = '<i class="fas fa-sun"></i>';

        }else{

            localStorage.setItem("theme","light");

            darkBtn.innerHTML = '<i class="fas fa-moon"></i>';

        }

    });

});








const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};







AOS.init({

duration:1000,

once:true

});







// loading screen

// window.addEventListener("load",()=>{

// document.getElementById("loader").style.display="none";

// });









window.addEventListener("scroll",()=>{

const navbar=document.querySelector(".navbar");

if(window.scrollY>50){

navbar.classList.add("shadow");

}else{

navbar.classList.remove("shadow");

}

});









const navLinks=document.querySelectorAll(".nav-link");

navLinks.forEach(link=>{

link.addEventListener("click",()=>{

navLinks.forEach(nav=>nav.classList.remove("active"));

link.classList.add("active");

});

});