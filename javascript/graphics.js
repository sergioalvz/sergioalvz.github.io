(function(){
  var drawGraphic = function(dataset, divName) {
    google.setOnLoadCallback(function drawChart() {
      var data = [["Time", "Tweets"]];
      dataset.time.forEach(function(value, index){
        var row = [value, dataset.count[index]];
        data.push(row);
      });

      var dataTable = google.visualization.arrayToDataTable(data);
      var options = { title: 'Tweets by time' };
      var chart = new google.visualization.LineChart($('#' + divName)[0]);
      chart.draw(dataTable, options);
    });
  };

  google.load("visualization", "1", {packages:["corechart"]});

  $.ajax("/assets/posts/spain-tweets-24-segment.json")
  .done(function(data){
    drawGraphic(data, "spain_graphic");
  });

  $.ajax("/assets/posts/uk-tweets-24-segment.json")
  .done(function(data){
    drawGraphic(data, "uk_graphic");
  });
})();
