[![Build Status](https://travis-ci.org/iHavee/iHavee.github.io.svg?branch=sources)](https://travis-ci.org/iHavee/iHavee.github.io)

### Generic

#### require:

- jekyll >= 3.0.3
- jekyll-paginate >= 1.1.0

#### Create new post

    rake post title='A Title'
    or
    rake post title="A Title" [date="2012-02-09"] [tags=[tag1,tag2]] [category="category"]

#### Create new page

    rake page name='about.html'

#### Define your color

Edit the file:  `assets/_sass/_custom.scss`

#### Use qiniu cdn

    rake qrsync

Then, follow tips to do

### Docker Compose

    docker-compose up -d

#### Create new post

    docker exec -ti jekyll rake post title='A Title'
    or
    docker exec -ti jekyll rake post title="A Title" [date="2012-02-09"] [tags=[tag1,tag2]] [category="category"]
    ...

#### License

- The Font Awesome font is licensed under the [SIL OFL 1.1](http://scripts.sil.org/OFL)
- Font Awesome CSS, LESS, and SASS files are licensed under the [MIT License](http://opensource.org/licenses/mit-license.html)
- Bootstrap is licensed under the [MIT License](http://opensource.org/licenses/mit-license.html)
- Jekyll is licensed under the [MIT License](http://opensource.org/licenses/mit-license.html)
