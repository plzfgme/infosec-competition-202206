package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"time"

	"github.com/plzfgme/infosec-competition-202206/searcher/backend/graph/generated"
	"github.com/plzfgme/infosec-competition-202206/searcher/backend/graph/model"
)

func (r *queryResolver) SearchA(ctx context.Context, id string, timeA string, timeB string) ([]*model.SearchAResult, error) {
	newTimeA, err := time.Parse(time.RFC3339, timeA)
	if err != nil {
		return nil, err
	}
	newTimeB, err := time.Parse(time.RFC3339, timeB)
	if err != nil {
		return nil, err
	}
	result := make([]*model.SearchAResult, 0)
	res, err := r.Resolver.searcher.FindA(ctx, r.cfg.Keys.Set, id, newTimeA, newTimeB)
	if err != nil {
		return nil, err
	}
	for _, doc := range res {
		result = append(result, &model.SearchAResult{
			Location: doc.Location,
			Time:     doc.Time.Format(time.RFC3339),
		})
	}

	return result, nil
}

func (r *queryResolver) Set(ctx context.Context) (string, error) {
	return r.cfg.Keys.Set, nil
}

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
