package handlers

import (
	"net/http"
	"strconv"

	"paper-dashboard/internal/db"
	"paper-dashboard/internal/models"

	"github.com/gin-gonic/gin"
)

// ListTags returns all tags
func ListTags(c *gin.Context) {
	var tags []models.Tag
	query := db.DB.Order("name ASC")
	if folderID := c.Query("folder_id"); folderID != "" {
		pid, _ := strconv.ParseUint(folderID, 10, 32)
		query = query.Joins("JOIN paper_tags ON paper_tags.tag_id = tags.id").
			Joins("JOIN papers ON papers.id = paper_tags.paper_id").
			Where("papers.folder_id = ?", uint(pid))
	}
	query.Find(&tags)
	c.JSON(http.StatusOK, tags)
}

// CreateTag creates a new tag
func CreateTag(c *gin.Context) {
	var tag models.Tag
	if err := c.ShouldBindJSON(&tag); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.DB.Create(&tag)
	c.JSON(http.StatusCreated, tag)
}

// DeleteTag deletes a tag
func DeleteTag(c *gin.Context) {
	id := c.Param("id")
	var tag models.Tag
	if err := db.DB.First(&tag, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Tag not found"})
		return
	}
	db.DB.Unscoped().Delete(&tag)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted"})
}
