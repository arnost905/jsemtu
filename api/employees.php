<?php

$allowedOrigins = [
    "http://localhost:5173",
    "https://jsemtu.pmr.band",
    "https://jskod.cz"
];

if (isset($_SERVER['HTTP_ORIGIN']) &&
    in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {

    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}
$file = __DIR__ . '/../data/employees.json';
if (!file_exists($file)) {
    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "employees.json nebyl nalezen."
    ]);

    exit;
}
switch ($_SERVER['REQUEST_METHOD']) {

    case 'GET':
        echo file_get_contents($file);
        break;

    case 'POST':

    $json = file_get_contents("php://input");

    if ($json === false) {

        http_response_code(400);

        echo json_encode([
            "success" => false
        ]);

        exit;
    }

    if (file_put_contents($file, $json) === false) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Nepodařilo se uložit data."
    ]);

    exit;
}

echo json_encode([
    "success" => true
]);

    break;
}