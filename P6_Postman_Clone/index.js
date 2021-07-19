function getElement(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

let parametersBox = document.getElementById("parametersBox");
let jsonBox = document.getElementById("jsonBox");

// It will hide the parameterBox in default show the jsonBox
parametersBox.style.display = "none";

let paramsRadio = document.getElementById("paramsRadio");
let jsonRadio = document.getElementById("jsonRadio");

// If we click on parameter then it will display parameterBox and hide the jsonBox
paramsRadio.addEventListener("click", () => {
    jsonBox.style.display = "none";
    parametersBox.style.display = "block";
})

// If we clicked on json then it will display jsonBox and hide the parameterBox
jsonRadio.addEventListener("click", () => {
    parametersBox.style.display = "none";
    jsonBox.style.display = "block";
})

let addParameter = document.getElementById("add")
let newParams = document.getElementById("newParams")
let count = 2;

addParameter.addEventListener("click", () => {
    let str = `<div class="form-row my-2">
                <label class="col-form-label col-sm-2 pt-0" for="inputEmail4">Parameter ${count}</label>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="key${count}" placeholder="Key">
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="value${count}" placeholder="Value">
                </div>
                <button class="btn btn-primary mx-2 delete"> - </button>
            </div>`;

    let paramElement = getElement(str);
    console.log(paramElement);
    newParams.appendChild(paramElement);
    count++;

    let deleteParameter = document.getElementsByClassName("delete");
    for (item of deleteParameter) {
        item.addEventListener("click", (e) => {
            // e.target => the element on which we have clicked
            e.target.parentElement.remove();
        })
    }
})

let submit = document.getElementById("submit")
submit.addEventListener("click", () => {
    let responseText = document.getElementById("responseText")
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='request']:checked").value;
    let contentType = document.querySelector("input[name='content']:checked").value;
    // console.log(url, requestType, contentType);
    let obj = {};
    if (contentType == "Custom Parameters") {
        for (let i = 1; i < count; i++) {
            if (document.getElementById("key" + i) != undefined) {
                let key = document.getElementById("key" + i).value
                let value = document.getElementById("value" + i).value
                obj[key] = value;
            }
        }
        obj = JSON.stringify(obj);
    } else {
        obj = document.getElementById("jsonText").value;
    }
    responseText.value = obj;

    if (requestType == "GET") {
        fetch(url, {
                method: "GET",
            })
            .then(response => response.text())
            .then(data => {
                responseText.innerHTML = data;
                Prism.highlightAll();
            })
    } else {
        fetch(url, {
                method: "POST",
                body: obj,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then(response => response.text())
            .then(data => {
                responseText.innerHTML = data;
                Prism.highlightAll();
            })
    }
})