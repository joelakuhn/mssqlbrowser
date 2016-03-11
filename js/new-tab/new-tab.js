$(function() {

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

function get_config() {
  return {
    server: $('#server').val(),
    instance: $('#instance').val(),
    database: $('#database').val(),
    user: $('#user').val(),
    password: $('#password').val()
  };
}

function get_saved_connections() {
  if (localStorage.saved_connections) {
    return JSON.parse(localStorage.saved_connections);
  }
  else {
    return {};
  }
}

function get_nickname() {
  var specified_nickname = $('#nickname').val();
  if (specified_nickname) {
    return specified_nickname;
  }
  else {
    return $('#server').val();
  }
}

$('#open').click(function() {
  new_tab(get_config());
});

$('#save').click(function() {
  var config = get_config();
  var saved_connections = get_saved_connections();
  var nickname = get_nickname();
  saved_connections[nickname] = config;

  localStorage.saved_connections = JSON.stringify(saved_connections);
});

function load_saved_connection(nickname, config) {
  $('#nickname').val(nickname);
  $('#server').val(config.server);
  $('#instance').val(config.instance);
  $('#database').val(config.database);
  $('#user').val(config.user);
  $('#password').val(config.password);
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

if (localStorage.saved_connections) {
  var saved_connections = get_saved_connections();
  for (var nickname in saved_connections) {
    var list_item = $('<li>')
    .text(nickname)
    .click(saved_item_click)
    .dblclick(saved_item_dblclick)
    .appendTo('#sidebar-list');
  }
}

$(function() {

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

})

});