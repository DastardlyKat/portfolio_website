Drop project screenshots/covers here named to match src/lib/projects.ts:
project-one.jpg, project-two.jpg, project-three.jpg
Recommended size: 1600x1200 (4:3), optimized (< 300kb) for fast load.

Optional hover-preview videos (set via `previewVideo` in projects.ts):
project-one.mp4
- Keep these SHORT (3-8s), silent, looped screen-capture clips of the
  product in use (scrolling, clicking through a flow, etc).
- Compress hard: target under 2-3MB, e.g. via:
  ffmpeg -i input.mov -vf "scale=800:-1" -an -c:v libx264 -crf 28 -preset veryslow project-one.mp4
- If a project has no video, just omit `previewVideo` from projects.ts
  and the card will show the static image only — no code changes needed.
