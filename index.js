// Write Javascript Here
const baseUrl = "http://localhost:3000/users";
const headers = {
    'Content-type': 'application/json; charset=UTF-8'
};

var usersCount  = 1; 

getUsersRequest().then(users =>{
   
    const tableEl = document.getElementById("table");
    for (const user of users) {
        usersCount = user.id;
        tableEl.appendChild(createTableRow(user))
    }
})








function addNewUser(){
    var c = usersCount+1;
    var obj = {
        "id": c,
        "name": `Name ${c.toString()}`
      }
    createUserRequest(obj);
   
    //TODO: Implement me
}



function editUser(id, userName){
    //TODO: implement me


    let text;
    let person = prompt("Add User", userName);
    if (person == null || person == "") {
      text = "User cancelled the prompt.";
    } else {
        var obj = {
            "id": id,
            "name": person
          }
          updateUserRequest(obj);
    }

}

function deleteUser(id){
    //TODO: implement me
    if (confirm("Are you sure you want to delete this entry!")) {
        deleteUserRequest(id)
    }
}




//CRUD HELPER METHODS
function createUserRequest(user){
    return fetch(baseUrl, {
        method: 'POST',
        headers: headers,
        body:JSON.stringify(user),
    }).then(response =>{
        // getUsersRequest();
        
        getUsersRequest().then(users =>{
            //This function has been implemented already for you
            const tableEl = document.getElementById("table");
            tableEl.innerHTML = '';
            for (const user of users) {
                usersCount = user.id;
                tableEl.appendChild(createTableRow(user))
            }
        });
    }
         )

}


function  getUsersRequest()  {
    return fetch(baseUrl, {
        method: 'GET',
    }).then(response => response.json())
}

function  deleteUserRequest(id)  {
    return fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
    }).then(response =>   
        getUsersRequest().then(users =>{
        //This function has been implemented already for you
        const tableEl = document.getElementById("table");
        tableEl.innerHTML = '';
        for (const user of users) {
            usersCount = user.id;
            tableEl.appendChild(createTableRow(user))
        }
    }))
}


function updateUserRequest(user){
    return fetch(`${baseUrl}/${user.id}`, {
        method: 'PATCH',
        headers: headers,
        body:JSON.stringify(user),
    }).then(response =>   
        getUsersRequest().then(users =>{
        const tableEl = document.getElementById("table");
        tableEl.innerHTML = '';
        for (const user of users) {
            usersCount = user.id;
            tableEl.appendChild(createTableRow(user))
        }
    }))
}


//HELPER METHODS
function createTableRow(user){
    var tr = document.createElement("tr");
    tr.innerHTML = `<td>${user.name}</td> <td><a href="#" onclick="editUser(${user.id}, '${user.name}')">Edit</a> / <a href="#" onclick="deleteUser(${user.id})">Delete</a></td>`;
    return tr;
}
