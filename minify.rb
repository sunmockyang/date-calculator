require 'cssminify'
require 'html_press'



css_path = File.expand_path("../style.css", __FILE__)
head_path = File.expand_path("../head.html",__FILE__)
body_path = File.expand_path("../body.html", __FILE__)
js_path = File.expand_path("../script.js", __FILE__)

index_path = File.expand_path("../index.html",__FILE__)

css_content = CSSminify.compress(File.read(css_path))
head_content = HtmlPress.press(File.read(head_path))
body_content = HtmlPress.press(File.read(body_path))
js_content = File.read(js_path)

File.open("index.html",'w') do |s|
  s.print head_content+"<style>"+css_content+"</style>"+body_content+js_content+"</html>"
end
