import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrestaShopService } from '../services/presta-shop.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  productos: any[] = [];

  constructor(public shop: PrestaShopService, private router: Router) { }

  ngOnInit() {
    this.getProductById();
  }
  
  getProductById() {
    this.shop.getProducts().subscribe((response : any) => {
      response.products.forEach((product: any) => {
        this.productos.push({
          id: product.id,
          nombre: product.name,
          imagen: `https://marcariza.cat/api/images/products/${product.id}/${product.id_default_image}?ws_key=AAPPRHCE1V5PTNV3ZY8Q3L45N1UTZ9DC`,
        });
      });
      console.log(response);
    });
  }

  mostrarDetalle(producto: any) {
    this.router.navigate(['/detalle-producto'], { queryParams: { id: producto.id } });
  }
}