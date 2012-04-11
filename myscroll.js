/**
 * Should do:
 * Multiple timelines (for multiple projects simultaneously)
 * Different color schemes
 * Ability to live edit
 */


function GeneralTimeline(params) {
    this.rangeStart;
    this.rangeEnd;
    this.rangeLength;
    this.styles = {itemClass:'time_item'};
    $.extend(this, params);
}

/**
 * { rangeStart, rangeEnd, rangeLength }
 * @param params
 * @constructor
 */
function Timeline(params) {
    Timeline.prototype.apply(this, arguments)
    this.init();
    this.buildGrid();
}

Timeline.prototype = GeneralTimeline;
Timeline.prototype.init = function () {

    this.rangeLength = parseInt($('#overview').css('width'));

    console.debug((convertToUnixTime(this.rangeEnd) - convertToUnixTime(this.rangeStart)) / (60 * 60 * 24));
    this.pixPerRange = this.rangeLength / ( (convertToUnixTime(this.rangeEnd) - convertToUnixTime(this.rangeStart)) / (60 * 60 * 24) );
}

Timeline.prototype.buildGrid = function () {
    var obj = $('#time_ruler');
    //build grid for every day
    var content = '';
    for (i = 0; i <= this.rangeLength;) {
        $('#view_marks').append(createTimeItem(i, '|' + i/40));
        i = i + this.pixPerRange;
    }
}

/**
 * find appropriate timeline location based on object time
 * @param objectTime
 * @return {Number}
 */
Timeline.prototype.findLocation = function(objectTime) {

    var uxtime = convertToUnixTime(objectTime);
    var secondsInDay = 60*60*24
    var offset = (uxtime - convertToUnixTime(this.rangeStart) ) / secondsInDay * this.pixPerRange;
    console.log('findLocation:' + objectTime + ":" + offset);
    return offset;
}

Timeline.prototype.putObjects = function(objects, timeline) {
    var th = this;
    $.each(objects.items, function(k,v){
        th.putTimeObject(v, timeline);
    });
    return this;
}
Timeline.prototype.putTimeObject = function(object, dest) {
    console.debug(object);
    var offset = this.findLocation(object.time);
        $('#' + dest).append(createTimeItem(offset, object.content));
    return;
}


/**
 * Converts string date to unixtime
 * @param dateIn 29022012
 * @return {Number}
 */
function convertToUnixTime(dateIn) {
    return new Date(dateIn.substring(4, 8) + '/' +
        dateIn.substring(2, 4) + '/' +
        dateIn.substring(0, 2)).getTime() / 1000;
}



function createTimeItem(offset, content) {
    var div = document.createElement('div');
    div.setAttribute('style', 'top: 0px; left: ' + offset + 'px');
    div.setAttribute('class', 'time_item');
    div.innerHTML = content;
    return div;
}

function createTimeRange(offset, length, styles) {
    var div = document.createElement('div');
    div.setAttribute('style', 'top: 0px; left: ' + offset + 'px; width:' + length + 'px;' );
    div.setAttribute('class', 'time_range');
    div.innerHTML = '1';
    return div;
}