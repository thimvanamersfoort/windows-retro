// toggle fullscreen view
function toggleFullscreen(){
  var elem = document.documentElement;

  if(window.innerHeight != screen.height) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  } else{
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }
}

// hide divs
function hide(app_id) {
  setTimeout(function(){
    var app = document.getElementById(app_id + "-card");
    var task = document.getElementById(app_id + "-task");

    app.classList.add("hidden");
    task.classList.add("hidden");
  }, 125);
}

// make divs draggable
$(document).ready(function () {
  placeDate();
  var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints; // detect for touchscreen

  if(supportsTouch != true){ //adds dragging to icons if not touchscreen
    $(".app-icon-lg").draggable({containment: "parent", grid: [45, 52.25]});
    $("#boot-logo-touchscreen").addClass("hidden");
  } else if(supportsTouch == true){
    $("#boot-logo-desktop").addClass("hidden");
  }
  
  $(".card").draggable({handle:".card-handle", containment: "parent"}); // adds dragging to cards
  

});

//create new cookie
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toUTCString();

  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/; samesite=strict;";
}

// find value of cookie by name
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// delete all existing cookies
function deleteAllCookies() {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++){
    document.cookie = cookies[i] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/; samesite=strict;";
  }
}

// display all existing cookies (debug purposes only)
function displayCookies() {
  var cookies = document.cookie.split(";");
  var cookieString = "Current active cookies: \r\n\r\n";
  for (var i = 0; i < cookies.length; i++){
    cookieString += cookies[i] + "\r\n";
  }
  alert(cookieString);
}

// show app
function displayApp(app_id){
  var app = document.getElementById(app_id + "-card");
  var task = document.getElementById(app_id + "-task");

  var menu = document.getElementById("home-menu");
  menu.classList.add("hidden");

  if(app.classList.contains("hidden")){
    app.classList.remove("hidden");
    task.classList.remove("hidden");
    $("#" + app_id + "-card").position({of: $(window)});
  } else {
    $("#" + app_id + "-card").position({of: $(window)});
    app.focus();
  }
}
