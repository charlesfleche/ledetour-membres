function doGet(e) {
  
  const MEMBER_LIST_URL = "https://docs.google.com/spreadsheets/d/1Qry9z3gHLcgnjGPBTacTJwSzOS_aTs6YB54tfoOsYMM/edit#gid=79616268";
  const SHEET_NAME ="liste des membres"
  
  sheet = SpreadsheetApp.openByUrl(MEMBER_LIST_URL).getSheetByName(SHEET_NAME);
  
  // get range of dimensions in which data is present. 
  var dataRange = sheet.getDataRange();
  
  Logger.log("Last column: " + dataRange.getLastColumn());
  Logger.log("Last row: " + dataRange.getLastRow());
  
  // Store the entire table in a multi-dimenssional array
  var dataArray = dataRange.getValues();
  dataArray.shift();  // remove table headers
  
  var filteredObject = makeTableObject(dataArray);
    
  var result = JSON.stringify(filteredObject);
  Logger.log(e);
  Logger.log(result);
  
  return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
  
}

function makeTableObject(multiArray){
  
  const STATUS_COL = 0;
  const FAM_COL = 2;
  const MEMBER_COL = 3;
  const INDI_HRS_COL = 21;
  const FAM_HRS_COL = INDI_HRS_COL + 1;
  
  var tableObject = {};
  tableObject.updated_at = new Date();
  tableObject.members = {};
    
  multiArray.forEach(function(row, i){
    
    var status = (row[STATUS_COL] == "Actif");  
    var hours = ( row[MEMBER_COL] == row[FAM_COL] ? row[FAM_HRS_COL] : row[INDI_HRS_COL] );  // this is an over-simplification. See TODO below.
    
    tableObject.members[row[MEMBER_COL]] = {
      active: status,
      hours_in_bank: hours
    };
  });
  return tableObject;
}

// TODO: Check if family membership and load family hours for each member instead of only for 'chef de famille' and individuals.
function isFamily(member, family){
  if (family == ''){ // empty string
    return false
  } else if (typeof family == "number"){
    return true
  }
}