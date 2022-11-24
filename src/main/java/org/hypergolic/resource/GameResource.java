package org.hypergolic.resource;

import io.quarkus.hibernate.reactive.panache.Panache;
import io.smallrye.mutiny.Uni;
import org.hypergolic.model.Game;
import org.hypergolic.model.Move;
import org.jboss.resteasy.reactive.RestResponse;
import org.jboss.resteasy.reactive.RestResponse.ResponseBuilder;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import java.net.URI;

@Path("/game")
public class GameResource {
    @GET
    @Path("{id: \\d+}")
    public Uni<Game> getGameByID(@PathParam("id") long id) {
        return Game.<Game>findById(id);
    }
    private void validateNewMove(Game g, Move m) {
        if (m.col < 0 || m.col > 6)
            throw new BadRequestException("Column Number must be in [0..6]");
        if (g.moves.size() == 0) {
            if (m.num != 0) {
                throw new BadRequestException("Move Number starts at 0");
            }
        }
        else {
            Move lastMove = g.moves.get(g.moves.size() - 1);
            if (m.num - lastMove.num != 1) {
                throw new BadRequestException("Moves must be sequential");
            }
        }
    }
    @POST
    @Path("{id: \\d+}/move")
    public Uni<RestResponse<Move>> makeMove(@PathParam("id") long id, Move move) {
        return Game.<Game>findById(id)
                .invoke(g -> validateNewMove(g, move))
                .flatMap(g -> {
                    move.game = g;
                    return Panache.<Move>withTransaction(move::persist);
                })
                .map(m -> ResponseBuilder.<Move>created(URI.create("/game/" + id + "/move"))
                        .entity(m)
                        .build());
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Uni<RestResponse<Game>> createGame() {
        Game game = new Game();
        return Panache.<Game>withTransaction(game::persist)
                .map(g -> ResponseBuilder.<Game>created(URI.create("/game/"+g.id))
                        .entity(g)
                        .build()
                );
    }



}
