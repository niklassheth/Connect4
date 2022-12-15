package org.hypergolic.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;
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


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Game game)) return false;

        return Objects.equals(id, game.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}
