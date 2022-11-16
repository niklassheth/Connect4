package org.hypergolic.model;

import io.quarkus.hibernate.reactive.panache.PanacheEntity;

import javax.persistence.*;

@Entity
public class GameConnection extends PanacheEntity {

    @ManyToOne()
    public Player player;

    @ManyToOne()
    public Game game;


    @Enumerated(EnumType.STRING)
    public Color color;
}
