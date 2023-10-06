package online.twojafirma.b52.controller;

import online.twojafirma.b52.model.SaleOffer;
import online.twojafirma.b52.model.summary.SaleOffersSummary;
import online.twojafirma.b52.service.SaleOfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping(path="api/v1/sale")
@RestController
public class SaleOfferController {

    private final SaleOfferService saleOffersService;

    @Autowired
    public SaleOfferController(SaleOfferService saleOffersService) {
        this.saleOffersService = saleOffersService;
    }

    @GetMapping
    public List<SaleOffer> getSaleOffers(){
        return saleOffersService.getSaleOffers();
    }

    @GetMapping(path="{id}")
    public SaleOffer getSaleOfferById(@PathVariable int id){
        return saleOffersService.getSaleOfferById(id);
    }

    @GetMapping(path = "statistics")
    public List<SaleOffersSummary> getAllStatistics(){
        return saleOffersService.getAllStatistics();
    }
}
