import { Random } from "./random.ts";

export class MathRandom extends Random {
  getRandomDecimalNumber() {
    return Math.random()
  }
}