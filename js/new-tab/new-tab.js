$(function() {

function get_saved_connections() {
  if (localStorage.saved_connections) {
    return JSON.parse(localStorage.saved_connections);
  }
  else {
    return [];
  }
}

new_tab_ui = new Ractive({
  data: {
    connection: {
      nickname: '',
      server: '',
      instance: '',
      database: '',
      user: '',
      password: '',
    },
    connections: [],
  },
  el: '#tab-info',
  template: '#tab-info-template'
});

function show_message(message) {
  $('#message').text(message);
}

function new_tab(config) {
  sql.check(config, function(err) {
    if (!err) {
      NewTab(config);
    }
    else {
      show_message(JSON.stringify(err));
    }
  });
}

$('#open').click(function() {
  new_tab(new_tab_ui.get('connection'));
});

$('#save').click(function() {
  var config = new_tab_ui.get('connection');
  var saved_connections = get_saved_connections();
  var key = Math.floor(Math.random() * 1000000000).toString();
  saved_connections[key] = config;

  localStorage.saved_connections = JSON.stringify(saved_connections);
});

$('#delete').click(function() {

});

function load_saved_connection(nickname, config) {
  new_tab_ui.set('connection.nickname' , nickname);
  new_tab_ui.set('connection.server'   , config.server);
  new_tab_ui.set('connection.instance' , config.instance);
  new_tab_ui.set('connection.database' , config.database);
  new_tab_ui.set('connection.user'     , config.user);
  new_tab_ui.set('connection.password' , config.password);
}

function saved_item_click() {
  var nickname = $(this).text();
  var saved_connections = get_saved_connections();
  load_saved_connection(nickname, saved_connections[nickname]);
}

function saved_item_dblclick() {
  var nickname = $(this).text();
  var saved_connections = get_saved_connections();
  load_saved_connection(nickname, saved_connections[nickname]);
  new_tab(saved_connections[nickname]);
  window.getSelection().removeAllRanges();
}


$('#sidebar-list-filter').keyup(function() {
  var filter = new RegExp($(this).val().toLowerCase(), 'i');
  $('.sidebar-list li').each(function() {
    if ($(this).text().match(filter)) {
      $(this).removeClass('filtered');
    }
    else {
      $(this).addClass('filtered');
    }
  });
});

var connections_ui = new Ractive({
  data: {
    connections: get_saved_connections()
  },
  el: '#sidebar-list',
  template: '#sidebar-list-template'
})
.on({
  select_connection: function(e) {
    new_tab_ui.set('connection', e.context);
  }
})

});