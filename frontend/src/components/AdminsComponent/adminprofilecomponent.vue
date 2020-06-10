<template>


<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Admin Profile</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link to="/websiteproduct">
       
        <a class="nav-link">Products List  <span class="sr-only">(current)</span></a>
      </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/add/product">
        <a class="nav-link"> Add Product</a>
        </router-link>
      </li>
    </ul></div>
    
    
    </nav>







</template>