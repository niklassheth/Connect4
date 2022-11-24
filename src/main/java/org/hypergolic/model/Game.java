package org.hypergolic.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.reactive.panache.PanacheEntity;

import javax.persistence.*;
import java.util.List;
import java.util.Set;
import java.util.SortedSet;

@Entity
public class Game extends PanacheEntity {

    @OneToMany (cascade = CascadeType.ALL, mappedBy = "game")
    @JsonIgnore
    public Set<GameConnection> connectionSet;

    @OneToMany (fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "game")
    @OrderBy("num ASC")
    public List<Move> moves;

}
