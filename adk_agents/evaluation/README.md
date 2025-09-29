# Evaluation Module

This folder contains all the necessary resources for creating, collecting, processing, and visualizing data related to the evaluation of agents in the project. Below is a detailed guide to understanding and using the contents of this folder.

## 1. Overview
The evaluation module is designed to:
- **Create** prompts and datasets for evaluation.
- **Collect** session traces and other evaluation data.
- **Process** raw data into structured formats.
- **Visualize** insights and performance metrics.

## 2. Folder Structure
```
├── .env
├── create_prompts.ipynb
├── create_unclear_prompts.ipynb
├── data_analyst.ipynb
├── fetch_session_trace.ipynb
├── merge_json.py
├── test.json
├── assets/
├── data/
├── plan/
└── session_traces/
```

## 3. Steps

### Step 1: Creating Data
- **Notebooks**:
  - `create_prompts.ipynb`: Generates clear prompts for evaluation.
  - `create_unclear_prompts.ipynb`: Generates unclear prompts for evaluation.
- **Output**: The generated prompts are saved in the `data/` folder as CSV or JSON files.

### Step 2: Collecting Data
- **Notebook**:
  - `fetch_session_trace.ipynb`: Fetches session traces from agent interactions.
- **Output**: Session traces are stored in the `session_traces/` folder, categorized into `focus_clear/` and `focus_unclear/`.

### Step 3: Processing Data
- **Script**:
  - `merge_json.py`: Merges multiple JSON files into a single structured file for analysis.
- **Input**: Raw data from `session_traces/`.
- **Output**: Processed data saved in the `data/` folder.

### Step 4: Visualizing Data
- **Notebook**:
  - `data_analyst.ipynb`: Analyzes and visualizes data to generate insights.
- **Assets**:
  - Visualization images (e.g., `01_quality_distribution.png`) are saved in the `assets/` folder.

## 4. Key Files and Directories
- **`.env`**: Environment variables for configuring the evaluation module.
- **`data/`**: Contains raw and processed data files.
- **`assets/`**: Stores visualization images.
- **`plan/`**: Contains evaluation plans and documentation.
- **`session_traces/`**: Stores session trace files categorized by evaluation type.
- **`merge_json.py`**: Script for merging JSON files.
- **`test.json`**: Example JSON file for testing.

## 5. How to Use
1. **Set up the environment**:
   - Copy `.env` to `.env.local` and configure the necessary variables.
2. **Run notebooks**:
   - Use Jupyter Notebook to execute the provided `.ipynb` files.
3. **Process data**:
   - Run `merge_json.py` to process raw data.
4. **Visualize results**:
   - Use `data_analyst.ipynb` to generate insights and save visualizations.

## 6. Notes
- Ensure all dependencies are installed before running scripts or notebooks.
- Refer to the `plan/` folder for detailed evaluation strategies.

## 7. Contact
For any issues or questions, please contact the project maintainers.