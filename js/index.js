var tab_id = 0;

$(function() {

  var listener = new keypress.Listener();

  listener.simple_combo( "ctrl shift i", function() {
    require('nw.gui').Window.get().showDevTools()
  });

  listener.simple_combo( "ctrl r", function() {
    document.location.reload();
  });

  $('#add-tab').click(activate_add_window);

});

function activate_add_window() {
  $('.tab-window').removeClass('active');
  $('.tab').removeClass('active');
  $('.add-tab').addClass('active');
  $('#new-tab-iframe').addClass('active');
}

function activate_window(tab_id) {
  $('.active').removeClass('active');
  $('[data-tab-id="' + tab_id + '"]').addClass('active');
}

function activate_window_after_close(tab_id) {
  var current_tab = $('.tab[data-tab-id="' + tab_id + '"]');
  var next_tab = current_tab.next();
  var prev_tab = current_tab.prev();
  if (next_tab.is('.tab')) {
    activate_window(next_tab.attr('data-tab-id'));
  }
  else if (prev_tab.is('.tab')) {
    activate_window(prev_tab.attr('data-tab-id'));
  }
  else {
    activate_add_window();
  }
}

function close_btn_click() {
  var tab_id = $(this).attr('data-tab-id');
  if ($(this).is('.active')) {
    activate_window_after_close(tab_id);
  }
  $('[data-tab-id="' + tab_id + '"]').remove();
}

function tab_click() {
  activate_window($(this).attr('data-tab-id'));
}

function create_tab(config, tab_id) {
  var tab = $('<div class="tab"></div>')
  .attr('data-tab-id', tab_id)
  .click(tab_click)
  if (config.database)
    tab.text(config.database);
  else
    tab.text(config.server);
  var closeBtn = $('<div class="close-btn"></div')
  .attr('data-tab-id', tab_id)
  .click(close_btn_click);
  closeBtn.prependTo(tab);
  tab.insertBefore('.add-tab');
}

function create_browser_window(config, tab_id) {
  var iframe = $('<iframe src="./browser.html"></iframe>')
  .attr('frameborder', 0)
  .attr('data-tab-id', tab_id)
  .addClass('tab-window');

  iframe.load(function() {
    this.contentWindow.sql.connect(config);
  });

  iframe.appendTo('.main-container');
}

function NewTab(config) {
  create_tab(config, tab_id);
  create_browser_window(config, tab_id);
  activate_window(tab_id);
  tab_id++;
}

$(function() {
  $('#new-tab-iframe')[0].contentWindow.NewTab = NewTab;
});
