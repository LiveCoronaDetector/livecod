import subprocess, datetime, re
from pytz import timezone
from utils import write_data


def get_git_revision_short_hash():
    return subprocess.check_output(['git', 'rev-parse', '--short', 'HEAD'])


def run(now, git_version):
    data = [{
        'version_hash': git_version,
        'crawl_datetime': now.strftime('%Y-%m-%d %H:%M:%S'),
        'crawl_date': now.strftime('%Y년 %m월 %d일'),
        'crawl_time': now.strftime('%H시 %M분'),
        'crawl_time_only_hour': now.strftime('%H:00'),
    }]
    save_dir = "./data/version_info.json"
    crawler_name = "crawl_version_info.py"

    write_data(data, save_dir, crawler_name)


now = datetime.datetime.now(timezone('Asia/Seoul'))
git_version = re.sub(pattern='[^\w\s]', repl='', string=str(get_git_revision_short_hash()))
git_version = git_version[:-1]

print("⚙ 버전 정보를 업데이트 하는 중입니다")
run(now, git_version)
print(f"✔ 버전 정보 업데이트가 완료되었습니다! - {git_version}")
