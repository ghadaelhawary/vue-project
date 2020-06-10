<template>

<div class="modal-dialog" >
		<div class="modal-content">
			
			<hr />
			<div class="modal-body">
				<form     role="form">
					<div class="form-group">
						<div class="input-group">
							<span class="input-group-addon">
							<span class="glyphicon glyphicon-user"></span>
							</span>
						
						</div>
					</div>
					<div class="form-group">
						<div class="input-group">
							<span class="input-group-addon">
							<span class="glyphicon glyphicon-lock"></span>
							</span>
							<input type="text" v-model="productName" class="form-control" placeholder=" product Name" />

						</div>

					</div>
                    <div class="form-group">
						<div class="input-group">
							<span class="input-group-addon">
							<span class="glyphicon glyphicon-lock"></span>
							</span>
							<textarea  v-model="description" class="form-control" placeholder="description"> </textarea>

						</div>

					</div>
                    <div class="form-group">
						<div class="input-group mt-0">
							<span class="input-group-addon">
							<span class="glyphicon glyphicon-lock"></span>
							</span>
							<input type="number" v-model="price" class="form-control" placeholder="Price" />

						</div>

					</div>
                    <div class="form-group">
						<div class="input-group">
							<span class="input-group-addon">
							<span class="glyphicon glyphicon-lock"></span>
							</span>
							<input type="Number" v-model="instock" class="form-control" placeholder="In Stock" />

						</div>

					</div>
                       <div class="form-group">
						<div class="input-group">
							<span class="input-group-addon">
							<span class="glyphicon glyphicon-lock"></span>
							</span>
							<input type="file" id ="file" ref="file"  @change="readURL($event)" class="form-control" placeholder="In Stock" />

						</div>

					</div>
                    <div>


             <img id="blah" src="#" alt="your image" />

                    </div>
                     <button @click="addProduct()" class="btn btn-success">Add Product</button>
				</form>
			</div>
		</div>
</div>
        
</template>
   <script>
   import Vue from 'vue';
   export default {
    data(){
        return{
productName:"",
description:"",
price:0,
instock:0,
productImage:"",
        }
    },
    methods:{
     readURL:function(input) {
         console.log(input.target.files[0])
        //  console.log(  document.getElementById("blah"))
        if (input.target.files && input.target.files[0]) {
            var reader = new FileReader();
           this.productImage = this.$refs.file.files[0];
          console.log(this.productImage)
            reader.onload = function (e) {
                console.log(e)
            document.getElementById("blah").setAttribute('src', e.target.result)
                   
            };

            reader.readAsDataURL(input.target.files[0]);
        }
    },
    addProduct:function(){
        
        let formData = new FormData();
         formData.append('productImage', this.productImage);
                  formData.append('name', this.productName);
         formData.append('price', this.price);
         formData.append('inStock', this.instock);
         formData.append('description', this.description);


        Vue.axios.post("http://localhost:8080/products/add",formData
//         {name:this.productName,description:this.description
//         ,price:this.price,
//         inStock:this.instock,
// productImage:this.productImage,
        
//         },
        ,{headers: {
                    'Content-Type': 'multipart/form-data'
                }})
        .then((response)=>{
            this.$router.push('/websiteproduct');
            console.log(response)
        })
        console.log(this.productName)
    }
    }
   }
   </script>
    
<style scoped>
#blah{
width:200px;
                height:200px;
}
</style>

