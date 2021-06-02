(function(window, google, mapster){

    mapster.MAP_OPTIONS = {
        center: {
            lat: 37.791350,
            lng: -122.435883
        },
        zoom: 10,
        disableDefaultUI: false,
        scrollwheel: true,
        draggable: true,
        //roadmap, satellite, hybrid, terrain
        mapTypeId: google.maps.MapTypeId.roadmap,
        maxZoom: 110,
        minZoom: 0,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM,
            style: google.maps.ZoomControlStyle.DEFAULT
        }

    }

}(window, google, window.Mapster || (window.Mapster = {})))