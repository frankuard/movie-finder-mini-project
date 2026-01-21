
<?php

header('Content-Type: application/json');


if(isset($_GET['q'])){
    $Title = $_GET['q'];
}
else{
    $Title = '';
}

if(!$Title){
    echo json_encode([]);
    exit;
}

    $API_KEY = "6546b110";
    $TitleEncoded = urlencode($Title);
    $searchUrl = "https://www.omdbapi.com/?apikey=$API_KEY&s=$TitleEncoded";
    $response = @file_get_contents($searchUrl);

    if(!$response){
    echo json_encode([]);
    exit;
}
    $data = json_decode($response, true); 

if(!$data || !isset($data['Search'])){
    echo json_encode([]);
    exit;
}

$fullMovies  = [];



foreach ($data['Search'] as $movie){
$imdb =$movie['imdbID'];

$detailsUrl="https://www.omdbapi.com/?apikey=$API_KEY&i=". urlencode($imdb);
$detailsResponse = @file_get_contents($detailsUrl);
$details = json_decode($detailsResponse, true);
if ($details) 
$fullMovies[] = $details;
    }
    
echo json_encode($fullMovies);


 



?>




  

    