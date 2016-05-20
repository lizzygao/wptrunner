/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var callback = arguments[arguments.length - 1];
window.timeout_multiplier = %(timeout_multiplier)d;

/** Change the event handler
 ** Github source: use the window.addEventListener("message", function(event){}
 **                it can't get the message from the window created by window.open()
 **                see the https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage 
 ** Change to:     window.completion_callback(), which is refer to the current web-platform.test
 **                see web-platform\tools\runner\runner.js
 
window.addEventListener("message", function(event) {
  var tests = event.data[0];
  var status = event.data[1];

  var subtest_results = tests.map(function(x) {
      return [x.name, x.status, x.message, x.stack]
  });

  clearTimeout(timer);
  callback(["%(url)s",
            status.status,
            status.message,
            status.stack,
            subtest_results]);
}, false);

*/
window.completion_callback = function(tests, status) {
    var subtest_results = tests.map(function (test) {
            return [test.name, test.status, test.message, test.stack]
        });
    
    clearTimeout(timer);
    callback(["%(url)s",
        status.status,
        status.message,
        status.stack,
        subtest_results]);
};


window.win = window.open("%(abs_url)s", "%(window_id)s");

var timer = setTimeout(function() {
  window.win.timeout();
  window.win.close();
}, %(timeout)s);
