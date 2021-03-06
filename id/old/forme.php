<?php
    echo "<pre>";

        $userName = $POST["nome"];
        $userLastName = $POST["sobrenome"];
        $userEmail = $POST["email"];
        
        $to = "pedro_ltn@outlook.com";
        $body = "";

        $body .= "Nome: " .$userName. "\r\n";
        $body .= "Sobrenome: " .$userLastName. "\r\n";
        $body .= "Email: " .$userEmail. "\r\n";

        mail($to, $messageSubject, $body);

    echo "<pre>";
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel='stylesheet' type='text/css' href='form.css' media=''>
    <title>Cadastro</title>
</head>
<body>
    <div>
        <h1 id="título">
            Cadastro para participação em pesquisa.
        </h1>
        <p id="subtítulo">
            Por favor, insira suas informações.
        </p>
        <br>
    </div>

    <form action='https://formspree.io/f/mdobegjj' method='post' id='form1'>
        <fieldset classe="grupo">
            <div class = "campo">
                <label for="nome">Nome</label>
                <input type="text" name = "nome" id = "nome" required>
            </div>

            <div class = "campo">
                <label for="sobrenome">Sobrenome</label>
                <input type="text" name = "sobrenome" id = "sobrenome" required>
            </div>
            
        </fieldset>

        <div class="campo">
            <label for="email">Email</label>
            <input type="email" name = "email" id = "email" required>
        </div>

        <button type="submit" class="botao-submit">Enviar</button>
    </form>
    <div id='status'></div>
    <script src='./main.js'></script>
</body>
</html>
