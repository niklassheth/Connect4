package org.hypergolic.resource;

import io.quarkus.hibernate.reactive.panache.Panache;
import io.smallrye.mutiny.Uni;
import org.hibernate.reactive.mutiny.Mutiny;
import org.hypergolic.model.Game;
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
        return Game.<Game>findById(id)
            .onItem()
            .ifNotNull()
            .call(x -> Mutiny.fetch(x.moves));
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
