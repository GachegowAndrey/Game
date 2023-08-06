
window.onload = function() {
    var bot = document.getElementById('bot ok');
    bot.addEventListener('click', saveName);


    //CHAR INFO
    var name = '';
    var userLevel = 1;
    var userXp = 0;
    var xpToUp = [1,10,2,20,3,50,4,100,5,150,6,250,7,500,8,700,9,1500,10,3000,11,5000,12,10000,13,30000,14,80000,15,200000,20,400000,21,1000000,22,2000000,23,5000000,24,10000000,25,20000000,26,50000000,27,100000000,28,500000000,29,1000000000,30];
    var userPoints = 0;
    var userHp = 80;
    var userMHp = 100;
    var userMp = 27;
    var userMMp = 50;
    var userAtt = 2;
    var userDef = 1;
    var userSpd = 1;
    var userDex = 1;
    var userInt = 2;
    var userGold = 20;
    function getHp() {
        var userMaxHp = 70 + (2.5*userAtt)+(5*userDef);
        
        return Math.round(userMaxHp);
    }
    function getMp() {
        var userMaxMp = 6 + (10*userInt)+(1*userDex);
        
        return Math.round(userMaxMp);
    }
    function getXp() {
        
        var userMaxXp = xpToUp[xpToUp.indexOf(userLevel)+1];
        
        return Math.round(userMaxXp);
    }    var enemy = '';
    
    //GETS THE 'ADRESS' TO HTML
    var level = document.getElementById('level');
    var points = document.getElementById('points');
    var xp = document.getElementById('xp');
    var hp = document.getElementById('hp');
    var mp = document.getElementById('mp');
    var att = document.getElementById('att');
    var def = document.getElementById('def');
    var spd = document.getElementById('spd');
    var dex = document.getElementById('dex');
    var int = document.getElementById('int');
    var gold = document.getElementById('gold');
    //GETS THE 'ADRESS' TO HTML - ENEMY
    var enemyInfo = document.getElementById('enemyInfo');
    var eName = document.getElementById('eName');
    var eHp = document.getElementById('eHp');
    //var eMHp = document.getElementById('eMHp');
    var eMp = document.getElementById('eMp');
    //var eMMp = document.getElementById('eMMP');
    var eAtt = document.getElementById('eAtt');
    var eDef = document.getElementById('eDef');
    var eSpd = document.getElementById('eSpd');

    //UPDATES
    function writeLevel() {
        level.innerHTML = 'Level: ' + userLevel;
    }
    
    function writeXp() {
        xp.innerHTML = 'Xp: ' + userXp+ '/' + getXp();
    }
    
    function writeHp() {
        //hp.style.width=(userHp/getHp())*200 + "px";
        
        hp.innerHTML = 'Hp: ' + Math.round(userHp) + '/' + getHp();

    }
    
    function writeMp() {
        //mp.style.width=(userMp/ getMp())*200 + "px";
        mp.innerHTML = 'Mp: ' + Math.round(userMp) + '/' + getMp();

    }
    
    function writeGold() {
        gold.innerHTML = 'Gold: ' + userGold;
    }
    
    function writeStatus() {
        points.innerHTML = 'Points: ' + userPoints;
        att.innerHTML = 'Str: ' + userAtt+' ';
        def.innerHTML = 'Def: ' + userDef+' ';
        spd.innerHTML = 'Spd: ' + userSpd+' ';
        dex.innerHTML = 'Dex: ' + userDex+' ';
        int.innerHTML = 'Int: ' + userInt+' ';
    }
    
    //LEVEL UP
    function levelUp() {
        if (document.getElementsByClassName('botLevelUp').length < 1) {
            createButton(att);
            createButton(def);
            createButton(spd);
            createButton(dex);
            createButton(int);
            userPoints += 3;
        }
        else {
            userPoints += 3;
        }
        addEnemy();
    }
    
    //CREATE THE BUTTONS TO ADD STATUS
    function createButton(where) {
        var newBot = document.createElement('input');
        newBot.value = '+';
        newBot.type = 'button';
        newBot.className = 'botLevelUp';
        newBot.addEventListener('click',addPoint);
        //where.appendChild(newBot);
        where.insertAdjacentElement('afterend', newBot);
    }
    
    //REMOVE THE BUTTONS WHEN THERE IS NO POINTS LEFT
    function removeButton() {
        var botToRemove = document.getElementsByClassName('botLevelUp');
        while (botToRemove[0]) {
            botToRemove[0].parentNode.removeChild(botToRemove[0]);
        }
    }
    
    //ADD POINTS TO THE ATRIBUTES
    function addPoint() {
        var x = event.clientX;
        var y = event.clientY;
        var elementMouseIsOver = document.elementFromPoint(x,y);
        //var texto = elementMouseIsOver.parentNode.innerHTML;
        var texto = elementMouseIsOver.previousSibling.innerHTML;
        var atributo = texto.slice(0,3);
        switch (atributo) {
            case 'Str':
                userAtt += 1;
                userPoints -=1;
                userHp += 2.5;
                break;
            case 'Def':
                userDef += 1;
                userPoints -=1;
                userHp += 5;
                break;
            case 'Spd':
                userSpd += 1;
                userPoints -=1;
                break;
            case 'Dex':
                userDex += 1;
                userPoints -=1;
                userMp += 1;
                break;
            case 'Int':
                userInt += 1;
                userPoints -=1;
                userMp += 10;
                break;
        }
        writeHp();
        writeMp();
        writeStatus();
        checkIfPoints();
    }
    
    //CHECK IF THERE IS POINTS LEFT TO USE
    function checkIfPoints() {
        if (userPoints <= 0) {
            removeButton();
        }
    }
    
    //CHECK IF THE USER HAS LEVELED UP
    function checkIfLevelUp() {
        var index = xpToUp.indexOf(userLevel);
        if (userXp >= xpToUp[index+1]) {
            userLevel += 1;
            levelUp();
            writeLevel();
            writeStatus();
            alert('You advanced to the level: '+userLevel);
            if (userXp >= xpToUp[index+3]) {
                checkIfLevelUp();
            }
        }
    }
    
    //CREATE THE BUTTONS TO BATTLE AND OTHER ACTIONS
    function writeActions() {
        //TRAINING BUTTON
        var training = document.createElement('input');
        training.id='train';
        training.type = 'button';
        training.value = 'Training (5 gold)';
        training.addEventListener('click', toGetXp);
        var place = document.getElementById('actions');
        place.appendChild(training);
         //Mana BUTTON
        var mana = document.createElement('input');
        mana.id='mana';
        mana.type = 'button';
         mana.value = 'Buy mana (1 gold)';
         mana.addEventListener('click', toGetMana);
        place.appendChild(mana);
        //HEAL BUTTON
        var heal = document.createElement('input');
        heal.id='heal';
        heal.type = 'button';
        heal.value = 'Heal (1 mp)';
        heal.addEventListener('click', toHeal);
        place.appendChild(heal);
        //BATTLE BUTTON
        var battle = document.createElement('input');
        battle.id = 'startBattle'
        battle.type = 'button';
        battle.value = 'Battle';
        battle.addEventListener('click', toBattle);
        place.appendChild(battle);
    }
    
    //GIVE XP TO THE CHAR
    function toGetXp(amountOfXp) {
        if (amountOfXp>0) {
            userXp += amountOfXp
        }
        else {
            if (userGold >= 5) {
                userGold -= 5;
                userXp += 5;
                writeGold();
            }
            else {
                alert("You don't have enough gold!");
            }
        }
        writeXp();
        checkIfLevelUp();
    }
    
    //GIVE GOLD TO THE CHAR
    function toGetGold(amountOfGold) {
        if (amountOfGold>0) {
            userGold += amountOfGold
        }
        else {
            userGold += 10;
        }
        writeGold();
    }
    
    //GIVE DAMAGE TO THE CHAR
    function toGetDamage() {
        userHp -= 10;
        writeHp();
        checkIfDead();
    }
    
    //GIVE DAMAGE TO THE ENEMY
    function toSetDamage() {
        var amountOfDamage =  (((userAtt*2) - enemy.def) <= 0) ? 0 : (userAtt*2) - enemy.def;
       
        enemy.actualHp -= amountOfDamage;
        info1.innerHTML = 'You dealt ' + amountOfDamage + ' damage!';
        writeEnemyStatus();
        checkIfEnemyDead();
    }
    
    //TAKE DAMAGE FROM THE ENEMY
    function toTakeDamage() {
        var enemyDamage = (((enemy.att*2) - userDef) <= 0) ? 0 : (enemy.att*2) - userDef;
        userHp -= enemyDamage;
        info2.innerHTML = 'You recive ' + enemyDamage + ' damage!';
        writeHp();
        checkIfDead();
    }
    //TRIES TO RUN FROM BATTLE
    function toRun() {
        var c = userSpd - enemy.spd
        if (c >= enemy.spd) {
            alert("Ran away!");
            enemy.actualHp = enemy.hp;
            removeEnemyStatus();
            removeBattleButtons();
        }
        else if (c <= 0) {
            alert("It's not going to");
            toTakeDamage();
        }
        else {
            var d = 100/enemy.spd
            var chanceToRun = c*d;
            var aNumber = Math.random()*100;
            if(aNumber <= chanceToRun) {
                alert("Fugiu!");
                enemy.actualHp = enemy.hp;
                removeEnemyStatus();
                removeBattleButtons();
            }
            else {
                alert("It's not going to");
                toTakeDamage();
            }
        }
        
    }
    //REMOVE BATTLE BUTTONS
    function removeBattleButtons() {
        var bInput = document.getElementById('bInput');
        bInput.parentNode.removeChild(bInput);
        var rInput = document.getElementById('rInput');
        rInput.parentNode.removeChild(rInput);
        var startBattle = document.getElementById('startBattle').addEventListener('click',toBattle);
    }
    
    //CHECK IF ENEY IS DEAD
    function checkIfEnemyDead() {
        if (enemy.actualHp <= 0) {
            alert ('Victory!');
            enemy.actualHp = enemy.hp;
            removeEnemyStatus();
            removeBattleButtons();
            alert('You won ' + enemy.xp + ' experience points!');
            alert('You won ' + enemy.gold + ' gold coins!');
            toGetXp(enemy.xp);
            toGetGold(enemy.gold);
        }
        else {
            toTakeDamage();
        }
    }
    function toGetMana(){
    if (userGold >= 1) {
            if (userMp < getMp()) {
                if ((getMp()-userMp) < 5) {
                    userMp += (getMp()-userMp);
                    writeMp();
                    userGold -= 1;
                    writeGold();
                }
                else {
                    userMp += userDex*1.5;
                    writeMp();
                    userGold -= 1;
                    writeGold();
                }
            }
            else {
                alert('Your mana is full!')
            }
        }
        else {
            alert("You don't have enough gold!");
        }
    }
    //HEALS THE CHAR
    function toHeal() {
        if (userMp >= 1) {
            if (userHp < getHp()) {
                if ((getHp()-userHp) < 5) {
                    userHp += (getHp()-userHp);
                    writeHp();
                    userMp -= 1;
                    writeMp();
                }
                else {
                    userHp += userInt*1.5;
                    writeHp();
                    userMp -= 1;
                    writeMp();
                }
            }
            else {
                alert('Your life is full!')
            }
        }
        else {
            alert("You don't have enough mana!");
        }
    }
    
    //STARTS A BATTLE
    function toBattle() {
        var startBattle = document.getElementById('startBattle').removeEventListener('click',toBattle);
        var enemyIndex = Math.floor(Math.random()*enemies.length);
        enemy = enemies[enemyIndex];
        writeEnemyStatus();
        //CREATE THE BATTLE CHAT
        var battleStatus = document.getElementById('battleStatus');
        var info1 = document.getElementById('info1');
        var info2 = document.getElementById('info2');
        battleStatus.style.border = 'double';
        info1.innerHTML = 'You leave your house to find trouble...';
        info2.innerHTML = 'You find a ' + enemy.name;
        //CREATE THE ATTACK BUTTON
        var battleButtons = document.getElementById('battleButtons');
        var bButtons = document.createElement('input');
        bButtons.id = 'bInput'
        bButtons.type = 'button';
        bButtons.value = 'Attack Sword';
        bButtons.addEventListener('click',toSetDamage);
        battleButtons.appendChild(bButtons);
        //CREATE THE RUN BUTTON
        var runButton = document.createElement('input');
        runButton.id = 'rInput';
        runButton.type = 'button';
        runButton.value = 'Run';
        runButton.addEventListener('click',toRun);
        battleButtons.appendChild(runButton);
    }
    //WRITE ENEMY STATUS
    function writeEnemyStatus() {
        eName.innerHTML = 'Name: '+ enemy.name;
        /**/
        //eHp.style.width=(enemy.actualHp/enemy.hp)*200 + "px";
        eHp.innerHTML = 'HP: '+ enemy.actualHp +' / '+enemy.hp;
        eMp.innerHTML = 'MP: '+ enemy.mp;
        eAtt.innerHTML = 'Att: '+ enemy.att;
        eDef.innerHTML = 'Def: '+ enemy.def;
        eSpd.innerHTML = 'Spd: '+ enemy.spd;
    }
    
    function removeEnemyStatus() {
        eName.innerHTML = '';
        eHp.innerHTML = '';
        eMp.innerHTML = '';
        eAtt.innerHTML = '';
        eDef.innerHTML = '';
        eSpd.innerHTML = '';
        battleStatus.style.border = '';
        info1.innerHTML = '';
        info2.innerHTML = ''
    }
    
    //ENEMIES
    function enemie(name,hp,mp,att,def,spd,xp,gold) {
        this.name = name;
        this.hp = hp;
        this.actualHp = hp;
        this.mp = mp;
        this.att = att;
        this.def = def;
        this.spd = spd;
        this.xp = xp;
        this.gold = gold;
    }
    var rat = new enemie('Rat',20,0,2,1,1,1,5);
    var rabbit = new enemie('Rabbit',30,0,2,1,1,1,10);
    var farmer = new enemie('Farmer',50,0,2,1,1,5,15);
    
    var minorSoldier = new enemie('Minor Soldier',100,20,5,3,2,10,20);
    
    var soldier = new enemie('Soldier',150,50,7,5,5,15,30);
    
    var enemies = [rat,rabbit];
    
    //ADD THE POSSIBILITY OF FIND NEW ENEMIES
    function addEnemy() {
        switch (userLevel) {
            case 2:
                enemies.push(farmer);
                break;
            case 4:
                enemies.push(minorSoldier);
                break;
            case 6:
                enemies.push(soldier);
                break;
        }
    }
    
    //CHECK IF THE CHAR IS DEAD
    function checkIfDead() {
        if (userHp <= 0) { 
            alert ('SE FUDEU');
            document.body.innerHTML = ''
            var botRestart = document.createElement('input');
            botRestart.type = 'image';
            botRestart.src = 'https://wallpapercave.com/wp/RMIs0gk.png'
            botRestart.style.height = '100%';
            botRestart.style.width = '100%'
            botRestart.addEventListener('click', restart);
            document.body.appendChild(botRestart);        }
    }
    
    //RESTART THE GAME WHEN THE CHAR DIES
    function restart() {
        window.location.reload(false);
    }
    
    //STARTS THE GAME AFTER USER INPUTS HIS NAME
    function saveName() {
        name = document.getElementById('nameInput').value;
        if(name) {
            var element = document.getElementById('name');
            var child = document.getElementById('nameInput');
            element.removeChild(child);
            element.removeChild(bot);
            document.getElementById('name').innerHTML += name;
            writeLevel();
            writeXp();
            writeHp();
            writeMp();
            writeStatus();
            checkIfLevelUp();
            writeActions();
            writeGold();
        }
        else {
            alert('Coloque um nome!')
        }
    }
};