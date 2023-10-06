package online.twojafirma.b52.controller;

import online.twojafirma.b52.model.District;
import online.twojafirma.b52.service.DistrictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping(path="api/v1/district")
@RestController
public class DistrictController {

    private final DistrictService districtService;

    @Autowired
    public DistrictController(DistrictService districtService) {
        this.districtService = districtService;
    }

    @GetMapping
    public List<District> getDistricts(){
        return districtService.getDistricts();
    }

    @GetMapping(path="{id}")
    public District getDistrictById(@PathVariable int id){
        return districtService.getDistrictById(id);
    }
}
