# AI辅助评标 — 页面设计

## 带演示数据的预览（推荐）
打开：http://127.0.0.1:8765/AIreport-new-演示数据.html

或在本目录执行：
```bash
python3 -m http.server 8765
```

该页使用线上原有 HTML/CSS（`original-report.css`，从 DOM 快照提取），并灌入演示数据（5 家投标单位、13 项评审因素、施工方案细分项与右侧详情）。不再使用自制截图风格样式。

## 线上原始静态包
- 来源：http://10.9.32.142:8200/fe-techai/#/AIreport-new
- 目录：`fe-techai/`
- 本地原构建预览：`./启动本地预览.sh` → http://127.0.0.1:8820/fe-techai/#/AIreport-new  
  （无后端任务时显示「无招标任务」）

## 文件
| 路径 | 说明 |
|------|------|
| `AIreport-new-演示数据.html` | **可改的演示页（有数据）** |
| `fe-techai/demo/` | 演示样式与 Mock 数据 |
| `fe-techai/` | 线上静态资源 |
| `AIreport-new-有数据截图.jpg` | 你提供的参考截图 |
| `_旧原型备份/` | 早期暗色原型 |
