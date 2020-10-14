<?php
    class Response {
        var $data;
        var $status;
        function __construct($par1, $par2) {
            $this->data = $par1;
            $this->status = $par2;
        }
    }
    class Status {
        var $code;
        var $msg;
        function __construct($par1, $par2) {
            $this->code = $par1;
            $this->msg = $par2;
        }
    }

    class User {
        var $id;
        var $legalName;
        var $phone;
        var $email;
        var $address;
        var $nickname;

        function __construct($par1, $par2, $par3, $par4, $par5, $par6) {
            $this->id = $par1;
            $this->legalName = $par2;
            $this->phone = $par3;
            $this->address = $par4;
            $this->nickname = $par5;
            $this->email = $par6;
        }
    }

    class UserCooike {
        var $LOGINSSEIONID;
        var $user;

        function __construct($par1, $par2) {
            $this->LOGINSSEIONID = $par1;
            $this->user = $par2;
        }
    }

    function console_log($output, $with_script_tags = true) {
        $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . ');';
        if ($with_script_tags) {
            $js_code = '<script>' . $js_code . '</script>';
        }
        echo $js_code;
    }
    function JSON_STRING_NOECHO($par) {
        $json = json_encode($par);
        if ($json === false) {
            // Avoid echo of empty string (which is invalid JSON), and
            // JSONify the error message instead:
            $json = json_encode(["jsonError" => json_last_error_msg()]);
            if ($json === false) {
                // This should not happen, but we go all the way now:
                $json = '{"jsonError":"unknown"}';
            }
            // Set HTTP response status code to: 500 - Internal Server Error
            http_response_code(500);
        }
        return $json;
    }
    function JSON_STRING($par) {
        $json = json_encode($par);
        if ($json === false) {
            // Avoid echo of empty string (which is invalid JSON), and
            // JSONify the error message instead:
            $json = json_encode(["jsonError" => json_last_error_msg()]);
            if ($json === false) {
                // This should not happen, but we go all the way now:
                $json = '{"jsonError":"unknown"}';
            }
            // Set HTTP response status code to: 500 - Internal Server Error
            http_response_code(500);
        }
        echo $json;
    }

    $user = 'root';
    $password = 'root';
    $db = 'ding_database';
    $host = 'localhost';
    $port = 8889;
?>