import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import os
import json

# Define the source and destination directories
data_set='focus_clear'
source_directory = f'{data_set}/eval_history'
destination_directory = f'{data_set}/parsed'

# Create the destination directory if it doesn't already exist
os.makedirs(destination_directory, exist_ok=True)

class FileChangeHandler(FileSystemEventHandler):
    def on_modified(self, event):
        if event.is_directory:
            return
        self.process(event.src_path)

    def on_created(self, event):
        if event.is_directory:
            return
        self.process(event.src_path)

    def process(self, file_path):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                stringified_json = f.read().strip()

            # First attempt to parse
            parsed_data = json.loads(stringified_json)

            # If result is just a string, decode it again
            if isinstance(parsed_data, str):
                parsed_data = json.loads(parsed_data)

            # Destination path
            filename = os.path.basename(file_path)
            destination_file_path = os.path.join(destination_directory, filename)

            # Save JSON with Vietnamese characters (not escaped)
            with open(destination_file_path, 'w', encoding='utf-8') as f:
                json.dump(parsed_data, f, indent=2, ensure_ascii=False)

            print(f"  ✅ Successfully converted {filename}")

        except json.JSONDecodeError as e:
            print(f"  [ERROR] Could not parse JSON from {file_path}: {e}")
        except Exception as e:
            print(f"  [ERROR] Unexpected error with {file_path}: {e}")

if __name__ == "__main__":
    print(f"Watching for changes in '{source_directory}'...")
    event_handler = FileChangeHandler()
    observer = Observer()
    observer.schedule(event_handler, path=source_directory, recursive=False)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()