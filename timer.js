function NixieClock(target) {
  var nixie = this;
  
  if(!target) {
    return false;
  } else {
    nixie.targetElement = target;
    return nixie;
  }
}

$.extend(NixieClock.prototype, {
  time, hour, minute, second, targetElement,
  init: function() {},
  parseTime: function() {},
  setTime: function(newHour, newMinute, newSecond) {},
  setHour: function(newHour) {},
  setMinute: function(newMinute) {},
  setSecond: function(newSecond) {},
  switchActiveOfDigit: function(digit, newValue) {}
});

$(document).ready(function() {

});