package org.hypergolic.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "GameConnection", uniqueConstraints = {
        @UniqueConstraint(name = "uc_connection_order", columnNames = {"moveOrder", "game_id"})
})
public class GameConnection extends PanacheEntity {

    @ManyToOne()
    public Player player;

    @ManyToOne()
    public Game game;

    public int moveOrder;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof GameConnection that)) return false;
        return this.id.equals(that.id) && moveOrder == that.moveOrder;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, moveOrder);
    }
}
