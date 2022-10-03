package com.sistema.fisioterapia.controller;

import com.sistema.fisioterapia.model.Fisioterapeuta;
import com.sistema.fisioterapia.services.FisioterapeutaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class FisioterapeutaController {
    @Autowired
    private FisioterapeutaService fisioterapeutaService;

    @GetMapping("/fisioterapeutas")
    public List<Fisioterapeuta> listarFisioterapeutas(){
        return fisioterapeutaService.listarFisioterapeutas();
    }

    @GetMapping("/fisioterapeutas/{id}")
    public ResponseEntity<Fisioterapeuta> obtenerFisioterapeutas(@PathVariable Long id){
        try{
            Fisioterapeuta fisioterapeuta = fisioterapeutaService.obtenerFisioterapeutaporId(id);
            return new ResponseEntity<Fisioterapeuta>(fisioterapeuta, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<Fisioterapeuta>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/fisioterapeutas")
    public void guardarFisioterapeuta(@RequestBody Fisioterapeuta fisioterapeuta){
        fisioterapeutaService.guardarFisioterapeuta(fisioterapeuta);
    }

    @PutMapping("/fisioterapeutas/{id}")
    public ResponseEntity<?> actualizarFisioterapeuta(@RequestBody Fisioterapeuta fisioterapeuta, @PathVariable Long id){
        try {
            Fisioterapeuta fisioterapeutaExistente = fisioterapeutaService.obtenerFisioterapeutaporId(id);
            fisioterapeutaExistente.setFisioterapeutaNombres(fisioterapeuta.getFisioterapeutaNombres());
            fisioterapeutaExistente.setFisioterapeutaNick(fisioterapeuta.getFisioterapeutaNick());

            fisioterapeutaService.guardarFisioterapeuta(fisioterapeutaExistente);
            return new ResponseEntity<Fisioterapeuta>(HttpStatus.OK);
        }catch (Exception exception){
            return new ResponseEntity<Fisioterapeuta>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/fisioterapeutas/{id}")
    public void eliminarFisioterapeuta(@PathVariable Long id) {
        fisioterapeutaService.eliminarFisioterapeuta(id);
    }


}
