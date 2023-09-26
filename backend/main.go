package main

import (
	"backend/internal/app"
	"backend/pkg/config"
	"log"
)

const pathConfig = "./config.json"

func main() {
	cfg, err := config.Init(pathConfig)
	if err != nil {
		log.Fatal(err)
	}
	if err := app.Run(cfg); err != nil {
		log.Fatalln(err, "run function")
		return
	}
}
