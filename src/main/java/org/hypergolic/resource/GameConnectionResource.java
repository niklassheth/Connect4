package org.hypergolic.resource;


import io.quarkus.hibernate.reactive.panache.Panache;
import io.quarkus.hibernate.reactive.panache.common.runtime.ReactiveTransactional;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import io.smallrye.mutiny.tuples.Tuple2;
import org.hypergolic.model.Game;
import org.hypergolic.model.GameConnection;
import org.hypergolic.model.Move;
import org.hypergolic.model.Player;
import org.jboss.resteasy.reactive.RestResponse;

import javax.inject.Inject;
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
    @ReactiveTransactional
    public Uni<Void> startGame(@QueryParam("thisId") long thisId, @QueryParam("otherId") long otherId) {
        Uni<Player> thisPlayer = Player.findById(thisId);
        Uni<Player> otherPlayer = Player.findById(otherId);
        return Uni.combine().all().unis(thisPlayer, otherPlayer).combinedWith((me, you) -> {
            System.out.println("Hi!!!");
            Game game = new Game();
            return game.<Game>persist().flatMap(g -> {
                System.out.println("Hello the world");
                GameConnection a = new GameConnection();
                GameConnection b = new GameConnection();
                a.game = g;
                a.player = me;
                a.moveOrder = 0;
                b.game = g;
                b.player = you;
                b.moveOrder = 1;
                return Uni.combine().all().unis(a.persist(), b.persist()).asTuple().invoke(tuple -> {
                    lobbyResource.sendGameStart((GameConnection) tuple.getItem1());
                    lobbyResource.sendGameStart((GameConnection) tuple.getItem2());
                    System.out.println("We got here");
                });
            });

        }).flatMap(Function.identity()).replaceWithVoid();
    }
}
