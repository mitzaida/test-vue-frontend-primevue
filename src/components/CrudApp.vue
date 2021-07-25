<template>
  <div style="margin: 0 auto; width: 80%">
    <Toast/>   
    <Panel header="Panel de Control de CRUD de Persona">
       <Menubar :model="items" />  
      <br />
        <DataTable :value="personas" :paginator="true" :rows="13" selectionMode="single" :selection.sync="selectedPersona" dataKey="id"> 
          <Column field="id"       header="ID"></Column> 
          <Column field="nombre"   header="Nombre"></Column>
          <Column field="apellido" header="Apellido"></Column>
          <Column field="direccion" header="Dirección"></Column>
          <Column field="telefono" header="Teléfono"></Column>
      </DataTable>
    </Panel>

    <Dialog 
    header="Control Panel CREAR Persona" 
    :visible.sync="displayModal" 
    :modal="true">

      <br>
      <span class="p-float-label">
        <InputText id="nombre" type="text" v-model="persona.nombre" style="width: 100%" />
        <label for="nombre">Nombre</label>
      </span>
      <br>

      <span class="p-float-label">
        <InputText id="apellido" type="text" v-model="persona.apellido" style="width: 100%" />
        <label for="apellido">Apellido</label>
      </span>
      <br>

      <span class="p-float-label">
        <InputText id="direccion" type="text" v-model="persona.direccion" style="width: 100%" />
        <label for="direccion">Dirección</label>
      </span>
      <br>

      <span class="p-float-label">
        <InputText id="telefono" type="text" v-model="persona.telefono" style="width: 100%" />
        <label for="telefono">Teléfono</label>
      </span>
      <br>
      
      <template #footer>
        <Button label="Guardar Persona" icon="pi pi-check" @click="save" />
        <Button label="Cancelar" icon="pi pi-times" @click="closeModal" class="p-button-secondary" />
      </template>
    </Dialog>
  </div>
</template>


<script>
import PersonaService from "../service/PersonaService";
export default {
  name: "CrudApp",
  data() {
    return {
      personas: null,

      persona: {
        id: null,
        nombre: null,
        apellido: null,
        direccion: null,
        telefono: null
      },
      
      // selectedPersona será el objeto que va a recibir la información 
      // del record seleccionado from DataTable.
      selectedPersona: {
        id: null,
        nombre: null,
        apellido: null,
        direccion: null,
        telefono: null
      },

      // Array de items asociados a los métodos creados de vue para 
      // ejecutar una acción según el ícono del Menubar.
      items: [
        {
          label: "Nueva Persona",
          icon: "pi pi-fw pi-plus",
          command: () => {
            this.showSaveModal();
          }
        },
        {
          label: "Editar Persona",
          icon: "pi pi-fw pi-pencil",
          command: () => {
            this.showEditModal();
          }
        },
        {
          label: "Eliminar Persona",
          icon: "pi pi-fw pi-trash",
          command: () => {
            this.delete();
          }
        },
        {
          label: "Refrescar Formulario",
          icon: "pi pi-fw pi-refresh",
          command: () => {
            this.getAll();
          }
        }
      ],
  
      displayModal: false
    };
  },   // Fin del data de vue.

  personaService: null,

  // Métodos del ciclo de vida de vue.
  created() {
    this.personaService = new PersonaService();
  },

  mounted() {
    this.getAll();
  },

  
  methods: {

    showSaveModal() {
      this.displayModal = true;
      this.cleanForm();
    },

    showEditModal() {
     // console.log(this.selectedPersona);
      this.persona = this.selectedPersona;
      this.displayModal = true;
    },

    getAll() {
      this.personaService.getAll().then(data => {
        this.personas = data.data;
      });
    },


    delete() {
      if (confirm("¿Seguro de BORRAR esta Persona de la Tabla? ")) {
        console.log(this.selectedPersona);
        this.personaService.delete(this.selectedPersona.id).then(data => {
          if(data.status === 200 ) {
            this.$toast.add({severity:'success', summary: 'Atención MZ', 
            detail:'Eliminada la Persona',
             life: 3000
            });
            this.getAll();  
          } 
        });
      } 
    },
    

    save() {
      this.personaService.save(this.persona).then(data => {
       // console.log(data);
        if (data.status === 200) {
          this.displayModal = false;   // Aqui cierra la modal 
          this.cleanForm();
          this.getAll();
        }
      }); 
    },

    // Este método es el que se ejecuta al presionar el botón Cancelar en la modal.
    closeModal() {
      this.displayModal = false;
    },

    // Limpio siempre el formulario
    cleanForm () {
      this.persona = {
            id: null, 
            nombre: null,           
            apellido: null,         
            direccion: null,
            telefono: null
      };
      this.getAll();
    }
    
  } // Fin de methos de vue.

};  //  Fin del export default {}
</script>


<style>  
</style>  