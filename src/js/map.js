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