<?php

if(isset($_POST['email']) && !empty($_POST['email'])){

    $nome = addslashes($_POST('nome'));
    $sobrenome = addslashes($_POST('sobrenome'));
    $email = addslashes($_POST('email'));


    $to = "p185770@dac.unicamp.br";
    $subject = "Convite para participação em pesquisa envolvendo Inteligência Artificial e Música";
    $body = "Nome: ".$nome."\r\n".
            "Sobrenome: ".$sobrenome."\r\n".    
            "Email: ".$email;

    $header = "From:p185770@dac.unicamp.br"."\r\n\ "
                ."Reply-To: ".$email."\r\n "
                ."X=Mailer:PHP/".phpversion();

    if(mail($to,$subject,$body,$header)){
        echo("Email enviado com sucesso!");
    }else {
        echo("O Email não pode ser enviado");
    }
}
?>

