<?php

require_once('mysql_connect.php');

$ch = curl_init();

$randomIngredient = rand(1, 1000000);

$url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' . $randomIngredient . '/information';

curl_setopt($ch, CURLOPT_URL, $url);

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
'X-Mashape-Key: d5nUBNnVnGmshBtJT6cj4FVln0Rfp10wqLgjsnMZpzV7REGknF',
'X-Mashape-Host: spoonacular-recipe-food-nutrition-v1.p.mashape.com'
));

curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$output = curl_exec($ch);

curl_close($ch);

if ($output === false) {
    echo 'cURL Error';
} else {
    $decoded = json_decode($output, true);
}

$dishID = $decoded['id'];

if(empty($dishID)) {
    echo 'dish did not exist';
}
$dishScore = $decoded['spoonacularScore'];
$dishName = addslashes($decoded['title']);
$dishTimeToCook = $decoded['readyInMinutes'];
$dishServings = $decoded['servings'];
$dishImage = addslashes($decoded['image']);
$dishInstructions = $decoded['analyzedInstructions'];
$extendedIngredients = $decoded["extendedIngredients"];
$dishLikes = $decoded["aggregateLikes"];

$vegetarian = $decoded['vegetarian'];
if ($vegetarian) {
    $vegetarian = 1;
} else {
    $vegetarian = 0;
}
$vegan = $decoded['vegan'];
if ($vegan) {
    $vegan = 1;
} else {
    $vegan = 0;
}
$glutenFree = $decoded['glutenFree'];
if ($glutenFree) {
    $glutenFree = 1;
} else {
    $glutenFree = 0;
}
$dairyFree = $decoded['dairyFree'];
if ($dairyFree) {
    $dairyFree = 1;
} else {
    $dairyFree = 0;
}
$healthScore = $decoded['healthScore'];
$diets = $decoded['diets'];
$winePairing = $decoded['winePairing'];

$jsonInstructions = addslashes(json_encode($dishInstructions));
$jsonIngredients = addslashes(json_encode($extendedIngredients));
$jsonWinePairing = addslashes(json_encode($winePairing));
$jsonDiets = addslashes(json_encode($diets));

if (!$conn) {
    die("Connection Failed: " . mysqli_connect_error());
}

$recipeQuery = "
REPLACE INTO 
`recipes`(
`ID`, `Score`, `Name`, `Time`, `Servings`, `Image`, 
`Instructions`, `Ingredients`, `vegetarian`, `vegan`, 
`glutenfree`, `dairyfree`, `likes`, `healthscore`, `diets`, `winepairings`) VALUES (
$dishID,$dishScore,'$dishName',$dishTimeToCook,$dishServings,
'$dishImage','$jsonInstructions','$jsonIngredients',$vegetarian,$vegan,
$glutenFree,$dairyFree,$dishLikes,$healthScore,'$jsonDiets','$jsonWinePairing'
)";

if (mysqli_query($conn, $recipeQuery)) {
    print( $dishID . ' ' . $dishName);
} else {
    echo "Error Recipes: " . $recipeQuery . '<br>' . mysqli_error($conn);
    //echo 'error';
}

for ($i = 0; $i < count($extendedIngredients); $i++) {
    $eachIngredientID = $decoded["extendedIngredients"][$i]['id'];
    $eachIngredientName = addslashes($decoded["extendedIngredients"][$i]['name']);
    $ingredientsQuery = "
REPLACE INTO `ingredients`(`ingredient_ID`, `ingredient_name`) VALUES ($eachIngredientID,'$eachIngredientName')";

    if (mysqli_query($conn, $ingredientsQuery)) {
        echo " ";
    } else {
        echo "Error Ingredients: " . $ingredientsQuery . '<br>' . mysqli_error($conn);
    }
}

for ($x = 0; $x < count($extendedIngredients); $x++) {
    $eachIngredientID = $decoded["extendedIngredients"][$x]['id'];
    $eachIngredientName = addslashes($decoded["extendedIngredients"][$x]['name']);

    $recipeIngredientQuery = "
REPLACE INTO `recipe_ingredients`(`recipe_ID`, `ingredient_ID`, `Name`, `Image_url`) 
VALUES (
$dishID,$eachIngredientID,'$dishName','$dishImage'
)";
    if (mysqli_query($conn, $recipeIngredientQuery)) {
        echo " ";
    } else {
        echo "Error REC ING: " . $recipeIngredientQuery . '<br>' . mysqli_error($conn);
    }
}

mysqli_close($conn);

?>