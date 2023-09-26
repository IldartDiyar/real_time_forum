package app

import (
	"backend/internal/repository"
	"backend/pkg/config"
	"backend/pkg/db"
	"fmt"
	"log"
)

const path = "./migration/init.up.sql"

func Run(cfg config.Config) error {
	db, err := db.InitDB(cfg.Database, path)
	if err != nil {
		return fmt.Errorf("Init db: %w", err)
	}
	r := repository.New(db)
	log.Fatal(r)
	return nil
}
