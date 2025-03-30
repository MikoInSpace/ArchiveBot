
# Archiva Bot

A discord bot to archive discord server messages


## Installation

1. Clone the repo:
```bash
  git clone https://github.com/MikoInSpace/ArchiveBot
```

2. Modify `token`, `serverId` and `roleId`
  I. Go to https://discord.com/developers/applications and create a new application

  II. Click on bot on the left side of the screen

  III. Click on reset token

  IV. Copy the token

  V. Open `index.js` in the repo you just cloned.

  VI. Replace `INSERT-YOUR-TOKEN` on line 7 with the token you just copied.

  VII. Replace `INSERT-SERVER-ID` and `INSERT-ROLE-ID` with your server id and role id respectively

  VIII. Invite the discord bot to your server.

  IX. Now in the bot folder, run
  ```bash
  npm install
  ```

  X. Finally, run 
  ```bash
  node index.js
  ```
  To run the bot. Now the bot should be online and should start logging every message every 1 hour!
    
