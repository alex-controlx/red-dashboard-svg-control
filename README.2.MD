### Documentation is incomplete but the ui_template version 2 is usable, leave your question at [Issues](https://github.com/alex-controlx/red-dashboard-svg-control/issues) and I'll update the documentation as we go. 

## CHANGES
A number of changes from v.1:
 - Using [vecta.io](https://vecta.io/) for creating SVG graphics. 
 - SVG element can have a multiple nested elements under one ID
 - `click` listener added
 - This approach is incompatible with version 1

### SVG
Targeted element in SVG has to have two attributes:
 - `cx-id` for unique ID of element
 - `cx-class` for type of animation/control
The classes could be separated by comma `,` or nested under same id:
```svg
<g cx-id="run_button" cx-class="click,hide" v:json="{&quot;payload&quot;:true,&quot;topic&quot;:&quot;button clicked&quot;}">
    <title>Button</title>
    <rect cx-class="color" x="750.138" y="66.459" width="203.142" height="66.336" style="fill: rgb(53, 117, 195);"></rect>
    <text cx-class="status" style="fill: rgb(255, 255, 255); font-size: 31px; font-weight: 700; paint-order: stroke; white-space: pre;" x="820.52" y="108.872">RUN</text>
</g>
```

There are six cx-classes:
```
"move" | "color" | "status" | "hide" | "stroke" | "click"
```
When used `click` the HTML tag has to have `v:json` attribute with JSON formatted Node-RED message.
If the attribute is a string then it will be sent as the payload with . 

**If using [vecta.io](https://vecta.io/) as your SVG editor**:
 - To add `v:json`: Right-click => Tools => Custom JSON
 - To add `cx-id` and `cx-class` with : Right-click => Tools => Custom Events


### Importing to UI Template
Copy and paste text from [ui_template.html](https://github.com/Alex-OPTIM/red-dashboard-svg-control/blob/master/app/view2/ui_template_v2.html)
into Dashboard Template node. Add your SVG file content between `<!-- SVG FILE CONTENT BELOW -->`
and `<!-- SVG FILE CONTENT ABOVE -->`. Now by sending `payload` with `topic` (which equals previously set ID) to
the Template node will animate your SVG content.


### API
APIs haven't changed from version 1, below it represented in typescript.  
Type of Node-RED message payload with the following topics:
```typescript
interface movePayload {
  x: number,
  y: number,
  deg: number,
  // pivot parameters are 0 to 1 and it is relative to its container. For example,
  // to rotate a 10x10 pixel box with a pivot in the centre,
  // it needs to be `pivot: [0.5, 0.5]` or for a pivot in the right bottom
  // corner `pivot: [1, 1]`
  pivot: [number, number]
}

type colorPayload = string // colour in hex

type statusPayload = string

type hidePayload = boolean

interface strokePayload {
  // Both attributes are optional, so
  // stroke can have predefined color and width can be dynamic to create flashing effect.
  color: string,
  width: number
}

type cxClass = "move" | "color" | "status" | "hide" | "stroke" | "click"
type cxTopic = "uniqueId@" & cxClass
```

Node-RED message and payload structure:
```typescript
interface svgControlObject {
  payload: movePayload | colorPayload | statusPayload | hidePayload | strokePayload,
  topic: cxTopic
}

msg = svgControlObject | { payload: svgControlObject[] }
```