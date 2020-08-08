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
  Logger.log(result);

  return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
}

function makeTableObject(multiArray){

  const STATUS_COL = 0;
  const FAM_COL = 2;
  const MEMBER_COL = 3;
  const LASTNAME_COL = 5;
  const FIRSTNAME_COL = 6;
  const PHONE_COL = 9;
  const INDI_HRS_COL = 21;
  const FAM_HRS_COL = INDI_HRS_COL + 1;

  var tableObject = {};
  tableObject.updated_at = new Date();
  tableObject.members = {};

  multiArray.forEach(function(row, i){

      var lastName = row[LASTNAME_COL];
      var firstName = row[FIRSTNAME_COL];
      var phone = row[PHONE_COL];
      var status = (row[STATUS_COL] == "Actif");
      var member = row[MEMBER_COL];
      var family = row[FAM_COL];
      var hours;

    // Logger.log("MultiArray row: " + i + " , Member: " + row[MEMBER_COL]);   // Debug only


    // If family, return the hours for the chef de famille, otherwise return the individual member hours.
    if(isFamily(member, family)){
        hours = ( member == family ? row[FAM_HRS_COL] : getChefHours(multiArray, family, FAM_HRS_COL) );
      }else{
        hours = row[INDI_HRS_COL];
      }

    tableObject.members[row[MEMBER_COL]] = {
        lastName: lastName,
        firstName: firstName,
        phone: phone,
        active: status,
        hours_in_bank: hours
      };
  });
  return tableObject;
}

function isFamily(member, family){
  if (family == ''){ // empty string
    return false
  } else if (typeof family == "number"){
    return true
  }
}
function getChefHours(array, family, FAM_HRS_COL){
  var hours = array[family-2][FAM_HRS_COL];  // -2 is for matching member number to array index (eg. member 2 is at index 0).
  return hours;
}
