var app = new Vue({
  el: "#app",
  data: {
    quantity: 10,
    gender: "",
    users: [],
    username: "",
    password: "",
    
    loggedInUser: [],
  },
  methods: {
    async login() {
        const response = await fetch('https://randomuser.me/api/?results=5');
        const data = await response.json();
        const users = data.results;
  
        const user = this.users.filter(user => user.login.username === this.username && user.login.password === this.password);
        if (!user.length) {
        swal("Error", "Usuario o contraseña incorrectas", "error");
          return;
        }
        Swal.fire({
          icon: 'success',
          title: 'Entrando',
          showConfirmButton: false,
        });
        
        this.loggedInUser = {
          username: this.username,
          password: this.password,
        };

        setTimeout(()=> {
          if(this.login){
            location.href="user.html";
          }
        },1600);
        this.getUsers();
        this.updateLocalStorage.setItem();
    },
      logout() {
        this.username="";
        this.password="";
        setTimeout(()=> {
          if(this.login){
            location.href="api.html";
          }
        },100);
    
      },
    async getUsers() {
      const response = await fetch(
        `https://randomuser.me/api/?results=${this.quantity}`
      );
      const data = await response.json();
      let users = data.results;
      if (this.gender) {
        users = users.filter((user) => user.gender === this.gender);
      }
      this.users = users;
      this.updateLocalStorage.setItem();
    },

    updateLocalStorage() {
      localStorage.setItem("users", JSON.stringify(this.user));
    },

    getFlagUrl(countryCode) {
      const response = `https://countryflagsapi.com/png/${countryCode}`;
      return response;
    },
    removeUser(user) {
      Swal.fire({
        title: '¿Seguro que quieres eliminar?',
        text: "Eliminarás a este usuario",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
      this.users.splice(user, 1);
          Swal.fire(
            'Eliminado',
            'El usuario ha sido eliminado',
            'success'
          )
        }
      })
    },
  },
  mounted() {
    this.getUsers()
},
  created() {
    if (localStorage.getItem("users") !== null) {
      this.users = JSON.parse(localStorage.getItem("users"));
    } else {
      this.getUsers();
    }
  },
  

});
