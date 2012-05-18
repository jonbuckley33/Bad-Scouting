var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
var TeamsList = require('ui/common/TeamsList');
var textField;

var splashScreen;
var user;
var buttonWidth = 100;

function launchModule() {
	textField.setValue("pressed");
	var tabs = new ApplicationTabGroup(new TeamsList());
	tabs.open();
}

function SplashScreen() {

	splashScreen = Ti.UI.createWindow({
		backgroundColor : 'orange',
		layout : 'vertical'
	});

	if(user == "unknown" || user == null) {
		var pit = Ti.UI.createButton({
			color : 'red',
			title : L('Pit Crew'),
			top : 50,
			width : buttonWidth
		}), scout = Ti.UI.createButton({
			color : 'green',
			title : L('Scout'),
			top : 50,
			width : buttonWidth
		}), driver = Ti.UI.createButton({
			color : 'blue',
			title : L('Driver'),
			top : 50,
			width : buttonWidth
		});

		textField = Ti.UI.createTextField({
			height : 20,
			width : 100,
			top : 50
		});

		textField.setValue("Nothing presseddd....");

		/*pit.addEventListener('click',  launchModule());

		 scout.addEventListener('click', launchModule());

		 driver.addEventListener('click', launchModule());*/

		textField.setValue("waiting for press");

		splashScreen.add(pit);
		splashScreen.add(scout);
		splashScreen.add(driver);
		splashScreen.add(textField);
	}

	return splashScreen;
}

module.exports = SplashScreen;
//module.exports.launchModule = launchModule;
