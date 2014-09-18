// Workaround to allow opening multiple popups
// http://stackoverflow.com/a/16707921
L.Map = L.Map.extend({
  openPopup: function (popup) {
    // this.closePopup();
    this._popup = popup;
    return this.addLayer(popup).fire('popupopen', {
      popup: this._popup
    });
  }
});


//var popup = L.popup()
//  .setLatLng([51.5, -0.09])
//  .setContent("I am a standalone popup.")
//  .openOn(map);