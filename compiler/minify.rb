require 'cssminify'
require 'html_press'
require 'uglifier'

output = "../../index.html"

index_path = File.expand_path(output,__FILE__)

html_path = File.expand_path("../../date-calculator.html",__FILE__)
css_path = File.expand_path("../../style.css", __FILE__)
js_paths = []

Dir["js/*.js"].each { |path|
	js_paths.push(File.expand_path("../../" + path, __FILE__))
}

# CSS
css_content = CSSminify.compress(File.read(css_path))

# JavaScript
js_content = ""

js_paths.each { |path|
	js_content = js_content + File.read(path)
}
js_content = Uglifier.new.compile(js_content)

# HTML
html_content = File.read(html_path, :encoding => "UTF-8")
html_content = HtmlPress.press(html_content)
if html_content["$$STYLES$$"]
	html_content["$$STYLES$$"] = css_content
end

if html_content["$$SCRIPT$$"]
	html_content["$$SCRIPT$$"] = js_content
end

File.open("index.html",'w') do |s|
  s.print html_content
end
