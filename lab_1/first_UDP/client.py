import socket
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.connect(("127.0.0.1", 20213))
msg = b"This is a test from python client"
s.send(msg)

recv_msg ,address = s.recvfrom(1024)
print(recv_msg.decode("utf-8"))
s.close()