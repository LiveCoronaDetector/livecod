import csv, json, requests


def get_raw_data(url):
    with requests.Session() as s:
        download = s.get(url)
        decoded_content = download.content.decode("utf-8")
        data = list(csv.reader(decoded_content.splitlines(), delimiter=","))
        return data


def write_data(total_data, save_dir, crawler_name):
    with open(save_dir, "w", encoding="utf-8") as make_file:
        json.dump(total_data, make_file, ensure_ascii=False, indent=4)

    data = ""
    with open(save_dir, "r", encoding="UTF-8-sig") as f:
        line = f.readline()
        while line:
            data += line
            line = f.readline()

    with open(save_dir, "w", encoding="UTF-8-sig") as f_write:
        f_write.write(data)

    with open(save_dir.replace('json', 'csv'), "w", encoding="UTF-8-sig", newline="") as f_csv_write:
        writer = csv.DictWriter(f_csv_write, fieldnames=total_data[0].keys())
        writer.writeheader()
        for line in total_data:
            writer.writerow(line)