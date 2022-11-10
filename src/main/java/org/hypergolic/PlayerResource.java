package org.hypergolic;

import io.quarkus.hibernate.reactive.panache.Panache;
import io.smallrye.mutiny.Uni;
import org.jboss.resteasy.reactive.RestResponse;
import org.jboss.resteasy.reactive.RestResponse.ResponseBuilder;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.net.URI;

@Path("/player")
public class PlayerResource {
    @GET
    @Path("{id: \\d+}")
    public Uni<Player> getPlayerByID(@PathParam("id") long id) {
        return Player.findById(id);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Uni<RestResponse<Player>> addPlayer(Player p) {
        return Panache.<Player>withTransaction(p::persist)
                .map(player -> (ResponseBuilder.<Player>created(URI.create("/player/" + player.id))
                                .entity(p)
                                .build()
                        )
                );
    }
}
