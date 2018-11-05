import { Injectable } from '@angular/core';

@Injectable()
export class AmountCalculatorService {
  constructor() {}

  calculateAmount(products: any[], meterCubeRate: number) {
    let amount = 0;
    for (let i = 0; i < products.length; i++) {
        const totalm3 = this.getMeterCube(products[i].length, products[i].width, products[i].height, products[i].quantity);
        const priceForThisSize = totalm3 * meterCubeRate;
        amount = amount + priceForThisSize;
      }

    return amount;
  }

  getMeterCube(length, width, height, quantity) {
    const m3_To_mm3 = 1000000000;
    const totalmm3 = length * width
    * height * quantity;
    const totalm3 = totalmm3 / m3_To_mm3;
    return totalm3;
  }
}
