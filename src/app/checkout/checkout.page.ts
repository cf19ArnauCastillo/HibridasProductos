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
        this.productosEnCarrito = productos; // Asignar la lista de productos en el carrito
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
        this.productosEnCarrito = productos; // Actualizar la variable productosEnCarrito
      }
    });
  }
}