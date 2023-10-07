package online.twojafirma.b52.service;

import online.twojafirma.b52.model.District;
import online.twojafirma.b52.model.SaleOffer;
import online.twojafirma.b52.model.summary.RentalOffersSummary;
import online.twojafirma.b52.model.summary.SaleOffersSummary;
import online.twojafirma.b52.repository.DistrictRepository;
import online.twojafirma.b52.repository.SaleOfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Component
public class SaleOfferService {

    private final SaleOfferRepository saleOfferRepository;
    private final DistrictRepository districtRepository;

    @Autowired
    public SaleOfferService(SaleOfferRepository saleOfferRepository, DistrictRepository districtRepository) {
        this.saleOfferRepository = saleOfferRepository;
        this.districtRepository = districtRepository;
    }

    public List<SaleOffer> getSaleOffers() {
        return saleOfferRepository.findAll();
    }

    public SaleOffer getSaleOfferById(int id) {
        return saleOfferRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public List<SaleOffersSummary> getAllStatistics(){
        return saleOfferRepository.getAllStatistics();
    }

    public List<SaleOffersSummary> getStatisticsForDistrict(int districtId){
        District district = districtRepository.findById(districtId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return saleOfferRepository.getStatisticsForDistrict(district);
    }
}
