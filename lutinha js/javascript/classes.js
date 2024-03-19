class Character{

    _life = 1
    maxLife= 1
    attack = 0
    defense = 0

    constructor(name){
        this.name = name
    }

    get life(){
        return this._life
    }

    set life(newLife){
        this._life = newLife < 0 ? 0 : newLife
    }
}

class Lutador1 extends Character {

    constructor(name){
        super(name)
        this.life= 100
        this.attack = 10
        this.defense = 8
        this.maxLife= this.life

    }
    
}

class Lutador2 extends Character {
    
    constructor(name){
        super(name)
        this.life= 100
        this.attack = 10
        this.defense = 8
        this.maxLife= this.life

    }

}
class Monster extends Character {
    
    constructor(){
        super('BigMonster')
        this.life= 120
        this.attack = 15
        this.defense = 8
        this.maxLife= this.life

    }

}


class Stage {
    constructor(figther1, figther2, figther1El, figther2El, logObject) {
        this.figther1 = figther1
        this.figther2 = figther2
        this.figther2El = figther2El
        this.figther1El = figther1El
        this.log = logObject
    }

    start() {
        this.update()

        this.figther1El.querySelector('.attack1').addEventListener('click', () => this.doAttack(this.figther1, this.figther2))
        this.figther2El.querySelector('.attack2').addEventListener('click', () => this.doAttack(this.figther2, this.figther1))
    }

    update() {
        // Figther1
        this.figther1El.querySelector('.name').innerHTML = `${this.figther1.name} - ${this.figther1.life} HP`
        let f1Pct = (this.figther1.life / this.figther1.maxLife) * 100
        this.figther1El.querySelector('.bar').style.width = `${f1Pct}%`

        // Figther2
        this.figther2El.querySelector('.name').innerHTML = `${this.figther2.name} - ${this.figther2.life} HP`
        let f2Pct = (this.figther2.life / this.figther2.maxLife) * 100
        this.figther2El.querySelector('.bar').style.width = `${f2Pct}%`

    }

    doAttack(attacking, attacked){
        this.log.addMessage (`${attacking.name} atacou ${attacked.name}`)

        if(attacking.life <= 0 || attacked.life <= 0){console.log('i morreu')
        return    
    }

    let attackFactor = (Math.random() * 2).toFixed(2)
    let desenseFactor = (Math.random() * 2).toFixed(2)

    let actualAttack = attacking.attack * attackFactor
    let actualDefense = attacked.defense * desenseFactor

    if (actualAttack > actualDefense) {
        attacked.life -= actualAttack;
        this.log.addMessage(`${attacking.name} causou ${actualAttack} de dano em ${attacked.name}`);
    } else {
        this.log.addMessage(`${attacked.name} conseguiu defender`);
    }

    this.update(); // Adicione esta linha para atualizar a barra de vida após o ataque
    }
}
class Log {
    list = [];
  
    constructor(listEl) {
      this.listEl = listEl;
    }
  
    addMessage(msg) {
      this.list.push(msg);
      this.render();
    }
  
    render() {
      this.listEl.innerHTML = "";
      for (let i in this.list) {
        this.listEl.innerHTML += `<li>${this.list[i]}</li>`;
      }
    }
  }
  
  let log = new Log(document.querySelector(".log"));
  let lutador1 = new Lutador1("lucas");
  let monster = new Monster();
  
  const stage = new Stage(
    lutador1,
    monster,
    document.querySelector("#lutador1"),
    document.querySelector("#lutador2"),
    log
  );
  
  stage.start();
  