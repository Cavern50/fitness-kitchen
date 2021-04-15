ymaps.ready(init);

function init(){
    var myPlacemark = new ymaps.Placemark([51.53145,46.045324], {}, {
        preset: 'islands#redIcon'
    });
    var myMap = new ymaps.Map("map", {
        center: [51.53145,46.045324],
        zoom: 17,
        controls: ['zoomControl'],
    });
    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable('scrollZoom');
}