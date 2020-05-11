var app = new Vue({
  el: '.app',
  data: {
    errorMsg: "",
    successMsg: "",
    warningMsg: "",
    infoMsg: "",
    showAddModal: false,
    showEditModal: false,
    showDeleteModal: false,
    users: [],
    newUser: {
      name: '',
      email: '',
      phone: '',
    },
    currentUser: {},
  },
  methods: {
    getAllUsers() {
      axios.get('./process.php?action=read')
        .then((res) => {
          if(res.data.error){
            this.errorMsg = res.data.message;
          } else {
            this.users = res.data.users;
          }
        });
    },
    toFormData(obj){
      var fd = new FormData();
      for(var i in obj){
        fd.append(i, obj[i]);
      }
      return fd;
    },
    addNewUser(){
      var formData = this.toFormData(this.newUser);
      axios.post('./process.php?action=create', formData)
        .then((res) => {
          if(res.data.error){
            this.newUser = {name:'', email:'', phone:''};
            this.errorMsg = res.data.message;
            setTimeout(() => {
              this.errorMsg = false;
            }, 4000);
          } else {
            this.getAllUsers();
            this.successMsg = res.data.message;
            setTimeout(() => {
              this.successMsg = false;
            }, 4000);
          }
        });
    },
    editUser(){
      var formData = this.toFormData(this.currentUser);
      console.log(formData);
      axios.post('./process.php?action=update', formData)
        .then((res) => {
          this.currentUser = {};
          if(res.data.error){
            this.errorMsg = res.data.message;
          } else {
            this.getAllUsers();
            this.successMsg = res.data.message;
            setTimeout(() => {
              this.successMsg = false;
            }, 4000);
          }
        });
    },
    deleteUser(){
      var formData = this.toFormData(this.currentUser);
      console.log(formData);
      axios.post('./process.php?action=delete', formData)
        .then((res) => {
          if(res.data.error){
            this.errorMsg = res.data.message;
          } else {
            this.getAllUsers();
            this.successMsg = res.data.message;
            setTimeout(() => {
              this.successMsg = false;
            }, 4000);
          }
        });
    },
    selectUser(user){
      this.currentUser = user;
    }
  },
  mounted: function() {
    this.getAllUsers();
  }
})