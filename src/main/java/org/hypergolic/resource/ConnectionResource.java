package org.hypergolic.resource;

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
    }


    @OnClose
    public void onClose(Session session, @PathParam("id") int id) {
        System.out.println(id +" Closed");
    }

    @OnError
    public void onError(Session session, @PathParam("id") int id, Throwable throwable) {
        System.out.println("User " + id + " left on error: " + throwable);
    }

    @OnMessage
    public void onMessage(String message, @PathParam("id") int username) {
        System.out.println("MESSAGE RECEIVED: " + message);
    }


}
