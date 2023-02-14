export default {
  data() {
    return {
      users: [],
      username: '',
      loggedInUser: null,
      showLogin: true,
    }
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => user.login.username !== this.username);
    }
  },
  async mounted() {
    const response = await fetch('https://randomuser.me/api/?results=5');
    const data = await response.json();
    this.users = data.results;
  },
  methods: {
    login() {
      this.loggedInUser = this.users.find(user => user.login.username === this.username);
    }
  }
}