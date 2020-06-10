<template>

<div class="container">
<div class="row ">
 <div v-for="product in products" class="card m-3 " style="width: 18rem;" >
  <img :src="product.img" class="card-img-top" alt="dd" style="height:120px;">
  <div class="card-body">
    <h5 class="card-title">{{product.name}}</h5>
    <p class="card-text">{{product.description}}</p>
    
    <span class="card-text mr-5"> Instock::{{product.inStock}}</span>

    <button  @click="addtocart(product._id,$event)" class="btn btn-primary">add to cart</button>
    </div>
        </div>

  </div>
</div>
</div>
</template>

<script>

import Vue from "vue"
export default{
    data(){
        return{
             products:[]
        }
    },
    created:function(){
           
Vue.axios.get("http://localhost:8080/products/list").then((response)=>{
       let Copy = this.convert( response.data)
       console.log(Copy)
       this.products=Copy
      console.log(this.products)
            }).catch(()=>{
                   
            })
        

    },
//     updated:function(){
// Vue.axios.get("http://localhost:8080/products/list").then((response)=>{
//       this.products = response.data
//      // console.log(this.products)
//             }).catch(()=>{
                   
//             })
//     },
    methods:{
        addtocart:function(productid,e){
            let userId =  Number( localStorage.getItem("id"))
            Vue.axios.post("http://localhost:8080/userproduct/addtoCart",
            {id:userId,productId:productid}).then((response)=>{
                  console.log(response.data)
                  this.decrementProductInstock(productid);  
                //   e.target.text="product add";
                //   e.target.disabled=true;
                //   console.log(e.target)
            })
           
        },
           convert:function(arr){
          let copy =[];
           for(let i=0; i<arr.length; i++){
                var base64Flag = 'data:image/jpeg;base64,';
                    var binary = '';
        var bytes = [].slice.call(new Uint8Array(arr[i].img.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        let p = window.btoa(binary);
        let image = base64Flag+p;
        arr[i].img=image;
        copy[i] = arr[i]
           }
           return copy ;
      },
      decrementProductInstock:function(productId){
          for(let i = 0; i<this.products.length; i++){
              if(this.products[i]._id == productId){
                  this.products[i].inStock--;
                  break;
              }
          }
      }
    }
    
}
</script>