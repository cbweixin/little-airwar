/**
 * Created by JetBrains WebStorm.
 * User: flamingo
 * Date: 5/2/12
 * Time: 8:36 PM
 * To change this template use File | Settings | File Templates.
 */

airwar.Util.Package('airwar.Menu');

airwar.Menu.CreditsMenu = airwar.Menu.SubMenu.extend({
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
        var content = "Author Wei,Xin, cbweixin@qq.com" +
            "~Thanks for : ~1. Random Blog : ~www.cnblogs.com/Random. ~2. Jquery. ~api.jquery.org" +
            "~3CSSSprites. www.csssprites.com ~4. modernizer.js";
         $('#submenuContainer').html(
             '<div id="keySettingTitle" style="margin-top: 30px;margin-left: 90px;">Credits</div>' +
            '<div class="subMenuStyle" style="position: relative; width: 240px; padding: 10px; z-index: 7000; ' +
                    '     margin: 0pt 0pt 0pt 40px;">' +
              '<div id="credits"></div>' +
            '</div>'
         );

        airwar.Util.Utility.typeWriteDisplay("credits", content);
    }
});