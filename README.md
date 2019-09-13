# Controlled SVG from Node-RED Dashboard Template

... WORK IN PROGRESS ...

### SVG
Create SVG image in third party software. I used [Boxy SVG](https://boxy-svg.com/) (not sure if there is a 
free version). If using Boxy SVG click Elements tab at the bottom or open the created SVG file with a text 
editor (eg. [Visual Studio Code](https://code.visualstudio.com/download)). Find element you want to 
animate and add an ID attribute. See an example below where attribute is _id="P-101B@cx_color"_

`<path id="pump_P101A@cx_color" d="M 1018 600 C 1018 609.941 Z" style="fill: rgb(216, 216, 216);">`

The ID attribute consists of 2 components separated by _@_ symbol. The first is unique identifier and the 
second is type of animation. See APIs below for more information on these types.

### Importing to UI Template
Copy and paste text from [this link]() into UI Template node. Add replace comments with your SVG file.  

### API
Available topics:
- `unique_id`+`@cx_move` - payload is object
- `unique_id`+`@cx_color` - payload is string
- `unique_id`+`@cx_status` - payload is 12 characters string


