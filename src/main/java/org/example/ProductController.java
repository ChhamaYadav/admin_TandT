package org.example;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/products")
public class ProductController {
    private final ProductService productService;
    private static final Logger logger= LoggerFactory.getLogger(ProductController.class);

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/health")
    public String healthCheck() {
        return "Application is running!";
    }
    @GetMapping
    public List<Product> getAllProducts(){
        logger.info("Received request to get all products");
        logger.info("Returning products");
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id){
        logger.info("Recieved request to get the product with ID");
        Product product= productService.getProductById(id);
        if(product!=null){
            logger.info("Returning the product with ID : {}", id);
        }
        else{
            logger.info("org.example.Product with ID:{} not found",id);
        }
        return product;
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product){
        logger.info("Received request to create a new product : {}",product);
        Product createdProduct=productService.createProduct(product);
        logger.info("org.example.Product created with ID:{}",product);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails){
        logger.info("Received request to update the product id: {}",id);
        Product updatedProduct= productService.updateProduct(id,productDetails);
        if(updatedProduct!=null){
            logger.info("org.example.Product updated with the id :{} updated sucessfully.",id);
            return ResponseEntity.ok(updatedProduct);
        }
        else{
            logger.warn("product isn't found for update with id:{}",id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct( @PathVariable Long id){
        logger.info("Recieved request to delete product with ID:{}",id);
        boolean deleted=productService.deleteProduct(id);
        if(deleted){
            logger.info("org.example.Product with ID:{} deleted successfully",id);
            return ResponseEntity.noContent().build();
        }
        else{
            logger.warn("org.example.Product isn't found for deletion with ID:{}",id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
