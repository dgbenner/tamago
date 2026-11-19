#!/bin/sh
# Publishes the design system's Storybook (design-system branch) to GitHub Pages:
#   https://dgbenner.github.io/tamago-design-system/
# Only the built Storybook goes out, to the gh-pages branch of the public repo dgbenner/tamago-design-system. The
# design-system branch itself, the app and its recordings are never pushed by this script.
#   npm run publish-storybook
# Steps: build; check the build (no secrets, no personal paths, no recordings, nothing that names a server); commit it
# on top of what is published (never a force-push); make sure Pages is on. Needs gh (signed in) and gitleaks.
set -eu
REPO=dgbenner/tamago-design-system
BRANCH=gh-pages
OUT=storybook-static
cd "$(git rev-parse --show-toplevel)"
[ "$(git rev-parse --abbrev-ref HEAD)" = design-system ] || { echo "Stopped: run this on the design-system branch."; exit 1; }
command -v gh >/dev/null || { echo "Stopped: needs the GitHub CLI (gh), signed in."; exit 1; }
command -v gitleaks >/dev/null || { echo "Stopped: needs gitleaks (brew install gitleaks)."; exit 1; }

echo "1/5 Building the Storybook pages"
rm -rf "$OUT"
STORYBOOK_DISABLE_TELEMETRY=1 npx storybook build -o "$OUT" >/dev/null
touch "$OUT/.nojekyll" # GitHub Pages serves the files as they are
cat > "$OUT/README.md" <<'README'
# Tamago Design System (Storybook)

The built Storybook of a design-system demonstration for Tamago, a language-learning app.
Open it at https://dgbenner.github.io/tamago-design-system/

This branch holds only the built pages; it is replaced on every publish. It is a demonstration, not the app.
README

echo "2/5 Checking the build"
gitleaks dir "$OUT" --config scripts/publish-gitleaks.toml --redact --no-banner || { echo "Stopped: the secret scan found something (above)."; exit 1; }
if grep -rIlE "/Users/|/home/[a-z]" "$OUT" >/dev/null; then echo "Stopped: the build holds a personal path:"; grep -rIlE "/Users/|/home/[a-z]" "$OUT"; exit 1; fi
if find "$OUT" \( -name '*.m4a' -o -name '*.wav' -o -name '*.mp3' -o -name '.env*' \) | grep -q .; then echo "Stopped: the build holds recordings or an env file."; exit 1; fi
# Nothing in the pages may name a server of ours or a tracker.
if grep -rIlE "statcounter|supabase\.co|anthropic\.com/v1|TAMAGO_ANTHROPIC" "$OUT" >/dev/null; then echo "Stopped: the build names a server or tracker:"; grep -rIlE "statcounter|supabase\.co|anthropic\.com/v1|TAMAGO_ANTHROPIC" "$OUT"; exit 1; fi

echo "3/5 Fetching what is published"
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
gh repo view "$REPO" >/dev/null 2>&1 || gh repo create "$REPO" --public --description "Storybook for the Tamago design-system demonstration (built pages only)" >/dev/null
if git ls-remote --exit-code --heads "https://github.com/$REPO.git" "$BRANCH" >/dev/null 2>&1; then
  git clone -q --depth 1 --branch "$BRANCH" "https://github.com/$REPO.git" "$TMP/site"
else
  git init -q -b "$BRANCH" "$TMP/site"
  git -C "$TMP/site" remote add origin "https://github.com/$REPO.git"
fi
find "$TMP/site" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -R "$OUT"/. "$TMP/site"/

echo "4/5 Publishing"
git -C "$TMP/site" config user.name "$(git config user.name)"
git -C "$TMP/site" config user.email "$(git config user.email)"
git -C "$TMP/site" add -A
if git -C "$TMP/site" diff --cached --quiet; then echo "    Nothing changed since the last publish."
else
  git -C "$TMP/site" commit -q -m "Publish Storybook (design-system $(git rev-parse --short HEAD))"
  git -C "$TMP/site" push -q origin "$BRANCH"
fi

echo "5/5 Making sure GitHub Pages is on"
# GitHub turns Pages on by itself for a branch called gh-pages, sometimes a moment after the push: ask, try to turn
# it on, then ask again before giving up.
gh api "repos/$REPO/pages" >/dev/null 2>&1 \
  || gh api -X POST "repos/$REPO/pages" -f "source[branch]=$BRANCH" -f "source[path]=/" >/dev/null 2>&1 \
  || { sleep 5; gh api "repos/$REPO/pages" >/dev/null 2>&1; } \
  || { echo "Stopped: GitHub Pages is not on. Turn it on at https://github.com/$REPO/settings/pages (branch $BRANCH, folder /)."; exit 1; }
echo "Published: https://dgbenner.github.io/tamago-design-system/ (GitHub takes a minute or two to show a new publish)"
