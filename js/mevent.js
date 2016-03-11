function MEvent() {
  this.success_listeners = [];
  this.done_listeners = [];
  this.failure_listeners = [];
}

MEvent.prototype.success = function(callback) {
  this.success_listeners.push(callback);
}

MEvent.prototype.done = function(callback) {
  this.done_listeners.push(callback);
}

MEvent.prototype.failure = function (callback) {
  this.failure_listeners.push(callback);
}

MEvent.prototype.call_success = function() {
  for (var i=0; i<this.success_listeners.length; i++) {
    this.success_listeners[i].apply(arguments);
  }
  this.call_done.apply(this, arguments);
}

MEvent.prototype.call_done = function() {
  for (var i=0; i<this.done_listeners.length; i++) {
    this.done_listeners[i].apply(arguments);
  }
}

MEvent.prototype.call_failure = function () {
  for (var i=0; i<this.failure_listeners.length; i++) {
    this.failure_listeners[i].apply(arguments);
  }
  this.call_done.apply(this, arguments);
}

window.MEvent = MEvent;