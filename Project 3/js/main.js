
$(document).ready(function(){
  $('#table').dataTable( {
    "ajaxSource": "downtown-tenant.json",
    "columns": [
      { "data": "tenant_name" },
      { "data": "category_of_use" },
      { "data": "downtown_district" },
      { "data": "years_in_business" },
      { "data": "independent_v_chain" },
      { "data": "address" },
    ]
  } );

});


var chart = c3.generate({
    bindto: '#donut',
    data: {
        columns: [
            ['Central', 36],
            ['East', 107],
            ['West', 119]
        ],
        type : 'donut',
        colors: {
          Central: '#000',
          East: '#13294B',
          West: '#7BAFD4'
        },
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    donut: {
        title: "Tenants per District"
    }
});

//sizing
var margin = {top: 40, right: 20, bottom: 300, left: 50},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;


//ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

// axes
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);


//
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


//json
d3.json("years.json", function(error, data) {

    data.forEach(function(d) {
        d.tenant_name = d.tenant_name;
        d.years_in_business = +d.years_in_business;
    });

  // ranges
  x.domain(data.map(function(d) { return d.tenant_name; }));
  y.domain([0, d3.max(data, function(d) { return d.years_in_business; })]);

  // axes
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end");

//bars
  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.tenant_name); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.years_in_business); })
      .attr("height", function(d) { return height - y(d.years_in_business); });

});
