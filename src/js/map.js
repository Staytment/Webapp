// Workaround to allow opening multiple popups
// http://stackoverflow.com/a/16707921
L.Map = L.Map.extend({
  openPopup: function(popup) {
    // this.closePopup();
    this._popup = popup;
    return this.addLayer(popup).fire('popupopen', {
      popup: this._popup
    });
  }
});

var map = L.map('map').setView([50.5, 9.1], 8);
L.tileLayer('http://{s}.tiles.mapbox.com/v3/swegener.jckkpg0b/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
}).addTo(map);