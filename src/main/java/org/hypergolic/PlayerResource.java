package org.hypergolic;

import io.quarkus.hibernate.reactive.panache.Panache;
import io.smallrye.mutiny.Uni;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/player")
public class PlayerResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("{id: \\d+}")
    public Uni<Player> getPlayerByID(@PathParam("id") long id) {
        return Player.findById(id);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Uni<String> addPlayer(Player p) {
        return Panache.<Player>withTransaction(p::persistAndFlush)
                .map(inserted -> inserted.id + "");
    }
}
