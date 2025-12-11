import os
import zipfile

# --- Configuration ---
COLLECTION_FOLDER_NAME = "circle-health-collection"
FRAGMENT_SOURCE_DIR = "fragment-collection"
OUTPUT_ZIP_FILENAME = "circle-health-collection.zip"

# --- Main Script ---
def create_liferay_collection_zip(source_dir, collection_name, output_filename):
    """
    Creates a Liferay-compatible fragment collection ZIP file.
    The structure inside the zip will be:
    collection_name/
    +-- collection.json
    +-- fragments/
    |   +-- fragment_1/
    |   +-- ...
    +-- resources/
        +-- ...
    """
    
    # The full path to the collection's source directory
    collection_source_path = os.path.join(source_dir, collection_name)
    
    if not os.path.isdir(collection_source_path):
        print(f"Error: Source directory '{collection_source_path}' not found.")
        return

    print(f"Creating ZIP file: '{output_filename}'")
    
    with zipfile.ZipFile(output_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        # Walk through the entire directory structure of the collection
        for root, dirs, files in os.walk(collection_source_path):
            # Exclude hidden directories
            dirs[:] = [d for d in dirs if not d.startswith('.')]
            
            for file in files:
                # Exclude hidden files
                if file.startswith('.'):
                    continue

                # Get the full path of the file to be added
                file_path = os.path.join(root, file)
                
                # Determine the name of the file inside the zip archive
                # This creates the path relative to the `fragment-collection` directory
                # e.g., 'fragment-collection/circle-health-collection/collection.json' -> 'circle-health-collection/collection.json'
                arcname = os.path.relpath(file_path, source_dir)
                
                print(f"  Adding: {file_path} as {arcname}")
                zipf.write(file_path, arcname)

    print(f"Successfully created '{output_filename}'.")

if __name__ == "__main__":
    create_liferay_collection_zip(FRAGMENT_SOURCE_DIR, COLLECTION_FOLDER_NAME, OUTPUT_ZIP_FILENAME)
