var EDMUNDS_API_KEY = '2peh96tx2669cqfde2ynys8r';

var currDate = new Date();
var currYear = currDate.getFullYear();

var CAR = {
    condition: "",
    locale: "",
    year: "",
    age: "",
    mileage: "",
    make: "",
    model: "",
    model_name: "",
    style: "",
    style_id: ""
};

function get_makes() {
    url = "http://api.edmunds.com/api/vehicle/v2/makes";
    $.ajax({
        type: "POST",
        url: url,
        data: {
            fmt: "json",
            year: CAR.year,
            api_key: EDMUNDS_API_KEY
        },
        dataType: 'jsonp',
        success: function(data) {
            $('#makes').empty();
            $('#makes').append("<option>Select Make</option>");
            $.each(data.makes, function(i, val) {
                $('#makes').append("<option value='" + data.makes[i].niceName + "'>" + data.makes[i].name + "</option>");
            });
            $('#makes').removeAttr('disabled');
            $('#vin').attr('disabled', 'disabled');
            $("#mileage").val(CAR.mileage);
            $('#final_year').val(CAR.year);
        }
    });
}

function get_models() {
    url = "http://api.edmunds.com/api/vehicle/v2/"+ CAR.make + "/models";
    $.ajax({
        type: "POST",
        url: url,
        data: {
            year: CAR.year,
            fmt: "json",
            api_key: EDMUNDS_API_KEY
        },
        dataType: 'jsonp',
        success: function(data) {
            $('#models').empty();
            $('#models').append("<option>Select Model</option>");
            $.each(data.models, function(i, val) {
                $('#models').append("<option value='" + data.models[i].niceName + "'>" + data.models[i].name + "</option>");
            });
            $('#models').removeAttr('disabled');
            $('#final_make').val(CAR.make);
        }
    });
}

function get_styles() {
    url = 'http://api.edmunds.com/v1/api/vehicle/stylerepository/findstylesbymakemodelyear';
    $.ajax({
        type: "POST",
        timeout: 20000,
        url: url,
        data: {
            make: CAR.make,
            model: CAR.model,
            year: CAR.year,
            fmt: "json",
            api_key: EDMUNDS_API_KEY
        },
        dataType: 'jsonp',
        success: function(data) {
            $('#styles').empty();
            $('#styles').append("<option>Select Trim</option>");
            $.each(data.styleHolder, function(i, val) {
                $('#styles').append("<option value='" + data.styleHolder[i].id + "'>" + data.styleHolder[i].name + "</option>");
            });
            $('#styles').removeAttr('disabled');
            $('#final_model').val(CAR.model_name);
        }
    });
}

function get_style_details() {
    url = 'http://api.edmunds.com/v1/api/vehicle/stylerepository/findbyid';
    $.ajax({
        type: "POST",
        url: url,
        data: {
            id: CAR.style_id,
            api_key: EDMUNDS_API_KEY,
            fmt: "json"
        },
        dataType: 'jsonp',
        success: function(data) {
            $('#final_trim').val(CAR.style);
        }
    });
}

function get_value(){
    url = "http://api.edmunds.com/v1/api/tmv/tmvservice/calculateusedtmv";
    $.ajax({
        type: "POST",
        url: url,
        data: {
            fmt: "json",
            api_key: EDMUNDS_API_KEY,
            styleid: CAR.style_id,
            condition: CAR.condition,
            mileage: CAR.mileage,
            zip: CAR.locale
        },
        dataType: 'jsonp',
        success: function(data){
            var trade_value = data.tmv['totalWithOptions'].usedTradeIn;
            $('#trade_in_value').val('$' + trade_value);
        }
    });
}

function value_from_vin(vin){
    url = "https://api.edmunds.com/api/vehicle/v2/vins/" + vin;
    $.ajax({
        type: "POST",
        url: url,
        data: {
            fmt: "json",
            api_key: EDMUNDS_API_KEY
        },
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
    CAR.condition = $("#condition").val();
    
    $('#years').change(function() {
        CAR.year = $(this).val();
        CAR.age = currYear - CAR.year;
        CAR.mileage = 10000 * CAR.age;
        get_makes();
    });

    $('#makes').change(function() {
        CAR.make = ($(this).val());
        get_models();
    });

    $('#models').change(function() {
        CAR.model = $(this).val();
        CAR.model_name = $(this).find("option:selected").html();
        get_styles();
    });

    $('#styles').change(function() {
        CAR.style_id = $(this).val();
        CAR.style = $(this).find("option:selected").html();
        get_style_details();
        $("#zip").focus();
    });

    $('#condition').change(function(){
        CAR.condition = $(this).val();
    });

    $('#mileage').change(function(){
        CAR.mileage = $(this).val();
    });

    $('#zip').change(function(){
        CAR.locale = $(this).val();
    });

    $('#vin').change(function(){
        value_from_vin($(this).val());
    });

    $('#submit').click(function(){
        if (CAR.locale === "") {
            $("#zipError").show();
        } else {
            $("#zipError").hide();
            get_value()
        }
    });
});
