export class RGB {
  constructor(public r: number, public g: number, public b: number) {}

  toString() {
    return `${this.r},${this.g},${this.b}`;
  }
}

export abstract class Random {
  abstract getRandomDecimalNumber(): number;

  shuffle<T>(array: Array<T>): Array<T> {
    const oldArray = [...array];
    const newArray: Array<T> = [];

    while (oldArray.length > 0) {
      if (oldArray.length == 1) {
        newArray.push(oldArray[0]);
        oldArray.pop();
      } else {
        const nextValue = this.getRandomNumber(0, oldArray.length - 1);
        newArray.push(oldArray[nextValue]);
        oldArray.splice(nextValue, 1);
      }
    }
    return newArray;
  }

  getRandomNumber(min: number, max: number): number {
    // [min, max]
    return Math.floor(this.getRandomDecimalNumber() * (max - min + 1)) + min;
  }

  getRandomBool(chance = 0.5): boolean {
    return this.getRandomNumber(0, 100) / 100 <= chance ? true : false;
  }

  getRandomItem<T>(items: Array<T>): { item: T; index: number } {
    const index = this.getRandomNumber(0, items.length - 1);
    return { item: items[index], index };
  }

  getWeightedRandomItem<T>(items: { item: T; weight: number }[]) {
    const decimal = this.getRandomDecimalNumber();
    const totalWeight = items.reduce(
      (total, item) => (total += item.weight),
      0
    );
    let accumulator = 0;
    for (const { item, weight } of items) {
      accumulator += weight / totalWeight;
      if (accumulator >= decimal) {
        return item;
      }
    }
    return items[items.length - 1].item;
  }

  getRandomRGB() {
    return new RGB(
      this.getRandomNumber(0, 255),
      this.getRandomNumber(0, 255),
      this.getRandomNumber(0, 255)
    );
  }
}
