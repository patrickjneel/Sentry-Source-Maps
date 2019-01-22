# Must have `sentry-cli` installed globally
# Following variable must be passed in
#  SENTRY_AUTH_TOKEN
# 8a472919d5034cf5869dfb866246d1ebb83de97deebb4ddfa0a2c031926f16a4

SENTRY_ORG=nutrien
SENTRY_PROJECT=sourcemap-testing-temp
VERSION=`sentry-cli releases propose-version`
PREFIX=static/js

setup_release: create_release upload_sourcemaps

create_release:
	sentry-cli releases -o $(SENTRY_ORG) new -p $(SENTRY_PROJECT) $(VERSION)

associate_commits:
	sentry-cli releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) set-commits --auto $(VERSION)

upload_sourcemaps:
	sentry-cli releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) files $(VERSION) \
		upload-sourcemaps --url-prefix "~/$(PREFIX)" --validate build/$(PREFIX)