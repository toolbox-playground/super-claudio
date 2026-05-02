# Scripting & Local Automation

For developers who want full control: Python scripts, Bash, cron jobs, and local automation tools.

## Python Automation Essentials

### Schedule recurring tasks (APScheduler)

```python
from apscheduler.schedulers.blocking import BlockingScheduler

scheduler = BlockingScheduler()

@scheduler.scheduled_job('cron', hour=9, minute=0)  # every day at 9am
def daily_task():
    print("Running daily task...")
    # your code here

scheduler.start()
```

Install: `pip install apscheduler`

### Watch a folder for new files

```python
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import time

class Handler(FileSystemEventHandler):
    def on_created(self, event):
        if not event.is_directory:
            print(f"New file: {event.src_path}")
            process_file(event.src_path)  # your function

observer = Observer()
observer.schedule(Handler(), path='/path/to/watch', recursive=False)
observer.start()
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    observer.stop()
```

Install: `pip install watchdog`

### Batch process files

```python
from pathlib import Path

input_dir = Path("./input")
output_dir = Path("./output")
output_dir.mkdir(exist_ok=True)

for file in input_dir.glob("*.csv"):
    # process each CSV
    data = process(file)
    output_file = output_dir / f"processed_{file.name}"
    data.to_csv(output_file, index=False)
    print(f"Done: {file.name}")
```

## macOS Automation (without code)

### Automator
- Built into macOS — no install needed
- Create "Quick Actions" that run on files/folders
- Right-click any file → Quick Actions → your automation

### Shortcuts (macOS/iOS)
- Apple Shortcuts app — visual automation for macOS and iOS
- Integrates with Claude via API actions
- Good for: daily routines, file management, notifications

## Cron Jobs (macOS/Linux)

Schedule any script to run at any time:

```bash
crontab -e
```

```
# Format: minute hour day month weekday command
0 9 * * 1-5   /usr/bin/python3 /path/to/daily_report.py     # weekdays at 9am
0 0 * * *     /bin/bash /path/to/backup.sh                   # midnight every day
*/30 * * * *  /usr/bin/python3 /path/to/check_api.py         # every 30 minutes
```

## Common Automation Scripts

### Download and process data from an API daily

```python
import requests, json
from datetime import datetime
from pathlib import Path

def fetch_and_save():
    response = requests.get("https://api.example.com/data")
    data = response.json()
    
    filename = f"data_{datetime.now().strftime('%Y%m%d')}.json"
    Path("./data").mkdir(exist_ok=True)
    
    with open(f"./data/{filename}", "w") as f:
        json.dump(data, f, indent=2)
    
    print(f"Saved {filename}")

fetch_and_save()
```

### Send a WhatsApp message via Twilio

```python
from twilio.rest import Client

client = Client("ACCOUNT_SID", "AUTH_TOKEN")
message = client.messages.create(
    from_="whatsapp:+14155238886",
    body="Daily report: everything looks good!",
    to="whatsapp:+5511999999999"
)
print(message.sid)
```

Install: `pip install twilio`
