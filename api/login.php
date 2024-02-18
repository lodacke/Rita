    <?php

    require_once("functions.php");

    $filename = "data/users.json";
    $directory = "data";

   // if(!file_exists("data")){ 
   //     mkdir($directory, 755);
   // }

    if(!file_exists($filename)){ 
        file_put_contents($filename, "[]");
    }

    $users = json_decode(file_get_contents($filename), true);
    $input = json_decode(file_get_contents("php://input"), true);

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        
        if(!isset($input["username"],
                $input["password"])){
            send_JSON(["message"=>"Wrong data"], 401);
        }

        if($users != []){ 
            foreach($users as $user){
                if($user["username"] == $input["username"] and $user["password"] == $input["password"]){
                    unset($user["password"]);
                    send_JSON($user); 
                }
            }
        } 
        send_JSON(["message"=>"Wrong username or password"], 404);
    } else {
        send_JSON(["message"=>"Wrong method"], 405);
    }
    ?>