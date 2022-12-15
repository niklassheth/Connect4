package org.hypergolic.resource;


import io.quarkus.hibernate.orm.panache.Panache;
import org.hypergolic.model.Game;
import org.hypergolic.model.GameConnection;
import org.hypergolic.model.Move;
import org.hypergolic.model.Player;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import java.util.function.Function;

@Path("/connection/")
public class GameConnectionResource {

    @Inject
    LobbyResource lobbyResource;

    @POST
    @Transactional
    public Void startGame(@QueryParam("thisId") long thisId, @QueryParam("otherId") long otherId) {
        Player thisPlayer = Player.findById(thisId);
        Player otherPlayer = Player.findById(otherId);
        Game game = new Game();
        game.persist();
        GameConnection a = new GameConnection();
        GameConnection b = new GameConnection();
        a.game = game;
        a.player = thisPlayer;
        a.moveOrder = 0;
        b.game = game;
        b.player = otherPlayer;
        b.moveOrder = 1;
        a.persist();
        b.persist();
        lobbyResource.sendGameStart(a);
        lobbyResource.sendGameStart(b);
        return null;
    }
}
