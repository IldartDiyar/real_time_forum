package repository

import (
	"backend/model"
	"database/sql"
	"strings"
)

type CategoryRepo struct {
	db *sql.DB
}

func NewCategoryRepo(db *sql.DB) *CategoryRepo {
	return &CategoryRepo{
		db: db,
	}
}

func (r *CategoryRepo) GetAllCategories() ([]model.Category, error) {
	stmt := `SELECT * FROM category`
	row, err := r.db.Query(stmt)
	if err != nil {
		return nil, err
	}

	var categories []model.Category
	for row.Next() {
		var category model.Category
		if err = row.Scan(&category.Id, &category.Category); err != nil {
			return nil, err
		}
		categories = append(categories, category)
	}
	return categories, nil
}

func (r *CategoryRepo) CreateCategory(category string) error {
	stmt := `INSERT INTO category(title) VALUES($1)`
	_, err := r.db.Exec(stmt, category)
	if err != nil {
		return err
	}
	return nil
}

func (r *CategoryRepo) DeleteCategory(category string) error {
	stmt := `DELETE FROM category WHERE title = $1`
	res, err := r.db.Exec(stmt, category)
	if err != nil {
		return err
	}
	i, err := res.RowsAffected()
	if err != nil {
		return err
	}

	if i == 0 {
		return sql.ErrNoRows
	}

	return nil
}

func (r *CategoryRepo) GetCategoryPostCategoryID(categories []string) ([]int, error) {
	stmt := `SELECT id FROM category WHERE title IN (` + placeholders(len(categories)) + `)`
	// args := make([]interface{}, len(categories))
	// for i, category := range categories {
	// 	args[i] = category
	// }

	rows, err := r.db.Query(stmt, categories)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var allID []int
	for rows.Next() {
		var id int
		if err = rows.Scan(&id); err != nil {
			return nil, err
		}
		allID = append(allID, id)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return allID, nil
}

func placeholders(n int) string {
	if n < 1 {
		return ""
	}

	return strings.Repeat("?, ", n-1) + "?"
}
