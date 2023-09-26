package repository

import (
	"backend/model"
	"database/sql"
)

type SessionRepo struct {
	db *sql.DB
}

func NewSession(db *sql.DB) *SessionRepo {
	return &SessionRepo{
		db: db,
	}
}

func (r *SessionRepo) Create(session model.Session) error {
	stmt := `INSERT INTO session(user_id, token, expiration_time) VALUES($1, $2, $3)`
	_, err := r.db.Exec(stmt, session.UserID, session.Token, session.ExpiresAt)
	if err != nil {
		return err
	}
	return nil
}

func (r *SessionRepo) GetSessionByUserID(userID int) (model.Session, error) {
	var session model.Session
	stmt := `SELECT * FROM session WHERE user_id = $1`

	row := r.db.QueryRow(stmt, userID)
	if err := row.Scan(&session.Id, &session.UserID, &session.Token, &session.ExpiresAt); err != nil {
		return session, err
	}

	return session, nil
}

func (r *SessionRepo) GetUserIDByToken(value string) (model.Session, error) {
	var session model.Session
	stmt := `SELECT * FROM session WHERE token = $1`
	row := r.db.QueryRow(stmt, value)
	if err := row.Scan(&session.Id, &session.UserID, &session.Token, &session.ExpiresAt); err != nil {
		return session, err
	}
	return session, nil
}

func (r *SessionRepo) Update(session model.Session) error {
	stmt := `UPDATE session SET token = $1, expiration_time = $2 WHERE user_id = $3`
	res, err := r.db.Exec(stmt, session.Token, session.ExpiresAt, session.UserID)
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

func (r *SessionRepo) Delete(value string) error {
	stmt := `DELETE FROM session WHERE token = $1`
	res, err := r.db.Exec(stmt, value)
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
