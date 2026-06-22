#!/usr/bin/env bash
set -e

export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
else
  echo "Nie znaleziono nvm. Zainstaluj Node.js albo uruchom: source ~/.bashrc"
  exit 1
fi

cd "$(dirname "$0")"

if [ ! -d node_modules ]; then
  echo "Instaluję zależności..."
  npm install
fi

npm run dev
