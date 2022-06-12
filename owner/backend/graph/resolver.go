package graph

import "github.com/plzfgme/infosec-competition-202206/db"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	owner   *db.Owner
	setList []string
}

func NewResolver(cfgPath string) (*Resolver, error) {
	cfg, err := db.ReadOwnerConfig(cfgPath)
	if err != nil {
		return nil, err
	}
	owner, err := db.NewOwner(cfg)
	if err != nil {
		return nil, err
	}
	return &Resolver{
		owner:   owner,
		setList: cfg.SetList,
	}, nil
}
