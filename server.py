#!/usr/bin/env python3
"""
Python alternative server for AI Language Learning Companion
"""
import http.server
import socketserver
import os
import sys
import webbrowser

PORT = int(os.environ.get("PORT", 3000))
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def run_server():
    port = PORT
    for _ in range(10):
        try:
            with socketserver.TCPServer(("", port), Handler) as httpd:
                print("=======================================================")
                print("🚀 AI Language Learning Companion Server is Running!")
                print(f"🌐 Local URL: http://localhost:{port}")
                print(f"📂 Serving directory: {DIRECTORY}")
                print("=======================================================")
                try:
                    httpd.serve_forever()
                except KeyboardInterrupt:
                    print("\nShutting down server...")
                    break
        except OSError as e:
            if "Address already in use" in str(e) or e.errno == 98 or e.winerror == 10048:
                port += 1
                continue
            raise

if __name__ == "__main__":
    run_server()
