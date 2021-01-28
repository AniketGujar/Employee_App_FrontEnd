// Add and Update Function
addEmployee = () => {

    let empData = {
        "firstName": document.getElementById("exampleFormControlInput1").value,
        "lastName": document.getElementById("exampleFormControlInput2").value,
        "email": document.getElementById("exampleFormControlInput3").value,
        "department": document.getElementById("exampleDataList").value,
        "salary": parseInt(document.getElementById("exampleFormControlInput4").value)
    }
    console.log("Local Storge = " + localStorage.getItem("id"))

    // Add Function - when local storage has no value
    if (localStorage.getItem("id") == null) {
        console.log("Addinng Employee")
        $.ajax({
            type: "post",
            url: "http://localhost:3000/api/employee",
            data: JSON.stringify(empData),
            contentType: "application/json",

            success: (result) => {
                if (result.success == false) {
                    document.getElementById("exampleData").innerHTML = (result.data._message).toUpperCase();
                    alert("Invalid Input..!!");
                }
                else {
                    document.getElementById("exampleData").innerHTML = "Employee Data Added Sucessfully";
                    alert("Employee Data Added Sucessfully");
                    window.open("http://127.0.0.1:5500/html/employeeData.html#", target = "_self");
                }
            },

            error: (err) => {
                console.log("Error ", err)
            }
        })
    }
    // Update Function when local storage contains value
    else {
        console.log("Updating Employee Data")
        let id = localStorage.getItem("id")
        $.ajax({
            type: "put",
            url: "http://localhost:3000/api/employee/update/" + id,
            data: JSON.stringify(empData),
            contentType: "application/json",

            success: (result) => {
                if (result.success == false) {
                    document.getElementById("exampleData").innerHTML = (result.data._message).toUpperCase();
                    alert("Invalid Input..!!");
                }
                else {
                    document.getElementById("exampleData").innerHTML = "Employee Data Updated Sucessfully";
                    alert("Employee Data Updated Sucessfully");
                    window.open("http://127.0.0.1:5500/html/employeeData.html#", target = "_self")
                }
            },

            error: (err) => {
                console.log("Error ", err)
            }
        })
        localStorage.removeItem("id");
    }
}

//Function is called automatically when page loads
onLoad = () => {

    // Does nothing and exits the function if localstorage does not have value
    if (localStorage.getItem("id") == null) {
        console.log("Exiting Onload Function")
    }
    // Get api is called when local storage contains value-id
    else {
        console.log("Local Storage = " + localStorage.getItem("id"))
        let employeeId = localStorage.getItem("id")
        $.ajax({
            type: "get",
            url: "http://localhost:3000/api/employee/get/" + employeeId,
            data: "json",

            success: (result) => {
                console.log("Employee Data: ", result)
                empData = result.data;
                console.log("empdata " + empData)
                $("#exampleFormControlInput1").val(empData.firstName);
                $("#exampleFormControlInput2").val(empData.lastName);
                $("#exampleFormControlInput3").val(empData.email);
                $("#exampleFormControlInput4").val(empData.salary);
                $("#exampleDataList").val(empData.department);
                document.getElementById("subButton").innerHTML = "Update & ";
            },
            error: (err) => {
                console.log("Error ", err)
            }
        })
    }
}