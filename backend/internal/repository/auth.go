package repository

import (
	"backend/model"
	"database/sql"
)

type AuthorizationRepo struct {
	db *sql.DB
}

func NewAuthorization(db *sql.DB) *AuthorizationRepo {
	return &AuthorizationRepo{
		db: db,
	}
}

func (r *AuthorizationRepo) Create(user model.User) error {
	stmt := `INSERT INTO user(nick_name, age, gender, first_name, last_name, email, password_hash) VALUES($1, $2, $3, $4, $5, $6, $7)`
	_, err := r.db.Exec(stmt, user.Nickname, user.Age, user.Gender, user.FirstName, user.LastName, user.Email, user.Password)
	if err != nil {
		return err
	}

	return nil
}

func (r *AuthorizationRepo) GetByID(id int) (model.User, error) {
	var user model.User
	stmt := `SELECT id, nick_name, age, gender, first_name, last_name, email, password_hash FROM user WHERE id = $1`
	if err := r.db.QueryRow(stmt, id).Scan(&user.Id, &user.Nickname, &user.Age, &user.Gender, &user.FirstName, &user.LastName, &user.Email, &user.Password); err != nil {
		return user, err
	}
	return user, nil
}

func (r *AuthorizationRepo) GetByNickname(nickname string) (model.User, error) {
	var user model.User
	stmt := `SELECT id, nick_name, age, gender, first_name, last_name, email, password_hash FROM user WHERE nick_name=$1`
	if err := r.db.QueryRow(stmt, nickname).Scan(&user.Id, &user.Nickname, &user.Age, &user.Gender, &user.FirstName, &user.LastName, &user.Email, &user.Password); err != nil {
		return user, err
	}
	return user, nil
}

func (r *AuthorizationRepo) GetByEmail(email string) (model.User, error) {
	var user model.User
	stmt := `SELECT id, nick_name, age, gender, first_name, last_name, email, password_hash FROM user WHERE email=$1`
	if err := r.db.QueryRow(stmt, email).Scan(&user.Id, &user.Nickname, &user.Age, &user.Gender, &user.FirstName, &user.LastName, &user.Email, &user.Password); err != nil {
		return user, err
	}
	return user, nil
}

func (r *AuthorizationRepo) UpdatePassword(password string, id int) error {
	stmt := `UPDATE user SET password_hash = $1 WHERE id = $2`
	res, err := r.db.Exec(stmt, password, id)
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

func (r *AuthorizationRepo) AllUsers(userID int) ([]model.Users, error) {
	var users []model.Users
	stmt := `SELECT id, nick_name FROM user WHERE id <> ? `
	row, err := r.db.Query(stmt, userID)
	if err != nil {
		return nil, err
	}
	for row.Next() {
		var user model.Users
		if err := row.Scan(&user.ID, &user.Nickname); err != nil {
			return nil, err
		}
		users = append(users, user)
	}
	return users, nil
}
