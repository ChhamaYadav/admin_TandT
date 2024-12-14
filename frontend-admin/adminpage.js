fetch('http://localhost:8080/admin/products')
.then(response=>response.json())
.then(data=>{
console.log(data);})
.catch(error=> console.log('Error fetching products: ',error));