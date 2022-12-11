package org.hypergolic.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import io.quarkus.hibernate.reactive.panache.Panache;
import io.quarkus.panache.common.Sort;
import org.hypergolic.model.Game;
import org.hypergolic.model.Move;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.OrderBy;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import javax.ws.rs.Path;
import javax.websocket.server.PathParam;
import java.io.IOException;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;


@ServerEndpoint("/connection/{id}")
@ApplicationScoped
public class ConnectionResource {

    ConcurrentHashMap<String, Session> sessions = new ConcurrentHashMap<>();
    Game game;

    @OnOpen
    public void onOpen(Session session, @PathParam("id") int id) {
        System.out.println(session.getId() + " Connected");
        if (sessions.size() >= 2) {
            try {
                session.close(new CloseReason(CloseReason.CloseCodes.TRY_AGAIN_LATER, "Too many"));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        sessions.put(session.getId(), session);
        if (game == null) {
            game = new Game();
            Panache.withTransaction(game::persist).await().indefinitely();
        }
    }


    @OnClose
    public void onClose(Session session, @PathParam("id") int id) {
        System.out.println(session.getId() + " Closed");
        sessions.remove(session.getId());
    }

    @OnError
    public void onError(Session session, @PathParam("id") int id, Throwable throwable) {
        sessions.remove(session.getId());
        System.out.println("User " + session.getId() + " left on error: " + throwable);
    }

    @OnMessage
    public void onMessage(String message, @PathParam("id") int id) {
        System.out.println("MESSAGE RECEIVED: " + message);
        JsonMapper mapper = new JsonMapper();
        try {
            Move move = mapper.readValue(message, Move.class);
            move.game = game;
            Panache.withTransaction(move::persist).await().indefinitely();
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);

        }
        sessions.forEach((k, v) -> {
            System.out.println("Sending data to " + k);
            try {
                //Game g = Game.<Game>findById(game.id).await().indefinitely();
                var moves = Move.<Move>find("game", Sort.ascending("num"), game).list().await().indefinitely();
                v.getAsyncRemote().sendText(mapper.writeValueAsString(moves));
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }

        });
    }


}
