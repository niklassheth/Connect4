package org.hypergolic.resource;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.hypergolic.model.Move;

import javax.enterprise.context.ApplicationScoped;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import javax.ws.rs.Path;
import javax.websocket.server.PathParam;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;


@ServerEndpoint("/connection/{id}")
@ApplicationScoped
public class ConnectionResource {

    ConcurrentHashMap<Integer, Session> sessions = new ConcurrentHashMap<>();

    @OnOpen
    public void onOpen(Session session, @PathParam("id") int id) {
        System.out.println(id + " Connected");
        sessions.put(id, session);
    }


    @OnClose
    public void onClose(Session session, @PathParam("id") int id) {
        System.out.println(id +" Closed");
        sessions.remove(id);
    }

    @OnError
    public void onError(Session session, @PathParam("id") int id, Throwable throwable) {
        sessions.remove(id);
        System.out.println("User " + id + " left on error: " + throwable);
    }

    @OnMessage
    public void onMessage(String message, @PathParam("id") int id) {
        System.out.println("MESSAGE RECEIVED: " + message);
        if (message.equals("HI"))
            return;
        try {
            Move move = new ObjectMapper().readValue(message, Move.class);
            sessions.forEach((k, v) -> {
                System.out.println(k);
                if (k == id) {
                    return;
                }
                System.out.println("sending...");
                v.getAsyncRemote().sendText(message);
            });
        } catch(Exception e) {
            System.out.println("uh oh: " + message);
        }
    }


}
