function verifyPerson(){
    if($("#name").val()=="" || $("#address").val()==""){
        alert("Incomplete form");
        return;
    }
    else{
        html5rocks.webdb.addPerson= function(todoText){
            var db= html5rocks.webdb.db;
            db.transaction(function(tx){
                tx.executeSql("INSERT INTO Person(Name, Address) Values (?,?)",[$("name").val(), $("address").val()], html5rocks.webdb.onSuccess, html5rocks.webdb.onError);} );}


    }
}
function verifySearch(cmd){
    if(cmd=='search'){
        if($("#search").val()==""){
            alert("incomplete form");
            return;
        }
    }
   else if(cmd=='delete'){
        if($("#delete").val()==""){
            alert("incomplete form");
            return;
        }
    }

        alert("form accepted");

}

function sortform(){

    alert("yoyo");
}
var html5rocks = {};
html5rocks.webdb = {};
html5rocks.webdb.db = null;

html5rocks.webdb.open = function() {
  var dbSize = 5 * 1024 * 1024; // 5MB
  html5rocks.webdb.db = openDatabase("Todo", "1.0", "Todo manager", dbSize);
}

html5rocks.webdb.onError = function(tx, e) {
  alert("There has been an error: " + e.message);
}

html5rocks.webdb.onSuccess = function(tx, r) {
  // re-render the data.
  // loadTodoItems is defined in Step 4a
  html5rocks.webdb.getAllTodoItems(loadTodoItems);
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
