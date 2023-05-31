import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-checkout',
  templateUrl: 'checkout.page.html',
  styleUrls: ['checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  productosEnCarrito: any[] = [];

  constructor(private storage: Storage) {
    this.initStorage();
  }

  ngOnInit() {
    this.storage.get('carrito').then((productos) => {
      if (productos) {
        this.productosEnCarrito = productos;
      }
    }).catch((error) => {
      console.error('Error al obtener los productos del carrito', error);
    });
  }

  async initStorage() {
    await this.storage.create();
  }

  ionViewDidEnter() {
    this.storage.get('carrito').then((productos) => {
      if (productos) {
        this.productosEnCarrito = productos;
      }
    });
  }

  modificarCantidad(producto: any, cantidad: number) {
    // Verificar si el producto está en el carrito
    const index = this.productosEnCarrito.findIndex((p) => p.nombre === producto.nombre);
  
    if (index !== -1) {
      // Modificar la cantidad del producto
      this.productosEnCarrito[index].cantidad += cantidad;
  
      // Verificar si la cantidad es menor o igual a 0 para eliminar el producto
      if (this.productosEnCarrito[index].cantidad <= 0) {
        this.productosEnCarrito.splice(index, 1); // Eliminar el producto del carrito
      }
    }
  
    // Guardar los cambios en el almacenamiento
    this.storage.set('carrito', this.productosEnCarrito);
  }
  
  eliminarProducto(producto: any) {
    // Verificar si el producto está en el carrito
    const index = this.productosEnCarrito.findIndex((p) => p.nombre === producto.nombre);
  
    if (index !== -1) {
      this.productosEnCarrito.splice(index, 1); // Eliminar el producto del carrito
    }
  
    // Guardar los cambios en el almacenamiento
    this.storage.set('carrito', this.productosEnCarrito);
  }
}