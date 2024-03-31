#!/usr/bin/env python3

import argparse
import json
import os
import urllib.request

def filter_keys(data: dict, keys_to_keep: list) -> dict:
    keys_to_pop = set(data.keys()) - set(keys_to_keep)
    for key in keys_to_pop:
        data.pop(key)


def main(args):
    with urllib.request.urlopen(args.google_script_web_app_deployment_url) as fp:
        data = json.load(fp)

    json.dump(data, args.private_path)

    for member in data.get("members", []).values():
        filter_keys(member, data.get("members_public_fields", []))

    filter_keys(data, data.get("public_fields", []))
    
    json.dump(data, args.public_path)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Build the member json')
    parser.add_argument("private_path", type=argparse.FileType('w'))
    parser.add_argument("public_path", type=argparse.FileType('w'))
    parser.add_argument("--google-script-web-app-deployment-url", default=os.environ.get("LDT_MEMBRES_GOOGLE_SCRIPT_URL", ""))
    args=parser.parse_args()
    main(args)
