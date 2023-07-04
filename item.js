var remainParent = document.getElementById("remaining");
var doneParent = document.getElementById("done");
var submit = document.getElementById("addForm");
submit.addEventListener("submit", createItem);
var item = [];

function createItem(event) {
  event.preventDefault();
  console.log("hello");

  var item_name = document.getElementById("item").value;
  var description = document.getElementById("description").value;
  var obj = {
    item_name,
    description,
  };

  var li = document.createElement("li");
  li.className = "list-group-item";

  var done_Mark = document.createElement("button");
  done_Mark.className = "btn btn-danger btn-sm float-right";
  done_Mark.appendChild(document.createTextNode("✓"));

  var remaining_Mark = document.createElement("button");
  remaining_Mark.className = "btn btn-danger btn-sm float-right delete";
  remaining_Mark.appendChild(document.createTextNode("X"));

  li.textContent = obj.item_name + " " + obj.description;
  li.appendChild(done_Mark);
  li.appendChild(remaining_Mark);
  remainParent.appendChild(li);
  item.push(obj);

  // To perform delete
  remaining_Mark.addEventListener("click", deletRemaining);
  function deletRemaining(event) {
    axios
      .delete(`https://crudcrud.com/api/e7458f6265b946b89fad4f28ad2dc4b6/item/${obj._id}`)
      .then((response) => {
        console.log(response.data);
        var deleteAction = event.target.parentElement;
        remainParent.removeChild(deleteAction);
      })
      .catch((error) => console.log(error));
  }

  // To mark as done
  done_Mark.addEventListener("click", gotoDone);
  function gotoDone() {
    doneParent.appendChild(li);
    li.removeChild(remaining_Mark);
    li.removeChild(done_Mark);
    axios
      .post(`https://crudcrud.com/api/e7458f6265b946b89fad4f28ad2dc4b6/item/${obj._id}`, obj)
      .then((response) =>{ 
        console.log(response.data)
        doneParent.appendChild(li);
        li.removeChild(remaining_Mark)
        li.removeChild(done_Mark)})
      .catch((error) => console.log(error));
  }

  axios
    .post("https://crudcrud.com/api/e7458f6265b946b89fad4f28ad2dc4b6/item", obj)
    .then((response) => {
      obj._id = response.data._id; // Assign the returned ID to the object
      console.log(response.data);
    })
    .catch((error) => console.log(error));
}
