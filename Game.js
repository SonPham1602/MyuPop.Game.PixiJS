

Level = {};
Level.Field = {
    cellSize: 50,
    cellByX: 7,
    cellByY: 7,
    numberOfTile: 4,
    upScore: 15,
    usingPowerScore: 1500,
    timerOfUsingPower: 5000,
    rangeUpAndDowPowerBar: 2
};
Level.TileTypes = [
    { name: "tile1" },
    { name: "tile2" },
    { name: "tile3" },
    { name: "tile4" },
    { name: "tileSpecial" },
    { name: "tileFreenzy" }
];
Level.AssetGame = [
    timeScore = "timer-score",

];

window.onload = function () {
    var endGame = false;
    var offSound = false;
    var inGame = false;
    var checkFirstPlay = true;
    var powerValue = 0;// This variable is instance of Power Process
    var shouldClearTile = false;
    var usingPower = false;// This variable will check 
    var specialTileClick = false;//Check when click on special tile
    var cells = [];// Array of tiles
    var matches = [];//Array of matching tiles
    var scoreGame = 0;//Score in Game
    var timerGame = 30;// Value of timer counter
    var timerValue; 

    var pivot = 0;
    var selectedTile = null;
    let app = new PIXI.Application({autoResize: true, width: 450, height: 700 });
    app.renderer.backgroundColor = 0x000000;
   
    
    document.body.appendChild(app.view);
    //Create Game Scene Layout
    var container = new PIXI.Container();
    //Create Layout Explosion 
    var layoutEffect = new this.PIXI.Container();
    // Create Layout Button Game 
    var layoutButtonInGame = new this.PIXI.Container();
    //Create Layout end Game 
    var layoutEndgame = new this.PIXI.Container();
    //Hide layout end Game 
    
    //Hint layout game;
    var layoutHint = new this.PIXI.Container();
    //Manu Game layout
    var layoutMenuGame = new this.PIXI.Container(); 

    app.stage.addChild(layoutMenuGame);
    app.stage.addChild(container);
    
    app.stage.addChild(layoutEffect);
    app.stage.addChild(layoutButtonInGame);
    app.stage.addChild(layoutHint);
    app.stage.addChild(layoutEndgame);


     container.x = app.screen.width/2;
     container.y = app.screen.height/2;
    let Background = PIXI.Sprite.from("game/backgroundMainGame.png");
    let texture = PIXI.utils.TextureCache["game/backgroundMainGame.png"];
    let sprite = new PIXI.Sprite(texture);
    //sprite.height=container.height;
    //sprite.anchor.set(0.5);
    container.addChild(sprite);
    var backgroundTile = this.PIXI.Sprite.from("game/backgroundingame.png");
    backgroundTile.width = this.Level.Field.cellByX*this.Level.Field.cellSize+30;
    backgroundTile.height =this.Level.Field.cellByY*this.Level.Field.cellSize+30;
    backgroundTile.x=135;
    backgroundTile.y=190;
    
    container.addChild(backgroundTile);

    //Set up panel score
    let spritePanelScore = new this.PIXI.Container();
    //spritePanelScore.anchor.set(0.5);
    spritePanelScore.position.x = 125;
    spritePanelScore.position.y = 40;
    spritePanelScore.width = 370;
    spritePanelScore.height = 100;
    app.stage.addChild(spritePanelScore);
   

    //Set up Time Icon
    let spriteTimeIcon = new PIXI.Sprite.from("game/timer-symbol.png");
    SetUpImage(spriteTimeIcon, true, 0.5, 0.5, -90, 0, 50, 55);
    spritePanelScore.addChild(spriteTimeIcon);
    //Set up Score Icon
    let spriteStarIcon = new this.PIXI.Sprite.from("game/score-symbol.png");
    SetUpImage(spriteStarIcon, true, 0.5, 0.5, 30, 0, 50, 55);
    spritePanelScore.addChild(spriteStarIcon);
    //Set up Score Text 
    var scoreGameText = new this.PIXI.Text(scoreGame, { fill: 'white', align: 'right', fontSize: 35 });
    scoreGameText.anchor.set(0, 0.5);
    scoreGameText.position.x = 60;
    spritePanelScore.addChild(scoreGameText);
    //Set up Timer Text
    var timerGameText = new this.PIXI.Text(timerGame, { fill: 'white', align: 'left', fontSize: 35 });
    timerGameText.anchor.set(0.5);
    timerGameText.position.x = -30;
    spritePanelScore.addChild(timerGameText);
    //Set up Power process
    var powerProcess = new this.PIXI.Sprite.from("game/frenzy-bar.png");
    SetUpImage(powerProcess, true, 0, 0.5, 205, 0, 1, 30);
    spritePanelScore.addChild(powerProcess);
    //Set up Power icon
    var powerIcon = new this.PIXI.Sprite.from("game/score-symbol.png");
    SetUpImage(powerIcon, true, 0.5, 0.5, 190, 0, 50, 55);
    spritePanelScore.addChild(powerIcon);

   
    //this function will Set up image 
    function SetUpImage(img, center, anchorX, anchorY, x, y, width, height) {
        if (center == true) {
            img.anchor.set(anchorX, anchorY);
        }
        img.position.x = x;
        img.position.y = y;
        img.width = width;
        img.height = height;
        // app.stage.addChild(img);
    }


    //CreateArrayTiles();
    function CreateArrayTiles() {
        var textureTile = PIXI.Texture.fromImage("game/tile-blue.png");
        var arrayTile = [];
        var dem = 0;
        for (var i = 0; i < 10; i++) {
            var tile = new PIXI.Sprite(textureTile);
            tile.anchor.set(0.5);
            //tile.scale(0,8);
            tile.x = (i % 5) * 85;
            tile.y = Math.floor(i / 5) * 85;
            container.addChild(tile);
            tile.interactive = true;
            tile.buttonMode = true;
            tile.on('pointertap', function () {
                //console.log(dem)
            })
            arrayTile.push(tile);
            dem++;
        }
    }
    function SoundGame(path)
    {
        this.pathFile = path;
        this.sound = new Audio(path);
    }
    SoundGame.prototype = this.Object.create(this.PIXI.Sprite.prototype);
    SoundGame.prototype.constructor = SoundGame;
    SoundGame.prototype.playSound=function()
    {
        this.sound.play();
    }
    SoundGame.prototype.stopSound=function()
    {
        this.sound.pause();
    }
    SoundGame.prototype.setLoop = function(value)
    {
        this.sound.loop = value;
    }

      //Set up soud game 
        var mainSound = new SoundGame("sound/MainMusic.mp3");
        mainSound.setLoop(true);
        var mainSoundMenu = new SoundGame("sound/MenuMusic.mp3");
        mainSoundMenu.setLoop(true);
      

    //Set Up button object
    function ButtonGame(textureIndex,x,y,width,height,layout)
    {
        var textureIndexButton = new PIXI.Texture.from("game/button/"+textureIndex+".png");
        //var textureHoverButton =  new PIXI.Texture.from("game/button/"+textureIndex+".png");
        this.widthClickButton = width*1.1;
        this.heightClickButton = height*1.1;
        this.defaultWidthButton = width;
        this.defaultHeightButton = height;
        this.soundButton = new SoundGame("sound/click.mp3");
        this.spriteButton = new PIXI.Sprite(textureIndexButton);
        this.spriteButton.x = x;
        this.spriteButton.y = y;
        this.spriteButton.width = width;
        this.spriteButton.height = height;
        this.spriteButton.interactive = true;
        this.spriteButton.buttonMode = true;
        this.spriteButton.anchor.set(0.5,0.5);
        layout.addChild( this.spriteButton);
        //Set up animation button 
        this.spriteButton.on('pointerout',()=>{
            console.log("out");
            this.spriteButton.width = width;
            this.spriteButton.height = height;
            //spriteButton.texture = textureIndexButton;
        });
        this.spriteButton.on('pointerover',()=>{
            this.spriteButton.width = this.widthClickButton;
            this.spriteButton.height = this.heightClickButton;
           // spriteButton.texture = textureHoverButton;
        });
      
    }
    ButtonGame.prototype = this.Object.create(this.PIXI.Sprite.prototype)
    ButtonGame.prototype.constructor=ButtonGame;
    ButtonGame.prototype.Click = function(handleButtonClick)
    {
        console.log("click");
       
        this.spriteButton.on('pointerdown', ()=>{
            this.soundButton.playSound();
            handleButtonClick();
            
            
            this.spriteButton.width=this.defaultWidthButton;
            this.spriteButton.height=this.defaultHeightButton;

        });
    };
    ButtonGame.prototype.ShowButton = function()
    {
        var timerAutomator = setInterval(()=>{
            this.spriteButton.alpha+=0.1;
            if(this.spriteButton.alpha >= 1)
            {
                this.spriteButton.alpha = 1;
                clearInterval(timerAutomator);
            }
        },15)
    }
    ButtonGame.prototype.HideButton = function()
    {
        var timerAutomator = setInterval(()=>{
            this.spriteButton.alpha-=0.1;
            if(this.spriteButton.alpha <=0)
            {
                this.spriteButton.alpha = 0;
                clearInterval(timerAutomator);
            }
        },15)
    }
    ButtonGame.prototype.HideImmediatelyButton = function()
    {
        this.spriteButton.alpha = 0;
    }
    ButtonGame.prototype.ShowImmediatelyButton = function()
    {
        this.spriteButton.alpha = 1 ;
    }
      //Set up button in game 
    //Pause Game button 
    var pauseButton = new ButtonGame('menubutton',50,650,70,70,layoutButtonInGame);
    var optionSoundGame = new ButtonGame('sound',50,590,60,60,layoutButtonInGame);
    optionSoundGame.HideImmediatelyButton();
    var playAgain = new ButtonGame("rePlay",110,600,60,60,layoutButtonInGame);
    playAgain.HideImmediatelyButton();
    var backToMenuButton = new ButtonGame("close",110,660,70,70,layoutButtonInGame);
    backToMenuButton.HideImmediatelyButton();
    var checkClicMenuButton = false;
    pauseButton.Click(()=>{
        checkClicMenuButton=!checkClicMenuButton;
        if(checkClicMenuButton==true)
        {
            optionSoundGame.ShowButton();
            playAgain.ShowButton();
            backToMenuButton.ShowButton();
            this.setTimeout(()=>{
                optionSoundGame.HideButton();
                playAgain.HideButton();
                backToMenuButton.HideButton();
                checkClicMenuButton = false;

            },4000)
        }
        else 
        {
            optionSoundGame.HideButton();
            playAgain.HideButton();
            backToMenuButton.HideButton();
        }
    });

    //Sound Game
    optionSoundGame.Click(()=>{
        this.console.log("turn off sound");
        offSound = !offSound;
    });
    backToMenuButton.Click(()=>{
        inGame = false;
        ShowLayputMenu();
        mainSound.stopSound();
        mainSoundMenu.playSound();
       
    })
    
    
    function Shape(shapeType, x, y) {
        PIXI.Sprite.call(this, PIXI.loader.resources["game/" + shapeType.name + ".png"].texture);
       
        this.xCoord = x;
        this.yCoord = y;
        this.x = 150 + this.xCoord * Level.Field.cellSize;
        this.y = 200+this.yCoord * Level.Field.cellSize;

        this.shapeType = shapeType;
        this.clicked = false;

        //Special Tile
        this.specialTile = false;

        this.scale.set(Level.Field.cellSize / this.width, Level.Field.cellSize / this.height);
        container.addChild(this);
        this.interactive = true;
        this.buttonMode = true;
        this.on('pointerdown', handleTileClick);

    };
    Shape.prototype = this.Object.create(this.PIXI.Sprite.prototype);
    Shape.prototype.constructor = Shape;
    Shape.prototype.select = function () {
        this.selected = true;
        this.tint = '0xAAAAAA';
    }
    Shape.prototype.moveTo = {};
    Shape.prototype.moveTo = function (x, y, speed) {
        //this.moveTo={};
        this.moveTo.x = x;
        this.moveTo.y = y;
        this.speed = speed;
        this.move();
    }
    Shape.prototype.move = function () {
        // console.log("Vao Move");
        if (this.moveTo === undefined) {
            //console.log("error chua chay moveTo");
            return false;
        }

        if (this.y > this.moveTo.y) 
        {
            // console.log("Vao Move 3");
            if (this.y - this.speed < this.moveTo.y) {
                this.y = this.moveTo.y;
            } else {
                var timerAnimator = setInterval(()=>{
                    this.y -= this.speed;
                    if(this.y<=this.moveTo.y)
                    {
                        this.y = this.moveTo.y;
                        clearInterval(timerAnimator);
                    }
                },15)
              

            }
        } 
        else if (this.y < this.moveTo.y) 
            {
            //console.log("Vao Move 6");
            if (this.y + this.speed > this.moveTo.y) {
                this.y = this.moveTo.y;
            } else {
                var timerAnimator = setInterval(()=>{
                    this.y += this.speed;
                    if(this.y>=this.moveTo.y)
                {
                    this.y = this.moveTo.y;
                    clearInterval(timerAnimator);
                }
                },15)
                
            }
        }
        return true;
    }

    init();
    function init() {
        console.log("Khoi tao init ")
        preload();
    }
    function preload() {
        PIXI.loader.add(getTileFileNames(),'game/animation/explosion/anim.json').load(create);
    }
    function create() {
        console.log("khoi tao create");
        initField();
        DrawContainer();
        upDate();

    }
    function upDate() {
        app.renderer.render(app.stage);
        requestAnimationFrame(upDate);
        scoreGameText.text = scoreGame;
        timerGameText.text = timerGame;
        clearMatchsArray();
        //calculateScoreGame();
        initTileCoorinates();
        //CheckEndGame();
        if(offSound == true && inGame == true)
        {
            mainSound.stopSound();
        }
        else if(offSound == false && inGame == true){
            mainSound.playSound();
        }
        // fallDown(0,0,900);

    }


    function DrawContainer() {
        container.x = (app.renderer.width - container.width) / 2;
        container.y = (app.renderer.height - container.height) / 2;
    }

    function initField() {
        
        initFieldArray();
        FillTileRandomTile();
        ShowTutorialGameInFirstPlay();
    }
    //this function 
    function handleTileClick() {
        checkFirstPlay = false;
        
            matches = [];
        container.selectedTile = this;
        let x = this.xCoord;
        let y = this.yCoord;
        addItemToMatchArray(cells[x][y]);
        //console.log(x, y);
        findMatchTile(x, y);
        if (this.specialTile == true) {
            specialTileClick = true;
            console.log("special tile");
            findMatchForSpecialTile(x, y);
            console.log(matches.length);
            pivot = 1;
            while (pivot < matches.length) {
                if (matches[pivot].shape.specialTile == true) {
                    findMatchForSpecialTile(matches[pivot].shape.xCoord, matches[pivot].shape.yCoord);
                }
                pivot++;
            }
            shouldClearTile = true;
        }
        else {
            specialTileClick = false;
            if (matches.length == 1) {
                console.log(false);
            }
            else {
                findMatchTile(matches[1].shape.xCoord, matches[1].shape.yCoord);
                if (matches.length < 3) {
                    console.log(false);
                }
                else {
                    pivot = 2;
                    while (pivot < matches.length) {
                        findMatchTile(matches[pivot].shape.xCoord, matches[pivot].shape.yCoord);
                        pivot++;
                    }
                    shouldClearTile = true;
                    console.log("Do dai" + matches.length);
                }
            }
        }
        
        
        // printMatchArraytoConsole();


    }



    //this function will return array of name tile assets 
    function getTileFileNames() {
        var tilesFileName = [];
        var tile = []
        for (var i = 0; i < Level.TileTypes.length; i++) {
            tilesFileName.push("game/" + Level.TileTypes[i].name + ".png");
        }
        return tilesFileName;
    }
    //this function will create Array 2D tile of game
    function initFieldArray() {
        cells = new Array(Level.Field.cellByX);
        for (var i = 0; i < Level.Field.cellByY; i++) {
            cells[i] = new Array(Level.Field.cellByY);
            cells[i].lackOfTile = 0;
        }
    }

    function FillTileRandomTile() {
        for (var y = 0; y < Level.Field.cellByX; y++) {
            for (var x = 0; x < Level.Field.cellByY; x++) {
                var shape = new Shape(getRandomShapeType(), x, y);
                cells[x][y] = {};
                cells[x][y].shape = shape;

            }
        }
        // console.log("Vi tri truoc khi move",cells[0][0].shape.x,cells[0][0].shape.y);
        //cells[0][0].shape.moveTo(400,400, 8);
        //cells[0][0].shape.move();
        // console.log("Vi tri sau khi move",cells[0][0].shape.x,cells[0][0].shape.y);

    }
    function getRandomShapeType() {
        var r = getRandomInterget(0, Level.Field.numberOfTile - 1);
        return Level.TileTypes[r];
    }
    //Get Special Tile
    function getSpecialType() {
        return Level.TileTypes[4];
    }
    function getRandomInterget(min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    }

    function initTileCoorinates() {
        for (var y = 0; y < Level.Field.cellByY; y++) {
            for (var x = 0; x < Level.Field.cellByX; x++) {
                if (cells[x][y].shape !== null) {
                    cells[x][y].shape.xCoord = x;
                    cells[x][y].shape.yCoord = y;

                }
            }
        }
    }
    function findMatchTile(x, y) {

        if (x + 1 < Level.Field.cellByX && cells[x][y].shape.shapeType === cells[x + 1][y].shape.shapeType) {
            addItemToMatchArray(cells[x + 1][y]);
        }
        if (x - 1 >= 0 && cells[x][y].shape.shapeType === cells[x - 1][y].shape.shapeType) {
            addItemToMatchArray(cells[x - 1][y]);
        }
        if (y - 1 >= 0 && cells[x][y].shape.shapeType === cells[x][y - 1].shape.shapeType) {
            addItemToMatchArray(cells[x][y - 1]);
        }
        if (y + 1 < Level.Field.cellByY && cells[x][y].shape.shapeType === cells[x][y + 1].shape.shapeType) {
            addItemToMatchArray(cells[x][y + 1]);
        }
    }

    function findMatchForSpecialTile(x, y) {

        if (x + 1 < Level.Field.cellByX) {
            addItemToMatchArray(cells[x + 1][y]);
        }
        if (x - 1 >= 0) {
            addItemToMatchArray(cells[x - 1][y]);
        }
        if (y - 1 >= 0) {
            addItemToMatchArray(cells[x][y - 1]);
        }
        if (y + 1 < Level.Field.cellByY) {
            addItemToMatchArray(cells[x][y + 1]);
        }
        if (y + 1 < Level.Field.cellByY && x + 1 < Level.Field.cellByX) {
            addItemToMatchArray(cells[x + 1][y + 1]);
        }
        if (x - 1 >= 0 && y + 1 < Level.Field.cellByY) {
            addItemToMatchArray(cells[x - 1][y + 1]);
        }
        if (y - 1 >= 0 && x - 1 >= 0) {
            addItemToMatchArray(cells[x - 1][y - 1]);
        }
        if (y - 1 >= 0 && x + 1 < Level.Field.cellByX) {
            addItemToMatchArray(cells[x + 1][y - 1]);
        }
    }

    function addItemToMatchArray(item) {
        if (checkSameTileToMatchArray(item) == true) {
            matches.push(item);
        }
    }
    //this function will check that match array have the same tile
    //return true that means dont have the same tile
    //return false that means have the same tile 
    function checkSameTileToMatchArray(item) {
        for (var i = 0; i < matches.length; i++) {
            if (matches[i].shape.xCoord === item.shape.xCoord && matches[i].shape.yCoord === item.shape.yCoord) {
                return false;
            }
        }
        return true;
    }
    function printMatchArraytoConsole() {
        for (var i = 0; i < matches.length; i++) {
            console.log(i + 1, matches[i].shape.xCoord, matches[i].shape.yCoord);
        }
    }
    function clearMatchsArray() {
        if (matches.length > 2) {
            console.log("Bat dau xoa");

            let x, y;
            if (matches.length >= 5 && specialTileClick == false) {

                let index = getRandomInterget(0, matches.length - 1);
                x = matches[index].shape.xCoord;
                y = matches[index].shape.yCoord;
                console.log("Tao do special", x, y);
            }
            for (var i = 0; i < matches.length; i++) {
                clearTileInArray(matches[i].shape.xCoord, matches[i].shape.yCoord);
            }
            if (matches.length >= 5 && specialTileClick == false) {
                console.log("Tao do special", x, y);
                var shape = new Shape(getSpecialType(), x, y);
                shape.specialTile = true;
                cells[x][y] = {};
                cells[x][y].shape = shape;

            }


            calculateScoreGame();
            matches = [];
            fillEmptyTile();
        }

    }

    function clearTileInArray(x, y) {
        if (cells[x][y].shape !== null) {
            //console.log("Vi tri xoa", x, y);
            let xExplosion = cells[x][y].shape.x;
            let yExplosion = cells[x][y].shape.y;
            setupExplosionEffect(xExplosion,yExplosion);
            cells[x][y].shape.destroy();//will remove scipte out array
            cells[x][y].shape = null;
            
            cells[x].lackOfTile += 1;
        }

    }
    function fillEmptyTile() {
        shiftToBottom();
        addNewTile();
    }
    function shiftToBottom() {
        for (var x = 0; x < Level.Field.cellByX; x++) {
            if (cells[x].lackOfTile > 0) {
                for (var y = Level.Field.cellByY; y > 0; y--) {
                    shiftToBottomShape(x, y - 1);
                }
            }
        }
    }
    function shiftToBottomShape(x, y) {
        while (y < Level.Field.cellByY - 1) {
            if (cells[x][y].shape !== null && cells[x][y + 1].shape === null) {
                // cells[x][y].shape.moveTo(0,cells[x][y].shape.y+Level.Field.cellSize,1,()=>
                // {
                //     cells[x][y].shape.y+=Level.Field.cellSize;
                // });
                cells[x][y].shape.y+=Level.Field.cellSize;
                cells[x][y].shape.yCoord++;
                cells[x][y + 1].shape = cells[x][y].shape;
                cells[x][y].shape = null;
                // console.log("shift", x,y);
            }
            y++;
        }
    }
    function addNewTile() {
        for (var x = 0; x < Level.Field.cellByX; x++) {
            //console.log("add for 1");
            if (cells[x].lackOfTile > 0) {
                //console.log("add for 2");
                for (var y = 0; y < Level.Field.cellByY; y++) {

                    if (cells[x][y].shape === null) {
                        var shape = new Shape(getRandomShapeType(), x, y);

                        cells[x][y] = {};
                        cells[x][y].shape = shape;
                    }
                }
            }

        }
    }

    function TickTimer() {
        if (timerGame == 0) {
            clearInterval(timerValue);
        }
        else {
            timerGame -= 1;
            if(timerGame<=0)
            {
                endGame = true;
                SettupLayputEndgame();
                ShowLayoutEndGame(); 

            }
        }


        //console.log(timerGame);
    }
    // this fuction will loop
    var dem = 1
    function calculateScoreGame() {
        //console.log("Power",powerValue);
        console.log(usingPower);
        if(shouldClearTile == true)
        {
            console.log("Shoud Clear",shouldClearTile);
        }
       
        if (shouldClearTile == true) 
        {
            shouldClearTile = false;
            
            var score = matches.length * 15;
            scoreGame = scoreGame + score;
            console.log("Using power truoc ham If",usingPower);
           console.log("So lan xoa",dem);
           
                //console.log("Using power trong else",usingPower)
                if (usingPower == false)
                {
                    console.log("_______________________________________")
                    console.log("tang power")
                    increatePowerProcess();
                    //console.log("Power sau khi ",powerValue);
                }
                
            dem ++;
            
           
        }

    }
    function increatePowerProcess() {
        //var processbar = scoreGame / 15;
        powerValue=matches.length+powerValue;
        if(powerProcess.width<=200)
        {
            powerProcess.width = 1.8* powerValue;
        }
       
        if (powerValue>=100) {
            console.log("using power");
            usingPower = true;
            console.log("dang using 1",usingPower)
            var timerAnimator = setInterval(usingPowerProcess, Level.Field.timerOfUsingPower/60);// 60 is frame / second
            setTimeout(()=>{
                console.log("dang using 2",usingPower)
                clearInterval(timerAnimator);
                usingPower = false;
                powerValue = 0;
            },Level.Field.timerOfUsingPower);
            powerValue = 0;
            //usingPowerProcess(); 
        }

    }
    function usingPowerProcess() {

        if (powerProcess.width >= 1)
            powerProcess.width = powerProcess.width - 3.01;

    }
    function setupExplosionEffect(x,y)
    {
        var explosionTextures = [];
        var i; 
        for(i=0;i<6;i++)
        {

            var texture = new PIXI.Texture.fromImage('game/animation/explosion/'+'anim_'+(i+1)+'.png');
            explosionTextures.push(texture);
        }
        var explosion = new PIXI.extras.AnimatedSprite(explosionTextures);
        explosion.x=x-125;
        explosion.y=y-80;
        explosion.animationSpeed = 0.2;
        
        explosion.scale.set(0.5)
        explosion.loop=false;
        layoutEffect.addChild(explosion);
        explosion.play(); 
        explosion.onComplete=function()
        {
            explosion.parent.removeChild(explosion); 
        }
    }

    function readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }
    
    var dataLevelOfGame;
    readTextFile("Level.json", function(text){
        var dataLevelOfGame = JSON.parse(text);
    });

    function SetupLayoutEndGame()
    {

    }
    function ShowLayputMenu()
    {
        container.visible = false;
        layoutButtonInGame.visible = false;
        spritePanelScore.visible = false;
        layoutMenuGame.visible = true;
        layoutEndgame.visible = false;
    }
    function HideLayoutMenu()
    {
        container.visible = true;
        layoutButtonInGame.visible = true;
        spritePanelScore.visible = true;
        layoutMenuGame.visible = false;
        layoutEndgame.visible = false;
    }
    function SetupLayoutMemuGame()
    {
       
        mainSoundMenu.playSound();
        var backgroundGame = new PIXI.Sprite.from("game/BG.png");
        backgroundGame.height=700;
        backgroundGame.width = 450;
        layoutMenuGame.addChild(backgroundGame);
        ShowLayputMenu();
        var ButtonPlayGame = new ButtonGame("buttonPlay",225,500,150,150,layoutMenuGame);
        ButtonPlayGame.ShowImmediatelyButton();
        ButtonPlayGame.Click(()=>{

            inGame  = true;
            mainSoundMenu.stopSound();
            mainSound.playSound();
            HideLayoutMenu();
            FadeOutLoadLayout(container,0.05);
            FadeInLoadLayout(container,0.05);
            timerValue = this.setInterval(TickTimer, 1000);
        });
        var buttonSetting = new ButtonGame('settingsButton', 350, 550, 100, 100, layoutMenuGame)
        buttonSetting.Click(()=>{

        })
        var buttonHighScore = new ButtonGame('upgradeButton',100,550,100,100,layoutMenuGame);
        buttonHighScore.Click(()=>{

        });
      
    }
    function FadeInLoadLayout(layout,increase)
    {
        layout.alpha=0;
        var timerAnimator = setInterval(()=>{
            layout.alpha+=increase;
            if(layout.alpha>=1)
            {
                layout.alpha=1;
                clearInterval(timerAnimator);
            }
        },15)
    }
    function FadeOutLoadLayout(layout,decease) {
        layout.alpha = 1;
        var timerAnimator = setInterval(() => {
            layout.alpha-=decease;
            if(layout.alpha <= 0)
            {
                layout.alpha = 0;
                clearInterval(timerAnimator);
            }
        }, 15);
    }
    SetupLayoutMemuGame();
    
    function FindHintForPlayer()
    {
        for(var i = 0;i<Level.Field.cellByX;i++)
        {
            for(var j = 0;j<Level.Field.cellByY;j++)
            {
                matches = []
                findMatchTile(i,j);
                if(matches.length>=3)
                {
                    return [i,j];
                }
            }
        }
        return false;
    }
    function ShowLayoutEndGame()
    {
        layoutEndgame.visible = true;

    }
    
    function SettupLayputEndgame(score)
    {
        var backgroundEndGame = new PIXI.Sprite.from("game/gameoverpannel.png");
        backgroundEndGame.width = 400;
        backgroundEndGame.height= 250;
        backgroundEndGame.y = 170;
        backgroundEndGame.x = 30;
        layoutEndgame.addChild(backgroundEndGame);
        var scoreGameText = new this.PIXI.Text(scoreGame, { fill: 'white', align: 'center', fontSize: 35 });
        scoreGameText.position.x = 220;
        scoreGameText.position.y = 270;
        var buttonPlayAgain = new ButtonGame("rePlay",230,340,70,70,layoutEndgame);
        buttonPlayAgain.Click(()=>{
            ResetGame();
            endGame=false;
            layoutEndgame.visible = false;
        });
        
     
        layoutEndgame.addChild(scoreGameText);
        
        layoutEndgame.visible = true;
    }
    function ResetGame()
    {
        scoreGame = 0;
        powerValue = 0;
        timerGame = 30;
        FillTileRandomTile();
    }
    function ShowTutorialGameInFirstPlay()
    {
        var hint = FindHintForPlayer();
        console.log(hint[0]);
        console.log(hint[1]);
    }
    function ShowHintInTile(x,y,width,height)
    {
        var hintSprite = PIXI.Sprite.from("game/hint.png");

        hintSprite.x = x;
        hintSprite.y = y;
        hintSprite.width = width;
        hintSprite.height = height;
        
        
    }
    
    
    

    
   

}
