package handlers

import (
	"net/http"
	"strconv"

	"paper-dashboard/internal/db"
	"paper-dashboard/internal/models"

	"github.com/gin-gonic/gin"
)

// ListFolders returns folder tree
func ListFolders(c *gin.Context) {
	var folders []models.Folder
	db.DB.Order("name ASC").Find(&folders)
	c.JSON(http.StatusOK, folders)
}

// CreateFolder creates a new folder
func CreateFolder(c *gin.Context) {
	var folder models.Folder
	if err := c.ShouldBindJSON(&folder); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.DB.Create(&folder)
	c.JSON(http.StatusCreated, folder)
}

// DeleteFolder deletes a folder
func DeleteFolder(c *gin.Context) {
	id := c.Param("id")
	var folder models.Folder
	if err := db.DB.First(&folder, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Folder not found"})
		return
	}
	db.DB.Unscoped().Delete(&folder)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted"})
}
