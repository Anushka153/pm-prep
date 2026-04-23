Log a PM interview practice session to the case_logs database.

Steps:
1. Run `pbpaste` to get the clipboard contents
2. If clipboard is empty, ask the user to paste their session notes
3. Parse the raw text yourself into this JSON shape:
   {
     "company": "company name or Unknown",
     "score": <number 0-10 or null>,
     "type": ["array from: design, execution, strategy, estimation, behavioral, prioritization, b2b, drill, amazon, google"],
     "title": "4-7 word title",
     "question": "the interview question asked",
     "nailed": ["what went well"],
     "missed": ["gaps or areas to improve"],
     "keywords": ["relevant PM terms and frameworks"],
     "model": ["model answer bullets if present"]
   }
4. POST that JSON to the API:
   curl -s -X POST http://localhost:3000/api/log-session \
     -H "Content-Type: application/json" \
     -H "x-log-secret: $LOG_SESSION_SECRET" \
     -d '<the JSON you built>'
5. Show confirmation: ✅ Logged: [title] — [company] — Score: [score]
