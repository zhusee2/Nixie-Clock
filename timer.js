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
  init: function() {
    var root = this.targetElement;
    if(!root.hasClass('nixie_clock')) root.addClass('nixie_clock');
    root.empty();
    
    root.append('<div class="hour">', '<div class="seperator">', '<div class="minute">', '<div class="seperator">', '<div class="second">');
    
    var digitElements = $('<div class="digit">');
    for(var i = 0; i < 10; i++) {
      digitElements.append('<span class="d' + i + '">' + i + '</span>');
    }
    
    root.children('.hour, .minute, .second').each(function(i, e) {
      var prefix = $(e).attr('class').charAt(0);
      
      $(e)
        .append(digitElements.clone().addClass(prefix + '1'))
        .append(digitElements.clone().addClass(prefix + '2'));
    });
    
    root.children('.seperator').text(':');
    
    if(root.attr('data_time') !== undefined) this.parseTimeString();
  },
  parseTimeString: function(timeString) {
    if(!timeString) timeString = this.targetElement.attr('data_time');
    
    var timeArray = timeString.split(':'),
        newTime = {
          hour: parseInt(timeArray[0]),
          minute: parseInt(timeArray[1]),
          second: parseInt(timeArray[2])
        };
    
    return newTime;
  },
  setTime: function(newHour, newMinute, newSecond) {
    var newTime = {};

    switch (typeof newHour) {
      case 'string':
        newTime = this.parseTimeString(newHour);
        break;
      case 'number':
        newTime = {
          hour: newHour,
          minute: newMinute,
          second: newSecond
        };
        break;
      case 'object':
        newTime = newHour;
        break;
      default:
        return false;
        break;
    }

    this.time = newTime;

    this.setHour(newTime.hour);
    this.setMinute(newTime.minute);
    this.setSecond(newTime.second);
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
    
    if(newTime.second >= 60) {
      newTime.minute += Math.floor(newTime.second / 60);
      newTime.second = newTime.second % 60;
    }
    if(newTime.minute >= 60) {
      newTime.hour += Math.floor(newTime.minute / 60);
      newTime.minute = newTime.minute % 60;
    }
    
    this.setTime(newTime.hour, newTime.minute, newTime.second);
  },
  decreaseBySecond: function(interval) {
    if(!interval) interval = 1;
    
    var currentTime = this.time,
        newTime = currentTime;
    newTime.second = currentTime.second - interval;
    
    if(newTime.second < 0) {
      newTime.minute += Math.floor(newTime.second / 60);
      newTime.second = 60 + (newTime.second % 60);
    }
    if(newTime.minute < 0) {
      newTime.hour += Math.floor(newTime.minute / 60);
      newTime.minute = 60 + (newTime.minute % 60);
    }
    
    this.setTime(newTime.hour, newTime.minute, newTime.second);
  }
});


$(document).ready(function() {

});