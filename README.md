# MSSQL Browser

This is a basic MSSQL Server data browser. It is built on NW because I'm lazy and pigheaded.

It currently supports:
- Saved Connections
- Multiple Tabs
- Table browsing with regex filtering
- Query editor with syntax highlighting (via CodeMirror)
- Query results table
- Save results as CSV

It's still quite immature and as such is quite brittle. The innitial code was written over a weekened, so it is all kind of thrown together and needs refactoring. That being said, it has been immensely useful for me.

## Running

Before you run, you must first install dependencies:
```shell
npm install
npm install -g nw
```

Once the dependencies are installed, you can run with:

```shell
cd mssql-browser-directory
nw
```

## Future Goals

Little stuff:
- Mark databases that are not accessible.
- Mark tables that are not accessible.
- Make multiple editor tabs per database connection.
- Allow saving and opening queries.
- Add vim bindings.
- Save data with or without headers.
- Add a "working" animation while fetching long queries.
- Improve how errors are displayed.

Bigger stuff:
- Ability to edit values
- Table structure and relation management

Stuff I'm not sure about:
- Add table and cell name completion.
- Context aware completion.
- Sticky headers in the data table
