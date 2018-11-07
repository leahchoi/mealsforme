<?php

header("Access-Control-Allow-Origin: *");


if(empty($_GET)){
    exit('Invalid Search');
}

require_once('mysql_server_connect.php');

if($conn->connect_error){
    die("failed to connect to MYSQL: (" . $conn->connect_errorno .") " . $conn->connect_error);
}
// FUNCTION TO REPLACE GET_RESULTS()
function fetchAssocStatement($stmt){
    if ($stmt->num_rows > 0) {
        $result = array();
        $md = $stmt->result_metadata();
        $params = array();
        while ($field = $md->fetch_field()) {
            $params[] = &$result[$field->name];
        }
        call_user_func_array(array($stmt, 'bind_result'), $params);
        if ($stmt->fetch()) {
            return $result;
        }
        return null;
    }
}
//SWITCH STATEMENT TO DIRECT WHICH QUERY TO USE AND GET SEARCH RESULTS
$countPost = count($_GET);
switch ($countPost){
    case 2:
        $ingredientOne = '%'.addslashes($_GET['one']).'%';
        $numOfResults = 24*intval($_GET['page']);
        $queryForOne = '
SELECT *
FROM `recipes`
WHERE `recipes`.`Ingredients` LIKE (?)
GROUP BY `recipes`.`ID`
ORDER BY `recipes`.`likes` DESC LIMIT 24 OFFSET '. $numOfResults;


        if($stmt = $conn->prepare($queryForOne)){
            $stmt->bind_param('s', $ingredientOne);
            $stmt->execute();
            $stmt->store_result();
            while ($row = fetchAssocStatement($stmt)){
                $results[] = $row;
            }
            $jsonOutput = json_encode($results);
            print_r($jsonOutput);
            $stmt->close();
        }
        break;

    case 3:
        $ingredientOne = '%'.addslashes($_GET['one']).'%';
        $ingredientTwo = '%'.addslashes($_GET['two']).'%';
        $numOfResults = 24*intval($_GET['page']);

        $queryForTwo = '
SELECT *
FROM `recipes`
WHERE (`recipes`.`Ingredients` LIKE (?)
AND `recipes`.`Ingredients` LIKE (?))
GROUP BY `recipes`.`ID`
ORDER BY `recipes`.`likes` DESC LIMIT 24 OFFSET '. $numOfResults;


        if($stmt = $conn->prepare($queryForTwo)){
            $stmt->bind_param('ss', $ingredientOne,$ingredientTwo);
            $stmt->execute();
            $stmt->store_result();

            while ($row = fetchAssocStatement($stmt)){
                $results[] = $row;
            }
            $jsonOutput = json_encode($results);
            print_r($jsonOutput);
            $stmt->close();
        }
        break;

    case 4:
        $ingredientOne = '%'.addslashes($_GET['one']).'%';
        $ingredientTwo = '%'.addslashes($_GET['two']).'%';
        $ingredientThree = '%'.addslashes($_GET['three']).'%';
        $numOfResults = 24*intval($_GET['page']);

        $queryForThree = '
SELECT *
FROM `recipes`
WHERE (`recipes`.`Ingredients` LIKE (?)
AND `recipes`.`Ingredients` LIKE (?)
AND `recipes`.`Ingredients` LIKE (?))
GROUP BY `recipes`.`ID`
ORDER BY `recipes`.`likes` DESC LIMIT 24 OFFSET ' . $numOfResults ;

        if($stmt = $conn->prepare($queryForThree)){
            $stmt->bind_param('sss', $ingredientOne,$ingredientTwo,$ingredientThree);
            $stmt->execute();
            $stmt->store_result();
            while ($row = fetchAssocStatement($stmt)){
                $results[] = $row;
            }
            $jsonOutput = json_encode($results);
            print_r($jsonOutput);
            $stmt->close();
        }
        break;

    default:
        die('invalid search parameters');
}
$conn->close();
?>




