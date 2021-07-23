const form = document.querySelector('#main-form');

// uds authorization code
const uds = {
    code: null,
    receipt: {
        points: 0,
        cash: 0,
        total: 0,
    }
}

$(window).on('load', () => {
    let maxCount = 0;
    $('.uds__count').on('input', e => {
        if ($(e.target).val() > maxCount) {
            $(e.target).val(maxCount);
        }
    })
    //uds 
    $('.uds__get').on('click', e => {
        $('.uds__main').addClass('loading');
        const login = {
            "code": $('.uds__login').val()
        }
        $.ajax({
            url: `/uds/index.php`,
            type: 'POST',
            data: JSON.stringify(login),
            success: (data) => {
                const info = JSON.parse(data);
                //начисление бонусов
                uds.receipt.total = getTotalCost();
                uds.receipt.cash = getTotalCost();
                const totalPriceInCart = getTotalCost();
                const totalPriceInCartDelivery = totalPriceInCart + deliveryPrice;
                if (info.discountRate > 0) {
                    $('.cart__priceTotal').text(totalPriceInCart - totalPriceInCart / (info.discountRate / 100));
                    $('.cart__priceDelivery-total').text(totalPriceInCartDelivery - totalPriceInCartDelivery / (info.discountRate / 100));
                }
                $('.uds__name').text(info.userName);
                $('.uds__points').text(info.points);
                $('.uds__discount').text(`${info.discountRate}%`);
                $('.uds__info').addClass('active');
                $('.uds__main').removeClass('loading');
                maxCount = info.points;
                if (info.discountRate > 0) {
                    $('.cart__priceBlock--uds').removeClass('hidden');
                    $('.cart__priceUds').text(`${info.discountRate}%`);   
                }
            }
        })
    })
    
    $('.uds__writeoff').on('click', e => {
        const total = {
            "code": $('.uds__login').val(),
            "total": getTotalCost(),
        }
        $.ajax({
            url: `/uds/index.php`,
            type: 'POST',
            data: JSON.stringify(total),
            success: (data) => {
                const parsedUdsData = JSON.parse(data);
                uds.code = parsedUdsData.code;
                // uds.receipt.total = parsedUdsData.receipt.total;
                uds.receipt.total = getTotalCost();
                uds.receipt.points = parseInt($('.uds__count').val());
                uds.receipt.cash = uds.receipt.total - parseInt($('.uds__count').val());
                if (parsedUdsData.receipt.total > 0) {
                    const totalPriceInCart = getTotalCost();
                    const totalPriceWithDelivery = getDeliveryPrice(deliveryPrice) + getTotalCost();
                    $('.cart__totalVal').text(totalPriceInCart - $('.uds__count').val());
                    $('.cart__priceDelivery-total').text(totalPriceWithDelivery - $('.uds__count').val());
                    $('.uds__points').text(parsedUdsData.points - $('.uds__count').val());
                }
            }
        })
    })
    const createDataForRequest = () => {
        return products.filter(product => product.count).map((product) => {
            const {id, days, count, trial, customDays, weekend} = product;
            return {
                id,
                daysCount: days,
                peopleCount: count,
                trial,
                customDays,
                weekend
            }
        })
    }

   
    $('#main-form').on('submit', function (e) {
        e.preventDefault();
        const products = createDataForRequest();
        // console.log(productsToSend)
        // const products = [];
        // const productsNewArray = products.filter(product => product.count).map(product => {
        //     console.log(Object.keys(product))
        // })
        // console.log(productsNewArray);
        // const myCartData = JSON.parse(cartStorage.getItem('programs'));
        // $('.cart__order--main .order').each((i, el) => {
        //     const thatProgram = $(el).attr('data-name');
        //     products.push({
        //         id: parseInt($(el).find('input[name="id"]').val()),
        //         daysCount: parseInt($(el).find('input[name="days"]').val()),
        //         peopleCount: parseInt($(el).find('input[name="count"]').val()),
        //         trial: myCartData[thatProgram].trial,
        //         customDays: myCartData[thatProgram].customDays,
        //         weekened: myCartData[thatProgram].weekend
        //     });
        // })

        
        const formData = {};
        $($(this).serializeArray()).each((i, el) => {
            formData[el.name] = el.value;
        });
    
        const result = JSON.stringify({
            products,
            ...formData,
            uds,
        });
        $('.cart__loader').addClass('active');
        $.ajax({
            type: 'POST',
            data: result,
            url: '/pay/index.php',
            success: data => {
                const res = JSON.parse(data);
                if (res.success) {
                    location.href = '/processed'
                } else {
                    location.href = res.response;
                }
            }
        })
    })
    
    //маска на телефон в форме заказа
    $('#phone').mask("+7 (999) 999-99-99");
});

