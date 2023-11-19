package online.twojafirma.b52.repository;

import online.twojafirma.b52.model.District;
import online.twojafirma.b52.model.RentalOffer;
import online.twojafirma.b52.model.summary.RentalOffersSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.YearMonth;
import java.util.List;

public interface RentalOfferRepository extends JpaRepository<RentalOffer, Integer> {

    @Query("SELECT new online.twojafirma.b52.model.summary.RentalOffersSummary(" +
            "   so.district, so.entryDateYearMonth," +
            "   MEDIAN(so.latestPrice) OVER (PARTITION BY so.district, so.entryDateYearMonth)," +
            "   MEDIAN(so.latestPricePerSquareMeter) OVER (PARTITION BY so.district, so.entryDateYearMonth)," +
            "   MEDIAN(so.sizeSquareMeters) OVER (PARTITION BY so.district, so.entryDateYearMonth)" +
            ")" +
            "FROM SaleOffer AS so GROUP BY so.district, so.entryDateYearMonth")
    List<RentalOffersSummary> getAllStatistics();

    @Query("SELECT new online.twojafirma.b52.model.summary.RentalOffersSummary(" +
            "   so.district, so.entryDateYearMonth," +
            "   MEDIAN(so.latestPrice) OVER (PARTITION BY so.district, so.entryDateYearMonth)," +
            "   MEDIAN(so.latestPricePerSquareMeter) OVER (PARTITION BY so.district, so.entryDateYearMonth)," +
            "   MEDIAN(so.sizeSquareMeters) OVER (PARTITION BY so.district, so.entryDateYearMonth)" +
            ")" +
            "FROM RentalOffer AS so WHERE so.district = :district GROUP BY so.district, so.entryDateYearMonth")
    List<RentalOffersSummary> getStatisticsForDistrict(@Param("district") District district);
}
