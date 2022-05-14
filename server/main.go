package main

import(
	"fmt"
	"github.com/gofiber/fiber/v2"
	"log"
	"io/ioutil"
	"net/http"
)

type Webdata struct{
	ID int `json:"id"`
	Name string `json:"name"`
	URL string `json:"url"`
}

func main() {
	fmt.Println("Hello, World!")

	app := fiber.New()

	// webs := []Webdata{}

	res, err := http.Get("http://localhost:9000/webpolicies")

	if err != nil{
		log.Fatal(err)
	}

	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil{
		log.Fatal(err)
	}

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Welcome to Web Policy Random Server.")
	})

	app.Get("/api/v1/webpolicies", func(c *fiber.Ctx) error {
		return c.JSON(body)
	})

	app.Post("/")

	log.Fatal(app.Listen(":3002"))
}