$(function() {

function get_saved_connections() {
  if (localStorage.saved_connections) {
    return JSON.parse(localStorage.saved_connections);
  }
  else {
    return [];
  }
}

function save_connection(conn) {
  var connections = sidebar_ui.get('connections');
  var saved_keypath = editor_ui.get('saved_keypath');
  if (saved_keypath) {
    sidebar_ui.set(saved_keypath, shallow_clone(conn));
  }
  else {
    connections.push(shallow_clone(conn));
    sidebar_ui.set('connections', connections);
  }
  localStorage.saved_connections = JSON.stringify(connections);
}

editor_ui = new Ractive({
  el: '#tab-info',
  template: '#tab-info-template'
});

var sidebar_ui = new Ractive({
  data: {
    filter: '',
    connections: get_saved_connections(),
    filtered_connections: function() {
      var filter = new RegExp(this.get('filter').toLowerCase(), 'i')
      var matching = this.get('connections').filter(function(conn) {
        return conn.nickname.match(filter);
      });
      return matching;
    }
  },
  el: '#sidebar',
  template: '#sidebar-template'
})

function new_tab(config) {
  sql.check(config, function(err) {
    if (!err) {
      NewTab(config);
      editor_ui.set('connect_message', undefined);
    }
    else {
      editor_ui.set('connect_message', JSON.stringify(err));
    }
  });
}

/* EDITOR EVENTS */

editor_ui.on({
  connect: function() {
    new_tab(editor_ui.get('connection'));
  },
  save: function() {
    save_connection(editor_ui.get('connection'));
  },
  delete: function() {

  }
})

/* SIDEBAR EVENTS */

sidebar_ui.on({
  select_connection: function(e) {
    editor_ui.set('connection', shallow_clone(e.context));
    editor_ui.set('saved_keypath', e.keypath)
  },
  open_connection: function(e) {
    editor_ui.set('connection', e.context);
    new_tab(e.context);
  }
});

});