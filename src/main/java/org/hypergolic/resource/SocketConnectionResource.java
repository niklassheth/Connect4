package org.hypergolic.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.json.JsonMapper;
import io.quarkus.hibernate.reactive.panache.Panache;
import io.quarkus.panache.common.Sort;
import org.hypergolic.model.Game;
import org.hypergolic.model.GameConnection;
import org.hypergolic.model.Move;

import javax.enterprise.context.ApplicationScoped;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import javax.websocket.server.PathParam;
import javax.ws.rs.BadRequestException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;


@ServerEndpoint("/socket_connection/{id}")
@ApplicationScoped
public class SocketConnectionResource {

    ConcurrentHashMap<Session, GameConnection> sessions = new ConcurrentHashMap<>();


    @OnOpen
    public void onOpen(Session session, @PathParam("id") long id) {
        System.out.println(session.getId() + "Connected");
        GameConnection connection = GameConnection.<GameConnection>findById(id).await().indefinitely();
        sessions.put(session, connection);
    }




    @OnClose
    public void onClose(Session session, @PathParam("id") int id) {
        System.out.println(session.getId() + " Closed");
        sessions.remove(session);
    }

    @OnError
    public void onError(Session session, @PathParam("id") int id, Throwable throwable) {
        sessions.remove(session);
        System.out.println("User " + session.getId() + " left on error: " + throwable);
    }

    @OnMessage
    public void onMessage(Session session, String message, @PathParam("id") int id) {
        System.out.println("MESSAGE RECEIVED: " + message);
        JsonMapper mapper = new JsonMapper();
        Game game = sessions.get(session).game;
        try {
            Move move = mapper.readValue(message, Move.class);
            move.game = game;
            Panache.withTransaction(move::persist).await().indefinitely();
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);

        }
        // going through each client in the session (2 max)
        sessions.entrySet().stream().filter(x -> (x.getValue().game).equals(game)).
        forEach((pair) -> {
            var k = pair.getKey();
            var v = pair.getValue();
            System.out.println("Sending data to " + k);
            try {
                //Game g = Game.<Game>findById(game.id).await().indefinitely();
                var moves = Move.<Move>find("game", Sort.ascending("num"), game).list().await().indefinitely();

                k.getAsyncRemote().sendText(mapper.writeValueAsString(moves));
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        });

    }

    private boolean validateNewMove(Game g, Move m) {
        if (m.col < 0 || m.col > 6)
            return false;
        if (g.moves.size() == 0) {
            if (m.num != 0) {
                return false;
            }
        }
        else {
            Move lastMove = g.moves.get(g.moves.size() - 1);
            if (m.num - lastMove.num != 1) {
                return false;
            }
        }
        return true;
    }


}
