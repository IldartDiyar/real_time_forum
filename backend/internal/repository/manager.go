package repository

import (
	"backend/model"
	"database/sql"
)

type Authorization interface {
	Create(user model.User) error
	GetByID(id int) (model.User, error)
	GetByNickname(nickname string) (model.User, error)
	GetByEmail(email string) (model.User, error)
	UpdatePassword(password string, id int) error
	AllUsers(userID int) ([]model.Users, error)
}

type Session interface {
	Create(session model.Session) error
	GetSessionByUserID(userID int) (model.Session, error)
	Update(session model.Session) error
	Delete(value string) error
	GetUserIDByToken(value string) (model.Session, error)
}

type Post interface {
	Create(post model.Post) error
	Update(post model.Post) error
	GetPostByID(id int) (model.Post, error)
	GetAllPosts() ([]model.Post, error)
	DeletePost(id int) error
}

type Category interface {
	CreateCategory(category string) error
	GetAllCategories() ([]model.Category, error)
	DeleteCategory(category string) error
	GetCategoryPostCategoryID(categories []string) ([]int, error)
}

type Comment interface {
	Create(comment model.Comment) error
	Update(comment model.Comment) error
	Delete(id int) error
	GetAllComment() ([]model.Comment, error)
	GetCommentByID(id int) (model.Comment, error)
}

type Chat interface {
	Create(msg model.Message) error
}

type Repository struct {
	Authorization Authorization
	Session       Session
	Post          Post
	Category      Category
	Comment       Comment
	Chat          Chat
}

func New(db *sql.DB) *Repository {
	return &Repository{
		Authorization: NewAuthorization(db),
		Session:       NewSession(db),
		Post:          NewPostRepo(db),
		Category:      NewCategoryRepo(db),
		Comment:       NewCommentRepo(db),
		Chat:          NewChatRepo(db),
	}
}
