var html5rocks = {};
html5rocks.webdb = {};
html5rocks.webdb.db = null;

html5rocks.webdb.open = function() {
  var dbSize = 5 * 1024 * 1024; // 5MB
  html5rocks.webdb.db = openDatabase("Person", "1.0", "Person manager", dbSize);
}

html5rocks.webdb.onError = function(tx, e) {
 alert("There has been an error: " + e.message);
}

html5rocks.webdb.onSuccess = function(tx, r) {
  // re-render the data.
  loadTodoItems(tx, r);
}
html5rocks.webdb.createTable = function() {
  var db = html5rocks.webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS " +
                  "Person(ID INTEGER PRIMARY KEY ASC, Name TEXT, Address TEXT)", []);
  });
}
html5rocks.webdb.getAllPerson = function(renderFunc) {
  var db = html5rocks.webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("SELECT * FROM Person", [], renderFunc,
        html5rocks.webdb.onError);
  });
}
html5rocks.webdb.getAllPersonSortName = function(renderFunc) {
  var db = html5rocks.webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("SELECT * FROM Person Order By Name", [], renderFunc,
        html5rocks.webdb.onError);
  });
}
html5rocks.webdb.getAllPersonSortAddress = function(renderFunc) {
  var db = html5rocks.webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("SELECT * FROM Person Order By Address", [], renderFunc,
        html5rocks.webdb.onError);
  });
}
html5rocks.webdb.addPerson= function(personName, address){
    var db= html5rocks.webdb.db;
    db.transaction(function(tx){
        tx.executeSql("INSERT INTO Person(Name, Address) Values (?,?)",[personName, address], html5rocks.webdb.onSuccess, html5rocks.webdb.onError);} );}
function init(){
  html5rocks.webdb.open();
  html5rocks.webdb.createTable();
  html5rocks.webdb.getAllPerson(loadTodoItems);
}
function addPerson(){
  html5rocks.webdb.addPerson($("#name").val(), $("#address").val());
  $("#name").val()=""; $("#.address").val()="";
}
function renderTodo(row) {
  return "<tr><td>" + row.Name +"</td><td>"+ row.Address+"</td><td>"+" [<a href='javascript:void(0);' onclick='remove(" +
         row.ID +");'>Delete</a>]</td></tr>";
}
function loadTodoItems(tx, rs) {
        var rowOutput = "";
        var todoItems = document.getElementById("personList");
        for (var i=0; i < rs.rows.length; i++) {
          rowOutput += renderTodo(rs.rows.item(i));
        }

        todoItems.innerHTML = rowOutput;
  }
  function loadSearchItems(tx, rs) {
          var rowOutput = "";
          var todoItems = document.getElementById("searchList");

          for (var i=0; i < rs.rows.length; i++) {
            rowOutput += renderTodo(rs.rows.item(i));
          }

          todoItems.innerHTML = todoItems.innerHTML+ rowOutput;
          return;
    }



function search(renderFunc){
  var name= $("#search").val();
  name="%".concat(name, "%");
  var db= html5rocks.webdb.db;
  var todoItems = document.getElementById("searchList");
  todoItems.innerHTML="";
  db.transaction(function(tx){
      tx.executeSql("Select * from Person where Name LIKE (?)",[name], renderFunc, html5rocks.webdb.onError);
      tx.executeSql("Select * from Person where Address LIKE (?)",[name], renderFunc, html5rocks.webdb.onError);
  });

 }

function remove(name){
  var db= html5rocks.webdb.db;
  db.transaction(function(tx){
      tx.executeSql("Delete from Person where ID=(?)",[name], html5rocks.webdb.onSuccess, html5rocks.webdb.onError);
  });
  window.location.reload();
}






function verifyPerson(){
    if($("#name").val()=="" || $("#address").val()==""){
        alert("Incomplete form");
        return;
    }
    else{
        addPerson();
    }
}
function verifySearch(cmd){
    if(cmd=='search'){
        if($("#search").val()==""){
            alert("incomplete form");
            return;
        }
        search(loadSearchItems);
    }
   else if(cmd=='delete'){
        if($("#delete").val()==""){
            alert("incomplete form");
            return;
        }
        remove();
    }
}

function sortform(){
   var name= document.getElementById("s_name");
   var address= document.getElementById("s_address");
   if(name.checked){
      html5rocks.webdb.getAllPersonSortName(loadTodoItems);
   }
   if(address.checked){
         html5rocks.webdb.getAllPersonSortAddress(loadTodoItems);
      }
}
