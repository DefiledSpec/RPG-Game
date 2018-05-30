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
class npc{
    constructor(hp, ap, cap, isPlayer) {
        this.hp = hp;
        this.ap = ap;
        this.cap = cap;
        this.attStreak = 0;
        this.isPlayer = false;
        this.isDead = false;
    }
    attack(Npc, Player) {     
        this.attStreak ++;
        Npc.hp -= (this.ap * this.attStreak);
        if(Npc.hp <= 0) {
            Npc.hp = 0;
            Npc.isDead = true;
        }
        Npc.counter(Player);
    }
    counter(Player) {
        Player.hp -= this.cap;
        if(Player.hp <= 0) {
            Player.hp = 0;
            Player.isDead = true;
        }
    }
}


let npcs = [];

function game() {
    let p1 = new npc(120, 10, 30);
    let p2 = new npc(150, 3, 20);
    let p3 = new npc(150, 3, 20);
    let p4 = new npc(150, 3, 20);
    npcs.push(p1);
    npcs.push(p2);
    npcs.push(p3);
    npcs.push(p4);




    p1.attack(p2, p1);
    p1.attack(p2, p1);
    p1.attack(p2, p1);
    p1.attack(p2, p1);
    p1.attack(p2, p1);
    
    

    
    console.log(p1.hp);
    console.log(p1.isDead);
    
    console.log(p2.hp);
    console.log(p2.isDead);

}

document.addEventListener('keydown', function (event) {
    let keyCode = event.keyCode;
    switch(keyCode){
        case 49:
            console.log(event.key);
            break;
        case 50:
            console.log(event.key);
            break;
        case 51:
            console.log(event.key);
            break;
        case 52: 
            console.log(event.key);
            break;
        default: 
            console.log('wrong input');
    }
});

game();