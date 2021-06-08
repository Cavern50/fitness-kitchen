const myCart = localStorage;
const trial = JSON.parse(myCart.getItem('trial'));
let clicked = null,
    deliveryPrice = 0,
    maxDays = 1;


const arrDays = [
    [1, 'день'],
    [7, 'дней', $('.discount_7').attr('data-discount')],
    [14, 'дней', $('.discount_14').attr('data-discount')],
    [30, 'дней', $('.discount_30').attr('data-discount')],
];

let cartData = {};
const jsonData = JSON.parse($('.cart__data-json').text())
jsonData.forEach(el => {
    cartData[el.pagetitle] = {
        count: 0,
        callories: el.program_calories,
        allDays: arrDays.slice(0),
        days: 1,
        cost: el.price,
        discountDays: 0,
        totalDiscount: 0,
        totalCost: 0,
        totalCostPerDay: 0,
        name: el.pagetitle,
        id: el.id,
        // custom
    }
})



const persons = [
    [1, 'человек'],
    [2, 'человека'],
    [3, 'человека'],
    [4, 'человека']
];


//проверяем и загружаем динамические параметры товара (если они изменились)


// заполняем localstorage при первом посещении

if (myCart.programs === undefined) {
    myCart.setItem('programs', JSON.stringify(cartData));
} else {
    const temp = JSON.parse(myCart.getItem('programs'));
    console.log(temp)
    console.log(cartData);
    for (let key in temp) {
        temp[key].cost = cartData[key].cost;
    }
    myCart.setItem('programs', JSON.stringify(temp));
}

cartData = JSON.parse(myCart.getItem('programs'));




const orderModalTemplate = (params) => {
    return `<div class="order" data-name='${params.name}'>
                <div class="order__program">
                    <input type='hidden' name='id' value='${params.id}' data-role>
                    <h4 class="order__name">${params.name}</h4>
                    <span class="order__callories">${params.callories} Ккал.</span>
                </div>
                <div class="order__list">
                    <div class="order__box">
                        <input type='hidden' name='days' value="${JSON.parse(myCart.programs)[params.name].days}" data-role>
                        ${params.allDays.map((el, i) => daysTemplate(el, i, params)).join('')}
                        <button type='button' class="result__choose result__choose--order">
                            <span>Выбрать даты</span>
                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.62451 9.16667H8.32543V10.8333H6.62451V9.16667ZM6.62451 12.5H8.32543V14.1667H6.62451V12.5ZM10.0263 9.16667H11.7273V10.8333H10.0263V9.16667ZM10.0263 12.5H11.7273V14.1667H10.0263V12.5ZM13.4282 9.16667H15.1291V10.8333H13.4282V9.16667ZM13.4282 12.5H15.1291V14.1667H13.4282V12.5Z"
                                    fill="white" />
                                <path
                                    d="M4.92357 18.3333H16.83C17.768 18.3333 18.5309 17.5858 18.5309 16.6667V5.00001C18.5309 4.08084 17.768 3.33334 16.83 3.33334H15.1291V1.66667H13.4281V3.33334H8.3254V1.66667H6.62448V3.33334H4.92357C3.98552 3.33334 3.22266 4.08084 3.22266 5.00001V16.6667C3.22266 17.5858 3.98552 18.3333 4.92357 18.3333ZM16.83 6.66667L16.8308 16.6667H4.92357V6.66667H16.83Z"
                                    fill="white" />
                            </svg>

                        </button>
                    </div>
                    <svg class='order__arrow' width="10" height="7" viewBox="0 0 10 7" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M5.00001 6.53422C4.74401 6.53422 4.48801 6.436 4.29301 6.24057L0.293006 2.23174C-0.0979942 1.83988 -0.0979942 1.20648 0.293006 0.814619C0.684006 0.422756 1.31601 0.422756 1.70701 0.814619L5.01201 4.12691L8.30501 0.939895C8.70401 0.556049 9.33501 0.567074 9.71901 0.96495C10.103 1.36283 10.092 1.99823 9.69501 2.38207L5.69501 6.2526C5.50001 6.44101 5.25001 6.53422 5.00001 6.53422Z"
                            fill="#222B45" />
                    </svg>
                </div>
                <div class="order__list">
                    <div class="order__box">
                        <input type='hidden' name='count' value="${JSON.parse(myCart.programs)[params.name].count}" data-role>
                        ${persons.map((el, i) => personTemplate(el, i, params)).join('')}
                    </div>
                    <svg class='order__arrow' width="10" height="7" viewBox="0 0 10 7" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M5.00001 6.53422C4.74401 6.53422 4.48801 6.436 4.29301 6.24057L0.293006 2.23174C-0.0979942 1.83988 -0.0979942 1.20648 0.293006 0.814619C0.684006 0.422756 1.31601 0.422756 1.70701 0.814619L5.01201 4.12691L8.30501 0.939895C8.70401 0.556049 9.33501 0.567074 9.71901 0.96495C10.103 1.36283 10.092 1.99823 9.69501 2.38207L5.69501 6.2526C5.50001 6.44101 5.25001 6.53422 5.00001 6.53422Z"
                            fill="#222B45" />
                    </svg>
                </div>
                <button type='button' class="order__remove">
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1.5 12.25C1.5 13.075 2.175 13.75 3 13.75H9C9.825 13.75 10.5 13.075 10.5 12.25V3.25H1.5V12.25ZM3 4.75H9V12.25H3V4.75ZM8.625 1L7.875 0.25H4.125L3.375 1H0.75V2.5H11.25V1H8.625Z"
                            fill="#979C9E" />
                    </svg>
                </button>
                <span class="order__price">
                    <span class="order__priceVal">${params.totalCostPerDay}</span>
                </span>
            </div>`
}

const trialDayTemplate = (params) => {
    return `<div class="order" data-name='${params.name}'>
                <input type='hidden' name='order-trial' value='true' data-role>
                <div class="order__program">
                    <h4 class="order__name">${params.name}</h4>
                    <span class="order__callories">${params.callories} Ккал.</span>
                </div>
                <div class="order__list">
                    <div class="order__box">
                        <input type='hidden' name='order-${params.id}-days' value="1" data-role>
                        <button type='button' class="order__item order__item--trial order__item--days active"><span class="order__value">1 день</span></button>
                    </div>
                   
                </div>
                <div class="order__list">
                    <div class="order__box">
                        <input type='hidden' name='order-${params.id}-count' value="1" data-role>
                        <button type='button' class="order__item order__item--trial order__item--persons active"><span class="order__value">1 человек</span></button>
                    </div>
                   
                </div>
                <button type='button' class="order__remove order__remove--trial">
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1.5 12.25C1.5 13.075 2.175 13.75 3 13.75H9C9.825 13.75 10.5 13.075 10.5 12.25V3.25H1.5V12.25ZM3 4.75H9V12.25H3V4.75ZM8.625 1L7.875 0.25H4.125L3.375 1H0.75V2.5H11.25V1H8.625Z"
                            fill="#979C9E" />
                    </svg>
                </button>
                <span class="order__price">
                    <span class="order__priceVal order__priceVal--trial">${params.totalCostPerDay}</span>
                </span>
            </div>`
}

const daysTemplate = (el, i, params) => `<button type='button' class="order__item order__item--days ${el[0] === params.days || (params.days === 1 && i === 0) ? 'active' : ''}"><span class="order__value">${el[0]} ${el[1]}</span>${el[2] !== undefined ? `<span class="order__discount">${el[2] ? el[2] + '%' : ''}</span>` : ''}</button>`;
const personTemplate = (el, i, params) => `<button type='button' class="order__item order__item--persons ${el[0] === params.count || (params.count === 1 && i === 0) ? 'active' : ''}"><span class="order__value">${el[0]} ${el[1]}</span></button>`;


const totalPrice = (container) => {
    let totalPrice = 0,
        count = 0;
    for (let key in cartData) {
        if (cartData[key].totalCost > 0) {
            totalPrice += cartData[key].totalCost;
            if (cartData[key].days > maxDays) maxDays = cartData[key].days;
        }
        if (cartData[key].count > 0) {
            count += cartData[key].count;
        }
    }
    if (myCart.getItem('trial') !== null) totalPrice = trial.totalCostPerDay;
    if (count >= 2) {
        $('.cart__discount-family, .cart__priceBlock--family').removeClass('hidden');
        totalPrice = totalPrice - totalPrice * Math.abs($('.discount_family').attr('data-discount') / 100);
    } else {
        $('.cart__discount-family, .cart__priceBlock--family').addClass('hidden');
    }
    if ($('.cart__priceDelivery').length) {
        $('.cart__priceDelivery-total').text(totalPrice + deliveryPrice * maxDays)
    }
    $(container).text(totalPrice);
    console.log(cartData)
}



// считаем общую скидку и цену со скидкой

const costCalc = (name, target) => {
    let discountFamily = 0;
    // for (let key in cartData) {
    //     cartData[key].count 
    // }
    // cartData[name].totalDiscount = cartData[name].discountDays + cartData[name].discountPersons;
    cartData[name].totalDiscount = cartData[name].discountDays;
    cartData[name].totalCost = cartData[name].count * cartData[name].cost * cartData[name].days;
    cartData[name].totalCostPerDay = cartData[name].count * cartData[name].cost;
    if (cartData[name].totalDiscount != 0) {
        cartData[name].totalCost += (cartData[name].totalCost / 100 * parseInt(cartData[name].totalDiscount));
        cartData[name].totalCostPerDay += (cartData[name].totalCostPerDay / 100 * parseInt(cartData[name].totalDiscount));
    }
    $(target).closest('.order').find('.order__priceVal').text(cartData[name].totalCostPerDay);
    totalPrice('.cart__totalVal');
}




//расчет процентов скидки и кол-ва дней при выборе в календаре
const calcDays = (days, that) => {

    const discount = (days) => {
        switch (true) {
            case (days >= 7 && days <= 13):
                return parseInt($('.discount_7').attr('data-discount'))
            case (days >= 14 && days <= 29):
                return parseInt($('.discount_14').attr('data-discount'))
            case (days >= 30):
                return parseInt($('.discount_30').attr('data-discount'));
            default:
                return '';
        }
    }

    const daysForm = (days) => {
        const n = days % 10;
        switch (true) {
            case (n > 4 || n === 0 || (days > 10 && days < 20)):
                return ' дней';
            case ((days > 1 && days < 5) || (n > 1 && n < 5)):
                return ' дня';
            default:
                return ' день'
        }
    }

    const button = `<button type='button' class="${$(that).parents().hasClass('result__box') ? 'result__item' : 'order__item'} order__item--days custom active">
                        <span class='result__value'>${days}${daysForm(days)}</span>
                        <span class="result__discount">${discount(days) ? discount(days) + '%' : ''}</span>
                    </button>`;
    if ($(that).siblings('.custom').length) {
        $(that).siblings('.custom .result__value')
            .text(daysForm(days));
        $(that).siblings('.custom .result__discount')
            .text(discount(days) + '%');
    } else {
        $(that).siblings('button').removeClass('active');
        $(that).closest('div').prepend(button);
        $(that).siblings('input').val(`${days}`);
    }
    cartData[$(that).closest('div[data-name]').attr('data-name')]['allDays'][4] = [days, daysForm(days), discount(days)];
    cartData[$(that).closest('div[data-name]').attr('data-name')]['days'] = days;
    if (discount(days)) cartData[$(that).closest('div[data-name]').attr('data-name')]['discountDays'] = discount(days);
    myCart.setItem('programs', JSON.stringify(cartData));
}


const calcDiscount = (target, thatProgram, property) => {
    if (isNaN(parseInt($(target).find('span[class*="discount"').text()))) {
        cartData[thatProgram][property] = 0;
    } else {
        cartData[thatProgram][property] = parseInt($(target).find('span[class*="discount"').text())
    }
}

const counterItems = () => {
    // const parsedItems = JSON.parse(myCart.getItem('programs'));
    // for (let key in parsedItems) {
    //     if (parsedItems[key].count > 0) {
    //         allItems++;
    //     }
    // }
    const count = $('.modal__box .cart__order .order').length;
    $('.header__basket').attr('data-count', count);
}


//добавление товара в корзину

const addItem = (program) => {
    // cartData[program].count < 4 ? cartData[program].count++ : cartData[program].count = 4; // максимальное кол-во человек для заказа
    if (cartData[program].count === 0) cartData[program].count = 1;
    costCalc(program);
    $(`.order[data-name="${program}"]`).remove();
    myCart.setItem('programs', JSON.stringify(cartData));
    $('.cart__order').append(orderModalTemplate(cartData[program]));
    counterItems();
    stopScroll();
}

const removeItem = (program) => {
    cartData[program].count = 0;
    cartData[program].days = 1;
    cartData[program].discountDays = 0;
    // cartData[program].discountPersons = 0;
    cartData[program].totalDiscount = 0;
    cartData[program].totalCost = 0;
    cartData[program].totalCostPerDay = 0;
    totalPrice('.cart__totalVal');
    $(`.order[data-name="${program}"]`).remove();
    myCart.setItem('programs', JSON.stringify(cartData));
    counterItems();
}

$(window).on('load', () => {
    // console.log(cartData);
    //формирование заказа при загрузке страницы
    if (myCart.getItem('trial') === null) {
        for (let key in cartData) {
            if (cartData[key].count > 0) {
                costCalc(key);
                $('.cart__order').append(orderModalTemplate(cartData[key]));
            }
        }
    } else {
        $('.cart__add').remove();
        $('.cart__order').append(trialDayTemplate(trial));
    }
    counterItems();
    totalPrice('.cart__totalVal');


    //удаление товара из корзины
    $(document).on('click', '.order__remove:not(.order__remove--trial)', e => {
        const thatProgram = $(e.currentTarget).closest('.order').attr('data-name');
        removeItem(thatProgram);
    })

    $(document).on('click', '.order__remove--trial', e => {
        $('.order').remove();
        counterItems();
        myCart.removeItem('trial');
        totalPrice('.cart__totalVal');
    })




    //расчет стоимости в корзине

    $(document).on('click', '.order__item', e => {
        list('.order__box', e, true);
        const thatProgram = $(e.currentTarget).closest('div[data-name]').attr('data-name'),
            value = parseInt($(e.currentTarget).siblings('input').val());
        if ($(e.currentTarget).hasClass(`order__item--days`)) {
            calcDiscount(e.currentTarget, thatProgram, 'discountDays');
            cartData[thatProgram].days = value
        } 
        else {
            // calcDiscount(e.currentTarget, thatProgram, 'discountPersons');
            cartData[thatProgram].count = value;
        }
        costCalc(thatProgram, e.currentTarget);
        myCart.setItem('programs', JSON.stringify(cartData));
    })



    //кастомное кол-во дней (по календарю)

    $('.dpicker__done').on('click', e => {
        $('.dpicker').removeClass('active');
        $(clicked).closest('div').removeClass('open').attr('style', '');
        const thatOrder = $(clicked).closest('div[data-name]');
        if ($('.dpicker__item.ranged').length) {
            calcDays($('.dpicker__item.ranged').length, clicked);
            costCalc(thatOrder.attr('data-name'), clicked);
            myCart.setItem('programs', JSON.stringify(cartData));
        }
    })


    $('.intro__order').on('click', e => {
        if (myCart.getItem('trial') === null) {
            addItem($('.intro__title').text());
            totalPrice('.cart__totalVal');
        }
        $('.modal--cart').addClass('active');
    })



    //расчет стоимости в калькуляторе

    $('.result').on('click', '.result__item', e => {
        list('.result__box', e);
        const thatProgram = $(e.currentTarget).closest('div[data-name]').attr('data-name');
            // value = parseInt($(e.currentTarget).siblings('input').val());
        let totalDiscount = 0,
            count = 1;
        $('.result__item.active .result__discount').each((i, el) => {
            totalDiscount += parseInt($(el).text());
        });
        count = parseInt($('.result__item:not(.order__item--days):not(.custom).active .result__value').text());
        let totalPricePerDay = count * cartData[thatProgram].cost;
        totalPricePerDay = totalPricePerDay + (totalPricePerDay * (totalDiscount / 100))

        if (cartData[thatProgram].cost * count !== totalPricePerDay) {
            $('.result__priceBefore').removeClass('hidden');
        } else {
            $('.result__priceBefore').addClass('hidden');
        }
        $('.result__priceBefore').text(cartData[thatProgram].cost * count);
        $('.result__priceAfter').text(totalPricePerDay);
    });


    //добавить в корзину из калькулятора

    //здесь были фиксики
    $('.result__order').on('click', e => {
        const thatProgram = $(e.currentTarget).closest('div[data-name]').attr('data-name');
        const discount = parseInt($('.result__item.order__item--days.active .result__discount').text());
        cartData[thatProgram].discountDays = isNaN(discount) ? 0 : discount;
        cartData[thatProgram].count = parseInt($('.result__item.active:not(.order__item--days):not(.custom)').text())
        cartData[thatProgram].days = parseInt($('.result__box--days .result__item.active .result__value').text())
        if (myCart.getItem('trial') === null) {
            addItem(thatProgram);
            totalPrice('.cart__totalVal');
        }
        $('.modal--cart').addClass('active');
    })

  
})






// let cartData = {
//     Lite: {
//         count: 0,
//         callories: $('.cart__data-items span[data-name="Lite"]').attr('data-calories'),
//         allDays: arrDays.slice(0),
//         days: 1,
//         cost: $('.cart__data-items span[data-name="Lite"]').attr('data-cost'),
//         discountDays: 0,
//         // discountPersons: 0,
//         totalDiscount: 0,
//         totalCost: 0,
//         totalCostPerDay: 0,
//         name: $('.cart__data-items span[data-name="Lite"]').attr('data-name'),
//         id: $('.cart__data-items span[data-name="Lite"]').attr('data-id'),
//     },
//     Fit: {
//         count: 0,
//         callories: $('.cart__data-items span[data-name="Fit"]').attr('data-calories'),
//         allDays: arrDays.slice(0),
//         days: 1,
//         cost: $('.cart__data-items span[data-name="Fit"]').attr('data-cost'),
//         discountDays: 0,
//         // discountPersons: 0,
//         totalDiscount: 0,
//         totalCost: 0,
//         totalCostPerDay: 0,
//         name: $('.cart__data-items span[data-name="Fit"]').attr('data-name'),
//         id: $('.cart__data-items span[data-name="Fit"]').attr('data-id'),
//     },
//     Active: {
//         count: 0,
//         callories: $('.cart__data-items span[data-name="Active"]').attr('data-calories'),
//         allDays: arrDays.slice(0),
//         days: 1,
//         cost: $('.cart__data-items span[data-name="Active"]').attr('data-cost'),
//         discountDays: 0,
//         // discountPersons: 0,
//         totalDiscount: 0,
//         totalCost: 0,
//         totalCostPerDay: 0,
//         name: $('.cart__data-items span[data-name="Active"]').attr('data-name'),
//         id: $('.cart__data-items span[data-name="Active"]').attr('data-id'),
//     },
//     Balance: {
//         count: 0,
//         callories: $('.cart__data-items span[data-name="Balance"]').attr('data-calories'),
//         allDays: arrDays.slice(0),
//         days: 1,
//         cost: $('.cart__data-items span[data-name="Balance"]').attr('data-cost'),
//         discountDays: 0,
//         // discountPersons: 0,
//         totalDiscount: 0,
//         totalCost: 0,
//         totalCostPerDay: 0,
//         name: $('.cart__data-items span[data-name="Balance"]').attr('data-name'),
//         id: $('.cart__data-items span[data-name="Balance"]').attr('data-id'),
//     },
//     Vitality: {
//         count: 0,
//         callories: $('.cart__data-items span[data-name="Vitality"]').attr('data-calories'),
//         allDays: arrDays.slice(0),
//         days: 1,
//         cost: $('.cart__data-items span[data-name="Vitality"]').attr('data-cost'),
//         discountDays: 0,
//         // discountPersons: 0,
//         totalDiscount: 0,
//         totalCost: 0,
//         totalCostPerDay: 0,
//         name: $('.cart__data-items span[data-name="Vitality"]').attr('data-name'),
//         id: $('.cart__data-items span[data-name="Vitality"]').attr('data-id'),
//     },
// }


// const testCart = {
//     item: {
//         id: item,
//         count: count,
//         days: days,
//     },
//     deliveryPrice: deliveryPrice * maxDays,
// }



// onclick {
//     data = storage 
//     apirequest(data);
// }


// При запросе надо получить итоговую цену товара, просчитаную с учетом скидок, выбранных поьзователем, которые я отравляю в запросе.
// Допусти пользователь добавил товары(id), выбрал количество  дней(days) и количество товара(count), выбрал зону доставки(delivery)
// Фронт отправляет запрос например /api?id=7&days=17&count=2&id=2&days=3&count=1&delivery=150
// Бек должен просчитать скидку с учетом колиества  дней / товаров и стоимости доставки после чего  отправить пользователя на платежную систему с конечными данными.