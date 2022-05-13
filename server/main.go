package main

import(
	"fmt"
	"github.com/gofiber/fiber/v2"
	"log"
)

func main() {
	fmt.Println("Hello, World!")

	app := fiber.New()


	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Welcome to Web Policy Random Server.")
	})

	log.Fatal(app.Listen(":3002"))
}