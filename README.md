# Controlled SVG from Node-RED Dashboard Template

### Below is version 1. Check out [version 2](https://github.com/alex-controlx/red-dashboard-svg-control/blob/master/README.2.md)

This is testing environment for checking SVG content and script before importing it into Template. By cloning and 
running `npm start` will have a result shown in the [video](https://youtu.be/_w8A3yhw0vA). Latest screenshot
is [here](https://github.com/Alex-OPTIM/red-dashboard-svg-control/blob/master/screenshots/localhost_8000_190930.png).

Recommend cloning for contribution only. 

To use controllable SVG components in Template of Node-RED Dashboard follow the instructions below.  

If there is a question, leave it in the [Issues section](https://github.com/Alex-OPTIM/red-dashboard-svg-control/issues). 

### SVG
Create SVG image in third party software. I used [Boxy SVG](https://boxy-svg.com/) (not sure if there is a 
free version). If using Boxy SVG click Elements tab at the bottom or open the created SVG file with a text 
editor (eg. [Visual Studio Code](https://code.visualstudio.com/download)). Find element you want to 
animate and add `id` attribute. See an example below where `id` attribute is `id="pump_P101A@cx_color"`

`<path id="pump_P101A@cx_color" d="M 1018 600 C 1018 609.941 Z" style="fill: rgb(216, 216, 216);">`

There are two components of the `id` attribute. The first one is an unique identifier and
the second one is a set of types which describes element's
animation. Separate types with a comma `,` to add different types of animation. For example
`id="pump_P101A@cx_color,cx_hide"`

#### Where to use the types (not all tags tested yet)
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
- `unique_id@`+`cx_move` payload is an object `{x: number, y: number, deg: number, pivot: [number(0 to 1), number(0 to 1)]}`. 
Pivot point parameters are relative to its container. For example, to rotate a 10x10 pixel box with a pivot in the centre,
 it needs to be `pivot: [0.5, 0.5]` or for a pivot in the right bottom corner `pivot: [1, 1]`. 
- `unique_id@`+`cx_color` - payload is a string;
- `unique_id@`+`cx_status` - payload is 12 characters string;
- `unique_id@`+`cx_hide` - payload is a boolean (true or false).
- `unique_id@`+`cx_stroke` - payload is an object `{color: string, width: number}`. Both attributes are optional, so 
stroke can have predefined color and width can be dynamic to create flashing effect. [Example](https://github.com/Alex-OPTIM/red-dashboard-svg-control/blob/master/screenshots/stroke_example.png).

### TODO
- Test and document usage of `payload` as an array of payloads;
- Add an example of usage in UI Template (Node-RED).

