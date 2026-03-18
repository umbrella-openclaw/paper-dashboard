package handlers

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"paper-dashboard/internal/db"
	"paper-dashboard/internal/models"

	"github.com/gin-gonic/gin"
)

// UploadPaper handles PDF upload
func UploadPaper(c *gin.Context) {
	file, header, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No file provided"})
		return
	}
	defer file.Close()

	// Save file
	filename := fmt.Sprintf("%d_%s", time.Now().UnixNano(), sanitizeFilename(header.Filename))
	filePath := filepath.Join("uploads", filename)
	out, err := os.Create(filePath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
		return
	}
	defer out.Close()
	_, err = io.Copy(out, file)

	// Create paper record
	paper := models.Paper{
		Title:    c.PostForm("title"),
		Authors:  c.PostForm("authors"),
		Abstract: c.PostForm("abstract"),
		Journal:  c.PostForm("journal"),
		FilePath: filePath,
		FileName: header.Filename,
		FileSize: header.Size,
	}

	if year := c.PostForm("year"); year != "" {
		paper.Year, _ = strconv.Atoi(year)
	}
	paper.DOI = c.PostForm("doi")

	if folderID := c.PostForm("folder_id"); folderID != "" {
		id, _ := strconv.ParseUint(folderID, 10, 32)
		uid := uint(id)
		paper.FolderID = &uid
	}

	db.DB.Create(&paper)
	db.DB.Preload("Tags").First(&paper, paper.ID)
	c.JSON(http.StatusCreated, paper)
}

func sanitizeFilename(name string) string {
	return strings.ReplaceAll(name, "..", "")
}

// ListPapers returns paginated papers
func ListPapers(c *gin.Context) {
	var papers []models.Paper
	query := db.DB.Preload("Tags").Preload("Folder")

	// Search
	if q := c.Query("search"); q != "" {
		q := "%" + q + "%"
		query = query.Where("title ILIKE ? OR authors ILIKE ? OR abstract ILIKE ?", q, q, q)
	}

	// Folder filter
	if folderID := c.Query("folder_id"); folderID != "" {
		query = query.Where("folder_id = ?", folderID)
	}

	// Pagination
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	offset := (page - 1) * limit

	var total int64
	db.DB.Model(&models.Paper{}).Count(&total)

	query.Order("created_at DESC").Offset(offset).Limit(limit).Find(&papers)
	c.JSON(http.StatusOK, gin.H{
		"papers": papers,
		"total":  total,
		"page":   page,
		"limit":  limit,
	})
}

// GetPaper returns a single paper
func GetPaper(c *gin.Context) {
	var paper models.Paper
	id := c.Param("id")
	if err := db.DB.Preload("Tags").Preload("Folder").First(&paper, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Paper not found"})
		return
	}
	c.JSON(http.StatusOK, paper)
}

// UpdatePaper updates paper metadata
func UpdatePaper(c *gin.Context) {
	var paper models.Paper
	id := c.Param("id")
	if err := db.DB.First(&paper, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Paper not found"})
		return
	}

	var updates map[string]interface{}
	if err := c.ShouldBindJSON(&updates); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db.DB.Model(&paper).Updates(updates)
	db.DB.Preload("Tags").Preload("Folder").First(&paper, id)
	c.JSON(http.StatusOK, paper)
}

// DeletePaper deletes a paper and its file
func DeletePaper(c *gin.Context) {
	id := c.Param("id")
	var paper models.Paper
	if err := db.DB.First(&paper, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Paper not found"})
		return
	}

	os.Remove(paper.FilePath)
	db.DB.Unscoped().Delete(&paper)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted"})
}
