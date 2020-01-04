<?php
    if(isset($_POST['data'])) {
        $userName = $_POST['data'][0]['userName'];
        $questions = $_POST['data'][0]['questions'];
        $list = array();

        if (!file_exists($filename)) {
            $list = array (
                array('Nazwa użytkownika', 'Numer pytania', 'Czas od pojawienia się zadania do pierwszego kliknięcia', 'Czas od ostatniego kliknięcia do przejęcia do następnego zadania', 'Całkowity czas', 'Wynik', 'Maksymalny wynik'),
            );
        }

        foreach($questions as $question) {
            $list[] = array($userName, $question["questionNo"], $question["firstQuestionTime"], $question["lastQuestionTime"], $question["totalTime"], $question["score"], $question["totalScore"]);
        }
        
        $fp = fopen('report.csv', 'a');
        
        foreach ($list as $fields) {
            fputcsv($fp, $fields);
        }
        
        fclose($fp);
    }