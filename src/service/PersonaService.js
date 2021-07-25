import axios from 'axios';

export default class PersonaService {
   
    // Esta url conecta con el backend con el archivo PersonaRestController y
    // con las anotaciones de SpringBoot respectivas mapaendo la dirección de la API.
    url = "http://localhost:8080/api/v1/";  
                                            
    
    getAll() {
        return axios.get(this.url + "all");
    }
   
    save(persona) {
        return axios.post(this.url + "save", persona);
    }

    // En el back-end el Controller tiene @GetMapping y usa @PathVariable por ello
    // se coloca "delete/"+id. 
    delete(id) {
        return axios.delete(this.url + "delete/"+id);
    }
}