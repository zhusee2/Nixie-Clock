function NixieClock(target) {
  var nixie = this;
  
  if($(target).length === 0) {
    return false;
  } else {
    nixie.targetElement = $(target);
    return nixie;
  }
}

$.extend(NixieClock.prototype, {
  //Variables
  time: undefined,
  hour: undefined,
  minute: undefined,
  second: undefined,
  targetElement: undefined,

  //Functions
  init: function() {},
  parseTime: function() {},
  setTime: function(newHour, newMinute, newSecond) {
    this.time = {
      hour: newHour,
      minute: newMinute,
      second: newSecond
    };

    this.setHour(newHour);
    this.setMinute(newMinute);
    this.setSecond(newSecond);
  },
  setHour: function(newHour) {
    this.hour = newHour;
    this.setTimeWithType('hour', newHour);
  },
  setMinute: function(newMinute) {
    this.minute = newMinute;
    this.setTimeWithType('minute', newMinute);
  },
  setSecond: function(newSecond) {
    this.second = newSecond;
    this.setTimeWithType('second', newSecond);
  },
  setTimeWithType: function(type, newValue) {
    var digitClassName = '';

    switch (type) {
      case 'hour':
        digitClassName = 'h';
        break;
      case 'minute':
        digitClassName = 'm';
        break;
      case 'second':
        digitClassName = 's';
        break;
      default:
        return false;
        break;
    }
    
    var newValueString = ((newValue < 10 ) ? ('0' + newValue) : newValue.toString()),
        t1 = newValueString.charAt(0),
        t2 = newValueString.charAt(1);

    this.switchActiveOfDigit(digitClassName + '1', t1);
    this.switchActiveOfDigit(digitClassName + '2', t2);
  },
  switchActiveOfDigit: function(digit, newValue) {
    if(newValue < 0 || newValue > 9) return false;

    var targetDigit = this.targetElement.find('.' + digit),
        newDigitElementQuery = 'span.d' + newValue,
        targetActiveDigitElement = $(targetDigit).find(newDigitElementQuery),
        currentActiveDigitElement = $(targetDigit).find('span.active');

    if(currentActiveDigitElement.length) {
      currentActiveDigitElement.removeClass('active');
    }
    targetActiveDigitElement.addClass('active');
  },
  increaseBySecond: function(interval) {
    if(!interval) interval = 1;
    
    var currentTime = this.time,
        newTime = currentTime;
    newTime.second = currentTime.second + interval;
    
    if(newTime.second > 60) {
      newTime.minute += Math.floor(newTime.second / 60);
      newTime.second = newTime.second % 60;
    }
    if(newTime.minute > 60) {
      newTime.hour += Math.floor(newTime.minute / 60);
      newTime.minute = newTime.minute % 60;
    }
    
    this.setTime(newTime.hour, newTime.minute, newTime.second);
  },
  decreaseBySecond: function(interval) {}
});


$(document).ready(function() {

});