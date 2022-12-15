package org.hypergolic.resource;

import io.smallrye.mutiny.Uni;
import org.hypergolic.model.Player;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;

@Path("/player")
public class PlayerResource {
    @GET
    @Path("{id: \\d+}")
    public Player getPlayerByID(@PathParam("id") long id) {
        return Player.findById(id);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response addPlayer(Player p) {
        p.persist();
        return (Response.created(URI.create("/player/" + p.id))
                                .entity(p)
                                .build());
    }
}
