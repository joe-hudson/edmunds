# This is an API to get the private party sales price/value for used cars from Edmunds.com
# Joe Hudson 10/28/2013


from urllib2 import urlopen
from json import load
from pprint import pprint

id_url='http://api.edmunds.com/api/vehicle/v2/%(make)s/%(model)s/%(year)s/styles?fmt=json&api_key=<API_KEY>'
price_url='http://api.edmunds.com/v1/api/tmv/tmvservice/calculateusedtmv?styleid=%(car_id)s&condition=%(cond)s&mileage=%(mileage)s&zip=%(zipCode)s&fmt=json&api_key=<API_KEY>'

def getMake():
    """
    This method prints list of all current makes in Edmunds database and prompts user to enter make.
    Returns:
        User's make selection as string.
    """
    make_info=urlopen('http://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=<API_KEY>')
    json_data=load(make_info)
    for i in json_data['makes']:
        print i['name']
    make=raw_input('Enter make of car:')
    return make

def getModels():
    """
    Calls getMake() and uses that return value to print list of models from that maker.
    Prompts user to enter model of vehicle.
    Returns:
        value of getMake() and string value of user's model selection.
    """
    make=getMake()
    model_info=urlopen('http://api.edmunds.com/api/vehicle/v2/%(make)s/models?fmt=json&api_key=<API_KEY>' % {'make':make})
    json_data=load(model_info)
    for i in json_data['models']:
        print i['name']
    model=raw_input('Enter model of car:')
    return make, model 

def getYears():
    """
    Calls getModel() and uses user's selections to build list of years that model of car was made.
    Prompts user to enter year of car.
    Returns:
        Values of getMake(), getModel(), and string value of year selection.
    """
    make, model=getModels()
    year_info=urlopen('http://api.edmunds.com/api/vehicle/v2/%(make)s/%(model)s?fmt-json&api_key=<API_KEY>' % {'make':make, 'model':model})
    json_data=load(year_info)
    for i in json_data['years']:
        print i['year']
    year=raw_input('Enter year of car:')
    return make, model, year

def getTrim():
    """
    Calls getYears() and uses user input to build dictionary of trim levels for year model selected.
    Prompts user to select trim from dictionary using numerical key.
    Returns:
        Values of getMake(), getModel(), getYear(), and string value of dictionary key, the trim level.
    """
    make, model, year=getYears()
    trim_list=[]
    trim_dict={}
    trim_info=urlopen(id_url % {'make':make,'model':model,'year':year})
    json_data=load(trim_info)
    for e in json_data['styles']:
        trim_list.append(e['name'])
    trim_list.sort()
    trim_num=0
    for item in trim_list:
        trim_dict[trim_num] = item
        trim_num += 1
    trim_ref=trim_dict.items()
    trim_ref.sort()
    for k, v in trim_ref:
        print k, v
    trim_ref_key=int(raw_input('pick trim level:'))
    if trim_ref_key in trim_dict:
        car_trim=str(trim_dict[trim_ref_key])
        return make, model, year, car_trim

def getID():
    """
    Uses values from getTrim() to get vehicle ID from Edmunds.
    Returns:
        Values of getMake(), getModel(), getYear(), getTrim() and Edmunds vehicle ID number as string.
    """
    make,model,year,trim=getTrim()
    trim_info=urlopen(id_url % {'make':make,'model':model,'year':year})
    json_data=load(trim_info)
    for e in json_data['styles']:
        if e['name'] == trim:
            car_id=str(e['id'])
    return make,model,year,trim,car_id

def getValue():
    """
    Runs complete program and also prompts user for the condition, mileage and zip code of car and location.
    Returns:
        Formatted string containing vehicle information and value.
    """
    make,model,year,trim,car_id=getID()
    cond=raw_input('enter condition (outstanding, clean, average, rough, damaged:')
    mileage=str(raw_input('enter mileage:'))
    zipCode=str(raw_input('enter zip code:'))
    request = urlopen('http://api.edmunds.com/v1/api/tmv/tmvservice/calculateusedtmv?styleid=%(car)s&condition=%(cond)s&mileage=%(miles)s&zip=%(zip)s&fmt=json&api_key=<API_KEY>' % {'car': car_id,
        'cond':cond, 'miles':mileage, 'zip':zipCode})
    json_obj = load(request)
    value=json_obj['tmv']['totalWithOptions']['usedPrivateParty']
    return "Your %(year)s %(make)s %(model)s would sell for $%(value)s in a private party sale." % {'value': str(value), 'make':make,'year':year,'model':model}




print getValue()
