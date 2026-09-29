Rebuild installable zips (theme, HTML, WordPress all-in-one):

  bash dphilhower-studio-wp/scripts/build-packages.sh

Do not commit rebuilt zips over ~95MB (GitHub file limit). Deliver large
packages via split artifacts instead.
