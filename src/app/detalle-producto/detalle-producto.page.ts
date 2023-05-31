import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestaShopService } from '../services/presta-shop.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: 'detalle-producto.page.html',
  styleUrls: ['detalle-producto.page.scss'],
})
export class DetalleProductoPage implements OnInit {
  producto: any;

  constructor(
    private route: ActivatedRoute,
    private shop: PrestaShopService,
    private storage: Storage,
    private router: Router
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.queryParamMap.get('id');
    if (productId !== null) {
      this.getProductDetails(productId);
    } else {
      console.log('No ID de producto');
    }
  }

  getProductDetails(productId: string) {
    this.shop.getProduct(productId).subscribe((response: any) => {
      console.log(response);
      this.producto = {
        nombre: response.products[0].name,
        descripcion: response.products[0].description.replace('<p>', '').replace('</p>', ''),
        precio: response.products[0].price,
        imagen: `https://marcariza.cat/api/images/products/${productId}/${response.products[0].id_default_image}?ws_key=AAPPRHCE1V5PTNV3ZY8Q3L45N1UTZ9DC&output_format=JSON`,
      };
    });
  }

  addToCart() {
    this.storage.get('carrito').then((productosEnCarrito: any[]) => {
      if (productosEnCarrito) {
        // Verificar si el producto ya existe en el carrito
        const index = productosEnCarrito.findIndex((p) => p.nombre === this.producto.nombre);
  
        if (index !== -1) {
          // Si ya existe, aumentar su cantidad
          productosEnCarrito[index].cantidad += 1;
        } else {
          // Si no existe, agregarlo al carrito
          this.producto.cantidad = 1;
          productosEnCarrito.push(this.producto);
        }
  
        // Actualizar el carrito en el almacenamiento
        this.storage.set('carrito', productosEnCarrito).then(() => {
          console.log('Producto añadido al carrito');
          this.router.navigate(['/checkout']);
        });
      } else {
        // Si no hay carrito existente, crear uno nuevo con el producto actual
        this.producto.cantidad = 1;
        const nuevoCarrito = [this.producto];
  
        // Guardar el carrito en el almacenamiento
        this.storage.set('carrito', nuevoCarrito).then(() => {
          console.log('Producto añadido al carrito');
          this.router.navigate(['/checkout']);
        });
      }
    });
  }
}