showNotes();

let addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', function(e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        Title: addTitle.value,
        Text: addTxt.value,
    }
    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
    addTxt.value = "";
    addTitle.value = "";
})

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index) {
        html += ` <div class="notecard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${index + 1}. ${element.Title}</h5>
                <p  class="card-title"> ${element.Text} </p>
                <button id="${index + 0}" onclick = "deleteNotes(this.id)" class="btn btn-primary">Delete</button>
                <button id="${index}" onclick = "editNotes(this.id)" class="btn btn-primary" style = "margin : 0px 10px;padding : 6px 20px">Edit</button>
            </div>
        </div>`;
    });

    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = "<b><u><i>Notes are Empty</i></u></b>";
    }
}

function deleteNotes(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

function editNotes(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    console.log(notesObj)
    let newNote = prompt("Write a new Note : ")
    notesObj[index].Text = newNote;
    localStorage.setItem('notes', JSON.stringify(notesObj))
    showNotes();
}

let search = document.getElementById('searchTxt')
search.addEventListener("input", function() {

    let inputVal = search.value;
    let noteCards = document.getElementsByClassName('notecard');
    Array.from(noteCards).forEach(function(element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})