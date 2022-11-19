package org.hypergolic.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.reactive.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class Move extends PanacheEntity implements Comparable<Move> {

    @ManyToOne()
    @JsonIgnore
    public Game game;

    public int moveNumber;

    public int columnNumber;

    @Override
    public int compareTo(Move move) {
        return Integer.compare(this.moveNumber, move.moveNumber);
    }
}
