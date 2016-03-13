$.fn.stickyHeaders = function() {
  var h_row = this.find('tr:nth-child(1)').find('th');
  var d_row = this.find('tr:nth-child(2)').find('td');
  for (var i=0; i<h_row.length; i++) {
    $(h_row[i]).width($(d_row[i]).width());
  }
  // nine comes from the 3px of the top and bottom of the heading and the first row cells.
  d_row.css('padding-top', h_row.height() + 9);
}