var mssql = (window.require || parent.require)('mssql');
var connection;
var onconnect = new MEvent();

function check(config, callback) {
  var connection = new mssql.Connection(config, function(err) {
    connection.close();
    callback(err);
  });
}

function connect(config) {
  setTimeout(function() {
    if (connection) {
      connection.close();
    }
    connection = new mssql.Connection(config, function(err) {
      onconnect.call_success();
    });
  });
}

function query(q, callback) {

  var request = new mssql.Request(connection);
  request.query(q, function(err, recordset) {

    if (!err && !recordset) {
      recordset = {
        status: 'success'
      }
    }

    // console.dir(recordset);
    callback(err, recordset);
  });

}

function close() {
  connection.close();
}

window.sql = {
  connect: connect,
  check: check,
  query: query,
  close: close,
  onconnect: onconnect,
  get_database: function() {
    return connection.config.database;
  },
  get_config: function() {
    return connection.config;
  }
};

