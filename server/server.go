package main

import (
	"net/http"

	"github.com/adpeters/movescount2/server/routes"
	"github.com/labstack/echo"
	"github.com/labstack/echo/engine/standard"
	"github.com/labstack/echo/middleware"
)

// Handler
func hello(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}

func main() {
	// Echo instance
	e := echo.New()
	
	// Set up routes
	routes.Init(e)

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Static("/static", "static")

	// Start server
	e.Run(standard.New(":1323"))
}
