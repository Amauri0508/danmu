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
            foreach($server->connections as $fd){
                    $server->push($fd, $frame->data);
            }
        });
        $this->server->on('close', function ($ser, $fd) {
            echo "client {$fd} closed\n";
        });

        $this->server->start();
    }

}

new Server();




