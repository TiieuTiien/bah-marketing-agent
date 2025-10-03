import os
import json

def process_file(file_path, destination_directory):
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
    # Define the source and destination directories
    source_directory = 'eval_history'
    destination_directory = 'parsed'

    # Create the destination directory if it doesn't already exist
    os.makedirs(destination_directory, exist_ok=True)

    # Process all files in the source directory
    for filename in os.listdir(source_directory):
        file_path = os.path.join(source_directory, filename)
        if os.path.isfile(file_path):
            process_file(file_path, destination_directory)
import os
import json

def process_file(file_path, destination_directory):
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
    # Define the source and destination directories
    source_directory = 'helper'
    destination_directory = 'parsed'

    # Create the destination directory if it doesn't already exist
    os.makedirs(destination_directory, exist_ok=True)

    # Process all files in the source directory
    for filename in os.listdir(source_directory):
        file_path = os.path.join(source_directory, filename)
        if os.path.isfile(file_path):
            process_file(file_path, destination_directory)