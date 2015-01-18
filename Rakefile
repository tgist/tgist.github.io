require "rubygems"
require 'rake'
require 'yaml'
require 'time'

SOURCE = "."
CONFIG = {
  'layouts' => File.join(SOURCE, "_layouts"),
  'posts' => File.join(SOURCE, "_posts"),
  'post_ext' => "md",
}

# Usage: rake post title="A Title" [date="2012-02-09"] [tags=[tag1,tag2]] [category="category"]
desc "Begin a new post in #{CONFIG['posts']}"
task :post do
  abort("rake aborted: '#{CONFIG['posts']}' directory not found.") unless FileTest.directory?(CONFIG['posts'])
  title = ENV["title"] || "new-post"
  tags = ENV["tags"] || "[]"
  category = ENV["category"] || ""
  category = "\"#{category.gsub(/-/,' ')}\"" if !category.empty?
  slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  begin
    date = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d')
  rescue => e
    puts "Error - date format must be YYYY-MM-DD, please check you typed it correctly!"
    exit -1
  end
  filename = File.join(CONFIG['posts'], "#{date}-#{slug}.#{CONFIG['post_ext']}")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end

  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/-/,' ')}\""
    post.puts "category: #{category}"
    post.puts "tags: #{tags}"
    post.puts "---"
  end
end # task :post

# Usage: rake page name="about.html"
# You can also specify a sub-directory path.
# If you don't specify a file extention we create an index.html at the path specified
desc "Create a new page."
task :page do
  name = ENV["name"] || "new-page.md"
  filename = File.join(SOURCE, "#{name}")
  filename = File.join(filename, "index.html") if File.extname(filename) == ""
  title = File.basename(filename, File.extname(filename)).gsub(/[\W\_]/, " ").gsub(/\b\w/){$&.upcase}
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end

  mkdir_p File.dirname(filename)
  puts "Creating new page: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: page"
    post.puts "title: \"#{title}\""
    post.puts "---"
  end
end # task :page

desc "Launch preview environment"
task :preview do
  system "jekyll server -w"
end # task :preview

desc "synchronize qiniu folder to remote server with qiniu sync tool"
task :qrsync do
  bin = "qrsync"
  json = "_qiniu.json"
  ignore = ".gitignore"
  filebin = File.join(Dir.pwd, bin)
  filejson = File.join(Dir.pwd, json)
  fileignore = File.join(Dir.pwd, ignore)

  abort("rake aborted: '#{filebin}' file not found.\nDownload it from 'http://developer.qiniu.com/docs/v6/tools/qrsync.html'\nYour may need to get qiniu account") unless File.exist?(filebin)

  unless File.exist?(filejson)
    open(filejson, 'w') do |json|
      json.puts '{'
      json.puts '    "access_key": "your access key",'
      json.puts '    "secret_key": "your secret_key",'
      json.puts '    "bucket": "your bucket name",'
      json.puts '    "sync_dir": "local directory to upload",'
      json.puts '    "async_ops": "",'
      json.puts '    "debug_level": 1'
      json.puts '}'
    end
    if File.exist?(fileignore)
      unless File.open(fileignore).each_line.any?{ |line| line.include?(json) }
        open(fileignore, 'a') { |ignore| ignore.puts "#{json}" }
      end
    else
      open(fileignore, 'w') { |ignore| ignore.puts "#{json}" }
    end
    puts "please edit #{filejson}"
  else
    system "#{Dir.pwd}/qrsync #{filejson}"
  end

end

#Load custom rake scripts
Dir['_rake/*.rake'].each { |r| load r }
