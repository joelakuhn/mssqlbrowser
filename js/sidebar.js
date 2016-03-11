

// Fetch the list of databases.
sql.onconnect.success(function() {
  var get_databases_query = 'SELECT name FROM sys.databases d WHERE d.database_id > 4';

  sql.query(get_databases_query, function(err, data) {
    build_database_list(data);
  });
});

function build_database_list(data) {
  var select = $('#database-selector');
  select.children().remove();
  data.sort(function(a, b) {
    return a.name > b.name;
  });
  if (!sql.get_database()) {
    var option = $('<option>');
    option.appendTo(select);
  }
  for (var i=0; i<data.length; i++) {
    var option = $('<option>').text(data[i].name);
    if (data[i].name == sql.get_database()) {
      option.prop('selected', true);
    }
    option.appendTo(select);
  }
  select.trigger("chosen:updated");
}

$(function() {
  $('#database-selector').change(function() {
    var database = $(this).val();
    var config = sql.get_config();
    sql.connect({
      user: config.user,
      password: config.password,
      server: config.server,
      database: database
    });
  })
})

function load_tables(table_name) {
  var get_tables_query = "SELECT table_name FROM information_schema.tables WHERE TABLE_CATALOG = '" + table_name + "'";

  sql.query(get_tables_query, function(err, data) {

    data.sort(function(a, b) {
      return a.table_name.toLowerCase().localeCompare(b.table_name.toLowerCase());
    });

    var sidebar_list = $('#sidebar-list');
    sidebar_list.empty();
    for (var i=0; i<data.length; i++) {
      var item = $('<li>');
      item.text(data[i].table_name);
      item.appendTo(sidebar_list);
    }

    bind_table_links();
  });
}

function bind_table_links() {
  $('#sidebar-list li').click(function() {
    var table_name = $(this).text();
    editor.setValue('select top 100 * from ' + table_name);
    run_query();
  });
}

sql.onconnect.success(function() {
  load_tables(sql.get_database());
});

$(function() {
  $('#database-selector').chosen();
});


$(function() {

  $('#sidebar-list-filter').keyup(function() {
    try {
      var filter = new RegExp($(this).val().toLowerCase(), 'i');
      $('.sidebar-list li').each(function() {
        if ($(this).text().match(filter)) {
          $(this).removeClass('filtered');
        }
        else {
          $(this).addClass('filtered');
        }
      });
    }
    catch (e) { }
  });

})