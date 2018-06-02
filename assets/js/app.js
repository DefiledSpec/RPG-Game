/**
 * Here's how the app works:

When the game starts, the player will choose a character by clicking on the fighter's picture. The player will fight as that character for the rest of the game.

The player must then defeat all of the remaining fighters. Enemies should be moved to a different area of the screen.

The player chooses an opponent by clicking on an enemy's picture.

Once the player selects an opponent, that enemy is moved to a defender area.

The player will now be able to click the attack button.

Whenever the player clicks attack, their character damages the defender. The opponent will lose HP (health points). These points are displayed at the bottom of the defender's picture.
The opponent character will instantly counter the attack. When that happens, the player's character will lose some of their HP. These points are shown at the bottom of the player character's picture.
The player will keep hitting the attack button in an effort to defeat their opponent.

When the defender's HP is reduced to zero or below, remove the enemy from the defender area. The player character can now choose a new opponent.
The player wins the game by defeating all enemy characters. The player loses the game the game if their character's HP falls to zero or below.

Option 2 Game design notes

Each character in the game has 3 attributes: Health Points, Attack Power and Counter Attack Power.

Each time the player attacks, their character's Attack Power increases by its base Attack Power.

For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on).
The enemy character only has Counter Attack Power.

Unlike the player's Attack Points, Counter Attack Power never changes.
The Health Points, Attack Power and Counter Attack Power of each character must differ.

No characters in the game can heal or recover Health Points.

A winning player must pick their characters wisely by first fighting an enemy with low Counter Attack Power. This will allow them to grind Attack Power and to take on enemies before they lose all of their Health Points. Healing options would mess with this dynamic.
 */
class Npc {
    constructor(name, hp, ap, cap, isPlayer) {
        this.name = name;
        this.hp = hp;
        this.ap = ap;
        this.cap = cap;
        this.attStreak = 0;
        this.isPlayer = false;
        this.isDead = false;
        this.monitor();
        this.display();
        
    }
    display() {

    }
    monitor() {
        let x = this;
        console.log('Monitoring...    ' + x.name);
        setInterval(function() {
            if(x.isDead) {
                console.log('hi')
                
            }
        }, 1000);
    }
    attack(Npc) { 
        let didAtt = false;
        if(Npc.hp <= 0){
            //remove enemy, hide att button, isenemyselected = false;
            Npc.hp = 0;
            Npc.isDead = true;
            return console.log(`${Npc.name} is already dead`);
        }    
        this.attStreak++;
        let currentAtt = this.ap * this.attStreak;
        Npc.hp -= currentAtt;
        didAtt = true;
        if(didAtt) {
            console.log(`${this.name} (You) attacked ${Npc.name} for ${currentAtt}. ${Npc.name} has ${Npc.hp} hp left.`);
            Npc.counter(this);
        }
    }
    counter(Player) {
        let didCounter = false;
        if(this.hp <= 0) {
            return console.log(`${this.name} has died.`);
        }
        Player.hp -= this.cap;
        didCounter = true;

        if(Player.hp <= 0) {
            Player.hp = 0;
            Player.isDead = true;
        }
        if(didCounter) {
            console.log(`${this.name} countered ${Player.name} for ${this.cap}. ${Player.name} has ${Player.hp} hp left.`);        

        }
    }
}
let article1 = $('article')[0];
let article2 = $('article')[1];
let currEnemyDiv = $('article')[2];

let npcs = [];
let p1, p2, p3, p4;

let currEnemy = null;
let userChar = null;

let isGameRunning = false;

let isCharPicked = false;
let isEnemyPicked = false;


$('.npc').click(function(ev) {
    
    if(!isCharPicked){
        $('#pickChar').addClass('hidden');
        $('#pickEnemy').removeClass('hidden');
        article2.append(this);
        let parsedId = parseInt($(this).data('npcid'));
        userChar = npcs[parsedId];
        console.log('Player Chose: ' + userChar.name);
    
        isCharPicked = true;
        isGameRunning = true;
    }else if(!isEnemyPicked){
        currEnemyDiv.append(this);
        isEnemyPicked = true;
        let parsedId =  parseInt($(this).data('npcid'));
        currEnemy = npcs[parsedId];
        console.log('Current enemy is: ' + currEnemy.name);
        
    }else {
        
    }

    if(isEnemyPicked && isCharPicked) {
        $('#attackBtn').removeClass('hidden');
    }
    
});




function game() {
    p1 = new Npc('Goblin', 120, 10, 30);
    p2 = new Npc('Imp', 150, 3, 20);
    p3 = new Npc('Dragon', 150, 3, 20);
    p4 = new Npc('Owl', 150, 3, 20);

    npcs.push(p1);
    npcs.push(p2);
    npcs.push(p3);
    npcs.push(p4);

}

$('#attackBtn').click(function(){

    userChar.attack(currEnemy);
})

document.addEventListener('keydown', function (event) {
    let keyCode = event.keyCode;
    switch(keyCode) {
        case 49:
            console.log(event.key);
            console.log('Player 1 selected.')
            break;
            case 50:
            console.log(event.key);
            console.log('Player 2 selected.')
            break;
            case 51:
            console.log(event.key);
            console.log('Player 3 selected.')
            break;
            case 52: 
            console.log(event.key);
            console.log('Player 4 selected.')
            break;
        default: 
            console.log('Wrong Input');
    }
});

game();