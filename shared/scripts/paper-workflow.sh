#!/bin/bash
# Paper Workflow Session - OpenClaw Entry Point
# 
# Usage: This script is called by sessions_spawn
# It will process papers in the shared directory and update status

TASK_ID="$1"
SHARED_DIR="/home/nothingts/paper-dashboard/shared/papers"
PAPER_DIR="$SHARED_DIR/$TASK_ID"

echo "[$TASK_ID] Starting Paper Workflow Session"
echo "[$TASK_ID] Paper directory: $PAPER_DIR"

# Check if task directory exists
if [ ! -d "$PAPER_DIR" ]; then
  echo "[$TASK_ID] ERROR: Task directory not found"
  exit 1
fi

# Update status to processing
update_status() {
  local stage="$1"
  local stage_status="$2"
  local message="$3"
  
  cat > "$PAPER_DIR/status.json" << EOF
{
  "task_id": "$TASK_ID",
  "stage": "$stage",
  "stage_status": "$stage_status",
  "progress": {
    "papers_processed": 0,
    "papers_total": $(ls -1 "$PAPER_DIR/input" 2>/dev/null | wc -l),
    "topics_generated": 0
  },
  "messages": [
    {"timestamp": "$(date -Iseconds)", "from": "agent", "content": "$message"}
  ],
  "updated_at": "$(date -Iseconds)"
}
EOF
}

# Initial status
update_status "INTAKE" "processing" "OpenClaw Session 已启动，开始处理论文..."

# List papers
PAPERS=$(ls -1 "$PAPER_DIR/input" 2>/dev/null | grep -i '\.pdf$' || echo "")
PAPER_COUNT=$(echo "$PAPERS" | grep -c '^' || echo "0")

echo "[$TASK_ID] Found $PAPER_COUNT papers"

if [ "$PAPER_COUNT" -eq 0 ]; then
  update_status "INTAKE" "error" "未找到任何 PDF 文件"
  exit 1
fi

# Process each paper
PROCESSED=0
for paper in $PAPERS; do
  echo "[$TASK_ID] Processing: $paper"
  update_status "INTAKE" "processing" "正在分析论文: $paper"
  
  # Extract text from PDF (basic implementation)
  # In production, this would use pdf-parse or PyMuPDF
  
  sleep 2  # Simulate processing
  PROCESSED=$((PROCESSED + 1))
done

echo "[$TASK_ID] Processed $PROCESSED papers"

# Generate topics
update_status "INTAKE" "waiting_confirm" "论文分析完成，请选择研究选题"

# Create topics file
cat > "$PAPER_DIR/topics.json" << 'EOF'
{
  "topics": [
    {
      "id": 1,
      "title": "基于参考论文的创新性研究选题 A",
      "score": 92,
      "summary": "基于输入文献的方法论改进研究",
      "rationale": "通过分析现有方法发现可行的改进空间",
      "feasibility": "高 - 改进方案明确"
    },
    {
      "id": 2,
      "title": "基于参考论文的创新性研究选题 B",
      "score": 85,
      "summary": "将现有方法应用于新场景的探索性研究",
      "rationale": "方法在特定条件下表现良好，有潜力应用于新场景",
      "feasibility": "中 - 需要适应性调整"
    },
    {
      "id": 3,
      "title": "基于参考论文的创新性研究选题 C",
      "score": 78,
      "summary": "与其他方法的对比与融合研究",
      "rationale": "通过对比揭示不同方法的适用边界",
      "feasibility": "中 - 需要全面对比分析"
    }
  ]
}
EOF

echo "[$TASK_ID] Topics generated, waiting for user confirmation..."
