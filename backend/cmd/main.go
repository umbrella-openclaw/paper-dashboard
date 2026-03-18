package main

import (
	"log"
	"os"

	"paper-dashboard/internal/db"
	"paper-dashboard/internal/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize database
	db.InitDB()

	// Create uploads directory
	os.MkdirAll("uploads", 0755)

	// Setup Gin
	r := gin.Default()
	
	// CORS middleware
	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// Static file serving for uploads
	r.Static("/uploads", "./uploads")

	// API routes
	api := r.Group("/api")
	{
		// Papers
		api.POST("/papers", handlers.UploadPaper)
		api.GET("/papers", handlers.ListPapers)
		api.GET("/papers/:id", handlers.GetPaper)
		api.PUT("/papers/:id", handlers.UpdatePaper)
		api.DELETE("/papers/:id", handlers.DeletePaper)

		// Folders
		api.GET("/folders", handlers.ListFolders)
		api.POST("/folders", handlers.CreateFolder)
		api.DELETE("/folders/:id", handlers.DeleteFolder)

		// Tags
		api.GET("/tags", handlers.ListTags)
		api.POST("/tags", handlers.CreateTag)
		api.DELETE("/tags/:id", handlers.DeleteTag)

		// Stats
		api.GET("/stats", handlers.GetStats)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server starting on :%s", port)
	r.Run(":" + port)
}
