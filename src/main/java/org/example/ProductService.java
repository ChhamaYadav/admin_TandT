package org.example;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("org.example.Product not found!"));
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        Product product= productRepository.findById(id).orElseThrow(()->new RuntimeException("org.example.Product not found!"));
        product.setName(productDetails.getName());
        product.setCategory(productDetails.getCategory());
        product.setId(productDetails.getId());
        product.setCode(productDetails.getCode());
        product.setPrice(productDetails.getPrice());
        product.setStockQuantity(productDetails.getStockQuantity());
        product.setImageUrl(productDetails.getImageUrl());
        return productRepository.save(product);
    }

    public boolean deleteProduct(Long id){
        Product product=productRepository.findById(id).orElseThrow(()->new RuntimeException(("org.example.Product not found")));
        productRepository.delete(product);
        return false;
    }


}
