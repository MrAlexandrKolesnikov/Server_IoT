/**
 * Created by Саша on 20.03.2017.
 */
var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", "/gettemperature", false ); // false for synchronous request
xmlHttp.send( null );
data_temp = xmlHttp.responseText.split(" ");
counter = [];
dataFloat = []
var dataArray = [['number interation','temperatura']];
for(var i = 0 ; i < data_temp.length-1 ; i++)
{
    dataArray.push([i,parseFloat(data_temp[i])]);
}
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable(dataArray);

    var options = {
        title: 'Temperature',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
}