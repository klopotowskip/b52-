package online.twojafirma.b52.repository;

import online.twojafirma.b52.model.RentalOffer;
import online.twojafirma.b52.model.summary.RentalOffersSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RentalOfferRepository extends JpaRepository<RentalOffer, Integer> {

    @Query("SELECT new online.twojafirma.b52.model.summary.RentalOffersSummary(" +
            "   so.district, so.entryDateYearMonth," +
            "   AVG(so.latestPrice), AVG(so.latestPricePerSquareMeter), AVG(so.sizeSquareMeters)" +
            ")" +
            "FROM SaleOffer AS so GROUP BY so.district, so.entryDateYearMonth")
    List<RentalOffersSummary> getAllStatistics();
}
