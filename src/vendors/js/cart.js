const myCart = localStorage;

const orderModalTemplate = (params) => {
   return `<div class="order">
<div class="order__program">
    <h4 class="order__name">${params}</h4>
    <span class="order__callories">1000 Ккал.</span>
</div>
<div class="order__list">
    <div class="order__box">
        <button type='button' class="order__item active">
            <span class="order__value">1 день</span>
        </button>
        <button type='button' class="order__item">
            <span class="order__value">7 дней</span>
            <span class="order__discount">-10%</span>
        </button>
        <button type='button' class="order__item">
            <span class="order__value">14 дней</span>
            <span class="order__discount">-20%</span>
        </button>
    </div>
    <svg class='order__arrow' width="10" height="7" viewBox="0 0 10 7" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M5.00001 6.53422C4.74401 6.53422 4.48801 6.436 4.29301 6.24057L0.293006 2.23174C-0.0979942 1.83988 -0.0979942 1.20648 0.293006 0.814619C0.684006 0.422756 1.31601 0.422756 1.70701 0.814619L5.01201 4.12691L8.30501 0.939895C8.70401 0.556049 9.33501 0.567074 9.71901 0.96495C10.103 1.36283 10.092 1.99823 9.69501 2.38207L5.69501 6.2526C5.50001 6.44101 5.25001 6.53422 5.00001 6.53422Z"
            fill="#222B45" />
    </svg>
</div>
<div class="order__amount">
    <button type='button' class="order__change order__change--minus">
        <svg width="8" height="2" viewBox="0 0 8 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1L8 1" stroke="#3F4C5A" />
        </svg>
    </button>
    <span class="order__sum">1</span>
    <button type='button' class="order__change order__change--plus">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 0L4 8" stroke="#3F4C5A" />
            <path d="M0 4L8 4" stroke="#3F4C5A" />
        </svg>
    </button>
</div>
<span class="order__price">2700 <span class="rub">Р</span></span>
<button type='button' class="order__remove">
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M1.5 12.25C1.5 13.075 2.175 13.75 3 13.75H9C9.825 13.75 10.5 13.075 10.5 12.25V3.25H1.5V12.25ZM3 4.75H9V12.25H3V4.75ZM8.625 1L7.875 0.25H4.125L3.375 1H0.75V2.5H11.25V1H8.625Z"
            fill="#979C9E" />
    </svg>
</button>
</div>`
}

const cartData = {
    lite: {
        count: 0,
        callories: 0,
        days: 0,
    }, 
    fit: {
        count: 0,
        callories: 0,
        days: 0,
    },
    active: {
        count: 0,
        callories: 0,
        days: 0,
    }, 
    balance: {
        count: 0,
        callories: 0,
        days: 0,
    },
    vitality: {
        count: 0,
        callories: 0,
        days: 0,
    }
}

myCart.clear();

$('.intro__order').on('click', e => {
    console.log(myCart.getItem(`program${$('.intro__title').text()}`));
    // myCart.setItem($('.intro__title').text(), );
    if (myCart.getItem(`program${$('.intro__title')}`) === null) {
        $('.cart__order').append(orderModalTemplate($('.intro__title').text()))
        $('.modal--cart').addClass('active');
    } else {

    }
})

$(window).on('load', () => {

})