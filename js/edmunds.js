var EDMUNDS_API_KEY = '2peh96tx2669cqfde2ynys8r';

var currDate = new Date();
var currYear = currDate.getFullYear();

var CAR = {
    year: "",
    age: "",
    defaultMileage: "",
    make: "",
    model: "",
    model_name: "",
    style: ""
};

function get_makes() {
    url = "http://api.edmunds.com/api/vehicle/v2/makes?fmt=json&year=" + CAR.year + "&api_key=" + EDMUNDS_API_KEY;
    $.ajax({
        type: "POST",
        url: url,
        data: '',
        dataType: 'jsonp',
        success: function(data) {
            $('#makes').empty();
            $('#makes').append("<option>Select Make</option>");
            $.each(data.makes, function(i, val) {
                $('#makes').append("<option value='" + data.makes[i].niceName + "'>" + data.makes[i].name + "</option>");
            });
            $('#makes').removeAttr('disabled');
            $('#vin').attr('disabled', 'disabled');
            $("#mileage").val(CAR.defaultMileage);
            $('#final_year').val(CAR.year);
            //console.log('Step 2: Makes select was populated and enabled');
        }
    });
}

function get_models() {
    url = "http://api.edmunds.com/api/vehicle/v2/"+ CAR.make + "/models?fmt=json&api_key=" + EDMUNDS_API_KEY + "&year=" + CAR.year;
    $.ajax({
        type: "POST",
        url: url,
        data: '',
        dataType: 'jsonp',
        success: function(data) {
            $('#models').empty();
            $('#models').append("<option>Select Model</option>");
            $.each(data.models, function(i, val) {
                $('#models').append("<option value='" + data.models[i].niceName + "'>" + data.models[i].name + "</option>");
            });
            $('#models').removeAttr('disabled');
            $('#final_make').val(CAR.make);
            //console.log('Step 4: Models select was populated and enabled');
        }
    });
}

function get_styles() {
    url = 'http://api.edmunds.com/v1/api/vehicle/stylerepository/findstylesbymakemodelyear?make=' + CAR.make + '&model=' + CAR.model + '&year=' + CAR.year + '&api_key=' + EDMUNDS_API_KEY + '&fmt=json';
    $.ajax({
        type: "POST",
        timeout: 20000,
        url: url,
        data: '',
        dataType: 'jsonp',
        success: function(data) {
            $('#styles').empty();
            $('#styles').append("<option>Select Trim</option>");
            $.each(data.styleHolder, function(i, val) {
                //console.log(data.styleHolder[i]);
                $('#styles').append("<option value='" + data.styleHolder[i].id + "'>" + data.styleHolder[i].name + "</option>");
            });
            $('#styles').removeAttr('disabled');
            $('#final_model').val(CAR.model_name);
            //console.log('Step 6: Styles(trim) select was populated and enabled');
        }
    });
}

function get_style_details(style_id) {
    url = 'http://api.edmunds.com/v1/api/vehicle/stylerepository/findbyid?id=' + style_id + '&api_key=' + EDMUNDS_API_KEY + '&fmt=json';
    $.ajax({
        type: "POST",
        url: url,
        data: '',
        dataType: 'jsonp',
        success: function(data) {
            //console.log('Step 8: Collecting Style/trim data');
        $('#final_trim').val($('#styles').val());
        }
    });
}

function get_value(style_id, cond, mileage, zip){
    var final_id = $("#final_trim").val();
    var final_cond = $('#condition').val();
    var final_miles = $('#mileage').val();
    var final_zip = $('#zip').val();

    //console.log();
    url = "http://api.edmunds.com/v1/api/tmv/tmvservice/calculateusedtmv?styleid=" + final_id + "&condition=" + final_cond + "&mileage=" + final_miles + "&zip=" + final_zip + "&fmt=json&api_key=" + EDMUNDS_API_KEY;
    $.ajax({
        type: "POST",
        url: url,
        data: '',
        dataType: 'jsonp',
        success: function(data){
            var trade_value = data.tmv['totalWithOptions'].usedTradeIn;
            //console.log("print price ->" + data.tmv['totalWithOptions'].usedTradeIn);
            $('#trade_in_value').val('$' + trade_value);
        }
    });
}

function value_from_vin(vin){
    url = "https://api.edmunds.com/api/vehicle/v2/vins/" + vin + "?fmt=json&api_key=" + EDMUNDS_API_KEY;
    //https://api.edmunds.com/api/vehicle/v2/vins/ VIN ?fmt=json&api_key=<API KEY>
    $.ajax({
        type: "POST",
        url: url,
        data: '',
        dataType: 'jsonp',
        success: function(data){
            $('#final_year').val(data.years[0].year);
            $('#final_make').val(data.make['name'])
            $('#final_model').val(data.model['name']);
            $('#final_trim').val(data.years[0].styles[0].id);
        }
    })
}

$(function() {
    
    $('#years').change(function() {
        CAR.year = $(this).val();
        CAR.age = currYear - CAR.year;
        CAR.defaultMileage = 10000 * CAR.age;
        get_makes();
    });

    $('#makes').change(function() {
        CAR.make = ($(this).val());
        get_models();
    });

    $('#models').change(function() {
        //console.log('Step 5: Model ' + $(this).val() + ' was selected');
        CAR.model = $(this).val();
        CAR.model_name = $(this).find("option:selected").html();
        get_styles();
    });

    $('#styles').change(function() {
        //console.log('Step 7: Style ' + $(this).val() + ' was selected');
        get_style_details($(this).val());
    });

    $('#condition').change(function(){
        //console.log('Step 9: Condition ' + $(this).val() + ' was selected');
    });

    $('#mileage').change(function(){
        //console.log('Step 10: Mileage set to ' + $(this).val());
        $(this).attr('value', $(this).val());
    });

    $('#zip').change(function(){
        //console.log('Step 11: Zip code set to ' + $(this).val());
        $(this).attr('value', $(this).val());
    });

    $('#vin').change(function(){
        //console.log('VIN was entered')
        value_from_vin($(this).val());
    });

    $('#submit').click(function(){
        get_value()
    });
});
