
$(function() {

  var listener = new keypress.Listener();

  listener.simple_combo( "ctrl shift i", function() {
    (window.require || parent.require)('nw.gui').Window.get().showDevTools()
  });

  listener.simple_combo( "ctrl r", function() {
    document.location.reload();
  });

});
