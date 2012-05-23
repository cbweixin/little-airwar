/**
 * Created by JetBrains WebStorm.
 * User: xwei
 * Date: 2/8/12
 * Time: 2:35 PM
 * To change this template use File | Settings | File Templates.
 */
airwar.Util.Package( 'airwar.Game.Props' );

airwar.Game.Props.EnemyDeployer = {

    viewportHeight : 0,
    viewportWidth : 0,

    deploy : function( stageNumber )
    {
        this.viewportHeight = airwar.Util.Utility.pageSize.viewportHeight;
        this.viewportWidth = $( '#stageBgPic' ).width();
        this["_deployStage" + stageNumber]();

    },

    // TODO need a timer to control the apperance time of different kinds of enemy
    _deployStage1 : function()
    {
        var gold1 = new airwar.Game.Props.Rewards( "gold", 500 );
        var gold2 = new airwar.Game.Props.Rewards( "gold", 1000 );
        var gold3 = new airwar.Game.Props.Rewards( "gold", 1000 );
        var gold4 = new airwar.Game.Props.Rewards( "gold", 500 );
        var enemy = null;

        Global.moveObjs["moveType1"] = [];
        var pos = {left:this.viewportWidth - 180,top:this.viewportHeight - 600};
        var stopPos = {top:this.viewportHeight, left:0};
        enemy = this._produceEnemies( "enemy13", 1, pos, gold1, "moveType1", 1, "enemyBullet1", stopPos );
        Global.moveObjs["moveType1"].push(enemy);

        pos = {left:this.viewportWidth - 270,top:this.viewportHeight - 600};
        stopPos = {top:this.viewportHeight, left:0};
        enemy = this._produceEnemies( "enemy13", 1, pos, gold2, "moveType1", 1, "enemyBullet1", stopPos );
        Global.moveObjs["moveType1"].push(enemy);

        pos = {left:this.viewportWidth - 350,top:this.viewportHeight - 590};
        stopPos = {top:this.viewportHeight, left:0};
        enemy = this._produceEnemies( "enemy13", 1, pos, gold3, "moveType1", 2, "enemyBullet1", stopPos );
        Global.moveObjs["moveType1"].push(enemy);

        pos = {left:this.viewportWidth - 80,top:this.viewportHeight - 970};
        stopPos = {top:this.viewportHeight, left:280};
        enemy = this._produceEnemies( "enemy13", 60, pos, gold4, "moveType1", 2, "enemyBullet1", stopPos );
        Global.moveObjs["moveType1"].push(enemy);

        pos = {left:this.viewportWidth - 480,top:this.viewportHeight - 870};
        stopPos = {top:this.viewportHeight, left:170};
        enemy = this._produceEnemies( "enemy12", 60, pos, null, "moveType1", 3, "enemyBullet1", stopPos );
        Global.moveObjs["moveType1"].push(enemy);

        pos={left:Math.floor(Math.random()*450), top:0};
        stopPos = {top:this.viewportHeight, left:170};
        enemy = this._produceEnemies( "enemy1", 600, pos, null, "moveType2", 1, "enemyBullet1", stopPos );
        Global.enemies.push( enemy );

        pos={left:Math.floor(Math.random()*450), top:0};
        stopPos = {top:this.viewportHeight, left:170};
        enemy = this._produceEnemies( "enemy1", 660, pos, null, "moveType2", 1, "enemyBullet1", stopPos );
        Global.enemies.push( enemy );

        pos={left:Math.floor(Math.random()*450), top:0};
        stopPos = {top:this.viewportHeight, left:170};
        enemy = this._produceEnemies( "enemy1", 700, pos, null, "moveType2", 1, "enemyBullet1", stopPos );
        Global.enemies.push( enemy );

        pos={left:0, top:300};
        stopPos = {top:100, left:330};
        enemy = this._produceEnemies( "enemy2", 840, pos, null, "moveType3", 1, "enemyBullet1", stopPos ); //440
        Global.enemies.push( enemy );

        pos={left:0, top:300};
        stopPos = {top:100, left:230};
        enemy = this._produceEnemies( "enemy3", 1140, pos, null, "moveType4", 1, "enemyBullet1", stopPos ); // 740
        Global.enemies.push( enemy );

        pos={left:Math.floor(Math.random()*450), top:this.viewportHeight};
        stopPos = {top:30, left:170};
        enemy = this._produceEnemies( "enemy7", 1350, pos, null, "moveType5", 1, "enemyBullet2", stopPos );
        Global.enemies.push( enemy );

        pos={left:Math.floor(Math.random()*450), top:0};
        stopPos = {top:this.viewportHeight, left:170};
        enemy = this._produceEnemies( "enemy8", 1550, pos, null, "moveType2", 1, "enemyBullet2", stopPos );
        Global.enemies.push( enemy );

        pos={left:140, top:0};
        stopPos = {top:this.viewportHeight,bottom:260, left:0, right:206};
        enemy = this._produceEnemies( "boss1", 1900, pos, null, "moveBoss1", 1, "enemyBullet1", stopPos );
        Global.enemies.push( enemy );
        
    },


    /**
     *generate and position enemy, define its appear time and move type, direction etc.
     *
     * @param type - enemy type
     * @param appearTime - enemy appear time
     * @param pos - enemy appear position
     * @param rewards - rewards which would come out after enemy got destoried
     * @param moveType - enemy moveType
     * @param direction - enemy move direciton
     * @param bulletType - enemy bullet type
     * @param stopPos - enemy move stop position
     */
    _produceEnemies : function( type, appearTime, pos, rewards, moveType, direction, bulletType, stopPos )
    {
        var enemy = airwar.Game.Props.EnemyFactory.create( type );
        enemy.setAppearTime( appearTime );
//        var pos = {left:this.viewportWidth - 180,top:this.viewportHeight - 600};
        enemy.setPosition( pos );
        enemy.setRewards( rewards );
        enemy.setFlyParameter( moveType, direction );
        enemy.setBulletType( bulletType );
        enemy.setStopPos( stopPos );

        return enemy
    },



    _deployStage2 : function()
    {

    }
};