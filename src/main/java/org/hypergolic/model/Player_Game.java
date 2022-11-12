package org.hypergolic.model;

import io.quarkus.hibernate.reactive.panache.PanacheEntity;

import javax.persistence.*;

@Entity
public class Player_Game extends PanacheEntity {

    @ManyToOne()
    public Player player;

    @ManyToOne()
    public Game game;

    public enum Color {
        Red,
        Yellow
    }

    @Enumerated(EnumType.STRING)
    public Color color;
}
