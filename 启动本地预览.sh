#!/bin/bash
cd "$(dirname "$0")"
# 用 python 把 fe-techai 挂到 /fe-techai 路径，便于原构建 publicPath 生效
python3 <<'PY'
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import os
ROOT = os.path.dirname(os.path.abspath(__file__))
FE = os.path.join(ROOT, 'fe-techai')

class Handler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        from urllib.parse import urlparse, unquote
        p = unquote(urlparse(path).path)
        if p.startswith('/fe-techai/'):
            rel = p[len('/fe-techai/'):]
            return os.path.join(FE, rel)
        if p in ('/fe-techai', '/fe-techai/'):
            return os.path.join(FE, 'index.remote.html' if os.path.exists(os.path.join(FE,'index.remote.html')) else 'index.html')
        if p == '/' or p == '':
            return os.path.join(FE, 'index.html')
        return SimpleHTTPRequestHandler.translate_path(self, path)

# 恢复带绝对路径的 index 供挂载用
remote = os.path.join(FE, 'index.remote.html')
local = os.path.join(FE, 'index.html')
if os.path.exists(remote):
    # index.remote 可能是相对路径版，再拉一份绝对路径
    pass

print('Local preview: http://127.0.0.1:8820/fe-techai/#/AIreport-new')
ThreadingHTTPServer(('127.0.0.1', 8820), Handler).serve_forever()
PY
