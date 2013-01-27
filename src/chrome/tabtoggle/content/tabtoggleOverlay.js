if(!uk) var uk = {};
if(!uk.co) uk.co = {};
if(!uk.co.pete_b) uk.co.pete_b = {};
if(!uk.co.pete_b.tabtoggle) uk.co.pete_b.tabtoggle = {};

uk.co.pete_b.tabtoggle = function()
{
    var toggle = {};
    toggle.tabtoggle_preferencesService = null;
    toggle.setting = "browser.link.open_newwindow";
    toggle.restriction = "browser.link.open_newwindow.restriction";
    toggle.SINGLE_WINDOW = 3;
    toggle.MULTIPLE_WINDOWS = 2;

    toggle.tabtoggle_getPreferencesService = function()
    {
        // If the preferences service is not set
        if(!this.tabtoggle_preferencesService)
        {
            this.tabtoggle_preferencesService = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("");
        }

        return this.tabtoggle_preferencesService;
    }

    toggle.toggleValue = function() {
        var curr = this.tabtoggle_getPreferencesService().getIntPref(this.setting);
        var newSetting = ((curr==this.SINGLE_WINDOW)?this.MULTIPLE_WINDOWS:this.SINGLE_WINDOW);
        this.tabtoggle_getPreferencesService().setIntPref(this.setting, newSetting);
        if(newSetting==this.SINGLE_WINDOW) {
            document.getElementById("tabtoggle_setting").setAttribute("checked", "false");
        } else {
            document.getElementById("tabtoggle_setting").setAttribute("checked", "true");
        }
        this.changeLabelAndIcon(newSetting);
    }

    toggle.changeLabelAndIcon = function(setSetting) {
        if(setSetting==this.SINGLE_WINDOW) {
            document.getElementById("tabtoggle_setting").setAttribute("checked", "false");
            document.getElementById("btn_tabtoggle").style.MozImageRegion = "rect(0 20px 20px 0)";
        } else {
            document.getElementById("tabtoggle_setting").setAttribute("checked", "true");
            document.getElementById("btn_tabtoggle").style.MozImageRegion = "rect(0 40px 20px 20px)";
        }
    }

    toggle.tabtoggle_initialize = function() {
        this.uk.co.pete_b.tabtoggle.tabtoggle_getPreferencesService().setIntPref(this.uk.co.pete_b.tabtoggle.restriction, 0);
        this.uk.co.pete_b.tabtoggle.changeLabelAndIcon(this.uk.co.pete_b.tabtoggle.tabtoggle_getPreferencesService().getIntPref(this.uk.co.pete_b.tabtoggle.setting));
    }
    
    return toggle;
}();

window.addEventListener("load", uk.co.pete_b.tabtoggle.tabtoggle_initialize, false);