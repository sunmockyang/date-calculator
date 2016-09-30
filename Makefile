all:
	@ruby compiler/minify.rb
	gzip -c index.html > index.html.gz
	ls -S -lh index.html.gz
