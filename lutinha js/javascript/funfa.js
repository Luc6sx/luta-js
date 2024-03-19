let lutador1 = new Lutador1('lucas')
let monster = new Monster()



const stage = new Stage(
    lutador1,
    monster,
    document.querySelector('#lutador1'),
    document.querySelector('#lutador2'),
)


stage.start()

