
# ArchivalBot

A discord bot to archive discord server messages


## Installation

1. Clone the repo:
```bash
  git clone https://github.com/MikoInSpace/ArchiveBot
```

2. Modify `token`, `serverId` and `roleId`
  i. Go to https://discord.com/developers/applications and create a new application

  ii. Click on bot on the left side of the screen

  iii. Click on reset token

  iv. Copy the token

  v. Open `index.js` in the repo you just cloned.

  vi. Replace `INSERT-YOUR-TOKEN` on line 7 with the token you just copied.

  vii. Replace `INSERT-SERVER-ID` and `INSERT-ROLE-ID` with your server id and role id respectively

  viii. Invite the discord bot to your server.

  ix. Now in the bot folder, run
  ```bash
  npm install
  ```

  x. Finally, run 
  ```bash
  node index.js
  ```
  To run the bot. Now the bot should be online and should start logging every message every 1 hour!
    