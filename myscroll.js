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
Timeline.prototype.init = function() {

    this.rangeLength = parseInt($('#overview').css('width'));

    this.pixPerRange = this.rangeLength / ( (convertToUnixTime(this.rangeEnd) - convertToUnixTime(this.rangeStart)) / (60*60*24) );
}

Timeline.prototype.buildGrid = function() {
    var obj = $('#view_marks .timeline');
    //build grid for every day
    var content = '';
    console.debug(this.pixPerRange);

    for (var i = 0; i<=this.rangeLength; i+this.pixPerRange)
    {
        console.log(i);
        //return;
        ////content += createTimeItem(i, 'item'+i);
    }
    console.log('content = ' + content);
    $('#view_marks').innerHTML(content);

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

function createTimeItem(offset, content)
{
    var div = document.createElement('div');
        div.setAttribute('style','left: ' + offset + 'px');
        div.setAttribute('class', 'time_item');
        div.innerHTML = content;
        return div;
}