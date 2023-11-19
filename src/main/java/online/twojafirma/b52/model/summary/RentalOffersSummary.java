package online.twojafirma.b52.model.summary;

import online.twojafirma.b52.model.District;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.YearMonth;

public class RentalOffersSummary implements Comparable<RentalOffersSummary>{
    private final District district;
    private final YearMonth entryDateYearMonth;
    private final BigDecimal latestPrice;
    private final BigDecimal latestPricePerSquareMeter;
    private final BigDecimal sizeSquareMeters;

    public RentalOffersSummary(District district, String entryDateYearMonth,
                             Double latestPrice, Double latestPricePerSquareMeter, Double sizeSquareMeters) {
        this.district = district;
        this.entryDateYearMonth = fromString(entryDateYearMonth);
        this.latestPrice = new BigDecimal(latestPrice).setScale(2, RoundingMode.HALF_UP);
        this.latestPricePerSquareMeter = new BigDecimal(latestPricePerSquareMeter).setScale(2, RoundingMode.HALF_UP);
        this.sizeSquareMeters = new BigDecimal(sizeSquareMeters).setScale(2, RoundingMode.HALF_UP);
    }

    public RentalOffersSummary(District district, String entryDateYearMonth, Object latestPrice, Object latestPricePerSquareMeter, Object sizeSquareMeters) {
        this(district, entryDateYearMonth, (Double) latestPrice, (Double)  latestPricePerSquareMeter, (Double) sizeSquareMeters);
    }

    private YearMonth fromString(String yearMonthString){
        String[] tokens = yearMonthString.split("-");

        if(tokens.length < 2){
            throw new IllegalArgumentException("Illegal format of a YearMonth string!");
        }

        try{
            return YearMonth.of(Integer.parseInt(tokens[0]), Integer.parseInt(tokens[1]));
        } catch(NumberFormatException e){
            throw new IllegalArgumentException("YearMonth string contains non-parseable numbers!");
        }

    }

    public District getDistrict() {
        return district;
    }

    public YearMonth getEntryDateYearMonth() {
        return entryDateYearMonth;
    }

    public BigDecimal getLatestPrice() {
        return latestPrice;
    }

    public BigDecimal getLatestPricePerSquareMeter() {
        return latestPricePerSquareMeter;
    }

    public BigDecimal getSizeSquareMeters() {
        return sizeSquareMeters;
    }

    @Override
    public int compareTo(RentalOffersSummary that) {
        return this.entryDateYearMonth.compareTo(that.entryDateYearMonth);
    }
}
