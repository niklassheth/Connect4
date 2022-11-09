package org.hypergolic;

import io.quarkus.hibernate.reactive.panache.PanacheEntity;

import javax.persistence.Entity;

@Entity
public class Player extends PanacheEntity {
    public String name;
}
