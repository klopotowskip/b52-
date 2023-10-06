package online.twojafirma.b52.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "rental_offers")
public class RentalOffer {
    @Id
    @Column(insertable=false, updatable=false)
    private int id;
    @Column(insertable=false, updatable=false)
    private String url;

    @Column(insertable=false, updatable=false)
    private String offerName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "district", insertable=false, updatable=false)
    private District district;

    @Column(insertable=false, updatable=false)
    private LocalDate addedDate;

    @Column(insertable=false, updatable=false)
    private String entryDateYearMonth;

    @Column(insertable=false, updatable=false)
    private LocalDateTime dateScrapped;

    @Column(insertable=false, updatable=false)
    private LocalDateTime dateLastUpdated;

    @Column(insertable=false, updatable=false)
    private String websiteScrappedFrom;

    @Column(insertable=false, updatable=false)
    private float firstPrice;

    @Column(insertable=false, updatable=false)
    private float latestPrice;

    @Column(insertable=false, updatable=false)
    private float sizeSquareMeters;

    @Column(insertable=false, updatable=false)
    private float firstPricePerSquareMeter;

    @Column(insertable=false, updatable=false)
    private float latestPricePerSquareMeter;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getOfferName() {
        return offerName;
    }

    public void setOfferName(String offerName) {
        this.offerName = offerName;
    }

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }

    public LocalDate getAddedDate() {
        return addedDate;
    }

    public void setAddedDate(LocalDate addedDate) {
        this.addedDate = addedDate;
    }

    public String getEntryDateYearMonth() {
        return entryDateYearMonth;
    }

    public void setEntryDateYearMonth(String entryDateYearMonth) {
        this.entryDateYearMonth = entryDateYearMonth;
    }

    public LocalDateTime getDateScrapped() {
        return dateScrapped;
    }

    public void setDateScrapped(LocalDateTime dateScrapped) {
        this.dateScrapped = dateScrapped;
    }

    public LocalDateTime getDateLastUpdated() {
        return dateLastUpdated;
    }

    public void setDateLastUpdated(LocalDateTime dateLastUpdated) {
        this.dateLastUpdated = dateLastUpdated;
    }

    public String getWebsiteScrappedFrom() {
        return websiteScrappedFrom;
    }

    public void setWebsiteScrappedFrom(String websiteScrappedFrom) {
        this.websiteScrappedFrom = websiteScrappedFrom;
    }

    public float getFirstPrice() {
        return firstPrice;
    }

    public void setFirstPrice(float firstPrice) {
        this.firstPrice = firstPrice;
    }

    public float getLatestPrice() {
        return latestPrice;
    }

    public void setLatestPrice(float latestPrice) {
        this.latestPrice = latestPrice;
    }

    public float getSizeSquareMeters() {
        return sizeSquareMeters;
    }

    public void setSizeSquareMeters(float sizeSquareMeters) {
        this.sizeSquareMeters = sizeSquareMeters;
    }

    public float getFirstPricePerSquareMeter() {
        return firstPricePerSquareMeter;
    }

    public void setFirstPricePerSquareMeter(float firstPricePerSquareMeter) {
        this.firstPricePerSquareMeter = firstPricePerSquareMeter;
    }

    public float getLatestPricePerSquareMeter() {
        return latestPricePerSquareMeter;
    }

    public void setLatestPricePerSquareMeter(float latestPricePerSquareMeter) {
        this.latestPricePerSquareMeter = latestPricePerSquareMeter;
    }
}
