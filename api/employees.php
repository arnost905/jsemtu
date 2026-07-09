<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}
$file = __DIR__ . '/../data/employees.json';

switch ($_SERVER['REQUEST_METHOD']) {

    case 'GET':
        echo file_get_contents($file);
        break;

    case 'POST':
        $json = file_get_contents("php://input");
        file_put_contents($file, $json);
        echo json_encode(["success" => true]);
        break;
}