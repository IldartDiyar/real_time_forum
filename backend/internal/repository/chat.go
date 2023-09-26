package repository

import (
	"backend/model"
	"context"
	"database/sql"
)

type ChatRepo struct {
	db *sql.DB
}

func NewChatRepo(db *sql.DB) *ChatRepo {
	return &ChatRepo{
		db: db,
	}
}

func (r *ChatRepo) Create(msg model.Message) error {
	stmt := `INSERT INTO messages(from_user_id, to_user_id, message, create_at) VALUES ($1, $2, $3, $4)`
	_, err := r.db.Exec(stmt, msg.FromUserID, msg.ToUserID, msg.Text, msg.CreateAt)
	if err != nil {
		return err
	}
	return nil
}

func (r *ChatRepo) GetMessages(ctx context.Context, from_user_id, to_user_id int, lastMessageID, limit int) ([]model.Message, error) {
	return nil, nil
}

func (r *ChatRepo) ReadMessage(ctx context.Context, to_user_id, messageID int) (model.Message, error) {
	return model.Message{}, nil
}

func (r *ChatRepo) GetChats() {
}
