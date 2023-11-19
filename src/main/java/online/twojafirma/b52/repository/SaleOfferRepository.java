package online.twojafirma.b52.repository;

import online.twojafirma.b52.model.District;
import online.twojafirma.b52.model.SaleOffer;
import online.twojafirma.b52.model.summary.RentalOffersSummary;
import online.twojafirma.b52.model.summary.SaleOffersSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SaleOfferRepository extends JpaRepository<SaleOffer, Integer> {

    @Query("SELECT DISTINCT new online.twojafirma.b52.model.summary.SaleOffersSummary(" +
            "        so.district, so.entryDateYearMonth," +
            "        MEDIAN(so.latestPrice) OVER (PARTITION BY so.district, so.entryDateYearMonth)," +
            "        MEDIAN(so.latestPricePerSquareMeter) OVER (PARTITION BY so.district, so.entryDateYearMonth)," +
            "        MEDIAN(so.sizeSquareMeters) OVER (PARTITION BY so.district, so.entryDateYearMonth)" +
            ")" +
            "    FROM SaleOffer AS so")
    List<SaleOffersSummary> getAllStatistics();

    @Query("SELECT DISTINCT new online.twojafirma.b52.model.summary.SaleOffersSummary(" +
            "        so.district, so.entryDateYearMonth," +
            "        MEDIAN(so.latestPrice) OVER (PARTITION BY so.district, so.entryDateYearMonth)," +
            "        MEDIAN(so.latestPricePerSquareMeter) OVER (PARTITION BY so.district, so.entryDateYearMonth)," +
            "        MEDIAN(so.sizeSquareMeters) OVER (PARTITION BY so.district, so.entryDateYearMonth)" +
            ")" +
            "    FROM SaleOffer AS so WHERE so.district = :district")
    List<SaleOffersSummary> getStatisticsForDistrict(@Param("district") District district);
}
