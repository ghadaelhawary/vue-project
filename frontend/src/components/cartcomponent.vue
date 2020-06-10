<template>

<table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">product name</th>
      <th scope="col">quentity </th>
      <th scope="col">price</th>
     <th scope="col">total price</th>

    </tr>
  </thead>
  <tbody>
    <tr v-for="userProduct in userProducts" :key="userProduct.productId._id">
    <td>{{userProduct.productId.name}}</td>
        <td>{{userProduct.productQuentity}}
        <button class="btn btn-success mr-2" @click="increaseQuentity(userProduct.productId._id)">+</button>
         <button class="btn btn-success"  @click="decreaseQuentity(userProduct.productId._id)">-</button>
        </td>
        <td>{{userProduct.productId.price}}</td>
        <td>{{userProduct.productId.price*userProduct.productQuentity}}</td>



     
    </tr>
   
  </tbody>
</table>


</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      userProducts: []
    };
  },
  created: function() {
    let userId = Number(localStorage.getItem("id"));
    //console.log(userId);
    Vue.axios
      .get("http://localhost:8080/userproduct/list/" + userId)
      .then(response => {
        console.log(response.data);
        this.userProducts = response.data.cart;
      })
      .catch(() => {});
  },
  /*updated:function(){
        let userId =  Number( localStorage.getItem("id"));
                           //console.log(userId);
Vue.axios.get("http://localhost:8080/userproduct/list/"+userId).then((response)=>{
    
      //console.log(response.data)
      this.userProducts=response.data.cart;
            }).catch(()=>{
                   
            })

    },*/
  methods: {
    increaseQuentity: function(productId) {
      console.log("helllllllllo");
      let userId = Number(localStorage.getItem("id"));

      Vue.axios
        .post("http://localhost:8080/userproduct/inStock", {
          productId: productId
        })
        .then(response => {
          //console.log(response.data.inStock)
          if (response.data.inStock > 0) {
            Vue.axios
              .put("http://localhost:8080/userproduct/incrementProduct", {
                userId: userId,
                productId: productId
              })
              .then(response => {
                Vue.axios
                  .put("http://localhost:8080/userproduct/decreaseStock", {
                    productId: productId
                  })
                  .then(product => {
                    this.changeQuentityinArray(productId, "+");
                    console.log(product.data);
                  });
              });
          } else {
            alert("this product is out of stock");
          }
        });
      /* Vue.axios.put("http://localhost:8080/userproduct/incrementProduct",
        {userId:userId,productId:productId}).then((response)=>{
          console.log(response)
        })*/
    },
    decreaseQuentity: function(productId) {
      console.log(this.userProducts);
      console.log(productId);

      console.log(this.getProductQuentity(productId));
      let userId = Number(localStorage.getItem("id"));
      if (this.getProductQuentity(productId) > 0) {
        Vue.axios
          .put("http://localhost:8080/userproduct/decrmentProduct", {
            userId: userId,
            productId: productId
          })
          .then(response => {
            console.log(response);

            Vue.axios
              .put("http://localhost:8080/userproduct/increaseStock", {
                productId: productId
              })
              .then(product => {
                this.changeQuentityinArray(productId, "-");

                console.log(product.data);
              });
          });
      } else {
        let index = this.getProductIndex(productId);
        //console.log(index)
        this.userProducts.splice(index, 1);
        Vue.axios
          .post("http://localhost:8080/userproduct/delete", {
            id: userId,
            productId: productId
          })
          .then(response => {
            console.log(response.data);
          });
      }
    },
    getProductQuentity: function(productid) {
      let productQuentity;
      console.log(productid);
      for (let i = 0; i < this.userProducts.length; i++) {
        /* console.log("ssssssss")
                console.log(this.userProducts[i].productId._id)*/

        if (this.userProducts[i].productId._id == productid) {
          productQuentity = this.userProducts[i].productQuentity;
          console.log(productQuentity + "jjjj");
        }
      }
      return productQuentity;
    },
    changeQuentityinArray: function(productid, op) {
      for (let i = 0; i < this.userProducts.length; i++) {
        /* console.log("ssssssss")
                console.log(this.userProducts[i].productId._id)*/

        if (this.userProducts[i].productId._id == productid) {
          if (op === "+") {
            this.userProducts[i].productQuentity =
              this.userProducts[i].productQuentity + 1;
          } else {
            this.userProducts[i].productQuentity =
              this.userProducts[i].productQuentity - 1;
          }
          break;
        }
      }
    },
    getProductIndex: function(productid) {
      console.log(productid);

      let productIndex;
      for (let i = 0; i < this.userProducts.length; i++) {
        if (this.userProducts[i].productId._id == productid) {
          productIndex = i;
          console.log(this.userProducts[i].productId._id);
          return productIndex;
        }
      }
    }
  } /*,
    computed:{
      
      getProductQuentity:function(productId){
        let productQuentity ;
        console.log(productId)
      for (let i =0; i<this.userProducts.length; i++){
        console.log("ssssssss")
            if(this.userProducts[i].productId._id==productId){
                 productQuentity =  this.userProducts[i].productQuentity;
                 console.log(productQuentity+"jjjj")
            }
            return productQuentity;
      }
      }
    }*/
};
</script>