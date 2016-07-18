package mcmodel

import (
    "time"
    "gopkg.in/mgo.v2/bson"
)

type Move struct {
    Id          bson.ObjectId `json:"_id,omitempty" bson:"_id,omitempty"`
    MovesCountId string        `json:"MovesCountId,omitempty" bson:"MoveID"`
    StartTime   time.Time     `json:"StartTime,omitempty" bson:"StartTime"`
}

type Moves []Move