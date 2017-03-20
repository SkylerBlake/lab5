
<?php


$mode=$_GET["mode"];

switch ($mode) {
    case 'info':
        $title=$_GET["title"];
        info($title);
        break;
    case 'description':
        $title=$_GET["title"];
        description($title);
        break;
    case 'reviews':
        $title=$_GET["title"];
        reviews($title);
        break;
    case 'books':
        books();
        break;
    default:
        books();
        break;
}

function info($book){
    $path="books/$book/info.txt";
    $txt=file($path);
    $output=array("title" => $txt[0], "author" => $txt[1], "stars"=>$txt[2]);
    $json=json_encode($output);
    echo($json);
}
    
function description($book){
    $path="books/$book/description.txt";
    $txt=implode("",file($path));
    echo($txt);
}

function reviews($book){
    $xml="";
    foreach (glob("books/$book/review*.txt") as $filename) {
        $name=file($filename)[0];
        $stars=file($filename)[1];
        $review=file($filename)[2];
        $output="<h3>$name<span>$stars</span></h3>\n <p>$review</p>\n";
        $xml=$xml.$output;
    }
    echo($xml);
}
function books(){
    $xml="<books>\n";
    foreach (glob("books/*") as $filename){
        $title=rtrim(file("$filename/info.txt")[0]);
        $output="\t <book>\n";
        $output=$output."\t\t <title>$title</title>\n";
        $output=$output."\t\t <folder>$filename</folder>\n";
        $output=$output."\t </book>\n";
        $xml=$xml.$output;
    }
    $xml=$xml."</books>";
    echo($xml);
}
?>

