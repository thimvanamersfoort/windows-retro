// calculator app
var calc_buttons = document.getElementsByClassName("btn-calc");
var calc_output = document.getElementById("calc-output");
var calc_string = "";
var output = false;


for(var i = 0; i < calc_buttons.length; i++){
    calc_buttons[i].addEventListener("click", function(){
        var source = event.target;

        if(output == true){
            calc_output.value = "";
            calc_string = "";
            output = false;
        }

        if(source.value != "AC" && source.value != "C" && source.value != "="){
            calc_string += source.value;
            calc_output.value = calc_string;
        }
        else if(source.value == "AC"){
            calc_string = "";
            calc_output.value = calc_string;
        }
        else if(source.value == "C"){
            calc_string = calc_string.substr(0, calc_string.length - 1);
            calc_output.value = calc_string;
        }
        else if(source.value == "="){
            try{
                calc_output.value = eval(calc_string);
                output = false;
                calc_string = calc_output.value;
            }
            catch{
                calc_output.value = "ERROR";
                output = true;
                calc_string = "";
            }
        }
        
    });
}

// home menu 
var home_task = document.getElementById("home-task");

home_task.addEventListener("click", function(){
    var home_menu = document.getElementById("home-menu");

    if(home_menu.classList.contains("hidden")){
        home_menu.classList.remove("hidden");
    } else{
        home_menu.classList.add("hidden");
    }
})
function placeDate(){
    var datespan = document.getElementById("date");
    var d = new Date();
    var datestring = "";
    
    datestring = d.getHours() + ":" + ('0'+d.getMinutes()).slice(-2) + " " + d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
    datespan.innerHTML = datestring;
}

// file explorer
function quote(string){
    var newString = "'" + string + "'";
    return newString;
}
$(document).ready(function() {
    $.ajax({

        type: "POST",
        url: 'handler.php',
        data:{real_home:'files'},
        success:function(result) {
            
            try{
                var data = JSON.parse(result);
                var fileListing = document.getElementById("file-listing");
                var working_dir = data[data.length - 1];

                for(var i=1; i < data.length - 1; i++){

                    var file = data[i];
                    var ext = file.split('.').pop();

                    if(ext == "png" || ext == "jpg" || ext == "jpeg"){
                        fileListing.innerHTML += '<div class="file" tabindex="'+ i +'" ondblclick="openPhotoViewer('+ quote(file) +')">' +
                                                    '<img src="assets/img/image.png" class="app-icon-sm">' +
                                                    '<span>'+ file +'</span>' +
                                                '</div>';
                    }
                    else if(ext == "txt"){
                        fileListing.innerHTML += '<div class="file" tabindex="'+ i +'" ondblclick="openTextReader('+ quote(file) +')">' +
                                                    '<img src="assets/img/text.png" class="app-icon-sm">' +
                                                    '<span>'+ file +'</span>' +
                                                '</div>';                        
                    }
                    else if(ext == "mp3"){
                        fileListing.innerHTML += '<div class="file" tabindex="'+ i +'" ondblclick="openMusicPlayer('+ quote(file) +')">' +
                                                    '<img src="assets/img/music.png" class="app-icon-sm">' +
                                                    '<span>'+ file +'</span>' +
                                                '</div>';           
                    }
                    else if(file != "." && file != ".." && file != data[data.length - 1]){
                        fileListing.innerHTML += '<div class="file" tabindex="'+ i +'" onclick="showChildFolder('+quote(working_dir) + ', '+ quote(file) +')">' +
                                                    '<img src="assets/img/folder.png" class="app-icon-sm">' +
                                                    '<span>'+ file +'</span>' +
                                                '</div>'; 
                    }
                }
            }
            catch(err){
                displayApp("error");
            }
        }
    });
});
function showChildFolder(working_dir, file){

    var newdir = working_dir + "/" + file;
    $.ajax({

        type: "POST",
        url: 'handler.php',
        data:{real_home:newdir},
        success:function(result) {

            try{
                var data = JSON.parse(result);
                var fileListing = document.getElementById("file-listing");
                fileListing.innerHTML = "";
                var working_dir = data[data.length - 1];

                for(var i=1; i < data.length - 1; i++){

                    var file = data[i];
                    var ext = file.split('.').pop(); // file extension krijgen

                    if(ext == "png" || ext == "jpg" || ext == "jpeg"){
                        fileListing.innerHTML += '<div class="file" tabindex="'+ i +'" ondblclick="openPhotoViewer('+ quote(file) +')">' +
                                                    '<img src="assets/img/image.png" class="app-icon-sm">' +
                                                    '<span>'+ file +'</span>' +
                                                '</div>';
                    }
                    else if(ext == "txt"){
                        fileListing.innerHTML += '<div class="file" tabindex="'+ i +'" ondblclick="openTextReader('+ quote(file) +')">' +
                                                    '<img src="assets/img/text.png" class="app-icon-sm">' +
                                                    '<span>'+ file +'</span>' +
                                                '</div>';                        
                    }
                    else if(ext == "mp3"){
                        fileListing.innerHTML += '<div class="file" tabindex="'+ i +'" ondblclick="openMusicPlayer('+ quote(file) +')">' +
                                                    '<img src="assets/img/music.png" class="app-icon-sm">' +
                                                    '<span>'+ file +'</span>' +
                                                '</div>';           
                    }
                    else if(file != "." && file != ".." && file != data[data.length - 1]){
                        fileListing.innerHTML += '<div class="file" tabindex="'+ i +'" onclick="showChildFolder('+ quote(working_dir) + ', '+ quote(file) +')">' +
                                                    '<img src="assets/img/folder.png" class="app-icon-sm">' +
                                                    '<span>'+ file +'</span>' +
                                                '</div>'; 
                    }
                    else if(file == ".." && working_dir != "files"){
                        fileListing.innerHTML += '<div class="file" tabindex="'+ i +'" onclick="showParentFolder('+ quote(working_dir) + ', '+ quote(file) +')">' +
                                                    '<img src="assets/img/folder.png" class="app-icon-sm">' +
                                                    '<span>'+ file +'</span>' +
                                                '</div>';
                    }
                }
            }
            catch(err){
                displayApp("error");
            }
        }
    });
}
function showParentFolder(working_dir, file){
    
    var newdir = working_dir + "/" + file;
    $.ajax({

        type: "POST",
        url: 'handler.php',
        data:{real_home:newdir},
        success:function(result) {
            
            try{
                var data = JSON.parse(result);
                var fileListing = document.getElementById("file-listing");
                fileListing.innerHTML = "";
                var working_dir = data[data.length - 1];

                for(var i=1; i < data.length - 1; i++){

                    var file = data[i];
                    var ext = file.split('.').pop(); // file extension krijgen

                    if(ext == "png" || ext == "jpg" || ext == "jpeg"){
                        fileListing.innerHTML += '<div class="file" tabindex="'+ i +'" ondblclick="openPhotoViewer('+ quote(file) +')">' +
                                                    '<img src="assets/img/image.png" class="app-icon-sm">' +
                                                    '<span>'+ file +'</span>' +
                                                '</div>';
                    }
                    else if(ext == "txt"){
                        fileListing.innerHTML += '<div class="file" tabindex="'+ i +'" ondblclick="openTextReader('+ quote(file) +')">' +
                                                    '<img src="assets/img/text.png" class="app-icon-sm">' +
                                                    '<span>'+ file +'</span>' +
                                                '</div>';                        
                    }
                    else if(ext == "mp3"){
                        fileListing.innerHTML += '<div class="file" tabindex="'+ i +'" ondblclick="openMusicPlayer('+ quote(file) +')">' +
                                                    '<img src="assets/img/music.png" class="app-icon-sm">' +
                                                    '<span>'+ file +'</span>' +
                                                '</div>';           
                    }
                    else if(file != "." && file != ".." && file != data[data.length - 1]){
                        fileListing.innerHTML += '<div class="file" tabindex="'+ i +'" onclick="showChildFolder('+ quote(working_dir) + ', '+ quote(file) +')">' +
                                                    '<img src="assets/img/folder.png" class="app-icon-sm">' +
                                                    '<span>'+ file +'</span>' +
                                                '</div>'; 
                    }
                    else if(file == ".." && working_dir != "files"){
                        fileListing.innerHTML += '<div class="file" tabindex="'+ i +'" onclick="showParentFolder('+ quote(working_dir) + ', '+ quote(file) +')">' +
                                                    '<img src="assets/img/folder.png" class="app-icon-sm">' +
                                                    '<span>'+ file +'</span>' +
                                                '</div>';
                    }
                }
            }
            catch(err){
                displayApp("error");
            }

        }
    })

}

// music player
function openMusicPlayer(filename){
    var domainName = window.location.origin;
    var audio = new Audio(domainName + "/files/Music/" + filename);
    const song = {
        currentTime: document.getElementById("currentTime"),
        songTitle: document.getElementById("songTitle"),
        duration: document.getElementById("duration"),
        rangeDisplay: document.getElementById("songProgress"),
        playPause: document.getElementById("playPause")
    };
    song.rangeDisplay.setAttribute("min", "0");
    song.songTitle.innerHTML = filename;
    audio.play();

    function convertToMinutes(time, returnFull){
        var minutes = Math.floor(time / 60); // 7
        var seconds = Math.floor(time % 60); // 30
        seconds = seconds.toString();
        if(seconds.length == 1){ seconds = ('0'+seconds.slice(-2)) }

        if(returnFull == true){
            return Math.floor(time);
        } else{
            return minutes + ":" + seconds;
        }
    }
        
    audio.ontimeupdate = (event) => {
        song.currentTime.innerHTML = convertToMinutes(audio.currentTime);
        song.duration.innerHTML = convertToMinutes(audio.duration);
        song.rangeDisplay.setAttribute("value", convertToMinutes(audio.currentTime, true));
        song.rangeDisplay.setAttribute("max", convertToMinutes(audio.duration, true));
        $("#songProgress").load(location.href + " #songProgress");
    };
    audio.onended = (event) => {
        audio.load();
        song.currentTime.innerHTML = convertToMinutes(audio.currentTime);
        song.songTitle.innerHTML = filename;
        song.duration.innerHTML = convertToMinutes(audio.duration);
        song.rangeDisplay.setAttribute("value", "1");
        song.rangeDisplay.setAttribute("max", convertToMinutes(audio.duration, true));
        song.playPause.innerHTML = "&gt;";
    }

    $("#playPause").on("click", function(){
        if(audio.paused){
            audio.play();
            this.innerHTML = "ll";
            song.rangeDisplay.setAttribute("value", convertToMinutes(audio.currentTime, true));
        } else if(audio.paused == false){
            audio.pause();
            this.innerHTML = "&gt;";
            song.rangeDisplay.setAttribute("value", convertToMinutes(audio.currentTime, true));
        }
    });

    $("#songProgress").on("change", function(){
        audio.currentTime = this.value;
        song.currentTime.innerHTML = convertToMinutes(this.value);
        song.rangeDisplay.setAttribute("value", convertToMinutes(audio.currentTime, true));
        if(audio.paused){
            audio.play();
            this.innerHTML = "ll";
        }
    });

    $("#fastForward").on("click", function(){
        var currentTime = convertToMinutes(audio.currentTime, true);
        var duration = convertToMinutes(audio.duration, true);
        if((currentTime + 10) < duration){
            audio.currentTime += 10;
            song.currentTime.innerHTML = convertToMinutes(audio.currentTime + 10, true);
            song.rangeDisplay.setAttribute("value", convertToMinutes(audio.currentTime + 10, true));
        } else{
            song.rangeDisplay.setAttribute("value", convertToMinutes(audio.duration, true));
            song.currentTime.innerHTML = convertToMinutes(audio.duration, true);
            audio.currentTime = audio.duration;
        }
    });
    $("#rewind").on("click", function(){
        var currentTime = convertToMinutes(audio.currentTime, true);
        if((currentTime - 10) > 0){
            audio.currentTime -= 10;
            song.currentTime.innerHTML = convertToMinutes(audio.currentTime + 10, true);
            song.rangeDisplay.setAttribute("value", convertToMinutes(audio.currentTime + 10, true));
        } else{
            song.rangeDisplay.setAttribute("value", convertToMinutes(audio.duration, true));
            song.currentTime.innerHTML = convertToMinutes(audio.duration, true);
            audio.currentTime = 0;
        }
    });
    
    $("#volumeDown").on("mousedown", function(){
        if(audio.volume - 0.1 > 0){
            audio.volume -= 0.1;
        } else { audio.volume = 0;}
        song.songTitle.innerHTML = "<i>Volume: " + (audio.volume * 100).toString().slice(0, 3) + "%</i>";
    });
    $("#volumeDown").on("mouseup", function(){
        song.songTitle.innerHTML = filename;
    });

    $("#volumeUp").on("mousedown", function(){
        if(audio.volume + 0.1 < 1){
            audio.volume += 0.1;
        } else { audio.volume = 1;}
        song.songTitle.innerHTML = "<i>Volume: " + (audio.volume * 100).toString().slice(0, 3) + "%</i>";

    });
    $("#volumeUp").on("mouseup", function(){
        song.songTitle.innerHTML = filename;  
    });

    $("#music-hide").on("click", function(){
        audio.pause();
        delete window.audio;
        hide('music');
    });

    displayApp('music');
}

// photo viewer
function openPhotoViewer(filename){
    var picture = document.getElementById("picture");
    var picname = document.getElementById("picname");

    picture.src = "files/Pictures/" + filename;
    picname.innerHTML = filename;
    displayApp('picture');
}

// text viewer
function openTextReader(filename){
    $.ajax({
        url: "files/Documents/" + filename,
        dataType: 'text',
        success: function(text){
            var textbox = document.getElementById("text-container");
            var textname = document.getElementById("textname");

            textbox.innerHTML = text;
            textname.innerHTML = filename;
            displayApp('text');
        }
    })
    
}