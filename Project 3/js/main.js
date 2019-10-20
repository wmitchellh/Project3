var data;
var tenant_name = [];
var years_in_business = [];
var downtown_district = [];

$(document).ready(function(){
  $('#table').dataTable( {
    "ajaxSource": "downtown-tenant.json",
    "columns": [
      { "data": "date_closed" },
      { "data": "years_in_business" },
      { "data": "website" },
      { "data": "address_number" },
      { "data": "date_updated" },
      { "data": "tenant_name" },
      { "data": "street_name" },
      { "data": "address" },
      { "data": "naics_code" },
      { "data": "independent_v_chain" },
      { "data": "category_of_use" },
      { "data": "downtown_district" },
      { "data": "date_opened" },
    ]
  } );

  loadData();
});

function loadData(){

    $.ajax({
            type:"GET",
            url:"downtown-tenant.json",
            dataType:"json",
            success: parseData
});


}


function parseData(data){
    console.log(data);
     for (var i = 0, len = data.length; i < len; ++i) {
            //sets data to arrays for charts
            // tenant_name.push([i]["tenant_name"]);
            years_in_business.push([i]["years_in_business"]);
            // downtown_district.push([i]["downtown_district"]);
     }
    createCharts();
}

function createCharts() {

  setTimeout(function () {
      c3.generate({
        bindto: '#column-chart',
          data: {
              url: 'downtown-tenant.json',
              mimeType: 'json',
          }
      });
  }, 1000);

}
