package org.hypergolic.model;

import io.quarkus.hibernate.reactive.panache.PanacheEntity;

import javax.persistence.*;

@Entity
@Table(name = "GameConnection", uniqueConstraints = {
        @UniqueConstraint(name = "uc_connection_order", columnNames = {"order", "game_id"})
})
public class GameConnection extends PanacheEntity {

    @ManyToOne()
    public Player player;

    @ManyToOne()
    public Game game;

    public int moveOrder;

}
