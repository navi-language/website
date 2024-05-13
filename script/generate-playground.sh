rm -Rf public/play/
mkdir tmp/ public/play/
if [ -d tmp/playground ]; then
    cd tmp/playground
    git pull
else
    git clone https://github.com/navi-language/playground.git tmp/playground
    cd tmp/playground
fi

bun install
bun run build
cp -r dist/* ../../public/play/
