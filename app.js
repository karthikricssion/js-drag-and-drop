(function(){
    
    var dropZoneElement = document.querySelector('#dropZone');
    var dropZoneView = {
        width: dropZoneElement.clientWidth,
        height: dropZoneElement.clientHeight,
        el: '',
        mousedown: false,
        x: 0,
        y: 0
    }
    var itemMouseDown = false

    var getRandomIntInclusive = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    };

    var generateItemBoxObj = function() {
        return {
            type: 'div',
            x: getRandomIntInclusive(0, dropZoneView.width - 100),
            y: getRandomIntInclusive(0, dropZoneView.height - 50),
        }
    };

    
    var onMouseDown = function(e) {
        var elementId = (e.target || e.srcElement).id;
        var el = document.querySelector('#'+elementId)
        dropZoneView.mousedown = true; 
        // dropZoneView.x = el.offsetLeft - e.clientX; 
        // dropZoneView.y = el.offsetTop - e.clientY; 

        // console.log('mouse down', dropZoneView.x, dropZoneView.y )
        debugger
        console.log("x: "+el.offsetLeft+", y: "+el.offsetTop+" x': "+e.clientX+" y': "+e.clientY)
    };

    var onMouseMove = function(e) {
        if(dropZoneView.mousedown) {
            console.log('Hello')
        }
    };

    var onMouseUp = function(e) {
        dropZoneView.mousedown = false
    };

    var addInitialItemsToDropZoneByLength = function(len) {
        for(var i = 0; i < len; i++) {
            let itemBox = generateItemBoxObj()
            if(itemBox.type === 'div') {
                let sNo = i + 1
                let divElement = document.createElement('div')
                divElement.className = 'item'
                divElement.id = 'item-'+sNo
                divElement.style.left = itemBox.x+'px';
                divElement.style.top = itemBox.y+'px';
                divElement.style.zIndex = sNo
                divElement.innerText = sNo

                divElement.addEventListener('mousedown', onMouseDown)
                dropZoneElement.addEventListener('mousemove', onMouseMove)
                divElement.addEventListener('mouseup', onMouseUp)

                dropZoneElement.appendChild(divElement)
            }
        }
    };

    // var onDrop = function(e) {
    //     console.log('Dragging Drop')
    // }

    // var onDragEnter = function(e) {
    //     console.log('Dragging Enter')
    // }

    // var onDragLeave = function(e) {
    //     console.log('Dragging Leave')
    // }

    // var onDragOver = function(e) {
    //     console.log('Dragging over')
    // }

    // dropZoneElement.addEventListener('drop', onDrop);
    // dropZoneElement.addEventListener('dragenter', onDragEnter);
    // dropZoneElement.addEventListener('dragleave', onDragLeave);
    // dropZoneElement.addEventListener('dragover', onDragOver);
    
    addInitialItemsToDropZoneByLength(10)

})()