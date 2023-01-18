import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'; //PONER ESTA MANUAL
import { ProductCategory } from '../common/product-category';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  private baseUrl = 'http://localhost:9090/api/products';
  
  private categoryUrl='http://localhost:9090/api/product-category';

  constructor(private httpClient: HttpClient) {

   }

  getProduct(theProductId: number): Observable<Product> {
    // need to build URL based on the product ID
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }
  
  getProductListPaginate(thePage: number, 
                        thePageSize:number,  
                        theCategoryId: number): Observable<GetResponseProducts>{
    //need to build URL based on category ID, page and size
    const searchURL = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                        + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchURL);
  }


  getProductList(theCategoryId: number): Observable<Product[]>{
              //need to build URL based on category ID
              const searchURL = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
              return this.getProducts(searchURL);
            }

  searchProducts(theKeyword: string): Observable<Product[]> {
              //need to build URL based on the keyword
              const searchURL = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
              return this.getProducts(searchURL);
            }


  searchProductsPaginate( thePage: number, 
                          thePageSize:number,  
                          theKeyword: string): Observable<GetResponseProducts>{
              //need to build URL based on keyword, page and size
              const searchURL = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                              + `&page=${thePage}&size=${thePageSize}`;
              return this.httpClient.get<GetResponseProducts>(searchURL);
              }
  

  private getProducts(searchURL: string): Observable<Product[]> {
                return this.httpClient.get<GetResponseProducts>(searchURL).pipe(
                  map(response => response._embedded.products)
                );
              }

  getProductCategories(): Observable<ProductCategory[]> {
              return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
                map(response => response._embedded.productCategory)
              );
            }
  
}



interface GetResponseProducts{
  _embedded:{
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory{
  _embedded:{
    productCategory: ProductCategory[];
  }
}
