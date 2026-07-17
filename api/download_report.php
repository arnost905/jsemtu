<?php

$allowedOrigins = [
    "http://localhost:5173",
    "http://172.18.1.240:5173",
    "http://172.18.1.240",
    "https://jsemtu.pmr.band",
    "https://jskod.cz"
];

if (
    isset($_SERVER["HTTP_ORIGIN"]) &&
    in_array($_SERVER["HTTP_ORIGIN"], $allowedOrigins)
) {
    header("Access-Control-Allow-Origin: " . $_SERVER["HTTP_ORIGIN"]);
}

header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

header("Content-Type: text/csv; charset=utf-8");
header(
    "Content-Disposition: attachment; filename=JsemTu_" .
    date("Y-m-d_H-i") .
    ".csv"
);

$data = json_decode(
    file_get_contents(__DIR__ . "/../data/employees.json"),
    true
);

$dny = [
    "Sunday" => "Neděle",
    "Monday" => "Pondělí",
    "Tuesday" => "Úterý",
    "Wednesday" => "Středa",
    "Thursday" => "Čtvrtek",
    "Friday" => "Pátek",
    "Saturday" => "Sobota"
];

$den = $dny[date("l")];

$csv  = "GSAgency v.o.s.\n";
$csv .= "JsemTu - Denní přehled\n";
$csv .= "Datum;" . date("d.m.Y") . "\n";
$csv .= "Den;" . $den . "\n\n";
$csv .= "Čas exportu;" . date("H:i") . "\n\n";
$csv .= "Zaměstnanec;Práce;Lékař;Dovolená;Nemoc;Péče;Služební cesta;Celkem\n";

foreach ($data as $employee) {

    $counts = [
        "work" => 0,
        "doctor" => 0,
        "holiday" => 0,
        "sickness" => 0,
        "family" => 0,
        "businessTrip" => 0,
    ];

    foreach ($employee["hours"] as $status) {
        if (isset($counts[$status])) {
            $counts[$status]++;
        }
    }

    $total = array_sum($counts);

    $csv .= implode(";", [
        $employee["name"],
        $counts["work"] ?: "",
        $counts["doctor"] ?: "",
        $counts["holiday"] ?: "",
        $counts["sickness"] ?: "",
        $counts["family"] ?: "",
        $counts["businessTrip"] ?: "",
        $total
    ]);

    $csv .= "\n";
}

echo $csv;
exit;