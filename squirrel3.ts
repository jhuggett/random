import { MathRandom } from "./math-random.ts"
import { Random } from "./random.ts"

export class Squirrel3 extends Random {
  static NOISE1 = 0xb5297a4d
  static NOISE2 = 0x68e31da4
  static NOISE3 = 0x1b56c4e9

  constructor(
    public seed: number,
    public offset: number
  ) {
    super()
  }

  generate(offset = this.offset, seed = this.seed) {
    let n = offset

    n *= Squirrel3.NOISE1
    n += seed
    n ^= n >> 8
    n += Squirrel3.NOISE2
    n ^= n << 8
    n *= Squirrel3.NOISE3
    n ^= n >> 8

    if (offset === this.offset) {
      this.offset++
    }
    
    return n
  }

  getRandomDecimalNumber(places = 1000) {
    return this.generate() % places / places
  }

  static withRandomSeed() {
    const mathRandom = new MathRandom()
    const seed = mathRandom.getRandomNumber(0, 999999)
    return new Squirrel3(seed, 0)
  }
}