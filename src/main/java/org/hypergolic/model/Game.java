package org.hypergolic.model;

import io.quarkus.hibernate.reactive.panache.PanacheEntity;
import io.quarkus.hibernate.reactive.panache.PanacheQuery;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
public class Game extends PanacheEntity {

    @OneToMany (mappedBy="game")
    public Set<Player_Game> playerSet;

}
