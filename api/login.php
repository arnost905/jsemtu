<?php

$allowedOrigins = [
    "http://localhost:5173",
    "https://jsemtu.pmr.band",
    "https://jskod.cz"
];

if (
    isset($_SERVER["HTTP_ORIGIN"]) &&
    in_array($_SERVER["HTTP_ORIGIN"], $allowedOrigins)
) {
    header("Access-Control-Allow-Origin: " . $_SERVER["HTTP_ORIGIN"]);
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

$file = __DIR__ . "/../data/users.json";

$users = json_decode(file_get_contents($file), true);

$data = json_decode(file_get_contents("php://input"), true);



$username = $data["username"] ?? "";
$password = $data["password"] ?? "";

foreach ($users as $user) {

    if (
        $user["username"] === $username &&
        $user["password"] === $password
    ) {

        echo json_encode([
            "success" => true,
            "user" => [
                "id" => $user["id"],
                "name" => $user["name"],
                "role" => $user["role"]
            ]
        ]);

        exit;
    }
}

echo json_encode([
    "success" => false,
    "message" => "Neplatné přihlašovací údaje."
]);