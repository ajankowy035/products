import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from './product.model';

@Injectable()
export class ProductService {
    private products: Product[];

    insertProduct(title: string, desc: string, price: number){
        const prodId = Math.random().toString();
        const newProduct = new Product(new Date().toString(), title, desc, price);
        this.products.push(newProduct);

        return prodId;
    }

    getProducts (){
        return [...this.products];
    }

    getSingleProduct(productId: string){
        const product = this.findProduct(productId)[0];

        return {...product};
    }

    updateProduct(productId: string, title: string, description: string, price:number){
        const [product, index] = this.findProduct(productId);
        const updatedProduct = {...product};
        
        if(title){
            updatedProduct.title = title;
        }
        if(description){
            updatedProduct.desc = description;
        }
        if(price){
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
        
    }

    deleteProduct(id: string){
        const [_ , index] = this.findProduct(id);
        const updatedProducts = this.products.filter(product => product.id !== id);

        return updatedProducts;

    }

    private findProduct(id: string): [Product, number]{
        const productIndex = this.products.findIndex(product => id === product.id);
        const product = this.products[productIndex];
        if(!product){
            throw new NotFoundException('Could not find a product');
        }

        return [product, productIndex];
    }

    
}