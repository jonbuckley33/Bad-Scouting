function ApplicationWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});
	
	var button = Ti.UI.createButton({
		height:44,
		width:200,
		title:L('openWindow'),
		top:20
	});
	self.add(button);
	
	/*
	var playThing = Ti.UI.createOptionDialog({
		height: 100,
		width:200,
		title:L('Is Nathan Retarded?')
	});
	self.add(playThing);*/
	/*button.addEventListener('click', randomizeBackgroundColor(button) {
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		self.containingTab.open(Ti.UI.createWindow({
			title: L('newWindow'),
			backgroundColor: 'white'
		//}));
	//}
	);*/
	
	return self;
};

module.exports = ApplicationWindow;
