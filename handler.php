<?php

function chopStringToRoot($fullPath){
    $rootPathName = 'files';

    $rootPath = substr($fullPath, strpos($fullPath, $rootPathName), strlen($fullPath));
    return $rootPath;
}

function splitStringToParent($fullPath){
    
    $rootPath = substr($fullPath, 0, strrpos($fullPath, "/"));
    $rootPath2 = substr($rootPath, 0, strrpos($rootPath, "/"));
    return $rootPath2;
}

if(isset($_POST["real_home"]) && !empty($_POST["real_home"])){

    $real_home = $_POST["real_home"]; // --> files\music
    
    if(substr($real_home, -2) == ".."){
        $working_dir = splitStringToParent($real_home);
    } else{
        $working_dir = $real_home;
    }

    chdir($working_dir);
    $files = scandir(getcwd());

    array_push($files, $working_dir);

    echo json_encode($files);
    exit();
}