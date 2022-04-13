from src.server import server

if __name__ == "__main__":
    try:
        print("Starting XML-RPC server")
        server.serve_forever()
    except KeyboardInterrupt:
        print("Stopping")
