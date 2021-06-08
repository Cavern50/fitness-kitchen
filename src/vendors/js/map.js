ymaps.ready(init);

const deliveryFree = [ [ [ 51.5276, 46.0634 ], [ 51.5302, 46.0720 ], [ 51.5332, 46.0771 ], [ 51.5431, 46.0821 ], [ 51.5452, 46.0771 ], [ 51.5489, 46.0753 ], [ 51.5513, 46.0768 ], [ 51.5533, 46.0762 ], [ 51.5551, 46.0773 ], [ 51.5554, 46.0788 ], [ 51.5584, 46.0719 ], [ 51.5586, 46.0521 ], [ 51.5584, 46.0461 ], [ 51.5561, 46.0407 ], [ 51.5580, 46.0329 ], [ 51.5612, 46.0296 ], [ 51.5630, 46.0323 ], [ 51.5684, 46.0348 ], [ 51.5707, 46.0273 ], [ 51.5741, 46.0281 ], [ 51.5776, 46.0130 ], [ 51.5711, 46.0092 ], [ 51.5720, 46.0040 ], [ 51.5694, 46.0019 ], [ 51.5609, 45.9742 ], [ 51.5535, 45.9680 ], [ 51.5535, 45.9631 ], [ 51.5519, 45.9620 ], [ 51.5507, 45.9536 ], [ 51.5480, 45.9573 ], [ 51.5435, 45.9586 ], [ 51.5420, 45.9569 ], [ 51.5412, 45.9510 ], [ 51.5386, 45.9513 ], [ 51.5416, 45.9480 ], [ 51.5427, 45.9436 ], [ 51.5387, 45.9418 ], [ 51.5358, 45.9364 ], [ 51.5335, 45.9472 ], [ 51.5322, 45.9450 ], [ 51.5306, 45.9447 ], [ 51.5289, 45.9410 ], [ 51.5489, 45.9118 ], [ 51.5410, 45.8846 ], [ 51.5417, 45.8756 ], [ 51.5348, 45.8684 ], [ 51.5148, 45.8625 ], [ 51.5020, 45.8642 ], [ 51.4954, 45.8692 ], [ 51.4885, 45.8703 ], [ 51.4837, 45.8832 ], [ 51.4816, 45.8820 ], [ 51.4770, 45.8925 ], [ 51.4780, 45.9016 ], [ 51.4751, 45.9050 ], [ 51.4721, 45.9040 ], [ 51.4594, 45.9121 ], [ 51.4499, 45.9042 ], [ 51.4445, 45.9243 ], [ 51.4460, 45.9348 ], [ 51.4599, 45.9334 ], [ 51.4895, 45.9653 ], [ 51.5055, 45.9847 ], [ 51.5167, 46.0235 ], [ 51.5276, 46.0634 ] ] ];
const delivery90 = [ [ [ 51.5175, 46.2055 ], [ 51.5192, 46.2043 ], [ 51.5176, 46.2098 ], [ 51.5154, 46.2069 ], [ 51.5129, 46.2073 ], [ 51.5123, 46.2029 ], [ 51.5084, 46.1999 ], [ 51.5039, 46.2008 ], [ 51.4940, 46.2126 ], [ 51.4617, 46.1802 ], [ 51.4490, 46.1555 ], [ 51.4467, 46.1454 ], [ 51.4605, 46.0899 ], [ 51.4599, 46.0770 ], [ 51.4632, 46.0735 ], [ 51.4621, 46.0731 ], [ 51.4625, 46.0719 ], [ 51.4603, 46.0697 ], [ 51.4609, 46.0671 ], [ 51.4632, 46.0666 ], [ 51.4664, 46.0660 ], [ 51.4679, 46.0637 ], [ 51.4688, 46.0635 ], [ 51.4657, 46.0541 ], [ 51.4681, 46.0571 ], [ 51.4729, 46.0556 ], [ 51.4728, 46.0528 ], [ 51.4705, 46.0513 ], [ 51.4717, 46.0507 ], [ 51.4737, 46.0508 ], [ 51.4746, 46.0491 ], [ 51.4600, 46.0398 ], [ 51.4606, 46.0374 ], [ 51.4785, 46.0487 ], [ 51.4813, 46.0488 ], [ 51.4817, 46.0496 ], [ 51.4794, 46.0514 ], [ 51.4800, 46.0527 ], [ 51.4819, 46.0533 ], [ 51.4828, 46.0502 ], [ 51.4848, 46.0501 ], [ 51.4904, 46.0469 ], [ 51.4933, 46.0471 ], [ 51.4975, 46.0473 ], [ 51.5025, 46.0576 ], [ 51.5025, 46.0644 ], [ 51.5035, 46.0688 ], [ 51.5047, 46.0724 ], [ 51.5055, 46.0726 ], [ 51.5055, 46.0749 ], [ 51.5061, 46.0772 ], [ 51.5274, 46.0634 ], [ 51.5276, 46.0633 ], [ 51.5302, 46.0720 ], [ 51.5332, 46.0771 ], [ 51.5431, 46.0821 ], [ 51.5431, 46.0821 ], [ 51.5452, 46.0771 ], [ 51.5489, 46.0753 ], [ 51.5513, 46.0768 ], [ 51.5533, 46.0762 ], [ 51.5551, 46.0773 ], [ 51.5554, 46.0788 ], [ 51.5584, 46.0719 ], [ 51.5586, 46.0521 ], [ 51.5584, 46.0461 ], [ 51.5561, 46.0407 ], [ 51.5580, 46.0329 ], [ 51.5612, 46.0296 ], [ 51.5630, 46.0323 ], [ 51.5684, 46.0348 ], [ 51.5707, 46.0273 ], [ 51.5741, 46.0281 ], [ 51.5776, 46.0130 ], [ 51.5711, 46.0092 ], [ 51.5720, 46.0040 ], [ 51.5694, 46.0019 ], [ 51.5609, 45.9742 ], [ 51.5535, 45.9680 ], [ 51.5535, 45.9631 ], [ 51.5519, 45.9620 ], [ 51.5507, 45.9536 ], [ 51.5480, 45.9572 ], [ 51.5435, 45.9586 ], [ 51.5421, 45.9569 ], [ 51.5412, 45.9509 ], [ 51.5387, 45.9513 ], [ 51.5416, 45.9481 ], [ 51.5427, 45.9436 ], [ 51.5387, 45.9417 ], [ 51.5358, 45.9363 ], [ 51.5335, 45.9469 ], [ 51.5322, 45.9450 ], [ 51.5306, 45.9447 ], [ 51.5289, 45.9410 ], [ 51.5490, 45.9118 ], [ 51.5448, 45.8977 ], [ 51.5660, 45.8876 ], [ 51.5671, 45.8851 ], [ 51.5665, 45.8820 ], [ 51.5661, 45.8806 ], [ 51.5650, 45.8802 ], [ 51.5639, 45.8811 ], [ 51.5629, 45.8823 ], [ 51.5618, 45.8818 ], [ 51.5620, 45.8793 ], [ 51.5644, 45.8711 ], [ 51.5742, 45.8654 ], [ 51.5846, 45.8664 ], [ 51.5958, 45.8895 ], [ 51.6077, 45.9039 ], [ 51.6100, 45.8953 ], [ 51.6155, 45.9014 ], [ 51.6230, 45.9159 ], [ 51.6286, 45.9234 ], [ 51.6356, 45.9351 ], [ 51.6208, 45.9487 ], [ 51.6231, 45.9603 ], [ 51.6208, 45.9655 ], [ 51.6316, 45.9772 ], [ 51.6304, 45.9835 ], [ 51.6290, 45.9890 ], [ 51.6265, 45.9957 ], [ 51.6261, 46.0181 ], [ 51.6279, 46.0278 ], [ 51.6276, 46.0300 ], [ 51.6172, 46.0765 ], [ 51.6048, 46.0695 ], [ 51.5928, 46.0683 ], [ 51.5937, 46.1049 ], [ 51.5838, 46.1127 ], [ 51.5778, 46.1264 ], [ 51.5701, 46.1152 ], [ 51.5680, 46.1141 ], [ 51.5645, 46.1071 ], [ 51.5624, 46.1070 ], [ 51.5613, 46.1051 ], [ 51.5613, 46.1029 ], [ 51.5441, 46.0826 ], [ 51.5332, 46.0771 ], [ 51.5330, 46.0768 ], [ 51.5326, 46.0760 ], [ 51.5316, 46.0743 ], [ 51.5302, 46.0720 ], [ 51.5299, 46.0709 ], [ 51.5290, 46.0679 ], [ 51.5284, 46.0660 ], [ 51.5277, 46.0636 ], [ 51.5062, 46.0782 ], [ 51.5066, 46.0804 ], [ 51.5042, 46.0829 ], [ 51.5029, 46.0934 ], [ 51.5023, 46.0947 ], [ 51.5020, 46.0989 ], [ 51.5041, 46.1036 ], [ 51.5053, 46.1114 ], [ 51.5044, 46.1219 ], [ 51.5026, 46.1477 ], [ 51.5117, 46.1758 ], [ 51.5131, 46.1860 ], [ 51.5125, 46.1912 ], [ 51.5146, 46.1969 ], [ 51.5148, 46.2010 ], [ 51.5154, 46.2042 ], [ 51.5175, 46.2055 ] ] ];
const delivery150 = [ [ [ 51.5778, 46.1264 ], [ 51.5838, 46.1127 ], [ 51.5937, 46.1049 ], [ 51.5935, 46.0951 ], [ 51.6003, 46.0948 ], [ 51.6009, 46.1049 ], [ 51.6044, 46.1073 ], [ 51.6202, 46.1128 ], [ 51.6286, 46.1186 ], [ 51.6319, 46.1250 ], [ 51.6301, 46.1288 ], [ 51.6158, 46.1353 ], [ 51.6309, 46.1337 ], [ 51.6203, 46.1413 ], [ 51.6199, 46.1468 ], [ 51.6139, 46.1471 ], [ 51.6120, 46.1456 ], [ 51.6083, 46.1482 ], [ 51.6063, 46.1482 ], [ 51.6091, 46.1623 ], [ 51.6075, 46.1652 ], [ 51.6085, 46.1764 ], [ 51.6070, 46.1766 ], [ 51.6076, 46.1837 ], [ 51.6067, 46.1838 ], [ 51.6061, 46.1769 ], [ 51.6039, 46.1775 ], [ 51.6011, 46.1745 ], [ 51.5991, 46.1773 ], [ 51.5927, 46.1824 ], [ 51.5896, 46.1687 ], [ 51.5881, 46.1592 ], [ 51.5863, 46.1523 ], [ 51.5850, 46.1455 ], [ 51.5845, 46.1423 ], [ 51.5827, 46.1360 ], [ 51.5778, 46.1264 ] ] ];
const delivery200 = [ [ [ 51.5927, 46.1824 ], [ 51.5991, 46.1773 ], [ 51.6011, 46.1745 ], [ 51.6039, 46.1775 ], [ 51.6061, 46.1769 ], [ 51.6067, 46.1838 ], [ 51.6076, 46.1837 ], [ 51.6070, 46.1766 ], [ 51.6085, 46.1764 ], [ 51.6075, 46.1652 ], [ 51.6091, 46.1623 ], [ 51.6167, 46.1787 ], [ 51.6262, 46.1941 ], [ 51.6110, 46.2246 ], [ 51.6069, 46.2206 ], [ 51.6022, 46.2138 ], [ 51.5970, 46.2011 ], [ 51.5927, 46.1824 ] ], [ [ 51.4603, 46.0906 ], [ 51.4378, 46.1808 ], [ 51.4430, 46.2050 ], [ 51.4403, 46.2112 ], [ 51.4258, 46.1933 ], [ 51.4115, 46.1693 ], [ 51.3892, 46.1753 ], [ 51.3846, 46.1362 ], [ 51.3816, 46.1240 ], [ 51.3856, 46.1062 ], [ 51.3979, 46.1118 ], [ 51.3993, 46.1027 ], [ 51.3951, 46.1012 ], [ 51.3969, 46.0851 ], [ 51.3881, 46.0790 ], [ 51.3968, 46.0552 ], [ 51.3890, 46.0484 ], [ 51.3969, 46.0267 ], [ 51.4010, 46.0281 ], [ 51.4119, 46.0345 ], [ 51.4148, 46.0355 ], [ 51.4199, 46.0410 ], [ 51.4255, 46.0386 ], [ 51.4344, 46.0556 ], [ 51.4478, 46.0753 ], [ 51.4603, 46.0906 ] ], [ [ 51.4940, 46.2127 ], [ 51.5039, 46.2008 ], [ 51.5083, 46.1999 ], [ 51.5123, 46.2029 ], [ 51.5129, 46.2074 ], [ 51.5154, 46.2070 ], [ 51.5176, 46.2098 ], [ 51.5187, 46.2117 ], [ 51.5198, 46.2116 ], [ 51.5196, 46.2100 ], [ 51.5200, 46.2076 ], [ 51.5208, 46.2058 ], [ 51.5240, 46.2031 ], [ 51.5252, 46.2016 ], [ 51.5257, 46.1990 ], [ 51.5254, 46.1976 ], [ 51.5240, 46.1970 ], [ 51.5237, 46.1964 ], [ 51.5236, 46.1918 ], [ 51.5231, 46.1901 ], [ 51.5218, 46.1891 ], [ 51.5204, 46.1910 ], [ 51.5198, 46.1923 ], [ 51.5181, 46.1918 ], [ 51.5159, 46.1916 ], [ 51.5144, 46.1906 ], [ 51.5143, 46.1861 ], [ 51.5144, 46.1832 ], [ 51.5139, 46.1815 ], [ 51.5156, 46.1838 ], [ 51.5188, 46.1863 ], [ 51.5172, 46.1833 ], [ 51.5187, 46.1825 ], [ 51.5213, 46.1840 ], [ 51.5226, 46.1859 ], [ 51.5230, 46.1886 ], [ 51.5246, 46.1901 ], [ 51.5284, 46.1993 ], [ 51.5307, 46.2035 ], [ 51.5355, 46.2113 ], [ 51.5403, 46.2190 ], [ 51.5430, 46.2251 ], [ 51.5421, 46.2296 ], [ 51.5411, 46.2315 ], [ 51.5421, 46.2360 ], [ 51.5437, 46.2379 ], [ 51.5468, 46.2381 ], [ 51.5524, 46.2348 ], [ 51.5522, 46.2279 ], [ 51.5531, 46.2259 ], [ 51.5560, 46.2260 ], [ 51.5631, 46.2331 ], [ 51.5665, 46.2357 ], [ 51.5695, 46.2394 ], [ 51.5723, 46.2441 ], [ 51.5736, 46.2466 ], [ 51.5674, 46.2625 ], [ 51.5617, 46.2716 ], [ 51.5566, 46.2745 ], [ 51.5495, 46.2791 ], [ 51.5397, 46.2821 ], [ 51.5255, 46.2833 ], [ 51.5192, 46.2822 ], [ 51.5056, 46.2305 ], [ 51.4940, 46.2127 ] ] ];
const delivery250 = [ [ [ 51.6262, 46.1941 ], [ 51.6110, 46.2247 ], [ 51.6200, 46.2268 ], [ 51.6375, 46.2232 ], [ 51.6445, 46.2167 ], [ 51.6508, 46.2078 ], [ 51.6540, 46.2035 ], [ 51.6561, 46.1959 ], [ 51.6553, 46.1942 ], [ 51.6579, 46.1894 ], [ 51.6614, 46.1889 ], [ 51.6641, 46.1817 ], [ 51.6683, 46.1708 ], [ 51.6664, 46.1666 ], [ 51.6639, 46.1665 ], [ 51.6600, 46.1766 ], [ 51.6532, 46.1812 ], [ 51.6512, 46.1845 ], [ 51.6394, 46.1898 ], [ 51.6397, 46.1942 ], [ 51.6385, 46.1992 ], [ 51.6392, 46.2018 ], [ 51.6363, 46.2034 ], [ 51.6316, 46.1994 ], [ 51.6262, 46.1941 ] ], [ [ 51.5736, 46.2467 ], [ 51.5749, 46.2466 ], [ 51.5796, 46.2540 ], [ 51.5811, 46.2544 ], [ 51.5855, 46.2632 ], [ 51.5888, 46.2727 ], [ 51.5891, 46.2781 ], [ 51.5872, 46.2831 ], [ 51.5861, 46.2839 ], [ 51.5853, 46.2876 ], [ 51.5859, 46.2923 ], [ 51.5895, 46.3011 ], [ 51.5913, 46.3004 ], [ 51.5938, 46.3031 ], [ 51.5949, 46.3089 ], [ 51.5944, 46.3140 ], [ 51.5915, 46.3157 ], [ 51.5898, 46.3147 ], [ 51.5891, 46.3154 ], [ 51.5854, 46.3113 ], [ 51.5838, 46.3045 ], [ 51.5816, 46.3013 ], [ 51.5800, 46.3000 ], [ 51.5744, 46.2946 ], [ 51.5722, 46.2960 ], [ 51.5693, 46.2943 ], [ 51.5677, 46.2919 ], [ 51.5695, 46.2845 ], [ 51.5715, 46.2829 ], [ 51.5730, 46.2796 ], [ 51.5713, 46.2716 ], [ 51.5707, 46.2583 ], [ 51.5736, 46.2467 ] ] ];

let myMap = null;
function init() {

    myMap = new ymaps.Map("map", {
        center: [51.53145,46.045324],
        zoom: 11,
        controls: ['zoomControl'],
    });

    myPolygonFree = new ymaps.Polygon(deliveryFree, {
        balloonContent: "Бесплатная доставка"
    }, {
        fillColor: '#0CA930',
        strokeColor: '#0CA930',
        strokeWidth: 3,
        opacity: 0.65,
    }),
    myPolygon90 = new ymaps.Polygon(delivery90, {
        balloonContent: "Доставка - 90 рублей"
    }, {
        fillColor: '#f4d160',
        strokeColor: '#f4d160',
        strokeWidth: 3,
        opacity: 0.65,
    }),
    myPolygon150 = new ymaps.Polygon(delivery150 , {
        balloonContent: "Доставка - 150 рублей"
    }, {
        fillColor: '#EA7033',
        strokeColor: '#EA7033',
        strokeWidth: 3,
        opacity: 0.65,
    }),
    myPolygon200 = new ymaps.Polygon(delivery200 , {
        balloonContent: "Доставка - 200 рублей"
    }, {
        fillColor: '#B129E3',
        strokeColor: '#B129E3',
        strokeWidth: 3,
        opacity: 0.65,
    }),
    myPolygon250 = new ymaps.Polygon(delivery250 , {
        balloonContent: "Доставка - 250 рублей"
    }, {
        fillColor: '#57525A',
        strokeColor: '#57525A',
        strokeWidth: 3,
        opacity: 0.65,
    }),
    myMap.behaviors.disable('scrollZoom');


    myMap.geoObjects.add(myPolygonFree);
    myMap.geoObjects.add(myPolygon90);
    myMap.geoObjects.add(myPolygon150);
    myMap.geoObjects.add(myPolygon200);
    myMap.geoObjects.add(myPolygon250);
    

    myPolygonFree.options.setParent(myMap.options);
    myPolygonFree.geometry.setMap(myMap);

    myPolygon90.options.setParent(myMap.options);
    myPolygon90.geometry.setMap(myMap);

    myPolygon150.options.setParent(myMap.options);
    myPolygon150.geometry.setMap(myMap);

    myPolygon200.options.setParent(myMap.options);
    myPolygon200.geometry.setMap(myMap);
    
    myPolygon250.options.setParent(myMap.options);
    myPolygon250.geometry.setMap(myMap);
}

const geocode = (street, house) => {
    const _apikey = '2ff635c1-bfdc-4f37-93f4-47fbda8be38d';
    let result = null;
    $.ajax({
        url: `https://geocode-maps.yandex.ru/1.x/?geocode=Саратов,${street}${house}&apikey=${_apikey}&format=json`,
        success: (data) => {
            result = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ').reverse();
            if (myMap.geoObjects.getLength() > 5) {
                myMap.geoObjects.each((el, i) => {
                    if (i === 5) {
                        myMap.geoObjects.remove(el);
                    }
                })
            }
            const placemark = new ymaps.Placemark(result);
            myMap.geoObjects.add(placemark);

            if (myPolygonFree.geometry.contains(result)) {
                $('.geoloc__place').text('Зеленая зона');
                $('.geoloc__price').attr('data-cost', 'free')
                .text('бесплатно');
                $('.cart__priceDelivery').text('0')
                $('.cart__delivery').val(1)
                deliveryPrice = 0;
                totalPrice('.cart__totalVal');
            } else if (myPolygon90.geometry.contains(result)) {
                $('.geoloc__place').text('Желтая зона');
                $('.geoloc__price').attr('data-cost', 'cost')
                .text('90');
                $('.cart__priceDelivery').text('90')
                $('.cart__delivery').val(2)
                deliveryPrice = 90;
                totalPrice('.cart__totalVal');
            } else if (myPolygon150.geometry.contains(result)) {
                $('.geoloc__place').text('Оранжевая зона');
                $('.geoloc__price').attr('data-cost', 'cost')
                .text('150');
                $('.cart__priceDelivery').text('150')
                $('.cart__delivery').val(3)
                deliveryPrice = 150;
                totalPrice('.cart__totalVal');
            } else if (myPolygon200.geometry.contains(result)) {
                $('.geoloc__place').text('Фиолетовая зона');
                $('.geoloc__price').attr('data-cost', 'cost')
                .text('200');
                $('.cart__priceDelivery').text('200')
                $('.cart__delivery').val(4)
                deliveryPrice = 200;
                totalPrice('.cart__totalVal');
            } else if (myPolygon250.geometry.contains(result)) {
                $('.geoloc__place').text('Серая зона');
                $('.geoloc__price').attr('data-cost', 'cost')
                .text('250');
                $('.cart__priceDelivery').text('250')
                $('.cart__delivery').val(5)
                deliveryPrice = 250;
                totalPrice('.cart__totalVal');
            } 
        }
    })
}

const address = {
    city: $('input[name="city"]').val(),
};
const getAddress = (e) => {
    const input = $(e.target);
        if (input.val().length) {
            if (address[input.attr('id')] != `+${input.val()},`) {
                address[input.attr('id')] = `+${input.val()},`;
                if (Object.keys(address).length === 3) {
                    geocode(address.street, address.house);
                }
            }
        }
    
}


$(window).on('load', () => {
    $('.cart__input--geo').on('focusout', e => {
        getAddress(e);
    });
    $('.cart__city--choose').on('click', e => {
        address.city = $('input[name="city"]').val();
        if (Object.keys(address).length === 3) {
            geocode(address.street, address.house);
        }
    })
})