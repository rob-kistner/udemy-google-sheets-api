/* -----------------------------------------
  ! globals
------------------------------------------*/
// var my_ss_id = '1MEqxziWKAEWOdpAuy-ksEtN0F0SnGY5ldzLeWzPVc-4';


/* -----------------------------------------
  ! throwErr
  
  Send data to the spreadsheet
  
  @ e : string : error message from system
------------------------------------------*/
function throwError (e) {
  var error = { "error": e };
  var jsonError = JSON.stringify(error);
  return ContentService
    .createTextOutput(jsonError)
    .setMimeType(ContentService.MimeType.JSON);
}


/* -----------------------------------------
  ! doPost
  
  Send data to the spreadsheet
  
  @ e : string : error message from system
------------------------------------------*/

function doPost(e) {
  try {
    var my_ss_id = '1MEqxziWKAEWOdpAuy-ksEtN0F0SnGY5ldzLeWzPVc-4';
    var ss = SpreadsheetApp.openById(my_ss_id);
    var sheet = ss.getSheetByName('Sheet1');

    // get header range only
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var holderArray = [];

    // loop through headers
    // e.parameter = any Post key/values coming in...
    headers.forEach( function(hdr) {
      var val = !e.parameter[hdr] ? '' : e.parameter[hdr];
      holderArray.push(val);
    });

    // add row to sheet
    sheet.appendRow(holderArray);
    
    var results = { "data": e.parameter, "holder": holderArray };
    var jsonData = JSON.stringify(results);
    return ContentService.createTextOutput(jsonData).setMimeType(ContentService.MimeType.JSON);
  }
  catch (e) {
    throwError(e);
  }
}


/* -----------------------------------------
  ! doGet
  
  Retrieve whole spreadsheet as JSON
  
  @ e : string : error message from system
------------------------------------------*/

function doGet(e) {
  var my_ss_id = '1MEqxziWKAEWOdpAuy-ksEtN0F0SnGY5ldzLeWzPVc-4';
  var ss = SpreadsheetApp.openById(my_ss_id);
  var sheet = ss.getSheetByName('Sheet1');
  
  try {
    var ss = SpreadsheetApp.openById(my_ss_id);
    var sheet = ss.getSheetByName(sheetName);
    // getRange params = row, col, numRows, numCols;
    var data = sheet.getRange(2, 1, sheet.getLastRow()-1, sheet.getLastColumn()).getValues();
    var jsonData = JSON.stringify(data);
    // output data in JSON format
    return ContentService.createTextOutput(jsonData).setMimeType(ContentService.MimeType.JSON);
  }
  catch(e) {
    throwError(e);
  }
}