<?php

header('Content-Type: application/json');


$servername="localhost";
$username= "root";
$password="";
$conn = mysqli_connect($servername,$username,$password);


$createDatabase = "CREATE DATABASE IF NOT EXISTS Movie_Database";

mysqli_query($conn, $createDatabase);
    

mysqli_select_db($conn, 'Movie_Database');


$createTable = "CREATE TABLE IF NOT EXISTS movie_list (
    ID int AUTO_INCREMENT PRIMARY KEY,
    IMDB_ID varchar(100) UNIQUE,
    Title varchar(100) ,
    Genre varchar(100) ,
    Director varchar(100) ,
    Actors varchar(100) ,
    Poster varchar(100) ,
    IMDB_Rating varchar(100) 
   
);";

mysqli_query($conn, $createTable);

$input = json_decode(file_get_contents('php://input'), true);


$IMDB_ID = $input['imdbID'];
$Title = $input['Title'];
$Genre = $input['Genre'];
$Director =$input['Director'];
$Actors =$input['Actors'];
$Poster =$input['Posters'];
$IMDB_Rating =$input['imdbRating'];

$insertData = "INSERT IGNORE INTO movie_list ( 
    IMDB_ID,Title,Genre,Director,Actors,Poster,IMDB_Rating)
        VALUES ('$IMDB_ID','$Title','$Genre','$Director', '$Actors', '$Poster', '$IMDB_Rating')";

mysqli_query($conn, $insertData);



?>

