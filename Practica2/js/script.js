var disconts = true; // activa o desactiva las ofertas

function timer() {
    var today = new Date();
    var end = new Date(2023, 0, 20, 15); //20-01-2023 a las 15:00 

    var diffInTime = end.getTime() - today.getTime();
    var diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    var diffInHours = Math.floor((diffInTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var diffInMinutes = Math.floor((diffInTime % (1000 * 60 * 60)) / (1000 * 60));
    var diffInSeconds = Math.floor((diffInTime % (1000 * 60)) / 1000);

    if (diffInTime > 0) {
        document.getElementById('dias').innerHTML = diffInDays + 'd';
        document.getElementById('horas').innerHTML = diffInHours + 'h';
        document.getElementById('minutos').innerHTML = diffInMinutes + 'm';
        document.getElementById('segundos').innerHTML = diffInSeconds + 's';
        var t = setTimeout(function () { timer() }, 1000);

    }
}

if (disconts) {
    var prices = document.querySelectorAll('span.price');
    for (i of prices) {
        var before = parseFloat((i.innerHTML.replace('€', '',)));
        var after = before - (before * 0.2);
        i.classList.add('offer');
        i.innerHTML = '<span class="price-main">' + before + '€</span> ' + '<mark>-20% <span class="price-discount">' + after + '€ </span></mark>';
    }
} else {
    //esconder hero 
    document.getElementById('hero').style.display = "none";
}

// suma y resta de unidades en los producctos
var btnNumber = document.querySelectorAll('button.btn-number')
for (i of btnNumber) {
    if (i.dataset.type == 'minus') {
        i.addEventListener("click", subtractNumber);

    } else {
        i.addEventListener("click", addNumber);
    }
}
function addNumber() {
    var inputF = this.previousElementSibling;
    inputF.value++;
    inputF.previousElementSibling.disabled = false;
}

function subtractNumber() {
    var inputF = this.nextElementSibling;
    if (inputF.value > 1) {
        inputF.value--;
    } else {
        this.disabled = true;
    }
}

// añadir productos al carrito
var addElements = document.querySelectorAll('button.add-link');
for (i of addElements) {
    i.addEventListener("click", addCart);
    i.addEventListener("click", renderCart);
}

var inCart = parseInt(document.getElementById('shopCartItems').dataset.items);

function addCart() {
    var productId = this.dataset.product;
    var product = document.getElementById(productId);
    var elements = parseInt((product.querySelector('input.input-number')).value);
    var elementsinCart = inCart + elements;
    inCart = elementsinCart;

    // variables para construir el render del carrito
    var initproduc = '<div class="product">';
    var endproduc = '<button class="delete" title="Borrar elemento"><span class="material-symbols-outlined">Delete</span></button></div>';
    var nombre = product.querySelector('.card-title').innerHTML;
    nombre = `<h2 class='product-title'> ${nombre} </h2>`;
    var image = product.querySelector('.card-img').innerHTML;
    image = `<div class='product-thumb'>${image}</div>`;
    var price = product.querySelector('.price').innerHTML;
    price = `<div class='product-price'>${price}</div>`;
    units = `<div class='product-units'>${elements} ud</div>`
    if (disconts) {
        var unitPrice = (parseFloat(product.querySelector('span.price-discount').innerHTML.replace('€', '',)));
        unitPrice = (unitPrice * elements).toFixed(2);
        totalPrice = `<strong class="product-total">Total: <span class="total-amount">${unitPrice}</span>€</strong>`;
    } else {
        var unitPrice = (parseFloat(product.querySelector('span.price').innerHTML.replace('€', '',)));
        unitPrice = (unitPrice * elements).toFixed(2);
        totalPrice = `<strong class="product-total">Total: <span class="total-amount">${unitPrice}</span>€</strong>`;
    }

    // pinto el badge
    document.getElementById('shopCartItems').innerHTML =
        `<span class="shop-cart__badge"> ${elementsinCart} </span>`

    // defino los productos que se pintan en el carrito  
    items = document.getElementById('resultado').innerHTML;
    item = [initproduc + image + nombre + price + units + totalPrice + endproduc];
    itemsinCart = items + item;

}

function renderCart() {
    document.getElementById('resultado').innerHTML = itemsinCart;
    cartTotals();
    coupon();

    //quitar
    var removeElements = document.querySelectorAll('button.delete');
    for (i of removeElements) {
        i.addEventListener("click", deleteElement);
    }

    function deleteElement() {
       this.parentElement.remove(); 
       inCart --;
       document.getElementById('shopCartItems').innerHTML =
       `<span class="shop-cart__badge"> ${inCart} </span>`
       cartTotals();
    }
}

// funcion coupon
var applydiscontsTotals = '';
var discontsTotals = '0.10';
var couponApply = 0;
function coupon() {
    document.getElementById('coupon').style.display = 'block';

    code = document.getElementById('coupon-input').value;

    switch (code.toUpperCase()) {
        case 'BIENVENIDO':
            console.log(code);
            couponApply = 1;
            cartTotals();
            break;

        default:
            console.log('el código no es válido');
            break;
    }
}

// funcion totales
function cartTotals() {
    console.log(couponApply)
    // var subtotals = 0; 
    var subtotals = 0
    var getsubtotals = resultado.querySelectorAll('span.total-amount');
    for (i of getsubtotals) {
        var aux = parseFloat(i.innerHTML);
        subtotals += aux;
    }
    if (couponApply == 1) {
        var discont = `<div class="totals-coupon">Descuento del cupón: ${(subtotals * discontsTotals).toFixed(2)} € </div>`
        var totals = subtotals - (subtotals * discontsTotals);
    } else {
        var discont = ``
        var totals = subtotals;
    }
 
    document.getElementById('cart_totals').style.display = 'block';
    document.getElementById('checkout').style.display = 'block';
    document.getElementById('cart_totals').innerHTML = `
            <h6 class="totals-title">Total del carrito</h6>
             <div class="totals-subtotals">Subtotal: ${subtotals} €</div>
             ${discont} <strong class="totals-totals">Total: ${totals} €</strong> `;

}

// funciones para suscripción newsletter
function suscriptionEmail() {
    usermail = document.getElementById('userMail').value;
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (usermail && emailRegex.test(usermail)) {
        document.getElementById('user').innerText = usermail;
        openModal('googleMail');
    } else {
        document.getElementById('userMail').className = 'form-control is-invalid';
    }
}
function openModal(idModal) {
    document.getElementById(idModal).classList.add('show');
}
function closeModal(idModal) {
    document.getElementById(idModal).classList.remove('show');
}




