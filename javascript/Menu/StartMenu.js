/**
 * Created by JetBrains WebStorm.
 * User: flamingo
 * Date: 1/16/12
 * Time: 8:13 PM
 * To change this template use File | Settings | File Templates.
 */
airwar.Util.Package('airwar.Menu');

airwar.Menu.MenuOptions = [];
airwar.Menu.MenuOptions.push("#startGameMenu");
airwar.Menu.MenuOptions.push("#keySettingMenu");
airwar.Menu.MenuOptions.push("#levelMenu");
airwar.Menu.MenuOptions.push("#creditsMenu");

airwar.Menu.StartMenu = ( function() {



    var subMenu = new airwar.Menu.SubMenu();

    var util = airwar.Util.Utility;
    var that = this;

    return {
        initBackground : function() {
            var menuOptions = airwar.Menu.MenuOptions;
            for (var i = 0; i < menuOptions.length; i++) {

                $(menuOptions[i]).hover(
                    function(eventObj) {
                        $(this).animate({opacity : 1}, 500);
                    },
                    function(eventOjb) {
                        $(this).animate({opacity:0.5}, 500);
                    }
                );

                $(menuOptions[i]).click(
                    function(eventOjb) {
                        var submenuName = util.capitalize( this.id.substring(0) );
                        if( !that[submenuName] )
                        {
                            that[submenuName] = util.createInstance( "airwar.Menu." + submenuName );
                        }
                        that[submenuName].show();
                        that[submenuName].render( );
                    }
                );
            }
            $('#submenuContainer').click(function(eventObj) {
                subMenu.hide();
            });
        }
}
})
();
