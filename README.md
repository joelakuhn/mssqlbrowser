# MSSQL Browser

This is a basic MSSQL Server browser. It is built on NW because I'm lazy and pigheaded.

It currently supports:
- Saved Connections
- Multiple Tabs
- Table browsering with regex filtering
- Query editor with syntax highlighting (via CodeMirror)
- Query results table
- Save results as CSV

## Running

Before you run, you must first install dependencies:

npm install
npm install -g nw

Once the dependencies are installed, you can run with:

cd mssql-browser-directory
nw
