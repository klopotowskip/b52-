package online.twojafirma.b52.repository;

import online.twojafirma.b52.model.SaleOffer;
import online.twojafirma.b52.model.summary.SaleOffersSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SaleOfferRepository extends JpaRepository<SaleOffer, Integer> {

    @Query("SELECT new online.twojafirma.b52.model.summary.SaleOffersSummary(" +
            "   so.district, so.entryDateYearMonth," +
            "   AVG(so.latestPrice), AVG(so.latestPricePerSquareMeter), AVG(so.sizeSquareMeters)" +
            ")" +
            "FROM SaleOffer AS so GROUP BY so.district, so.entryDateYearMonth")
    List<SaleOffersSummary> getAllStatistics();
}
