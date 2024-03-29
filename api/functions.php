<?php

function send_JSON ($data, $code = 200){
    header("Content-Type: application/json");
    http_response_code($code);
    echo json_encode($data);
    exit();
}

function tooShort ($input, $value){ 
    if(strlen($input) < 3){
        send_JSON(["message"=>"The $value needs to be 3 characters or more"], 406); 
    }
}

function incorrectChar ($splitWord, $value){ 
    $allowed = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    if($value == "email"){ 
        $allowed[] = '@';
        $allowed[] = '.';}

    foreach($splitWord as $char){
        if(!in_array($char, $allowed)){
            send_JSON(["message"=>"Character not allowed in $value"], 406); 
        }
    }
}

function change ($input, $users, $filename, $field, $secondaryField = "password"){

    $new = "new_";
    $new .= $field;

    if($input[$field] == $input[$new]){ 
        send_JSON(["message"=>"New $field cannot be the same as old $field"], 406); 
    }

    foreach ($users as $index => $user) {
        if($user[$field] == $input[$field] && $user[$secondaryField] == $input[$secondaryField]){


            if ($field !== "password"){ 
                $array = $users; 
                $copiedArray = $array; 
                array_splice($copiedArray, $index, 1);
                foreach($copiedArray as $owned){
                    if($owned[$field] == $input[$new]){
                        send_JSON(["message"=>"This $field is already taken, please try again"], 409); 
                    }
                }
            }

            if ($field == "password"){ 
                if ($input[$field] != $user["password"]) {
                    send_JSON(["message"=>"Incorrect password, please try again"], 400); 
                }
            }

            tooShort($input[$new], $field); 

            $split = str_split($input[$new]); 
            incorrectChar($split, $field);

            if($field == "email"){ 
                if(!preg_match("/(@)(.)/", $input[$new])){
                    send_JSON(["message"=>"Please enter a valid email"], 406); 
                }
            }


            $users[$index][$field] = $input[$new];
            file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));

            
            if($field == "username"){
                $favorites = json_decode(file_get_contents("data/favourites.json"), true);
                $comments = json_decode(file_get_contents("data/comments.json"), true);
                $recipes = json_decode(file_get_contents("data/recipes.json"), true);

                function changeUsername ($dataBase, $key, $filePath, $input){
                    foreach($dataBase as $index => $data){
                        if($data[$key] == $input["username"] && !isset($data["deleted"])){
                            $dataBase[$index][$key] = $input[$new];

                            file_put_contents($filePath, json_encode($dataBase, JSON_PRETTY_PRINT));
                        }
                    }
                }

            changeUsername($favorites, "username", "data/favourites.json", $input);
            changeUsername($comments, "author", "data/comments.json", $input);
            changeUsername($recipes, "author", "data/recipes.json", $input);
            }
            ///

            send_JSON(["message"=>"Successfully updated $field!"]);
        }
    }
    send_JSON(["message"=>"Problems with finding user"], 404); 
}

?>