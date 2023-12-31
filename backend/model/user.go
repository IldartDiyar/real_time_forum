package model

import "time"

type User struct {
	Id        int
	Nickname  string
	Age       int
	Gender    string
	FirstName string
	LastName  string
	Email     string
	Password  string

	ExpiresAt time.Time
}

type UserInput struct {
	Nickname  string `json:"nickname"`
	Age       int    `json:"age"`
	Gender    string `json:"gender"`
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

type Users struct {
	ID       int    `json:"id"`
	Nickname string `json:"nickname"`
	Online   bool   `json:"online"`
}
