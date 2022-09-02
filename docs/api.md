# Graph API

All `Graph` options are optional except for `nodes` and `edges`
|Option|Type|Description|
|------|----|-----------|
|`nodes`|`Node[]`|(Req.) List of graph nodes|
|`edges`|`Edge[]`|(Req.) List of edges connecting graph nodes|
|`layoutOptions`|`LayoutOptions`|Layout algorithm options.  See below|

## Graph Layout options
All layout options are optional
|Option|Type|Default|Description|
|------|----|-------|-----------|
|rankdir|string|`'LR'`|Left to right (`'LR'`) or Top to Bottom (`'TB'`)|
|marginx|number|20|left/right margin around graph inside SVG in pixels|
|marginy|number|20|top/bottom margin around graph inside SVG in pixels|
|ranksep|number|55|space between node levels (ranks)|
|nodesep|number|35|space between nodes on same level|

# Node API

# Edge API

# TBD
current markers / shapes and how to use them!