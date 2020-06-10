<template>
<div class = "signing-up">
    <h1>Sign Up</h1>
<form class = "form-sign-up" method="post" @submit.prevent="submited">

<input type="text" placeholder="First Name" name="fName" >
<input type="text" placeholder="Last Name" name="lName" >
<input type="email" placeholder="Email"  name="email">
<input type="password" placeholder="Password" name="password" >
<input type="submit" value="SignUp" >




</form>



</div>






</template>
<script>
import Vue from 'vue';
//import router from 'vue-router'
export default{
    data(){
return{
     id:0,
        fName:'',
        lName:'',
        email:'',
        password:''
    
}
    },
    methods:{
       submited(e){
           console.log(e)
           this.fName = e.target.elements[0].value ;
            this.lName = e.target.elements[1].value ;


           this.email = e.target.elements[2].value ;

           this.password = e.target.elements[3].value;    
           //{"fName":this.fName,"lName":this.lName,"email":this.email,"password":this.password}

      Vue.axios.post("http://localhost:8080/user/register", 
    
    {"fName":this.fName,"lName":this.lName,"email":this.email,"password":this.password}).then((response)=>{
    console.log(response.data)
              this.id = response.data._id
    localStorage.setItem("id",this.id)

    this.$router.push('/home');
   
    }).catch(()=>{

    })

    }}
}
</script>
<style>



body{
    background-color: #58855b;
}
input{
    margin-top: 50px;
    padding-left: 10px;
    font-size:15px;
    display: block;
    width: 230px;
    height: 30px;
    border-radius: 15px;
    border: 1px solid black;

}
body{
    text-align: center;
}
.signing-up{
    margin-top: 50px;
width: 60%;
    display: inline-block;
    background: #3e3d3d;


}
h1{
    color:#fff;
}
input[type="submit"]{
    color:#080808;
    font-size:17px; 
    
   background-color:#bcd153;

}
input[type="submit"]:hover{
    background-color:#c1e00e;
 
 }


</style>


