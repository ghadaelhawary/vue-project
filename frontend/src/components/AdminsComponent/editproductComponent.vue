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
							<input type="text" v-model="productName"  class="form-control" placeholder=" product Name" />

						</div>

					</div>
                    <div class="form-group">
						<div class="input-group">
							<span class="input-group-addon">
							<span class="glyphicon glyphicon-lock"></span>
							</span>
							<textarea v-model="description"  class="form-control" placeholder="description"> </textarea>

						</div>

					</div>
                    <div class="form-group">
						<div class="input-group mt-0">
							<span class="input-group-addon">
							<span class="glyphicon glyphicon-lock"></span>
							</span>
							<input type="number" v-model="price"  class="form-control" placeholder="Price" />

						</div>

					</div>
                    <div class="form-group">
						<div class="input-group">
							<span class="input-group-addon">
							<span class="glyphicon glyphicon-lock"></span>
							</span>
							<input type="Number" v-model="instock"  class="form-control" placeholder="In Stock" />

						</div>

					</div>
                       <div class="form-group">
						<div class="input-group">
							<span class="input-group-addon">
							<span class="glyphicon glyphicon-lock"></span>
							</span>
							<input type="file" id ="file" ref="file"  class="form-control" placeholder="In Stock" />

						</div>

					</div>
                    <div>


             <img id="blah" src="#" alt="your image" />

                    </div>
                     <button class="btn btn-success" @click="updateProduct">Update</button>
				</form>
			</div>
		</div>
</div>

</template>

<script>
import Vue from 'vue';
    export default  {
        props:["productid"],
data(){
    return{
        productName:"",
        description:"",
        price:"",
        instock:"",

    }

},
created:function(){
Vue.axios.get("http://localhost:8080/products/edit/"+this.$route.params.id)
.then((response)=>{
    console.log(this.$route)
    console.log(this.productid)
     console.log(response)
     this.productName= response.data.name;
          this.description= response.data.description;

     this.price= response.data.price;

     this.instock= response.data.inStock;


})
}
,methods:{
    updateProduct:function(){
        Vue.axios.post("http://localhost:8080/products/edit/"+this.$route.params.id,
        {
            name:this.productName,
            description:this.description,
            inStock:this.instock,
            price:this.price,
        }
        
        ).then((response)=>{
                console.log(response)
        })

    }
}
    }
    </script>
        