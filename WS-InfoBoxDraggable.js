interact('.draggable')

.draggable({
           inertia: false,
           restrict: {
           restriction: "parent",
           endOnly: true,
           elementRect: {top: 0, left: 0, bottom: 1, right: 1}
           }
})

