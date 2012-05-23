/**
 * Created by JetBrains WebStorm.
 * User: flamingo
 * Date: 5/2/12
 * Time: 8:34 PM
 * To change this template use File | Settings | File Templates.
 */
airwar.Util.Package('airwar.Menu');

airwar.Menu.LevelMenu = airwar.Menu.SubMenu.extend({
    init : function() {
        this._super();
    },
    show : function() {
        this._super();
    },

    hide : function() {
        this._super();
    },

    render : function()
    {
         $('#submenuContainer').html(
             '<div id="keySettingTitle" style="margin-top: 30px;margin-left: 70px;">Level Configuration</div>' +
                '<div id="keySettingMenu">'+
                   '<div class="subMenuStyle" style="position: relative; width: 200px; padding: 10px; z-index: 7000; ' +
                    '     margin: 0pt 0pt 0pt 40px;">' +
                      '<div style="width: 100%; height: 23px; text-align: center; margin: 5px 0pt; opacity: 0.8; ' +
                            'background-color: rgb(255, 255, 136);">'+
                                '<span>Novice</span>'+
                      '</div>' +
                      '<div style="width: 100%; height: 23px; text-align: center; margin: 5px 0pt; opacity: 0.8; ' +
                            'background-color: rgb(204, 204, 204);">'+
                                '<span>Veteran</span>'+
                      '</div>' +
                   '</div>' +
                '</div>'+
             '</div>'
         );
    }
});