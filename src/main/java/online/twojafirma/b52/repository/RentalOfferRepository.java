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

    @Query("SELECT DISTINCT new online.twojafirma.b52.model.summary.RentalOffersSummary(" +
            "        ro.district, ro.entryDateYearMonth," +
            "        MEDIAN(ro.latestPrice) OVER (PARTITION BY ro.district, ro.entryDateYearMonth)," +
            "        MEDIAN(ro.latestPricePerSquareMeter) OVER (PARTITION BY ro.district, ro.entryDateYearMonth)," +
            "        MEDIAN(ro.sizeSquareMeters) OVER (PARTITION BY ro.district, ro.entryDateYearMonth)" +
            ")" +
            "    FROM RentalOffer AS ro")
    List<RentalOffersSummary> getAllStatistics();

    @Query("SELECT DISTINCT new online.twojafirma.b52.model.summary.RentalOffersSummary(" +
            "        ro.district, ro.entryDateYearMonth," +
            "        MEDIAN(ro.latestPrice) OVER (PARTITION BY ro.district, ro.entryDateYearMonth)," +
            "        MEDIAN(ro.latestPricePerSquareMeter) OVER (PARTITION BY ro.district, ro.entryDateYearMonth)," +
            "        MEDIAN(ro.sizeSquareMeters) OVER (PARTITION BY ro.district, ro.entryDateYearMonth)" +
            ")" +
            "    FROM RentalOffer AS ro WHERE ro.district = :district")
    List<RentalOffersSummary> getStatisticsForDistrict(@Param("district") District district);
}
