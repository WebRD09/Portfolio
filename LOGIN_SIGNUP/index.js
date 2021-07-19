let login = document.getElementById("loginBtn");
let signup = document.getElementById("signupBtn");
let message = document.getElementById("message");
let info = document.getElementById("info");


signup.addEventListener("click", Signup);
login.addEventListener("click", Login);

function Signup() {
    info.innerHTML = "";
    let name = document.getElementById("name");
    let birthDate = document.getElementById("bDate");
    let email = document.getElementById("newEmail");
    let phone = document.getElementById("phone");
    let password = document.getElementById("newPassword");
    let confirmPassword = document.getElementById("confirmPassword");

    let profiles = localStorage.getItem("profiles");
    if (profiles == null) {
        profileObj = [];
    } else {
        profileObj = JSON.parse(profiles);
    }

    let obj = {
        Name: name.value,
        Bdate: birthDate.value,
        Email: email.value,
        Phone: phone.value,
        Password: password.value,
        Confirm: confirmPassword.value
    }

    if (name.value != "" && birthDate.value != "" && phone.value != "" && (password.value === confirmPassword.value)) {
        profileObj.push(obj);
        localStorage.setItem("profiles", JSON.stringify(profileObj));
        $("#close").click();
        message.innerHTML = `<div class="alert alert-success alert-dismissible fade show my-3" role="alert">
                                <strong>Congratulations...</strong>Your Form Submited Successfully
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>`;
        setTimeout(() => {
            message.innerHTML = "";
        }, 3000)
    } else {
        alert("Enter valid info, please")
    }

    name.value = "";
    birthDate.value = "";
    email.value = "";
    phone.value = "";
    password.value = "";
    confirmPassword.value = "";

}

function Login() {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let profiles = localStorage.getItem("profiles");
    if (profiles == null) {
        profileObj = [];
    } else {
        profileObj = JSON.parse(profiles);
    }

    profileObj.forEach(element => {
        if (element.Email === email.value && element.Password === password.value) {
            info.innerHTML = `<h4 class="my-2" >${element.Name}</h4>
                              <h4 class="my-2" >${element.Bdate}</h4>
                              <h4 class="my-2" >${element.Email}</h4>
                              <h4 class="my-2" >${element.Phone}</h4>`;

            document.getElementById("loginModal").style.display = "none";
            document.getElementById("signupModal").style.display = "none";
        } else {
            info.innerHTML = `<h1 class="text-danger">No Data Found !!</h1>`;
        }
    });

    email.value = "";
    password.value = "";
    $("#closeLogin").click();
}