import os
import json

# Define the directory containing the JSON files
data_set='focus_clear'
parsed_directory = f"{data_set}/parsed"

def rename_files_in_directory(directory):
    # Iterate through all files in the directory
    for file_name in os.listdir(directory):
        file_path = os.path.join(directory, file_name)

        # Process only JSON files
        if file_name.endswith(".json") and os.path.isfile(file_path):
            try:
                # Load the JSON content
                with open(file_path, "r", encoding="utf-8") as f:
                    data = json.load(f)

                # Extract eval_set_id and eval_id
                eval_id = data.get("eval_case_results", [{}])[0].get("eval_id", "unknown_id")

                # Construct the new file name
                new_file_name = f"{eval_id}.json"
                new_file_path = os.path.join(directory, new_file_name)

                # Rename the file
                os.rename(file_path, new_file_path)
                print(f"Renamed: {file_name} -> {new_file_name}")

            except Exception as e:
                print(f"Error processing {file_name}: {e}")

rename_files_in_directory(parsed_directory)