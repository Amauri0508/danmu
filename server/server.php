<?php

class Server{

    public $server;

    public function __construct()
    {
        $this->server = new swoole_websocket_server("0.0.0.0", 9501);
        $this->server->on('open', function (swoole_websocket_server $server, $request) {
            echo "server: handshake success with fd{$request->fd}\n";
        });
        $this->server->on('message', function (swoole_websocket_server $server, $frame) {
            echo "receive from {$frame->fd} : {$frame->data}\n";
            //遍历所有连接，循环广播
            print_r($server->connections);
            foreach($server->connections as $fd){
                //如果是某个客户端，自己发的则加上isnew属性，否则不加
                if($frame->fd == $fd){
                    $server->push($frame->fd, $frame->data.',"isnew":""');
                }else{
                    $server->push($fd, $frame->data);
                }
            }
        });
        $this->server->on('close', function ($ser, $fd) {
            echo "client {$fd} closed\n";
        });

        $this->server->start();
    }

}

new Server();




