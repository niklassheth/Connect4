package org.hypergolic.model;

import io.quarkus.hibernate.reactive.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class Move extends PanacheEntity {

    @ManyToOne()
    public Game game;

    public int moveNumber;

    public int columnNumber;

}
