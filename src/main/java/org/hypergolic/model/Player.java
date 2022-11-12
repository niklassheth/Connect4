package org.hypergolic.model;

import io.quarkus.hibernate.reactive.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Set;

@Entity
public class Player extends PanacheEntity {
    public String name;

    @OneToMany(mappedBy = "player")
    public Set<Player_Game> gameSet;


}
