/**
 * Created by JetBrains WebStorm.
 * User: xwei
 * Date: 2/8/12
 * Time: 2:35 PM
 * To change this template use File | Settings | File Templates.
 */
airwar.Util.Package( 'airwar.Game.Props' );

airwar.Game.Props.EnemyFactory = {

    enemyId : 0,

    create : function( name )
    {
        var enemy = null;
        switch ( name )
        {
            case 'enemy13' :
                $( '#bgImgContainer' ).append( '<div id=enemy13_' + this.enemyId + '></div>' );
                $( '#enemy13_' + this.enemyId ).addClass( "airwar-enemies" ).addClass( "airwar-enemy13" );
                enemy = new airwar.Game.Props.Enemy( $( '#enemy13_' + this.enemyId ) );
                enemy.attackableAreaOffset = {
                    top     : 5,
                    bottom  : 5,
                    left    : 5,
                    right   : 5
                }
                enemy.setZindex(1000);
                enemy.setScore(200);
                this.enemyId++;
                break;
            case 'enemy12' :
                $( '#bgImgContainer' ).append( '<div id=enemy12_' + this.enemyId + '></div>' );
                $( '#enemy12_' + this.enemyId ).addClass( "airwar-enemies" ).addClass( "airwar-enemy12" );
                enemy = new airwar.Game.Props.Enemy( $( '#enemy12_' + this.enemyId ) );
                enemy.attackableAreaOffset = {
                    top     : 5,
                    bottom  : 5,
                    left    : 5,
                    right   : 5
                }
                enemy.setZindex(1000);
                enemy.setScore(300);
                this.enemyId++;
                break;
            case 'enemy1' :
                $( '#bgImgContainer' ).append( '<div id=enemy1_' + this.enemyId + '></div>' );
                $( '#enemy1_' + this.enemyId ).addClass( "airwar-enemies" ).addClass( "airwar-enemy1" );
                enemy = new airwar.Game.Props.Enemy( $( '#enemy1_' + this.enemyId ) );
                enemy.attackableAreaOffset = {
                    top     : 5,
                    bottom  : 5,
                    left    : 5,
                    right   : 5
                }
                enemy.setZindex(1003);
                enemy.setScore(250);
                this.enemyId++;
                break;

            case 'enemy2' :
                $( '#bgImgContainer' ).append( '<div id=enemy2_' + this.enemyId + '></div>' );
                $( '#enemy2_' + this.enemyId ).addClass( "airwar-enemies" ).addClass( "airwar-enemy2" );
                enemy = new airwar.Game.Props.Enemy2( $( '#enemy2_' + this.enemyId ) );
                enemy.attackableAreaOffset = {
                    top     : 5,
                    bottom  : 5,
                    left    : 5,
                    right   : 5
                }
                enemy.setZindex(1003);
                enemy.setScore(550);
                this.enemyId++;
                break;

            case 'enemy3' :
                $( '#bgImgContainer' ).append( '<div id=enemy3_' + this.enemyId + '></div>' );
                $( '#enemy3_' + this.enemyId ).addClass( "airwar-enemies" ).addClass( "airwar-enemy3" );
                enemy = new airwar.Game.Props.Enemy3( $( '#enemy3_' + this.enemyId ) );
                enemy.attackableAreaOffset = {
                    top     : 5,
                    bottom  : 5,
                    left    : 5,
                    right   : 5
                }
                enemy.setZindex(1003);
                enemy.setScore(750);
                this.enemyId++;
                break;

            case 'enemy7' :
                $( '#bgImgContainer' ).append( '<div id=enemy7_' + this.enemyId + '></div>' );
                $( '#enemy7_' + this.enemyId ).addClass( "airwar-enemies" ).addClass( "airwar-enemy7" );
                enemy = new airwar.Game.Props.Enemy7( $( '#enemy7_' + this.enemyId ) );
                enemy.attackableAreaOffset = {
                    top     : 5,
                    bottom  : 5,
                    left    : 5,
                    right   : 5
                }
                enemy.setZindex(1003);
                enemy.setScore(750);
                this.enemyId++;
                break;

            case 'enemy8' :
                $( '#bgImgContainer' ).append( '<div id=enemy8_' + this.enemyId + '></div>' );
                $( '#enemy8_' + this.enemyId ).addClass( "airwar-enemies" ).addClass( "airwar-enemy8" );
                enemy = new airwar.Game.Props.Enemy( $( '#enemy8_' + this.enemyId ) );
                enemy.attackableAreaOffset = {
                    top     : 5,
                    bottom  : 5,
                    left    : 5,
                    right   : 5
                }
                enemy.setZindex(1003);
                enemy.setScore(350);
                this.enemyId++;
                break;

            case 'boss1' :
                $( '#bgImgContainer' ).append( '<div id=boss1' + '></div>' );
                $( '#boss1' ).addClass( "airwar-boss" ).addClass( "airwar-boss1" );
                enemy = new airwar.Game.Props.Boss1( $( '#boss1' ) );
                enemy.attackableAreaOffset = {
                    top     : 5,
                    bottom  : 5,
                    left    : 5,
                    right   : 5
                }
                break;
        }
        return enemy;
    }
};