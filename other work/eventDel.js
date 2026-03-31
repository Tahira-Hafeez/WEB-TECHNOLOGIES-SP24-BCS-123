
// todoscript.js
// DOM-only TODO list. Add and delete operations only. Delete buttons are bound individually for
// existing rows only. Newly added rows intentionally do NOT have delete handlers bound to show
// students why event delegation is useful.

function createRow(text) {
  var tr = document.createElement("tr");

  var tdId = document.createElement("td");
  tdId.textContent = "-";
  tr.appendChild(tdId);

  var tdText = document.createElement("td");
  tdText.textContent = text;
  tr.appendChild(tdText);

  var tdActions = document.createElement("td");
  var btn = document.createElement("button");
  btn.className = "btn-delete";
  btn.type = "button";
  btn.textContent = "Delete";

  // IMPORTANT: Do NOT bind a click handler here. This is intentional so newly added rows
  // will NOT be removable unless you use event delegation.
  // btn.addEventListener('click', function () { tr.parentNode.removeChild(tr); });

  tdActions.appendChild(btn);
  tr.appendChild(tdActions);

  return tr;
}

function addTodo(text) {
  var tbody = document.getElementById("todoBody");

  // If the first row is a placeholder empty row, remove it
  var first = tbody.querySelector("tr.empty");
  if (first) tbody.removeChild(first);

  var tr = createRow(text);
  tbody.appendChild(tr);
}

function bindings() {
  var form = document.getElementById("todoForm");
  var input = document.getElementById("todoText");
  var tbody = document.getElementById("todoBody");

  if (!tbody) return;

  // Use event delegation on tbody to handle delete buttons for both existing and new rows
  tbody.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("btn-delete")) {
      var tr = e.target.closest("tr");
      if (tr && tr.parentNode) tr.parentNode.removeChild(tr);
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = input.value.trim();
    if (!v) return;
    addTodo(v);
    input.value = "";
    input.focus();
  });

  console.log(
    "Bindings for todo form initialized (DOM-only storage, no handlers for new rows)",
  );
}

window.onload = bindings;
