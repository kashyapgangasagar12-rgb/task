// CONFIGURATION
var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var dbName = "SCHOOL-DB";
var relName = "STUDENT-TABLE";
var connToken = "90934867|-31949258281643964|90958063";

//set focus to roll number
$("#rollNo").focus();


// validation
function validateAndGetFormData() {
    var rollNoVar = $("#rollNo").val();
    if (rollNoVar === "") {
        alert("Roll No is Required Value");
        $("#rollNo").focus();
        return "";
    }
    var fullNameVar = $("#fullName").val();
    if (fullNameVar === "") {
        alert("Full Name is Required Value");
        $("#fullName").focus();
        return "";
    }
    var classVar = $("#classVal").val();
    if (classVar === "") {
        alert("Class is Required Value");
        $("#classVal").focus();
        return "";
    }
    var birthDateVar = $("#birthDate").val();
    if (birthDateVar === "") {
        alert("Birth Date is Required Value");
        $("#birthDate").focus();
        return "";
    }
    var addressVar = $("#address").val();
    if (addressVar === "") {
        alert("Address is Required Value");
        $("#address").focus();
        return "";
    }
    var enrollmentDateVar = $("#enrollmentDate").val();
    if (enrollmentDateVar === "") {
        alert("Enrollment Date is Required Value");
        $("#enrollmentDate").focus();
        return "";
    }

    var jsonStrObj = {
        rollNo: rollNoVar,
        fullName: fullNameVar,
        class: classVar,
        birthDate: birthDateVar,
        address: addressVar,
        enrollmentDate: enrollmentDateVar
    };
    return JSON.stringify(jsonStrObj);
}


// Reset button work  

function resetForm() {
    $("#rollNo").val("");
    $("#fullName").val("");
    $("#classVal").val("");
    $("#birthDate").val("");
    $("#address").val("");
    $("#enrollmentDate").val("");

    $("#rollNo").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#update").prop("disabled", true);
    $("#reset").prop("disabled", true);

    $("#rollNo").focus();
}

// save
function save() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest(connToken, jsonStr, dbName, relName);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    alert("Data Saved Successfully");
    resetForm();
}

// Alias for save() match the id in html
function saveData() {
    save();
}

// update record 
function updateData() {
    $("#update").prop("disabled", true);
    jsonChg = validateAndGetFormData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, dbName, relName, localStorage.getItem("rec_no"));
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resultObj);
    alert("Data Updated Successfully");
    resetForm();
}

// Function to check if Student exists 

function getStudent() {
    var rollNoJsonObj = getStudentIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, dbName, relName, rollNoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});

    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#fullName").focus();
    } else if (resJsonObj.status === 200) {
        $("#rollNo").prop("disabled", true);
        fillData(resJsonObj);

        $("#save").prop("disabled", true);
        $("#update").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#fullName").focus();
    }
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#fullName").val(record.fullName);
    $("#classVal").val(record.class);
    $("#birthDate").val(record.birthDate);
    $("#address").val(record.address);
    $("#enrollmentDate").val(record.enrollmentDate);
}

function getStudentIdAsJsonObj() {
    var rollNo = $("#rollNo").val();
    var jsonStr = {
        rollNo: rollNo
    };
    return JSON.stringify(jsonStr);
}

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("rec_no", lvData.rec_no);
}
    