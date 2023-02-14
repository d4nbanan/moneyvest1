<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';
	require 'phpmailer/src/SMTP.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);

	$mail->isSMTP();                                            //Send using SMTP
	$mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
	$mail->SMTPAuth   = true;                                   //Enable SMTP authentication
	$mail->Username   = 'danbanan902@gmail.com';                     //SMTP username
	$mail->Password   = 'qdrnnsrroumzityw';                               //SMTP password
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
	$mail->Port       = 465;                 


	//От кого письмо
	$mail->setFrom('danbanan902@gmail.com', 'moneyvestBOT');
	//Кому отправить
	$mail->addAddress('timurmuhammad1607@gmail.com');
	//Тема письма
	$mail->Subject = 'База данных MoneyVest';

	//Тело письма
	$body = '<h1>Данные клиента</h1>';
	
	if(trim(!empty($_POST['name']))){
		$body.='<p><strong>ФИО:</strong> '.$_POST['name'].'</p>';
	}
	if(trim(!empty($_POST['email']))){
		$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
	}
	if(trim(!empty($_POST['number']))){
		$body.='<p><strong>Номер телефона:</strong> '.$_POST['number'].'</p>';
	}
	if(trim(!empty($_POST['countries']))){
		$body.='<p><strong>Страна:</strong> '.$_POST['countries'].'</p>';
	}

	$mail->Body = $body;

	//Отправляем
	if (!$mail->send()) {
		$message = 'Ошибка';
	} else {
		$message = 'Данные отправлены!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>