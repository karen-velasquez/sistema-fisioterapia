package com.sistema.fisioterapia.controller;
import com.sistema.fisioterapia.model.Sesion;
import com.sistema.fisioterapia.services.SesionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sesion")
@CrossOrigin("*")
public class SesionController {

    @Autowired
    private SesionService sesionService;
    @PostMapping("/")
    public ResponseEntity<Sesion> guardarSesiones(@RequestBody Sesion sesion){
        return ResponseEntity.ok(sesionService.guardarSesion(sesion));
    }

    @GetMapping("/{sesion_id}")
    public Sesion obtenerSesion(@PathVariable("sesion_id") Long sesion_id) {
        return sesionService.obtenerSesion(sesion_id);
    }


    @GetMapping("/listar")
    public ResponseEntity<?> listarSesiones() {
        return ResponseEntity.ok(sesionService.listarSesiones());
    }



    @GetMapping("/listar/{fisioterapeuta_username}")
    public ResponseEntity<?> listarSesionesFisioterapeuta(@PathVariable("fisioterapeuta_username") String fisioterapeuta_username) {
        return ResponseEntity.ok(sesionService.listarSesionesFisioterapeuta(fisioterapeuta_username));
    }




}
