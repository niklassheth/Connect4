package org.hypergolic.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.reactive.panache.PanacheEntity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Set;

@Entity
public class Game extends PanacheEntity {

    @OneToMany (cascade = CascadeType.ALL, mappedBy = "game")
    @JsonIgnore
    public Set<GameConnection> connectionSet;

    @OneToMany (cascade = CascadeType.ALL, mappedBy = "game")
    public Set<Move> moves;

}
