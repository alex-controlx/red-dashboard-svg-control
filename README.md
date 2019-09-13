# Controlled SVG from Node-RED Dashboard Template

This is testing environment for checking SVG content and script before importing it into Template. By cloning and 
running `npm start` will have a result shown in the [video](https://youtu.be/_w8A3yhw0vA). Recommend cloning for 
contribution only. 

To use controllable SVG components in Template of Node-RED Dashboard follow the instructions below.  

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
Copy and paste text from [ui_template.html](https://github.com/Alex-OPTIM/red-dashboard-svg-control/blob/master/app/view1/ui_template.html) 
into Dashboard Template node. Add your SVG file content between `<!-- SVG FILE CONTENT BELOW -->` 
and `<!-- SVG FILE CONTENT ABOVE -->`. Now by sending `payload` with `topic` (which equals previously set ID) to 
the Template node will animate your SVG content.

### API
Available topics:
- `unique_id`+`@cx_move` - payload is object
- `unique_id`+`@cx_color` - payload is string
- `unique_id`+`@cx_status` - payload is 12 characters string

### TODO
- Add `@cx_visible` into APIs

