package mccontroller

import (
    "fmt"
    "log"
	"github.com/labstack/echo"
	"net/http"
    "gopkg.in/mgo.v2"
    "gopkg.in/mgo.v2/bson"
)

func GetAll(c echo.Context) error {
    session, err := mgo.Dial("localhost:27017")
    if err != nil {
            panic(err)
    }
    defer session.Close()

    // Optional. Switch the session to a monotonic behavior.
    session.SetMode(mgo.Monotonic, true)

    conn := session.DB("movescount").C("moves")

    var result []bson.M

    iter := conn.Find(nil).Limit(100000).Iter()
    err = iter.All(&result)
    if (err != nil) {
        log.Fatal(err)
    }

    retStr := ""
    for i, elem := range result {
        if str, ok := elem["MoveID"].(string); ok {
            /* act on str */
            retStr += str
        }
        fmt.Println(i, elem["MoveID"])
    }

	return c.JSON(http.StatusOK, retStr)
}
