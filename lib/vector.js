class Vector2 {
  static AngleVector = new Vector2(0, -1);

  constructor(tx, ty) {
    this.set(tx, ty);
  }

  // Logistic Stuff
  set(tx, ty) {
    this.x = tx || 0;
    this.y = ty || 0;

    return this;
  }

  toString() {
    let a = this.heading();
    return `Vector2 : [x: ${this.x}, y: ${this.y}, ||v||: ${this.mag()}, θrad: ${a}, θ°: ${(a * 180) / Math.PI}]`;
  }

  array() {
    return [this.x, this.y];
  }

  copy() {
    return new Vector2(this.x, this.y);
  }

  c() {
    return this.copy();
  }

  log() {
    console.log(`%c` + this.toString(), `color:yellow;`);

    return this;
  }

  // Math Operations
  add(v) {
    if (!(v instanceof Vector2)) throw new Error(`Vector2.prototype.add(v) expects a Vector2`);

    this.x += v.x;
    this.y += v.y;

    return this;
  }
  sub(v) {
    if (!(v instanceof Vector2)) throw new Error(`Vector2.prototype.sub(v) expects a Vector2`);

    this.x -= v.x;
    this.y -= v.y;

    return this;
  }

  //mult
  mult(n) {
    if (typeof n != "number") throw new Error("`Vector2.prototype.mult(n) expects a number`");

    this.x *= n;
    this.y *= n;

    return this;
  }

  multX(n) {
    if (typeof n != "number") throw new Error("`Vector2.prototype.mult(n) expects a number`");

    this.x *= n;

    return this;
  }

  multY(n) {
    if (typeof n != "number") throw new Error("`Vector2.prototype.mult(n) expects a number`");

    this.y *= n;

    return this;
  }

  //div
  div(n) {
    if (typeof n != "number") throw new Error("`Vector2.prototype.div(n) expects a number`");

    this.x /= n;
    this.y /= n;

    return this;
  }

  divX(n) {
    if (typeof n != "number") throw new Error("`Vector2.prototype.div(n) expects a number`");

    this.x /= n;

    return this;
  }

  divY(n) {
    if (typeof n != "number") throw new Error("`Vector2.prototype.div(n) expects a number`");

    this.y /= n;

    return this;
  }

  //dot
  dot(v) {
    if (!(v instanceof Vector2)) throw new Error(`Vector2.prototype.dot(v) expects a Vector2`);

    return this.x * v.x + this.y * v.y;
  }

  // Magnitude Stuff
  magSq() {
    return this.x ** 2 + this.y ** 2;
  }

  mag() {
    return Math.sqrt(this.magSq());
  }

  normalize() {
    return this.div(this.mag());
  }

  setMag(n) {
    if (typeof n != "number" || n < 0) throw new Error("Vector2.setMag(n) expects a positive number");
    return this.normalize().mult(n);
  }

  limit(n) {
    if (typeof n != "number" || n < 0) throw new Error(`Vector2.prototype.limit(n) expects a positive number`);

    this.x = this.x > n ? n : this.x;
    this.y = this.y > n ? n : this.y;

    return this;
  }

  // Angle Stuff
  angle(v) {
    if (!(v instanceof Vector2)) throw new Error(`Vector2.prototype.angle(v) expects a Vector2`);

    let cosA = this.dot(v) / (this.mag() * v.mag()); // u.v/||u||||v|| = cos a
    return Math.acos(cosA);
  }

  heading() {
    let rawA = this.angle(Vector2.AngleVector);
    if (this.x < 0) rawA += Math.PI;

    return rawA;
  }

  setAngle(a) {
    if (typeof a != "number") throw new Error(`Vector2.prototype.angle(a) expects a number`);

    let m = this.mag();
    this.x = Math.cos(a) * m;
    //(x*1+y*0)/m*1 == cos θ
    //x = cos θ * m

    this.y = Math.sqrt(m ** 2 - this.x ** 2);
    //m == sqrt(x^2+y^2)
    //y == sqrt(m^2-x^2)

    return this;
  }

  rotate(a) {
    if (typeof a != "number") throw new Error(`Vector2.prototype.rotate(a) expects a number`);

    this.setAngle(this.heading() + a);

    return this;
  }

  // Static Create
  static fromAngle(a) {
    if (typeof a != "number") throw new Error(`Vector2.fromAngle(a) expects a number`);

    return new Vector2(1, 0).setAngle(a);
  }

  static random() {
    return Vector2.fromAngle(Math.floor(Math.random() * Math.PI * 2))
      .multX(Math.random() >= 0.5 ? 1 : -1)
      .multY(Math.random() >= 0.5 ? 1 : -1);
  }
}
