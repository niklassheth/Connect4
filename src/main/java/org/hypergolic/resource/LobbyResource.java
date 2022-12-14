package org.hypergolic.resource;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.google.common.collect.BiMap;
import com.google.common.collect.HashBiMap;
import com.google.common.collect.Maps;
import org.hypergolic.model.GameConnection;
import org.hypergolic.model.Player;

import javax.enterprise.context.ApplicationScoped;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@ApplicationScoped
@ServerEndpoint("/lobby_socket/")
public class LobbyResource {
    BiMap<Session, Player> sessions = Maps.synchronizedBiMap(HashBiMap.create());

    @OnOpen
    public void onOpen(Session session) {
    }


    @OnMessage
    public void onMessage(Session session, String message) {
        JsonMapper mapper = new JsonMapper();
        try {
            Player p = mapper.readValue(message, Player.class);
            sessions.put(session, p);
            refreshLobby(session.getOpenSessions());
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @OnClose
    public void onClose(Session session) {
        sessions.remove(session);
        refreshLobby(session.getOpenSessions());
    }


    private void refreshLobby(Set<Session> sessionSet) {
        JsonMapper mapper = new JsonMapper();
        sessionSet.stream().filter(Session::isOpen).forEach(session -> {
                try {
                    session.getAsyncRemote().sendText(mapper.writeValueAsString(sessions.values()));
                } catch (JsonProcessingException e) {
                    throw new RuntimeException(e);

                }
            }
        );
    }

    public void sendGameStart(GameConnection connection) {
        JsonMapper mapper = new JsonMapper();
        try {
            sessions.inverse().get(connection.player).getAsyncRemote().sendText(mapper.writeValueAsString(connection));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }


}
