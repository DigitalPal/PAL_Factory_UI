import { Injectable } from '@angular/core';

@Injectable()
export class AmountCalculatorService {
  constructor() {}

  calculateAmount(products: any[], meterCubeRate: number) {
    let amount = 0;
    const m3_To_mm3 = 1000000000;
    for (let i = 0; i < products.length; i++) {
        const totalmm3 = products[i].width * products[i].breadth
                        * products[i].height * products[i].quantity;
        const totalm3 = totalmm3 / m3_To_mm3;
        const priceForThisSize = totalm3 * meterCubeRate;
        const ratePerBlock = priceForThisSize / products[i].quantity;

        products[i].rate = ratePerBlock;
        products[i].amount = priceForThisSize;

        amount = amount + priceForThisSize;
      }

    return amount;
  }
}
