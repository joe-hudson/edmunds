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
        <link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/smoothness/jquery-ui.css" />
        <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>
        <script src="./js/edmunds.js"></script>
    </head>
    <style>
        .select {
            width: 200px;
        }
    </style>
    <body>
        <div align='center'>
            <!---<label>Select vehicle:--->
            <select class="select" id="years" name="years">
                <option>Select Year</option>
                <!---<option>2015</option>--->
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
            <!---</label>--->
            <br>
            <br>
            <select class="select" id="makes" name="makes" disabled="disabled">
                <option>Select Make</option>
            </select>
            <br>
            <br>
            <select class="select" id="models" name="models" disabled="disabled">
                <option>Select Model</option>
            </select>
            <br>
            <br>
            <select class="select" id="styles" name="styles" disabled="disabled">
                <option>Select Trim</option>
            </select>
            <br>
            <br>
            Or
            <br>
            <br>
            <label>Enter VIN:
                <input type='text' id='vin' value='' />
            </label>
            <br>
            <br>
            <label>Condition:
                <select class="select" id="condition" id="condition">
                    <option>Select Condition</option>
                    <option value="outstanding">Outstanding</option>
                    <option value="clean">Clean</option>
                    <option value="average" selected>Average</option>
                    <option value="rough">Rough</option>
                    <option value="damaged">Damaged</option>
                </select>
            </label>
            <br>
            <br>
            <label>Mileage:
                <input type="text" id="mileage" value="" />
            </label>
            <br>
            (example: for 25,000 miles, enter "25000")
            <br>
            <br>
            <label>Zip code:
                <input type="text" id="zip" value="" />
            </label>
            <br>
            <br>
            <div id="error" style="color:red">
            </div>
            <br>
            <button type="button" id='submit'>Submit</button><br><br>
            <br>
            <br>
            <br>
            <table>
                <thead>
                    <th colspan="2">Vehicle information:
                    </th>
                </thead>
                <tr>
                    <td class="label">Year:
                    </td>
                    <td class="input"><input type='text' id='final_year' value='Year' readonly />
                    </td>
                </tr>
                <tr>
                    <td class="label">Make:
                    </td>
                    <td class="input"><input type='text' id='final_make' value='Make' readonly style='text-transform:capitalize' />
                    </td>
                </tr>
                <tr>
                    <td class="label">Model:
                    </td>
                    <td class="input"><input type='text' id='final_model' value='Model' readonly style='text-transform:capitalize' />
                    </td>
                </tr>
                <tr>
                    <td class="label">Trim:
                    </td>
                    <td class="input"><input type='text' id='final_trim' value='Trim' readonly />
                    </td>
                </tr>
                <tr>
                    <td class="label">Trade-In Value:
                    </td>
                    <td class="input"><input type='text' id='trade_in_value' value='Value' readonly />
                    </td>
                </tr>
            </table>
        </div>
    </body>
</html>

