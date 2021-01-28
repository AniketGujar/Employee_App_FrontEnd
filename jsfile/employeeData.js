// Stores id of every employee in the array
let empIdArray = [];

// Get all data from data base and prints in the table format
getEmpData = () => {
    let allEmpData = '<tr><th><i class="fas fa-user-edit"></i> FirstName</th><th><i class="fas fa-user-edit"></i> LastName</th><th><i class="fas fa-envelope"></i> Email Id</th><th><i class="fas fa-rupee-sign"></i> Salary</th><th><i class="fas fa-briefcase"></i> Department</th><th>Edit</th><th>Delete</th></tr>';

    $.ajax({
        type: "get",
        url: "http://localhost:3000/api/employee",
        data: "json",

        success: (result) => {
            console.log("Employee Data: ", result)
            let empData = result.data;
            let empId = 0;
            for (let i = 0; i <= empData.length - 1; i++) {
                empIdArray.push(empData[i]._id)
                allEmpData += "<tr><td>" + empData[i].firstName + "</td>";
                allEmpData += "<td>" + empData[i].lastName + "</td>"
                allEmpData += "<td>" + empData[i].email + "</td>"
                allEmpData += "<td>" + empData[i].salary + "</td>"
                allEmpData += "<td>" + empData[i].department + "</td>"
                allEmpData += "<td><button type='button' id='updateData' class='btn' onclick='getDataById(" + empId + ")' ><i class='fas fa-edit'></i></button></td>"
                allEmpData += "<td><button type='button' id='deleteData' class='btn btn-primary' onclick='deleteEmpData(" + empId + ")' ><i class='far fa-trash-alt'></i></button></td></td></tr>"
                empId++;
            }
            $('#customers').empty().html(allEmpData);
        },

        error: (err) => {
            console.log("Error ", err)
        }
    })
}

// Deletes Employee data from data base
deleteEmpData = (id) => {
    let employeeId = empIdArray[id];
    $.ajax({
        type: "delete",
        url: ("http://localhost:3000/api/employee/delete/" + employeeId),

        success: (result) => {
            alert("Employee " + result.data.firstName + " " + result.data.lastName + " Deleted Successfully..!")
            location.reload();
        },

        error: (err) => {
            console.log("Error ", err)
        }
    });

}

// Performs edit part and stores id in localStorage
getDataById = (id) => {
    console.log("getDataById" + id)
    let employeeId = empIdArray[id];
    localStorage.setItem("id", employeeId);
    console.log("local " + localStorage.getItem("id"))
    window.open("http://127.0.0.1:5500/html/employeeRegistration.html?", target = "_self");
}

// Removes the localStorage when Add Employee is Clicked
addNewEmployee = () => {
    localStorage.removeItem("id");
    window.open("http://127.0.0.1:5500/html/employeeRegistration.html?", target = "_self");
}