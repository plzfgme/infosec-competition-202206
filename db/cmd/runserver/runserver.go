package main

import (
	"log"
	"net"

	"github.com/plzfgme/infosec-competition-202206/db"
	flag "github.com/spf13/pflag"
	"google.golang.org/grpc"
)

func main() {
	cfg := flag.StringP("config", "c", "", "server config")
	flag.Parse()
	serverCfg, err := db.ReadServerConfig(*cfg)
	if err != nil {
		log.Fatal(err)
	}
	server, err := db.NewServer(serverCfg)
	if err != nil {
		log.Fatal(err)
	}
	lis, _ := net.Listen("tcp", "127.0.0.1:15184")
	s := grpc.NewServer()
	db.RegisterServerServiceServer(s, server)
	log.Print("server running...")
	log.Fatal(s.Serve(lis))
}
