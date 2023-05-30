import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrestaShopService } from '../services/presta-shop.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
})
export class DetalleProductoPage implements OnInit {
  producto: any;

  constructor(private route: ActivatedRoute, private shop: PrestaShopService) { }

  ngOnInit() {
    const productId = this.route.snapshot.queryParamMap.get('id');
    if (productId !== null) {
      this.getProductDetails(productId);
    } else {
      console.log('No se proporcionó un ID de producto válido.');
    }
  }

  getProductDetails(productId: string) {
    this.shop.getProduct(productId).subscribe((response: any) => {
      this.producto = response.product;
    });
  }
}