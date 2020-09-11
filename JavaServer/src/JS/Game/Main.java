package JS.Game;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) throws IOException {
        Scanner s = new Scanner(System.in);
        String send = s.nextLine();
        ServerSocket server = new ServerSocket(80);
        Socket client = null;
        try {
            System.out.println("Server has started on 127.0.0.1:80.\r\nWaiting for a connection...");
            client = server.accept();
            System.out.println("A client connected.");

        } catch(Exception e) {
            e.printStackTrace();
        }
        InputStream in = client.getInputStream();
        OutputStream out = client.getOutputStream();
        PrintWriter pwrite = new PrintWriter(out, true);
        pwrite.println(send);
        pwrite.flush();
    }
}

