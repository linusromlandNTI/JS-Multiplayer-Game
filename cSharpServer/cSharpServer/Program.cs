using System;
using System.Net;
using System.Net.Sockets;

namespace cSharpServer
{
    class Program
    {
        static void Main(string[] args)
        {
            TcpListener server = new TcpListener(IPAddress.Parse("127.0.0.1"), 9998);
            server.Start();
            var client = server.AcceptTcpClient();
            var stream = client.GetStream();

            while (true)
            {
                var buffer = new byte[1024];
                // wait for data to be received
                var bytesRead = stream.Read(buffer, 0, buffer.Length);
                var r = System.Text.Encoding.UTF8.GetString(buffer);
                // write received data to the console
                Console.WriteLine(r.Substring(0, bytesRead));
            }
        }

    }
}
