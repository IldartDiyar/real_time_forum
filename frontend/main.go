package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "index.html")
	})

	http.HandleFunc("/src/", func(w http.ResponseWriter, r *http.Request) {
		filePath := r.URL.Path[1:]

		w.Header().Set("Content-Type", "application/javascript")
		w.Header().Set("Cache-Control", "max-age=0")
		http.ServeFile(w, r, filePath)
	})

	log.Print("Server listening on port :4000...\n")
	http.ListenAndServe(":4000", nil)
}
