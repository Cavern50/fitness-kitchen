
const geocode = () => {
    const _apikey = '2ff635c1-bfdc-4f37-93f4-47fbda8be38d';
    let address = '';
    $('.contacts__info--address').each((i, el) => {
        address += '+' + $(el).text();
    });
    $.ajax({
        url: `https://geocode-maps.yandex.ru/1.x/?geocode=Саратов,${address}&apikey=${_apikey}&format=json`,
        success: (data) => {
            const result = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ').reverse();
            ymaps.ready(() => init(result));
        }
    })
}


function init(result){
    var myPlacemark = new ymaps.Placemark(result, {
        hintContent: $('.contacts__info--address:last-of-type').text(),
    }, {
        preset: 'islands#redIcon'
    });
    var myMap = new ymaps.Map("map", {
        center: result,
        zoom: 17,
        controls: ['zoomControl'],
    });
    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable('scrollZoom');
}

geocode();
