//elements
var login_container = document.getElementById("login");
var index_container = document.getElementById("index");
var login_button = document.getElementById("login-button");
var username_input = document.getElementById("username");
var error_msg = document.getElementById("error-msg");
var custom_name = document.getElementById("custom-name");
var custom_name2 = document.getElementById("custom-name2");
var home_menu = document.getElementById("home-menu");
var firstTimeLoading = true;

username_input.addEventListener("keydown", function(){
    username_input.classList.remove("input-error");
    error_msg.classList.add("hidden");
})

login_button.addEventListener("click", function(){

    if(username_input.value == "") {
        username_input.classList.add("input-error");
        error_msg.classList.remove("hidden");
    }
    else {
        setCookie("username", username_input.value, 3);

        setTimeout(() => {
            login_container.classList.add("hidden");
            index_container.classList.remove("hidden");
            custom_name.innerHTML = "Hi " + getCookie('username') + "!";
            custom_name2.innerHTML = "Welcome " + getCookie('username') + "!";
            
            displayApp("welcome");
            placeDate();

        }, 200);
    }
})

function loginCheck(){
    if(getCookie('username') == ""){
        deleteAllCookies();
    }
    else{
        login_container.classList.add("hidden");
        index_container.classList.remove("hidden");
        custom_name.innerHTML = "Hi " + getCookie('username') + "!";
        custom_name2.innerHTML = "Welcome " + getCookie('username') + "!";
    }
}

function logOut(){
    deleteAllCookies();
    login_container.classList.remove("hidden");
    index_container.classList.add("hidden");

    if(home_menu.classList.contains("hidden") == false){
        home_menu.classList.add("hidden");
    }
}