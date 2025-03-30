
# Archiva Bot

A discord bot to archive discord server messages


## Installation

1. Clone the repo:
```bash
  git clone https://github.com/MikoInSpace/ArchiveBot
```

2. Modify `token`, `serverId` and `roleId`

3. Go to https://discord.com/developers/applications and create a new application

4. Click on bot on the left side of the screen

5. Click on reset token

6. Copy the token

7. Open `index.js` in the repo you just cloned.

8. Replace `INSERT-YOUR-TOKEN` on line 7 with the token you just copied.

9. Replace `INSERT-SERVER-ID` and `INSERT-ROLE-ID` with your server id and role id respectively

10. Invite the discord bot to your server.

11. Now in the bot folder, run
  ```bash
  npm install
  ```

12. Finally, run 
  ```bash
  node index.js
  ```
  To run the bot. Now the bot should be online and should start logging every message every 1 hour!
    
