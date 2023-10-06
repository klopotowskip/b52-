package online.twojafirma.b52.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "districts")
public class District {
    @Id
    @Column(insertable=false, updatable=false)
    private int id;
    @Column(insertable=false, updatable=false)
    private String city;

    @Column(insertable=false, updatable=false)
    private String name;

    @Column(insertable=false, updatable=false)
    private BigDecimal lat;

    @Column(insertable=false, updatable=false)
    private BigDecimal lon;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getLat() {
        return lat;
    }

    public void setLat(BigDecimal lat) {
        this.lat = lat;
    }

    public BigDecimal getLon() {
        return lon;
    }

    public void setLon(BigDecimal lon) {
        this.lon = lon;
    }
}
