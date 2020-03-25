from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer


with TCPServer(("", 8080), SimpleHTTPRequestHandler) as httpd:
	print(f"serving at port {8080}")
	httpd.serve_forever()
