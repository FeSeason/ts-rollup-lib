class Test {
  private name?: string;

  constructor () {
    this.init();
  }
  
  private init() {
    this.name = 'season';
    console.log(this.name)
  }

  readName() {
    console.log(this.name);
  }
}

export default Test;