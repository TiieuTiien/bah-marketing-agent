import json

# --- 1. Cấu hình ---
# Đặt tên cho hai file JSON bạn muốn gộp
FILE_1_PATH = 'data/focus_clear_eval_detail.json'
FILE_2_PATH = 'data/focus_unclear_eval_detail.json'

# Đặt tên cho file kết quả sau khi gộp
MERGED_FILE_PATH = 'data/final_results.json'

# --- 2. Logic gộp file ---
try:
    # Đọc dữ liệu từ file thứ nhất
    with open(FILE_1_PATH, 'r', encoding='utf-8') as f1:
        data1 = json.load(f1)
        print(f"Đã đọc thành công {len(data1)} bản ghi từ '{FILE_1_PATH}'.")

    # Đọc dữ liệu từ file thứ hai
    with open(FILE_2_PATH, 'r', encoding='utf-8') as f2:
        data2 = json.load(f2)
        print(f"Đã đọc thành công {len(data2)} bản ghi từ '{FILE_2_PATH}'.")

    # Kiểm tra xem cả hai file có phải là danh sách (list) không
    if isinstance(data1, list) and isinstance(data2, list):
        # Gộp hai danh sách lại với nhau
        merged_data = data1 + data2
        
        # Ghi danh sách đã gộp vào file mới
        with open(MERGED_FILE_PATH, 'w', encoding='utf-8') as f_out:
            # indent=4 để file JSON được định dạng đẹp, dễ đọc
            json.dump(merged_data, f_out, indent=4, ensure_ascii=False)
        
        print("-" * 30)
        print(f"Gộp file thành công! Tổng cộng {len(merged_data)} bản ghi.")
        print(f"Kết quả đã được lưu vào file: '{MERGED_FILE_PATH}'")

    else:
        print("Lỗi: Một trong hai file không có cấu trúc là một danh sách (list) JSON.")

except FileNotFoundError as e:
    print(f"Lỗi: Không tìm thấy file. Vui lòng kiểm tra lại đường dẫn: {e.filename}")
except json.JSONDecodeError:
    print("Lỗi: Một trong các file không phải là định dạng JSON hợp lệ.")
except Exception as e:
    print(f"Đã có lỗi xảy ra: {e}")