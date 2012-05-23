if( !self['airwar'] )
{
    self['airwar'] = {};
}
if( airwar.Util == undefined  )
{
    airwar.Util = {};
}

airwar.Util.Package = function(namespaceString) {
    var parts = namespaceString.split('.'),
        parent = window,
        currentPart = '';

    for (var i = 0, length = parts.length; i < length; i++) {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || {};
        parent = parent[currentPart];
    }

    return parent;
}