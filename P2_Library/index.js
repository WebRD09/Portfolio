function Book(name, author, type) {
    this.name = name
    this.author = author
    this.type = type
}

function Display() {

}

Display.prototype.add = function() {
    let tableBody = document.getElementById("tableBody");
    let bookInfo = localStorage.getItem("bookInfo")
    if (bookInfo == null) {
        bookObj = []
    } else {
        bookObj = JSON.parse(bookInfo)
    }
    let html = "";
    bookObj.forEach(function(element, index) {
        html += `<tr class="bookInfo">
            <td>${index + 1}</td>
            <td>${element.Name}</td>
            <td>${element.Author}</td>
            <td>${element.Type}</td>
        </tr>`
    });

    tableBody.innerHTML = html;
}

Display.prototype.clear = function() {
    let libraryForm = document.getElementById("libraryForm");
    // Reset all the values we entered in form, like reset button
    libraryForm.reset()
}

Display.prototype.validate = function(book) {
    if (book.name.length > 2 && book.author.length > 2)
        return true
    return false
}

Display.prototype.message = function(type, msg) {
    let message = document.getElementById("msg")
    message.innerHTML = ` <div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>Message : </strong> ${msg}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
</div>`

    setTimeout(function() {
        message.innerHTML = "";
    }, 2000);
}

let display = new Display()
display.add()

let libraryForm = document.getElementById("libraryForm")
libraryForm.addEventListener("submit", libraryFormSubmit)

function libraryFormSubmit(e) {
    // console.log("Submit")
    let name = document.getElementById('bookName').value
    let author = document.getElementById('author').value
    let type;

    let fiction = document.getElementById('fiction')
    let programming = document.getElementById('programming')
    let cooking = document.getElementById('cooking')


    if (fiction.checked)
        type = fiction.value
    else if (programming.checked)
        type = programming.value
    else if (cooking.checked)
        type = cooking.value

    let book = new Book(name, author, type)
    let info = {
        Name: name,
        Author: author,
        Type: type
    }

    let display = new Display()
    if (display.validate(book)) {
        let bookInfo = localStorage.getItem("bookInfo")
        if (bookInfo == null) {
            bookObj = []
        } else {
            bookObj = JSON.parse(bookInfo)
        }
        bookObj.push(info)
        localStorage.setItem("bookInfo", JSON.stringify(bookObj))
        display.add()
        display.clear()
        display.message("success", " Added Successfully")
    } else {
        display.message("danger", " Name and Auhtor must have more than 2 characters");
    }
    e.preventDefault()
}

let search = document.getElementById("searchBook")
search.addEventListener("input", function(e) {
    let bookInfo = document.getElementsByClassName("bookInfo")

    Array.from(bookInfo).forEach(function(element) {
        let bookName = element.getElementsByTagName("td")[1].innerText

        if (!(bookName.includes(search.value))) {
            element.style.display = "none"
        } else {
            element.style.display = "visible";
        }
    })
    e.preventDefault()
})