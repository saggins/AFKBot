# AFKBot
A bot for Minecraft to stay AFK written in node.js thanks to [mineflayer](https://github.com/PrismarineJS/mineflayer). Mainly for Windows, not tested on other OS.

Written in Node.js

[Link](https://mrmoraschi.github.io/AFKBot/) to the page of this project.

<img alt="logo" src="https://github.com/MrMoraschi/AFKBot/raw/master/logo.png" height="200" />
## Features

 * Supports 1.16.1 and newer versions.
 * An easy-to-use GUI with incorporated chat thanks to [mineflayer-dashboard](https://github.com/wvffle/mineflayer-dashboard).
 * Windows Desktop Notifications for events like /tell or on death. These can be disabled when starting the bot.
 * Automatic response (whispered) like "Sorry, I am an AFK Bot", to people who "/tell" you.
 * Pathfinding ability to make your AFK bot follow you from one place to another, thanks to [mineflayer-navigate](https://github.com/Karang/mineflayer-pathfinder).
 * Reconnect ability in case it's kicked form the server.
 * Online/Cracked mode support.
 * Looks at nearby entities simulating real players.
 * Alerts on low health.
 * Shows who attacked the bot and the weapon.

## Install

 1. Make sure you have installed Node on your PC, once you have installed it, you can proceed to the next step. You can download Node [here](https://nodejs.org/).
 1. Create a folder somewhere in you PC.
 2. Extract the downloaded .zip in the folder.
 3. Now, open the command prompt (press WIN + R, it should open a window, type in "cmd" and hit ENTER).
 4. Navigate to the folder where you put the files (Example: type "cd C:\Users\MrMoraschi\Desktop\BotFolder" and hit ENTER).
 5. Now where are going to install Mineflayer and the other Plug-ins, type:
	
	`npm install mineflayer`
    
    this will install Mineflayer, when finished installing, type:

	`npm install mineflayer-dashboard`

    and keep repeating the process until all the Plug-ins are installed:
	
	mineflayer-pathfinder to make the bot follow you:

		`npm install mineflayer-pathfinder`
	
	mineflayer-dashboard to create the GUI:

		`npm install mineflayer-dashboard`

	mineflayer-bloodhound to know who attacked you and with what:

		`npm install mineflayer-bloodhound`

	node-notifier to create Windows Desktop Notifications:

		`npm isntall node-notifier`

 6. Now that all the things have been installed, the bot is ready to run and go AFK.

## Commands

 1. The bot is configured to only reply to "/tell" messages. It will reply with "Sorry, I am an AFK Bot".
 2. The bot will only follow you if tell him to do so:
	
	*/tell [botname] follow me*

	Will make the bot follow you.

	*/tell [botname] stop*

	Will make the bot stop following you.

 3. The bot will start the anti-AFK-kick sequence when connected automatically, it will jump every 10 minutes to prevent kicks.
 
## How to Use

 1. Repeat number 4 from "Install"; navigate to the folder where the files are located.
 2. There are 4 arguments that are needed, and other 2 that are optional:

	"host" : This is the IP or the subdomain of the server.

	"port" : This is the port of the server.

	"windows desktop notifications" : You need to choose between "yes" or "no" depending if you want or not Windows Desktop Notifications.

	"owner" : You need to fill this with the username of the player who wants to control the bot, so that the bot doesn't accidentally respond with actions if other players /tell him to do them.

	"username/gmail" : You need to type a username for the bot, write the e-mail in case the account is premium, default is "AFKBot".

	"password" : Ignore if the account is cracked, only for premium accounts.

	Example:
	
	```node AFK.js localhost 25565 yes ImTheOwner mygmailcool@gmail.com mypasswordis1234```

 3. Once you've written all, hit ENTER and watch as the GUI starts and the bot connects to the server.
