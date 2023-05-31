import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrestaShopService } from '../services/presta-shop.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: 'detalle-producto.page.html',
  styleUrls: ['detalle-producto.page.scss'],
})
export class DetalleProductoPage implements OnInit {
  producto: any;

  constructor(private route: ActivatedRoute, private shop: PrestaShopService) { }

  ngOnInit() {
    const productId = this.route.snapshot.queryParamMap.get('id');
    if (productId !== null) {
      this.getProductDetails(productId);
    } else {
      console.log('No se proporcionó un ID de producto')
    }
  }

  getProductDetails(productId: string) {
    this.shop.getProduct(productId).subscribe((response: any) => {
      console.log(response)
      this.producto = {
        nombre: response.products[0].name,
        descripcion: response.products[0].description.replace('<p>', '').replace('</p>', ''),
        precio: response.products[0].price,
        imagen: `https://marcariza.cat/api/images/products/${productId}/${response.products[0].id_default_image}?ws_key=AAPPRHCE1V5PTNV3ZY8Q3L45N1UTZ9DC&output_format=JSON`,
      }
    });
  }
}