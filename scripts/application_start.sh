#!/bin/bash

#give permission for everything in the dashboardadmin directory
sudo chmod -R 777 /home/ec2-user/dashboardadmin

#navigate into our working directory where we have all our github files
cd /home/ec2-user/dashboardadmin

#download node and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)
. ~/.nvm/nvm.sh
nvm install 16.16.0
nvm use --delete-prefix v16.16.0

#install node modules
npm install

#start our node app in the background
npm run startaws > app.out.log 2> app.err.log < /dev/null & 