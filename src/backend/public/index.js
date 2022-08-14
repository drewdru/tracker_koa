"use strict";

function throttle(wrappedFunction, throttleMs, minPendingEventsLength) {
  return function updater() {
    const isPendingEventsTooSmall =
      tracker.pendingEvents.length < minPendingEventsLength;
    const checkPendingEventsLength =
      isPendingEventsTooSmall || tracker.hasErrors;
    const isThrottle = updater.ready === false && checkPendingEventsLength;
    if (isThrottle) {
      updater.args = arguments;
      return;
    }

    updater.ready = false;
    if (!updater.args) {
      wrappedFunction.apply(this, arguments);
    }

    setTimeout(() => {
      updater.ready = true;
      if (updater.args) {
        wrappedFunction.apply(this, updater.args);
      }
    }, throttleMs);
  };
}

class Tracker {
  constructor() {
    this.pendingEvents = [];
    this.hasErrors = false;
    this.sendData = throttle(this.send, 1000, 3);
  }

  track(event, ...tags) {
    this.pendingEvents.push({
      event,
      tags,
      url: window.location.href,
      title: document.title,
      ts: new Date().toISOString(),
    });
    this.sendData();
  }

  async send() {
    if (!this.pendingEvents.length) {
      return;
    }
    const events = this.pendingEvents.splice(0, this.pendingEvents.length);
    try {
      const body = JSON.stringify(events);
      this.pendingEvents = [];
      await fetch("//localhost:8001/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      this.hasErrors = false;
    } catch (error) {
      this.pendingEvents = [...this.pendingEvents, ...events];
      this.hasErrors = true;
    }
  }
}

var tracker = new Tracker();

// send data before page close
var addEvent = window.attachEvent || window.addEventListener;
var beforeLeavePageEventName = window.attachEvent
  ? "onbeforeunload"
  : "beforeunload";
addEvent(beforeLeavePageEventName, function (event) {
  event.preventDefault();
  var confirmationMessage = "";
  (event || window.event).returnValue = confirmationMessage;
  tracker.send();
  return undefined;
});
