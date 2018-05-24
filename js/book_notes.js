$(document).ready(function () {
    var days = ['Sun',
                'Mon',
                'Tues',
                'Wed',
                'Thurs',
                'Fri',
                'Sat'
               ];
    days[0] = 'new day name'; // replaces 'Sun' with 'new day name'
    var blank = [];
    var altArray = new Array[1,2,3,4,5,6,7];
    console.log(days[0]); // Sun
    console.log(days[days.length - 1]); // finds the last value in the array
    days[days.length] = 'new end of week day'; // array.length is the count of items, so is also the index value of a new item at the end of that array.
    console.log(days[days.length - 1]);
    days.push('new end of week day part two'); // same thing
    console.log(days[days.length - 1]);
    days.unshift('new day 1', 'new day 2');
    console.log(days[0, 1]);
});