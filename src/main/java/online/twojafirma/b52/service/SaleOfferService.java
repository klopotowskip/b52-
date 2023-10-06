package online.twojafirma.b52.service;

import online.twojafirma.b52.model.SaleOffer;
import online.twojafirma.b52.model.summary.SaleOffersSummary;
import online.twojafirma.b52.repository.SaleOfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Component
public class SaleOfferService {

    private final SaleOfferRepository saleOfferRepository;

    @Autowired
    public SaleOfferService(SaleOfferRepository saleOfferRepository) {
        this.saleOfferRepository = saleOfferRepository;
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
}
