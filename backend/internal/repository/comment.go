package repository

import (
	"backend/model"
	"database/sql"
)

type CommentRepo struct {
	db *sql.DB
}

func NewCommentRepo(db *sql.DB) *CommentRepo {
	return &CommentRepo{
		db: db,
	}
}

func (r *CommentRepo) Create(comment model.Comment) error {
	stmt := `INSERT INTO comment (post_id, user_id, text, create_at, update_at) VALUES($1, $2, $3, $4, $5)`
	_, err := r.db.Exec(stmt, comment.PostID, comment.UserID, comment.Text, comment.CreateAt, comment.UpdateAt)
	if err != nil {
		return err
	}

	return nil
}

func (r *CommentRepo) Update(comment model.Comment) error {
	stmt := `UPDATE comment SET text=$1, update_at=$2 WHERE id = $3`
	res, err := r.db.Exec(stmt, comment.Text, comment.UpdateAt, comment.Id)
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

func (r *CommentRepo) GetAllComment() ([]model.Comment, error) {
	stmt := `SELECT * FROM comment`
	row, err := r.db.Query(stmt)
	if err != nil {
		return nil, err
	}
	var comments []model.Comment
	for row.Next() {
		var comment model.Comment
		if err = row.Scan(&comment.Id, &comment.PostID, &comment.UserID, &comment.Text, &comment.CreateAt, &comment.UpdateAt); err != nil {
			return nil, err
		}
		comments = append(comments, comment)
	}
	return comments, nil
}

func (r *CommentRepo) GetCommentByID(id int) (model.Comment, error) {
	var comment model.Comment
	stmt := `SELECT * FROM comment WHERE id = $1`
	err := r.db.QueryRow(stmt, id).Scan(&comment.Id, &comment.PostID, &comment.UserID, &comment.Text, &comment.CreateAt, &comment.UpdateAt)
	if err != nil {
		return comment, err
	}

	return comment, nil
}

func (r *CommentRepo) Delete(id int) error {
	stmt := `DELETE FROM comment WHERE id = $1`
	res, err := r.db.Exec(stmt, id)
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
