$(function() {

  window.editor = CodeMirror.fromTextArea(document.getElementById('query'), {
    mode: 'text/x-mssql',
    indentWithTabs: true,
    smartIndent: true,
    lineNumbers: true,
    matchBrackets : true,
    autofocus: true,
    extraKeys: {"Ctrl-Space": "autocomplete"},
    hintOptions: {tables: {
      users: {name: null, score: null, birthDate: null},
      countries: {name: null, population: null, size: null}
    }}
  });

  var q = localStorage.q;
  if (q) {
    editor.setValue(q);
  }

});

$(function() {

  var listener = new keypress.Listener();

  listener.simple_combo('cmd r', function() {
    run_query();
  });

  listener.simple_combo('cmd enter', function() {
    run_query();
  });

});