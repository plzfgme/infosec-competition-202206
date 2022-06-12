package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"encoding/json"
	"time"

	"github.com/plzfgme/infosec-competition-202206/db"
	"github.com/plzfgme/infosec-competition-202206/owner/backend/graph/generated"
	"github.com/plzfgme/infosec-competition-202206/owner/backend/graph/model"
)

func (r *mutationResolver) Insert(ctx context.Context, records []*model.Record) (string, error) {
	newRecs := make([]*db.Record, len(records))
	for i, rec := range records {
		t, err := time.Parse(time.RFC3339, rec.Time)
		if err != nil {
			return err.Error(), err
		}
		newRecs[i] = &db.Record{
			UserId:   rec.ID,
			Location: rec.Location,
			Time:     t,
			Set:      rec.Set,
		}
	}
	err := r.Resolver.owner.Insert(ctx, newRecs)
	if err != nil {
		return err.Error(), err
	}
	return "Ok", nil
}

func (r *queryResolver) SearchB(ctx context.Context, location string, timeA string, timeB string) ([]*model.SearchBResult, error) {
	newTimeA, err := time.Parse(time.RFC3339, timeA)
	if err != nil {
		return nil, err
	}
	newTimeB, err := time.Parse(time.RFC3339, timeB)
	if err != nil {
		return nil, err
	}
	result := make([]*model.SearchBResult, 0)
	for _, set := range r.Resolver.setList {
		res, err := r.Resolver.owner.FindB(ctx, set, location, newTimeA, newTimeB)
		if err != nil {
			return nil, err
		}
		for _, doc := range res {
			result = append(result, &model.SearchBResult{
				ID: doc.UserId,
			})
		}
	}
	return result, nil
}

func (r *queryResolver) Delegate(ctx context.Context, set string) (string, error) {
	dk, err := r.owner.DelegateKeys(set)
	if err != nil {
		return "", err
	}
	bdk, err := json.Marshal(dk)
	if err != nil {
		return "", err
	}
	return string(bdk), nil
}

func (r *queryResolver) GenConfig(ctx context.Context, set string) (string, error) {
	return r.owner.GenSearcherConfig(set)
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
