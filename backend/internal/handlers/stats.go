package handlers

import (
	"net/http"
	"time"

	"paper-dashboard/internal/db"
	"paper-dashboard/internal/models"

	"github.com/gin-gonic/gin"
)

// GetStats returns dashboard statistics
func GetStats(c *gin.Context) {
	var stats models.Stats
	db.DB.Model(&models.Paper{}).Count(&stats.TotalPapers)
	db.DB.Model(&models.Folder{}).Count(&stats.TotalFolders)
	db.DB.Model(&models.Tag{}).Count(&stats.TotalTags)

	// Papers added this week
	weekAgo := time.Now().AddDate(0, 0, -7)
	db.DB.Model(&models.Paper{}).Where("created_at >= ?", weekAgo).Count(&stats.PapersThisWeek)

	c.JSON(http.StatusOK, stats)
}
