<?php
    class Order {
        var $id;
        var $buyer_id;
        var $buyer_name;
        var $saler_id;
        var $saler_name;
        var $store_id;
        var $store_name;
        var $product_id;
        var $product_name;
        var $product_icon;
        var $product_price;
        var $product_size;
        var $product_color;
        var $product_count;
        var $create_time;

        function __construct($par1, $par2, $par3, $par4, $par5, $par6, $par7, $par8, $par9, $par10, $par11, $par12, $par13, $par14, $par15) {
            $this->id = $par1;
            $this->buyer_id = $par2;
            $this->buyer_name = $par3;
            $this->buyer_name = $par4;
            $this->saler_id = $par5;
            $this->saler_name = $par6;
            $this->store_name = $par7;
            $this->product_id = $par8;
            $this->product_name = $par9;
            $this->product_icon = $par10;
            $this->product_price = $par11;
            $this->product_size = $par12;
            $this->product_color = $par13;
            $this->product_count = $par14;
            $this->create_time = $par15;
        }
    }
    class Wish {
        var $id;
        var $cart_id;
        var $buyer_id;
        var $buyer_name;
        var $store_id;
        var $store_name;
        var $product_id;
        var $product_name;
        var $product_icon;
        var $product_size;
        var $product_color;
        var $product_count;
        var $product_price;

        function __construct($par1, $par2, $par3, $par4, $par5, $par6, $par7, $par8, $par9, $par10, $par11, $par12, $par13) {
            $this->id = $par1;
            $this->cart_id = $par2;
            $this->buyer_id = $par3;
            $this->buyer_name = $par4;
            $this->store_id = $par5;
            $this->store_name = $par6;
            $this->product_id = $par7;
            $this->product_name = $par8;
            $this->product_icon = $par9;
            $this->product_size = $par10;
            $this->product_color = $par11;
            $this->product_count = $par12;
            $this->product_price = $par13;
        }
    }

    class WishWrap {
        var $store_id;
        var $store_name;
        var $products;

        function __construct($par1, $par2, $par3) {
            $this->store_id = $par1;
            $this->store_name = $par2;
            $this->products = $par3;
        }
    }
    class Banner {
        var $img;
        var $link;

        function __construct($par1, $par2) {
            $this->img = $par1;
            $this->link = $par2;
        }
    }
    class Category {
        var $department_name;
        var $icon;
        var $types;
        var $produts;
        function __construct($par1, $par2, $par3, $par4) {
            $this->department_name = $par1;
            $this->icon = $par2;
            $this->types = $par3;
            $this->produts = $par4;
        }
    }
    class Store {
        var $id;
        var $owner_id;
        var $store_name;

        function __construct($par1, $par2, $par3) {
            $this->id = $par1;
            $this->owner_id = $par2;
            $this->store_name = $par3;
        }
    }
    class ListResult {
        var $count;
        var $list;
        function __construct($par1, $par2) {
            $this->count = $par1;
            $this->list = $par2;
        }
    }
    class Product {
        var $id;
        var $store_id;
        var $department;
        var $type;
        var $product_name;
        var $product_icon;
        var $product_content_img;
        var $product_size;
        var $product_price;
        var $product_color;
        var $product_detail;
        var $create_time;
        var $update_time;

        function __construct($par1, $par2, $par3, $par4, $par5, $par6, $par7, $par8, $par9, $par10, $par11, $par12, $par13) {
            $this->id = $par1;
            $this->store_id = $par2;
            $this->department = $par3;
            $this->type = $par4;
            $this->product_name = $par5;
            $this->product_icon = $par6;
            $this->product_content_img = $par7;
            $this->product_size = $par8;
            $this->product_price = $par9;
            $this->product_color = $par10;
            $this->product_detail = $par11;
            $this->create_time = $par12;
            $this->update_time = $par13;
        }
    }
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