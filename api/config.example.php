<?php

return [
    "smtp" => [
        "host" => "mail.na-net.cz",
        "port" => 587,
        "username" => "user@example.com",
        "password" => "",
        "secure" => "tls"
    ]
];

$config = require "config.php";

$mail->Host = $config["smtp"]["host"];
$mail->Port = $config["smtp"]["port"];
$mail->Username = $config["smtp"]["username"];
$mail->Password = $config["smtp"]["password"];