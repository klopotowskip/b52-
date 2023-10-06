package online.twojafirma.b52.service;

import online.twojafirma.b52.model.RentalOffer;
import online.twojafirma.b52.model.summary.RentalOffersSummary;
import online.twojafirma.b52.model.summary.SaleOffersSummary;
import online.twojafirma.b52.repository.RentalOfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Component
public class RentalOfferService {

    private final RentalOfferRepository rentalOfferRepository;

    @Autowired
    public RentalOfferService(RentalOfferRepository rentalOfferRepository) {
        this.rentalOfferRepository = rentalOfferRepository;
    }

    public List<RentalOffer> getRentalOffers() {
        return rentalOfferRepository.findAll();
    }

    public RentalOffer getRentalOfferById(int id) {
        return rentalOfferRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public List<RentalOffersSummary> getAllStatistics(){
        return rentalOfferRepository.getAllStatistics();
    }
}
