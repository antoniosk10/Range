'use strict';
new Range({
    containerClass: "range-wrap",
    maxValue: 10,
    minValue: 1,
    inputMaxValue: "[data-input-max]",
    inputMinValue: "[data-input-min]",
    callback: function() { alert("Ops") }
});