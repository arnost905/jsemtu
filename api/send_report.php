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

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

$config = require "config.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . "/PHPMailer/src/Exception.php";
require __DIR__ . "/PHPMailer/src/PHPMailer.php";
require __DIR__ . "/PHPMailer/src/SMTP.php";

$mail = new PHPMailer(true);

try {

    $mail->isSMTP();
    $mail->Host = $config["smtp"]["host"];
    $mail->SMTPAuth = true;
    $mail->Username = $config["smtp"]["username"];
    $mail->Password = $config["smtp"]["password"];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = $config["smtp"]["port"];

    $mail->CharSet = "UTF-8";

    $mail->setFrom(
        $config["mail"]["from"],
        "JsemTu"
    );

    $mail->addAddress(
        $config["mail"]["to"]
    );

    $mail->Subject = "JsemTu – kontrola formátu exportu";

$mail->Body = "Dobrý den,

v příloze zasílám zkušební export z aplikace JsemTu.

Prosím o kontrolu, zda je tento formát vhodný pro další zpracování.

Pokud bude potřeba upravit názvy sloupců nebo obsah exportu, dejte mi prosím vědět.

Děkuji.

--
Tento e-mail byl automaticky vytvořen aplikací JsemTu.";

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

$mail->addStringAttachment(

    $csv,

    "JsemTu_" . date("Y-m-d_H-i") . ".csv",

    "base64",

    "text/csv"
);

    $mail->send();

    echo json_encode([
        "success" => true
    ]);

} catch (Exception $e) {

    echo json_encode([
        "success" => false,
        "error" => $mail->ErrorInfo
    ]);

}