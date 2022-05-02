var boot_text = document.getElementById("boot-text");
var boot_page = document.getElementById("boot");
var login_page = document.getElementById("login");
var index_page = document.getElementById("index");
var lines_arr = [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "Nunc rhoncus est tellus, et fringilla mauris lacinia in.",
                    "Sed lectus massa, pellentesque sed congue ut maximus.",
                    "Praesent ipsum nulla, laoreet quis neque ut auctor dictum.",
                    "Sed eu est eu sem venenatis vestibulum id nec lacus nunc.",
                    "Morbi mattis ex et ligula fringilla, nec mollis elit iaculis.",
                    "Aliquam in mauris nec metus pharetra varius at eu elit."
                ];

function showReboot(){

    setTimeout(function(){
        boot_page.classList.remove("hidden");
        index_page.classList.add("hidden")
        login_page.classList.add("hidden");
        window.navigator.vibrate([200, 100, 200]);
    }, 750);

    let tw = new TypeIt("#boot-text-inner", {
        speed: 30,
        waitUntilVisible: true,
        html: true,
        startDelay: 250,
        afterComplete: async (step, instance) => {
            setTimeout(() => {

                deleteAllCookies();
                login_page.classList.remove("hidden");
                boot_page.classList.add("hidden");
                instance.delete();
                window.location.reload(true);

            }, 500);
        }
    });

    tw.type("Initiating Windows reboot sequence ")
    .type("...", {speed: 150}).pause(475).type(" OK", {speed: 1}).break().pause(50)

    .type("Terminating user " + getCookie("username") + " ")
    .type("...", {speed: 150}).pause(475).type(" OK", {speed: 1}).type("<br><br><br>").pause(50)

    .type("<b>[COOKIE_CONTROLLER01</b>").type("<b>::</b>", {speed: 150})
    .type("<b> CLEAR_INITIATED || EXECUTING</b>").type("<b>... </b>", {speed: 150}).type("<b>]</b>")
    .type("<br><br><br>").pause(50)

    .type(" Cookies found: ").pause(475).type("3").break().pause(50)

    .type(" Deleting cookie <i>username</i> ")
    .type("...", {speed: 150}).pause(475).type(" SUCCESS", {speed: 1}).break().pause(50)
    .type(" Deleting cookie <i>firstVisit</i> ")
    .type("...", {speed: 150}).pause(475).type(" SUCCESS", {speed: 1}).break().pause(50)
    .type(" Deleting cookie <i>isMobile</i> ")
    .type("...", {speed: 150}).pause(475).type(" SUCCESS", {speed: 1}).type("<br><br><br>").pause(50)
    
    .type("<b>[WINDOWS</b>").type("<b>::</b>", {speed: 150})
    .type("<b> PROC_HANDLER || ANALYSING</b>").type("<b>... </b>", {speed: 150}).type("<b>]</b>").type("<br><br><br>").pause(50)

    .type("Displaying active processes: <br>")
    .type("LOADING ").pause(50)
    .type("...", {speed: 150}).delete(3, {deleteSpeed: 150})
    .type("...", {speed: 150}).delete(3, {deleteSpeed: 150})
    .type("...", {speed: 150}).delete(3, {deleteSpeed: 150})
    .type("...", {speed: 150}).delete(3, {deleteSpeed: 150})
    .type("...", {speed: 150}).delete(3, {deleteSpeed: 150}).pause(350)

    .delete(10, {deleteSpeed: 10}).break().break()
    .type("No active processes found.", {deleteSpeed: 1}).type("<br><br><br><br>").pause(50)

    .type("Reboot succesfull. Automatic redirect in ").options({cursor: false, cursorChar: ""})
    .type("5").pause(500).delete(1).pause(500)
    .type("4").pause(500).delete(1).pause(500)
    .type("3").pause(500).delete(1).pause(500)
    .type("2").pause(500).delete(1).pause(500)
    .type("1").go();

}


