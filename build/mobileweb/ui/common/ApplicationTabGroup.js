function ApplicationTabGroup(windows) {
	//create module instance
	var self = Ti.UI.createTabGroup();
	
	//create app tabs
	//for (tab in windows)
	//{
		var tab = Ti.UI.createTab({
			title: L('Teams List'),
			window: windows
		});
	//}
	
	/*
	var win1 = new Window(L('My Team')),
		win2 = new Window(L('Event')),
		win3 = new Window(L('Settings'));
	
	var tab1 = Ti.UI.createTab({
		title: L('My Team'),
		icon: '/images/KS_nav_ui.png',
		window: win1
	});
	win1.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: L('Event'),
		icon: '/images/KS_nav_views.png',
		window: win2
	});
	win2.containingTab = tab2;
	
	var tab3 = Ti.UI.createTab({
		title: L('Settings'),
		icon: '/images/KS_nav_views.png',
		window: win3
	});
	win3.containingTab = tab3;
	
	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);*/
	
	self.addTab(tab);
	
	return self;
};

module.exports = ApplicationTabGroup;
