<?php

require __DIR__ . '/vendor/autoload.php';

$nome  = addslashes($_POST('nome'));
$sobrenome = addslashes($_POST('sobrenonome'));
$emailaddress = addslashes($_POST('email'));

echo($emailaddress);

$bodytext = 
'Olá.

Você foi convidado(a) a participar de uma pesquisa referente ao projeto “Geração e análise de músicas com base em dados de classificação emocional usando aprendizado de máquinas”. Antes de participar da pesquisa, você deve ler e assinar o Termo de Consentimento Livre e Esclarecido (TCLE) que está anexo a este email.

Durante a pesquisa, serão avaliados modelos de aprendizado de máquinas capazes de gerar automaticamente excertos musicais condicionados por valores de estímulo emocional. Para tal, é necessário que você responda a perguntas relacionadas a certos aspectos musicais relevantes das amostras geradas por estes. Ao todo, serão avaliadas 12 amostras musicais. Pedimos que você responda a TODAS as perguntas. Caso contrário, pode interromper o questionário a qualquer momento sem nenhum tipo de consequência.

Caso decida fazer parte da pesquisa, envie o TCLE assinado para o email p185770@dac.unicamp.br, e um link para a pesquisa será enviado a você.

Agradecemos o interesse na pesquisa e o tempo cedido.';


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$email = new PHPMailer();
$email->SetFrom('p185770@dac.unicamp.br', 'Pedro Neves'); //Name is optional
$email->Subject   = 'Convite para participação em pesquisa envolvendo Inteligência Artificial e Música';
$email->Body      = $bodytext;
$email->AddAddress( $emailaddress );

$file_to_attach = '/tcle.pdf';

$email->AddAttachment( $file_to_attach , 'tcle.pdf' );

return $email->Send();
?>