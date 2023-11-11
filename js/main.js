$(document).ready(function () {
    $('.slider').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1099,
                settings: {
                    slidesToScroll: 3,
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 799,
                settings: {
                    slidesToScroll: 2,
                    slidesToShow: 2,
                    arrows: false,
                }
            },
        ]
    });
});
const account = document.querySelector('.header__account');
const popUp = document.querySelector('.popup_bg');
const closePopUp = document.querySelector('.popup__account_close')
const icon = document.querySelector('.icon');
const search = document.querySelector('.search');
const clear = document.querySelector('.clear');
const menu = document.querySelector('.menu__mobile');
const menuList = document.querySelector('.menu')
const sliderFilter = document.querySelectorAll('.slider .products__filter')
const sliderItems = document.querySelectorAll('.slider .product')
const menuFilter = document.querySelectorAll('.products__filter')
const menuItems = document.querySelectorAll('.product')
const select = document.querySelector('#select');
const help = document.querySelector('.products')
const price = help.getElementsByClassName('product__price');
const body = document.body;
const priceNode = document.querySelector('.products__cards')

menu.addEventListener('click', function () {
    menuList.classList.toggle('show')
    menu.classList.toggle('open')
})
icon.addEventListener('click', () => search.classList.toggle('active'))
clear.addEventListener('click', () => input.value = '')
account.addEventListener('click', e => clickHandler(e))
closePopUp.addEventListener('click', () => popUp.classList.remove('active'))
document.addEventListener('click', e => closeModal(e))

select.oninput = function () {
    if (+select.value == 1) {
        filterPriceUp()
    }
    else if (+select.value == 2) {
        filterPriceDown()
    }
}

function insertAfter(element, refelement) {
    return refelement.parentNode.insertBefore(element, refelement.nextSibling)
}
function clickHandler(e) {
    popUp.classList.add('active')
}
function closeModal(event) {
    if (event.target.className == 'popup_bg active') {
        popUp.classList.remove('active')
    }
}

// тут вместо const price = document.getElementsByClassName('product__price');
// было const price = document.querySelectorAll('.product__price');
// priceNode == родитель
// price == дети

function filterPriceUp() {
    for (let i = 0; i < price.length; i++) {
        for (let j = i; j < price.length; j++) {
            if (Math.round(price[i].getAttribute('data-price')) > Math.round(price[j].getAttribute('data-price'))) {
                replaceNode = priceNode.replaceChild(priceNode.children[j], priceNode.children[i])
                insertAfter(replaceNode, priceNode.children[i])

            }

        }
    }
}
function filterPriceDown() {
    for (let i = 0; i < price.length; i++) {
        console.log(price[i].getAttribute('data-price'))
        for (let j = i; j < price.length; j++) {
            if (Math.round(price[i].getAttribute('data-price')) < Math.round(price[j].getAttribute('data-price'))) {
                let replaceNode = priceNode.replaceChild(priceNode.children[j], priceNode.children[i])
                insertAfter(replaceNode, priceNode.children[i])
            }

        }
    }
}



menuFilter.forEach(x => x.addEventListener('click', filter))
sliderFilter.forEach(x => x.addEventListener('click', filter))
function filter(event) {
    if (event.target.closest('.products')) {
        menuFilter.forEach(x => x.classList.remove('active'));
        event.target.classList.add('active')
        let dataType = event.target.getAttribute('data-type');
        menuItems.forEach(function (element) {
            element.classList.remove('none')
            if (dataType == 'All Products') {
                element.classList.remove('none')
            }
            else if (!(element.classList.contains(dataType))) {
                element.classList.add('none')
            }

        })
    }
    else if (event.target.closest('.best-sellers')) {
        sliderFilter.forEach(x => x.classList.remove('active'));
        event.target.classList.add('active')
        let dataType = event.target.getAttribute('data-type');
        sliderItems.forEach(function (element) {
            element.classList.remove('none')
            if (dataType == 'All Products') {
                element.classList.remove('none')
            }
            else if (!(element.classList.contains(dataType))) {
                element.classList.add('none')
            }

        })
    }


}
menu.addEventListener('click', reactOnClick)
function reactOnClick() {
    if (menuList.classList.contains('show')) {
        console.log("it contains class 'show'")
        body.classList.add('overflow')
    }
    else {
        console.log('It does not contains class "show"')
        body.classList.remove('overflow')
    }
}