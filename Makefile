all:
	@ruby compiler/minify.rb
	gzip -c index.html > index.html.gz
	ls -S -l index.html.gz

