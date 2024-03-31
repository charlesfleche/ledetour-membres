#!/usr/bin/env python3

import argparse
import json
import os
import urllib.request

_ENV_GOOGLE_SCRIPT_WEB_APP_URL = "LDT_MEMBRES_GOOGLE_SCRIPT_URL"
_ENV_ANONYMIZED_PATH = "LDT_MEMBRES_ANONYMIZED_PATH"
_ENV_NON_ANONYMIZED_PATH = "LDT_MEMBRES_NON_ANONYMIZED_PATH"

_DEFAULT_GOOGLE_SCRIPT_WEB_APP_URL = ""
_DEFAULT_ANONYMIZED_PATH = "/var/run/ledetour-membres/members-anonymized.json"
_DEFAULT_NON_ANONYMIZED_PATH = "/var/run/ledetour-membres/members-non-anonymized.json"


def filter_keys(data: dict, keys_to_keep: list) -> dict:
    keys_to_pop = set(data.keys()) - set(keys_to_keep)
    for key in keys_to_pop:
        data.pop(key)


def main(args):
    with urllib.request.urlopen(args.google_script_web_app_deployment_url) as fp:
        data = json.load(fp)

    json.dump(data, args.non_anonymized_path)

    for member in data.get("members", []).values():
        filter_keys(member, data.get("members_public_fields", []))

    filter_keys(data, data.get("public_fields", []))

    json.dump(data, args.anonymized_path)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Build the member json")
    parser.add_argument(
        "--non-anonymized-path",
        type=argparse.FileType("w"),
        default=os.environ.get(
            _ENV_NON_ANONYMIZED_PATH,
            _DEFAULT_NON_ANONYMIZED_PATH,
        ),
    )
    parser.add_argument(
        "--anonymized-path",
        type=argparse.FileType("w"),
        default=os.environ.get(
            _ENV_ANONYMIZED_PATH,
            _DEFAULT_ANONYMIZED_PATH,
        ),
    )
    parser.add_argument(
        "--google-script-web-app-deployment-url",
        default=os.environ.get(
            _ENV_GOOGLE_SCRIPT_WEB_APP_URL,
            _DEFAULT_GOOGLE_SCRIPT_WEB_APP_URL,
        ),
    )
    args = parser.parse_args()
    main(args)
