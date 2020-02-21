// ----------------------------------------------------------------------
// JQuery AJAX Helper v1.0.0
// ----------------------------------------------------------------------

!function (window) {
    "use strict";


    // ----------------------------------------------------------------------
    // Private Functions
    // ----------------------------------------------------------------------

    // conversions
    var toBoolean = function (raw) {
        var response = $.parseJSON(raw).d;
        if (response === "") {
            console.log("An empty string was returned. Check the error log for more details.");
            return null;
        }

        return (response == "true" || response == "True" || response == 1);
    };

    var toDataRow = function (raw) {
        var response = $.parseJSON(raw).d;
        if (response == "") {
            console.log("An empty string was returned. Check the error log for more details.");
            return null;
        }

        return $.parseJSON(response)[0];
    };

    var toFloat = function (raw) {
        var response = $.parseJSON(raw).d;
        if (response == "") {
            console.log("An empty string was returned. Check the error log for more details.");
            return null;
        }

        return parseFloat(response);
    };

    var toInteger = function (raw) {
        var response = $.parseJSON(raw).d;
        if (response == "") {
            console.log("An empty string was returned. Check the error log for more details.");
            return null;
        }

        return parseInt(response);
    };

    var toObject = function (raw) {
        var response = $.parseJSON(raw).d;
        if (response == "") {
            console.log("An empty string was returned. Check the error log for more details.");
            return null;
        }

        return $.parseJSON(response);
    };

    var toString = function (raw) {
        var response = $.parseJSON(raw).d;
        if (response == "") {
            console.log("An empty string was returned. Check the error log for more details.");
            return null;
        }

        return response;
    };

    // allows user-defined dataType to be less specific
    var getDataType = function (dataType) {
        dataType = dataType || "string";
        dataType = dataType.toLowerCase();

        switch (dataType) {
            case "string":
            case "text":
            case "html":
            case "xml":
                return "string";

            case "float":
            case "double":
                return "float";

            case "integer":
            case "int":
                return "integer";

            case "boolean":
            case "bool":
            case "bit":
                return "boolean";

            case "datarow":
            case "row":
            case "dr":
                return "datarow";

            case "dataset":
            case "ds":
            case "datatable":
            case "table":
            case "dt":
            case "array":
            case "object":
            case "obj":
            case "json":
                return "object";

            default:
                return "string";
        }
    };

    // combines default and user-defined options
    var getOptions = function (method, url, parms, dataType) {
        var defaults = {
            contentType: "application/json; charset=utf-8",
            converters: {
                "text boolean": toBoolean,
                "text datarow": toDataRow,
                "text float": toFloat,
                "text integer": toInteger,
                "text object": toObject,
                "text string": toString
            }
        };

        var options = {
            url: url,
            type: method,
            data: JSON.stringify(parms),
            dataType: getDataType(dataType)
        };

        return $.extend({}, defaults, options);
    };


    // ----------------------------------------------------------------------
    // Public Functions
    // ----------------------------------------------------------------------

    /// An object that allows the fail callback to be executed.
    var errorCallback = {
        done: function () { return this },
        fail: function (fn) { fn(); return this }
    };

    /*
    var params = {
        method: "GET",
        url: "http://dummy.restapiexample.com/api/v1/employees",
        data: "",
        headers: ""
    }
    */

    
    /*var params = {
                method: "POST",
                url: "",
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                }
            }*/
    //AJAXHelper.execute(params, (response) => { console.log(response)}, (error) => {console.log(error)});

    /// Executes and returns an AJAX call.
    /// params {object} - An object containing the parameters for the webservice. The keys must be identical to the parameter names.
    /// callback - An Success callback function
    /// errorCallback - An Error callback function
    /// Refer fetch api at https://github.github.io/fetch/
    var execute = function (params, callback, errorCallback) {
        //var options = getOptions(method, url, parms, dataType);
        //return $.ajax(options);
        request(params)
          .then((response) => {
            return response.json();
          }).then(callback).catch(errorCallback);
    };



    var getQueryString = function (params) {
          var esc = encodeURIComponent;
          return Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
        };

    var request = function (params) {
          var method = params.method || 'GET';
          var qs = '';
          var body;
          var headers = params.headers || {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          };

        if(params.data) {
          if (['GET', 'DELETE'].indexOf(method) > -1)
            qs = '?' + getQueryString(params.data);
          else // POST or PUT
            body = JSON.stringify(params.data);
            }

          var url = params.url + qs;

          return fetch(url, { method, headers, body });
        };


    // ----------------------------------------------------------------------
    // Add AJAXHelper Namespace
    // ----------------------------------------------------------------------

    window.AJAXHelper = {
        errorCallback: errorCallback,
        execute: execute,
    };

}(this);
