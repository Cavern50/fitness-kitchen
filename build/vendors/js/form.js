const form = document.querySelector('#main-form');

// uds autorization code
const uds = {
    code: null,
    receipt: {
        points: 0,
        cash: 0,
        total: 0,
    }
}



$(window).on('load', () => {
    
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
                const totalPrice = parseInt($('.cart__priceTotal').text());
                if (info.discountRate > 0) $('cart__priceTotal').text(totalPrice - totalPrice / (info.discountRate / 100));
                $('.uds__name').text(info.userName);
                $('.uds__points').text(info.points);
                $('.uds__discount').text(`${info.discountRate}%`);
                $('.cart__priceTotal').text()
                $('.uds__info').addClass('active');
                $('.uds__main').removeClass('loading');
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
            "total": $('.uds__count').val()
        }
        const totalPrice = parseInt($('.cart__priceTotal').text());
        $.ajax({
            url: `/uds/index.php`,
            type: 'POST',
            data: JSON.stringify(total),
            success: (data) => {
                const parsedUdsData = JSON.parse(data);
                uds.code = parsedUdsData.code;
                uds.receipt.total = parsedUdsData.receipt.total;
                uds.receipt.points = parsedUdsData.receipt.points;
                if (parsedUdsData.receipt.total > 0) $('.cart__priceTotal').text(totalPrice - parsedUdsData.receipt.total);
                console.log(parsedUdsData)
                console.log(uds)
            }
        })
    })
    
    
    $('#main-form').on('submit', function (e) {
        const products = [];
        e.preventDefault();
        $('.cart__order--main .order').each((i, el) => {
            products.push({
                id: parseInt($(el).find('input[name="id"]').val()),
                daysCount: parseInt($(el).find('input[name="days"]').val()),
                peopleCount: parseInt($(el).find('input[name="count"]').val())
            });
        })
        //добавить поле с промотоваром
        const formData = {};
        $($(this).serializeArray()).each((i, el) => {
            formData[el.name] = el.value;
        });
    
        const result = JSON.stringify({
            products,
            ...formData,
            uds,
        });
        $.ajax({
            type: 'POST',
            data: result,
            url: '/pay/index.php',
            success: data => {
                console.log(JSON.parse(data));
            }
        })
    })
    
    //маска на телефон в форме заказа
    $('#phone').mask("+7 (999) 999-99-99");
});

// $('.cart__input').on('focus', e => {
//     if ($(e.currentTarget).hasClass('error')) $(e.currentTarget).removeClass('error');
// });