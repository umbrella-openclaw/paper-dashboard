package models

import (
	"time"
)

// Paper represents a paper record with metadata
type Paper struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Title       string    `gorm:"size:500;not null" json:"title"`
	Authors     string    `gorm:"size:1000" json:"authors"`
	Abstract    string    `gorm:"type:text" json:"abstract"`
	Journal     string    `gorm:"size:500" json:"journal"`
	Year        int       `json:"year"`
	DOI         string    `gorm:"size:200" json:"doi"`
	FilePath    string    `gorm:"size:500" json:"file_path"`
	FileName    string    `gorm:"size:255" json:"file_name"`
	FileSize    int64     `json:"file_size"`
	FolderID    *uint     `json:"folder_id"`
	Folder      *Folder   `gorm:"foreignKey:FolderID" json:"folder,omitempty"`
	Tags        []Tag     `gorm:"many2many:paper_tags;" json:"tags"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// Folder represents a folder for organizing papers
type Folder struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Name      string    `gorm:"size:255;not null" json:"name"`
	ParentID  *uint     `json:"parent_id"`
	Parent    *Folder   `gorm:"foreignKey:ParentID" json:"parent,omitempty"`
	Children  []Folder  `gorm:"foreignKey:ParentID" json:"children,omitempty"`
	CreatedAt time.Time `json:"created_at"`
}

// Tag represents a tag for categorizing papers
type Tag struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Name      string    `gorm:"size:100;uniqueIndex;not null" json:"name"`
	Color     string    `gorm:"size:20;default:'#10b981'" json:"color"`
	CreatedAt time.Time `json:"created_at"`
}

// Stats represents dashboard statistics
type Stats struct {
	TotalPapers    int64 `json:"total_papers"`
	TotalFolders   int64 `json:"total_folders"`
	TotalTags      int64 `json:"total_tags"`
	PapersThisWeek int64 `json:"papers_this_week"`
}
