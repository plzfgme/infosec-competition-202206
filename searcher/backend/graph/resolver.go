package graph

import "github.com/plzfgme/infosec-competition-202206/db"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	searcher *db.Searcher
	cfg      *db.SearcherConfig
}

func NewResolver(cfgPath string) (*Resolver, error) {
	searcherCfg, err := db.ReadSearcherConfig(cfgPath)
	if err != nil {
		return nil, err
	}
	searcher, err := db.NewSearcher(searcherCfg)
	if err != nil {
		return nil, err
	}

	return &Resolver{
		searcher: searcher,
		cfg:      searcherCfg,
	}, nil
}
