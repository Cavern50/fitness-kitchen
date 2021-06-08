<?
function sendMail($data)
{
    $to = "inbox@auto-chayka.ru";
    $subject = "Заявка с сайта."; 

    $message = `
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
    </head>
    <body>`;

    $message .= "ФИО: ".$data["name"];
    $message .= "<br>";
    $message .= "дата: ".$data["date"];
    $message .= "<br>";
    $message .= "телефон: ".$data["phone"];
    $message .= "<br>";
    $message .= "email: ".$data["email"];
    $message .= "<br>";
    $message .= "Письмо сгенерировано автоматически.";

    $message .= `
    </body>
    </html>`;

    $headers = 
        "From: info@" . $_SERVER["HTTP_HOST"] . "\r\n" .
        "Reply-To: inbox@auto-chayka.ru" . "\r\n" .
        "Content-type: text/html; charset=UTF-8". "\r\n" .
        "X-Mailer: PHP/" . phpversion();

    $resSend = mail($to, $subject, $message, $headers);

    if($resSend)
    {
        return array("status" => "Ваша заявка успешно отправлена.");
    }
    else
    {
        return array("status" => "Произошла ошибка, попробуйте, пожалуйста, позже.");
    }
}

function validate($data)
{
    $errors = array();

    // Имя
    if(!isset($data["name"]) || strlen($data["name"]) == 0)
    {
        $errors["name"] = "Укажите Ваше ФИО.";
    }
    
    // Телефон
    if(!isset($data["phone"]) || strlen($data["phone"]) == 0)
    {
        $errors["phone"] = "Укажите Ваш телефон.";
    }
    else
    {
        if(!preg_match("/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/", $data["phone"]))
        {
            $errors["phone"] = "Введен некорректный номер телефона.";
        }
    }

    // E-mail
    if(!isset($data["email"]) || strlen($data["email"]) == 0)
    {
        $errors["email"] = "Укажите Ваш E-mail.";
    }
    else
    {
        if(!filter_var($data["email"], FILTER_VALIDATE_EMAIL))
        {
            $errors["email"] = "Введен некорректный E-mail.";
        }
    }

    // Дата
    if(!isset($data["date"]) || strlen($data["date"]) == 0)
    {
        $errors["date"] = "Укажите дату начала обучения";
    }


    return $errors;
}

$errors = validate($_POST);

header("Content-type: application-json; charset=UTF-8");
if(count($errors) == 0)
{
    $resSend = sendMail($_POST);
    echo json_encode($resSend);
}
else
{
    echo json_encode($errors);
}
?>

