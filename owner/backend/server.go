package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/plzfgme/infosec-competition-202206/owner/backend/graph"
	"github.com/plzfgme/infosec-competition-202206/owner/backend/graph/generated"
	flag "github.com/spf13/pflag"
)

const defaultPort = "8081"

func main() {
	cfgPath := flag.StringP("config", "c", "", "config path")
	flag.Parse()
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}
	r, err := graph.NewResolver(*cfgPath)
	if err != nil {
		log.Fatal(err)
	}

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: r}))

	// http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/", http.FileServer(http.Dir("../frontend/dist")))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
