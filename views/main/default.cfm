<!DOCTYPE html>

<!---
  I started with code from cmendes0101 (http://github.com/cmendes0101/edmunds-api-vehicle-select)
and then modified it to take in condition, mileage and zip code inputs and return the value more clearly
and human readble.
Starting again.
--->
<html>
    <head>
        <TITLE>Edmunds.com Used Car Value API</TITLE>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
        <script src="./js/edmunds.js"></script>
    </head>
    <body>
        <div align='center'>
            <label>Select vehicle:
                <select id="years" name="years">
                    <option>Select Year</option>
                    <option>2014</option>
                    <option>2013</option>
                    <option>2012</option>
                    <option>2011</option>
                    <option>2010</option>
                    <option>2009</option>
                    <option>2008</option>
                    <option>2007</option>
                    <option>2006</option>
                    <option>2005</option>
                    <option>2004</option>
                    <option>2003</option>
                    <option>2002</option>
                    <option>2001</option>
                    <option>2000</option>
                    <option>1999</option>
                    <option>1998</option>
                    <option>1997</option>
                    <option>1996</option>
                    <option>1995</option>
                    <option>1994</option>
                    <option>1993</option>
                    <option>1992</option>
                    <option>1991</option>
                    <option>1990</option>
                </select>
            </label>
            <br>
            <select id="makes" name="makes" disabled="disabled">
                <option>Select Make</option>
            </select>
            <br>
            <select id="models" name="models" disabled="disabled">
                <option>Select Model</option>
            </select>
            <br>
            <select id="styles" name="styles" disabled="disabled">
                <option>Select Trim</option>
            </select>
            <br>
            Or
            <br>
            <label>Enter VIN:
                <input type='text' id='vin' value='' />
            </label>
            <br>
            <label>Then
                <select id="condition" id="condition">
                    <option>Select Condition</option>
                    <option value="outstanding">Outstanding</option>
                    <option value="clean">Clean</option>
                    <option value="average">Average</option>
                    <option value="rough">Rough</option>
                    <option value="damaged">Damaged</option>
                </select>
            </label>
            <br>
            <label>Mileage:
                <input type="text" id="mileage" value="" />
            </label>
            <br>
            (example: for 25,000 miles, enter "25000")
            <br>
            <label>Zip code:
                <input type="text" id="zip" value="" />
            </label>
            <br>
            <div id="error" style="color:red">
            </div>
            <br>
            <button type="button" id='submit'>Submit</button><br><br>
            <br>
            <label>Vehicle information:
                <br>
                <label>Year:
                    <input type='text' id='final_year' value='Year' disabled='disabled' />
                </label>
                <br>
                <label>Make:
                    <input type='text' id='final_make' value='Make' disabled='disabled' style='text-transform:capitalize' />
                </label>
                <br>
                <label>Model:
                    <input type='text' id='final_model' value='Model' disabled='disabled' style='text-transform:capitalize' />
                </label>
                <br>
                <label>Trim ID:
                    <input type='text' id='final_trim' value='Trim' disabled='disabled' />
                </label>
            </label>
            <br>
            <label>Trade-In Value:
                <input type='text' id='trade_in_value' value='Value' disabled='disabled' />
            </label>
        </div>
    </body>
    <script type="text/javascript">
        $(document).ready(function() {
            $('#years').change(function() {
                //console.log('Step 1: Year ' + $(this).val() + ' was selected');
                get_makes($(this).val());
            });

            $('#makes').change(function() {
                //console.log('Step 3: Make ' + $(this).val() + ' was selected');
                get_models($(this).val(), $('#years').val());
            });

            $('#models').change(function() {
                //console.log('Step 5: Model ' + $(this).val() + ' was selected');
                get_styles($('#makes').val(), $(this).val(), $("#years").val());
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
    </script>
</html>

