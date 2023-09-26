package db

import (
	"database/sql"
	"os"
)

func OpenDB(driver string, dsn string, path string) (*sql.DB, error) {
	db, err := sql.Open(driver, dsn)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	if err = initTable(db, path); err != nil {
		return nil, err
	}

	return db, nil
}

func initTable(db *sql.DB, path string) error {
	data, err := os.ReadFile(path)
	if err != nil {
		return err
	}
	if _, err = db.Exec(string(data)); err != nil {
		return err
	}
	return nil
}
