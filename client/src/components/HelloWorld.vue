<template>
  <div class="">
    <div class="register scale-up-top" style="background-color:transparent; position: fixed; margin: 4% 0 0 0; width:100%;" v-if='RegisterForm == true'>
      <div class="container">
        <div class="row">
          <div class="col s12" style="margin:3% 0 0 2%; background-color:rgba(0, 0, 0, 0.9);">
            <form class="col s12">
              <h4 style="text-align:center; color:white" ><b>Sign Up</b> </h4>
              <div class="row">
                <div class="input-field col s12" style="padding-right:15px;">
                  <input id="fullname" type="text" class="validate" style="color:white;" v-model='RegisterData.fullname'>
                  <label for="fullname" style="color:white;">Full Name</label>
                </div>
                <div class="input-field col s12" style="padding-right:15px;">
                  <input id="email" type="text" class="validate" style="color:white;" v-model='RegisterData.email'>
                  <label for="email" style="color:white;" >Email</label>
                </div>
                <div class="input-field col s12" style="padding-right:15px;">
                  <input id="password" type="password" class="validate" style="color:white;" v-model='RegisterData.password' v-on:keyup='checkLength'>
                  <label for="password" style="color:white;" >Password</label>
                </div>
                <div class="col">
                  <label v-if="validation == false" style="color:white;">Password minimum 6 character . . .</label>
                </div>
                <div class="input-field col s12" style="padding-right:15px;">
                  <input id="confirmpassword" type="password" class="validate" style="color:white;" v-model='RegisterData.confirmpassword' v-on:keyup='checkSame'>
                  <label for="confirmpassword" style="color:white;" >Confirm Password</label>
                </div>
                <div class="col">
                  <label v-if="check == false" style="color:white;">Password didn't match !</label>
                </div>
              </div>
              <div class="row">
                <div class="col s6">
                  <a class="btn btn-block" @click='register'>Sign Up</a>
                </div>
                <div class="col s6">
                  <a class="btn btn-block" @click='cancel'>Cancel</a>
                </div>
              </div>
              <br>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="register scale-up-top" style="background-color:transparent; position: fixed; margin: 8% 0 0 0; width:100%;" v-if='loginForm == true'>
      <div class="container">
        <div class="row">
          <div class="col s12" style="margin:3% 0 0 2%; background-color:rgba(0, 0, 0, 0.9);">
            <form class="col s12">
              <h4 style="text-align:center; color:white" ><b>Sign In</b> </h4>
              <div class="row">
                <div class="input-field col s12" style="padding-right:15px;">
                  <input id="email" type="text" class="validate" style="color:white;" v-model='LoginData.email'>
                  <label for="email" style="color:white;" >Email</label>
                </div>
                <div class="input-field col s12" style="padding-right:15px;">
                  <input id="password" type="password" class="validate" style="color:white;" v-model='LoginData.password'>
                  <label for="password" style="color:white;" >Password</label>
                </div>
              </div>
              <div class="row">
                <div class="col s6">
                  <a class="btn btn-block" @click='login'>Sign In</a>
                </div>
                <div class="col s6">
                  <a class="btn btn-block" @click='cancel'>Cancel</a>
                </div>
              </div>
              <br>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data () {
    return {
      RegisterData : {
        fullname: '',
        email : '',
        password : '',
        confirmpassword: ''
      },
      LoginData : {
        email: '',
        password: ''
      },
      check: true,
      validation: true
    }
  },
  computed : {
    RegisterForm () {
      return this.$store.state.registerForm
    },
    loginForm () {
      return this.$store.state.loginForm
    }
  },
  created () {
    if (localStorage.hasOwnProperty('authorization')) {
      this.$router.push('/')
    }
  },
  methods: {

    backToHomepage () {
      // this.$router.push('/')
    },

    login(){

      const user = {
        email: this.LoginData.email,
        password: this.LoginData.password
      }
      const self = this

      axios({
        method: 'post',
        url: 'http://localhost:3000/users/signin',
        data: user
      })
      .then(response => {
        this.$store.dispatch('cancelAll')
        this.$store.dispatch('profileInfo', response.data.userInfo)
        this.LoginData.email = ''
        this.LoginData.password = ''
        localStorage.setItem('authorization', response.data.jwtToken+'*#$_.'+response.data.userInfo._id)
      })
      .catch(err => {
        self.loginData.email = ''
        self.loginData.password = ''
      })
    },
    register () {
      if (this.validation == true && this.check == true && this.RegisterData.password.length != 0) {
        const self = this
        axios({
          method: 'post',
          url: 'http://localhost:3000/users/signup',
          data: self.RegisterData
        }).then(response => {
            this.$store.dispatch('cancelAll')
            this.RegisterData.fullname = '',
            this.RegisterData.email = '',
            this.RegisterData.password = '',
            this.RegisterData.confirmpassword = ''
            this.$router.push('/')
            swal({
              title: "Yosh!",
              text: "Successfully register your account",
              icon: "success",
            });
        }).catch(err => {
          console.log(err);
        })
      } else {
        swal({
          text: "Please input a valid data . . .",
          icon: "error"
        })
      }
    },
    checkSame () {
      if (this.RegisterData.password == this.RegisterData.confirmpassword || this.RegisterData.confirmpassword.length == 0) {
        this.check = true
      } else {
        this.check = false
      }
    },
    checkLength () {
      if (this.RegisterData.password.length >= 6 || this.RegisterData.password.length == 0) {
        this.validation = true
      } else {
        this.validation = false
      }
    },
    cancel () {
      this.$store.dispatch('cancelAll')
    }
  }
}
</script>

<style scoped>
.register{
  background-color: #ecf0f1;
  background-size: cover;
  padding-top: 10px;
  height: 100%;
}
.navmedia{
  padding: 0 5 0 0;
  background-color: transparent;
  border: none;
  margin-bottom: 13%;
}
.socmed{
  height:50px;
  width: 94px;
  text-align: center;
  font-size: 50px;
  margin:9% 0 50% 20%;
}
li{
  margin-right:10px;
}
.tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
    font-size: 12px;
}

.tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
}
.scale-up-top {
	-webkit-animation: scale-up-top 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
	        animation: scale-up-top 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}
/* ----------------------------------------------
 * Generated by Animista on 2018-7-5 13:51:13
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation scale-up-top
 * ----------------------------------------
 */
@-webkit-keyframes scale-up-top {
  0% {
    -webkit-transform: scale(0.5);
            transform: scale(0.5);
    -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
  }
}
@keyframes scale-up-top {
  0% {
    -webkit-transform: scale(0.5);
            transform: scale(0.5);
    -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
  }
}

</style>
