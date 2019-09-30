# Controlled SVG from Node-RED Dashboard Template

This is testing environment for checking SVG content and script before importing it into Template. By cloning and 
running `npm start` will have a result shown in the [video](https://youtu.be/_w8A3yhw0vA). Latest screenshot
is [here](https://github.com/Alex-OPTIM/red-dashboard-svg-control/blob/master/screenshots/localhost_8000_190930.png).

Recommend cloning for contribution only. 

To use controllable SVG components in Template of Node-RED Dashboard follow the instructions below.  

... WORK IN PROGRESS but already usable ...

### SVG
Create SVG image in third party software. I used [Boxy SVG](https://boxy-svg.com/) (not sure if there is a 
free version). If using Boxy SVG click Elements tab at the bottom or open the created SVG file with a text 
editor (eg. [Visual Studio Code](https://code.visualstudio.com/download)). Find element you want to 
animate and add two attributes: `id` and `cx-type`. See an example below where attributes
are `id="pump_P101A"` and `cx-type="cx_color"`

`<path id="pump_P101A" cx-type="cx_color" d="M 1018 600 C 1018 609.941 Z" style="fill: rgb(216, 216, 216);">`

The `id` attribute is an unique identifier. `cx-type` is a set of types which describes element's
animation. Separate types with a comma `,` to add different types of animation. For example
`cx-type="cx_color,cx_hide"`

#### `cx-type` applicability (not all tags tested yet)
- `cx_move` is for groups `<g>`, lines `<line>` and text tags `<text>`. It doesn't work with 
paths `<path>`. Wrap paths into a group for `cx_move`.
- `cx_color` is for paths `<path>`, shapes `<rect> <circle> <ellipse> <polygon>` and text tags `<text>`.
It doesn't work with groups `<g>` nor lines `<line>`.
- `cx_status` is for texts `<text>` and tspan `<tspn>` only (without nested tags).
- `cx_hide` is for any tag.


### Importing to UI Template
Copy and paste text from [ui_template.html](https://github.com/Alex-OPTIM/red-dashboard-svg-control/blob/master/app/view1/ui_template.html) 
into Dashboard Template node. Add your SVG file content between `<!-- SVG FILE CONTENT BELOW -->` 
and `<!-- SVG FILE CONTENT ABOVE -->`. Now by sending `payload` with `topic` (which equals previously set ID) to 
the Template node will animate your SVG content.

### API
Type of Node-RED message payload with the following topics:
- `cx_move`+`@unique_id` payload is an object;
- `cx_color`+`@unique_id` - payload is a string;
- `cx_status`+`@unique_id` - payload is 12 characters string;
- `cx_hide`+`@unique_id` - payload is a boolean (true or false).

### TODO
- Add an example of usage in UI Template (Node-RED).

