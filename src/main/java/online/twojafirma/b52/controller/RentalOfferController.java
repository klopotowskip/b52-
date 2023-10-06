package online.twojafirma.b52.controller;

import online.twojafirma.b52.model.RentalOffer;
import online.twojafirma.b52.model.summary.RentalOffersSummary;
import online.twojafirma.b52.model.summary.SaleOffersSummary;
import online.twojafirma.b52.service.RentalOfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping(path="api/v1/rental")
@RestController
public class RentalOfferController {

    private final RentalOfferService rentalOffersService;

    @Autowired
    public RentalOfferController(RentalOfferService rentalOffersService) {
        this.rentalOffersService = rentalOffersService;
    }

    @GetMapping
    public List<RentalOffer> getRentalOffers(){
        return rentalOffersService.getRentalOffers();
    }

    @GetMapping(path="{id}")
    public RentalOffer getRentalOfferById(@PathVariable int id){
        return rentalOffersService.getRentalOfferById(id);
    }

    @GetMapping(path = "statistics")
    public List<RentalOffersSummary> getAllStatistics(){
        return rentalOffersService.getAllStatistics();
    }
}
