<?php

require_once("functions.php");

$filename = "data/users.json";
$directory = "data";
if(!file_exists("data")){ 
    mkdir($directory, 755);
}
if(!file_exists($filename)){ 
    file_put_contents($filename, "[]");
}

$users = json_decode(file_get_contents($filename), true);
$input = json_decode(file_get_contents("php://input"), true);

if($_SERVER["REQUEST_METHOD"] == "POST"){ 

    if(!isset($input["email"], 
            $input["username"],
            $input["password"])){
        send_JSON(["message"=>"Wrong data"], 401);
    }

    if(!preg_match("/(@)(.)/", $input["email"])){ 
        send_JSON(["message"=>"Please enter a valid email"], 401);
    }

    //////////////


    //tooShort($input["username"], "username");
    //tooShort($input["password"], "password");

    $splitUsername = str_split($input["username"]);
    $splitPassword = str_split($input["password"]);
    $splitEmail = str_split($input["email"]);

    //incorrectChar($splitUsername, "username");
    //incorrectChar($splitPassword, "password");
    //incorrectChar($splitEmail, "email");
    
    //////////////

    if($users != []){ 
        foreach($users as $user){
            if($user["username"] == $input["username"]){ 
                send_JSON(["message"=>"Username already taken"], 409); 
            }
            if($user["email"] == $input["email"]){ 
                send_JSON(["message"=>"Email already taken"], 409); 
            }
        }
    }

    $newUser = [ 
        "email" => $input["email"],
        "username" => $input["username"],
        "password" => $input["password"]
    ];
    $users[] = $newUser; 
    file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT)); 

    unset($newUser["password"]); 
    send_JSON($newUser); 

} else {
    send_JSON(["message"=>"Wrong method"], 405);
}

?>