#!/bin/bash
# logcase — paste your messy session notes to clipboard, then run this
# Set LOG_SESSION_SECRET in your ~/.zshrc or ~/.bash_profile

APP_URL="${PM_PREP_URL:-http://localhost:3000}"
SECRET="${LOG_SESSION_SECRET}"

TEXT=$(pbpaste)

if [ -z "$TEXT" ]; then
  osascript -e 'display notification "Clipboard is empty — copy your session notes first" with title "logcase"'
  exit 1
fi

RESPONSE=$(curl -s -X POST "$APP_URL/api/log-session" \
  -H "Content-Type: application/json" \
  -H "x-log-secret: $SECRET" \
  -d "{\"text\": $(echo "$TEXT" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))')}")

TITLE=$(echo "$RESPONSE" | python3 -c 'import json,sys; d=json.load(sys.stdin); print(d["parsed"]["title"])' 2>/dev/null)
SCORE=$(echo "$RESPONSE" | python3 -c 'import json,sys; d=json.load(sys.stdin); print(d["parsed"].get("score","—"))' 2>/dev/null)
ERROR=$(echo "$RESPONSE" | python3 -c 'import json,sys; d=json.load(sys.stdin); print(d.get("error",""))' 2>/dev/null)

if [ -n "$ERROR" ] && [ "$ERROR" != "None" ]; then
  osascript -e "display notification \"Error: $ERROR\" with title \"logcase ❌\""
else
  osascript -e "display notification \"$TITLE — Score: $SCORE\" with title \"logcase ✅\""
fi
