package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/plzfgme/infosec-competition-202206/searcher/backend/graph"
	"github.com/plzfgme/infosec-competition-202206/searcher/backend/graph/generated"
	flag "github.com/spf13/pflag"
)

func main() {
	cfgPath := flag.StringP("config", "c", "", "search config path")
	port := flag.StringP("addr", "a", "8082", "local ui port")
	flag.Parse()

	r, err := graph.NewResolver(*cfgPath)
	if err != nil {
		log.Fatal(err)
	}

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: r}))

	exePath, err := os.Executable()
	if err != nil {
		log.Fatal(err)
	}
	staticPath := filepath.Join(filepath.Dir(exePath), "static")
	http.Handle("/", http.FileServer(http.Dir(staticPath)))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for user interface", *port)
	log.Fatal(http.ListenAndServe(":"+*port, nil))
}
