package routes

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/adpeters/movescount2/server/api/mccontroller"
)

func Init(e *echo.Echo) {
	e.Pre(middleware.RemoveTrailingSlash())
	e.Get("/api/moves", mccontroller.GetAll)
    e.File("/", "public/index.html")
}
