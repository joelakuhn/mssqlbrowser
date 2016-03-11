function run_query() {
  var q = editor.getValue();
  localStorage.q = q;
  sql.query(q, function(err, data) {
    if (err) {
      show_message(JSON.stringify(err));
      show_error(err.message + ' at ' + err.lineNumber);
    }
    else if (data.status == 'success') {
      show_message('success')
    }
    else {
      $('#output').empty();
      var table = create_table(data);
      table.appendTo('#output');
    }

  });
}

function show_message(message) {
  $('#output').html('<div class="message">' + message + '</div>');
}

function show_error(message) {
  $('#output').html('<div class="message error">' + message + '</div>');
}

function sort_table() {
  var index = $(this).attr('data-index');
  var rows = $('.results-section tr:gt(0)').remove().toArray()
  var direction_mask = $(this).hasClass('sort-desc') ? 0 : 1;

  var sorted_rows = rows.sort(function(a, b) {
    var comp = a.children[index].innerText.localeCompare(b.children[index].innerText);
    return direction_mask ? comp : -comp;
  })

  $('.sort-desc').removeClass('sort-desc');
  $('.sort-asc').removeClass('sort-asc');
  $(this).addClass(direction_mask ? 'sort-desc' : 'sort-asc');

  $('.results-section table').append(sorted_rows);
}

function create_table(data) {
  var table = $('<table>');
  var headers = create_headers(data)
  if (headers) headers.appendTo(table)

  for (var i=0; i<data.length; i++) {
    var data_row = create_data_row(data[i], data.columns);
    data_row.appendTo(table);
  }
  return table;
}

function create_headers(data) {
  if (data.length > 0) {
    var row = $('<tr>');
    var i=0;
    for (var col in data[0]) {
      var header = $('<th>');
      header.click(sort_table);
      header.attr('data-index', i++);
      header.text(col).appendTo(row);
    }
    return row;
  }
}

function create_data_row(data_row, columns) {
  var row = $('<tr>');
  for (var col in data_row) {
    var cell = create_data_cell(data_row[col], columns[col].type.declaration)
    cell.appendTo(row);
  }
  return row;
}

function create_data_cell(data, type) {
  var cell = $('<td>')
  if (type == 'binary') {
    data = format_binary_data(data);
  }
  cell.text(data);
  cell.addClass('type-' + type);
  return cell;
}

function format_binary_data(data) {
  return '0x' + data.toString('hex');
}

function save_query(file) {
  var fs = parent.require('fs');
  var file_stream = fs.createWriteStream(file);
  file_stream.once('open', function() {
    $('.results-section tr').each(function() {
      $(this).find('td').each(function(i) {
        if (i != 0) {
          file_stream.write(',');
        }
        file_stream.write('"' + $(this).text() + '"');
      });
      file_stream.write("\n");
    });
    file_stream.end();
  });
}

window.run_query = run_query;

$(function() {
  $('#go').click(function() {
    run_query();
  });


  $('#save').click(function() {
    $('<input type="file" nwsaveas accept=".csv" />').trigger('click').change(function() {
      save_query($(this).val());
    })
  })
});
