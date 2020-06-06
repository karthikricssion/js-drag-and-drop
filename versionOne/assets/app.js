(function(){
    
    var dropZoneElement = document.querySelector('#dropZone');
    var dropZoneView = {
        width: dropZoneElement.clientWidth,
        height: dropZoneElement.clientHeight,
        selectedItem: {
            el: '',
            mousedown: false,
            x: 0,
            y: 0
        }
    }

    var getRandomIntInclusive = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var generateItemBoxObj = function(type, x, y) {
        return {
            type: type || 'div',
            x: x || getRandomIntInclusive(0, dropZoneView.width - 100),
            y: y || getRandomIntInclusive(0, dropZoneView.height - 50),
        }
    };

    var onMouseDown = function(e) {
        let elementId = (e.target || e.srcElement).id;
        let el = document.querySelector('#'+elementId)

        dropZoneView.selectedItem.el = el
        dropZoneView.selectedItem.mousedown = true; 
        dropZoneView.selectedItem.x = (dropZoneElement.offsetLeft + el.offsetLeft) - e.clientX; 
        dropZoneView.selectedItem.y = el.offsetTop - e.clientY;
    };

    var onMouseMove = function(e) {
        if(dropZoneView.selectedItem.mousedown) {
            let selectedItem = dropZoneView.selectedItem.el
            let ItemWidth = selectedItem.clientWidth 
            let ItemHeight = selectedItem.clientHeight
            let ItemLeftPos = (e.clientX - dropZoneElement.offsetLeft)  + dropZoneView.selectedItem.x
            let ItemTopPos = e.clientY + dropZoneView.selectedItem.y
            
            // check whether the item box is not 
            // going out of dropzone
            if(ItemLeftPos >= 0 && (ItemLeftPos + ItemWidth) <= dropZoneView.width) {
                selectedItem.style.left = ItemLeftPos + 'px'; 
            }

            if( ItemTopPos >= 0 && (ItemTopPos + ItemHeight) <= dropZoneView.height) {
                selectedItem.style.top =  ItemTopPos + 'px'; 
            }
        }
    };

    var onMouseUp = function(e) {
        dropZoneView.selectedItem.mousedown = false
    };

    var addItemToDropZone = function(sNo, itemBox) {
        let divElement = document.createElement('div')
        divElement.className = 'item'
        divElement.id = 'item-'+sNo
        divElement.style.left = itemBox.x+'px';
        divElement.style.top = itemBox.y+'px';
        divElement.style.zIndex = sNo
        divElement.innerText = sNo

        divElement.addEventListener('mousedown', onMouseDown)
        divElement.addEventListener('mouseup', onMouseUp)
        divElement.addEventListener('mouseout', onMouseUp)
        dropZoneElement.appendChild(divElement)
    }

    var addInitialItemsToDropZoneByLength = function(len) {
        for(var i = 0; i < len; i++) {
            let itemBox = generateItemBoxObj()
            if(itemBox.type === 'div') {
                let sNo = i + 1
                addItemToDropZone(sNo, itemBox)
            }
        }
    };

    
    var onDrop = function(e) {
        e.preventDefault()
        e.stopPropagation();
        
        console.log(e.clientX)

        let itemBox = generateItemBoxObj('div', (e.clientX - dropZoneElement.offsetLeft) , e.clientY)
        if(itemBox.type === 'div') {            
            let sNo = document.querySelectorAll('.item').length + 1
            addItemToDropZone(sNo, itemBox)
        }
    }

    var onDragEnter = function(e) {
        e.preventDefault()
        e.stopPropagation();

        console.log('Dragging Enter')
    }

    var onDragLeave = function(e) {
        e.preventDefault()
        e.stopPropagation();
        console.log('Dragging Leave')
    }

    var onDragOver = function(e) {
        e.preventDefault()
        e.stopPropagation();
        // console.log('Dragging over', e)
    }

    var onButtonEleDragStart = function(e) {
        let overLayDiv = document.createElement('div')
        overLayDiv.className = 'overlay-mask'
        dropZoneElement.appendChild(overLayDiv)
    }

    var onButtonEleDragEnd = function(e) {
        dropZoneElement.removeChild(document.querySelector('.overlay-mask'))
    }

    var buttonEle = document.querySelector('#buttonElement')
    buttonEle.addEventListener('dragstart', onButtonEleDragStart)
    buttonEle.addEventListener('dragend', onButtonEleDragEnd)

    dropZoneElement.addEventListener('drop', onDrop);
    dropZoneElement.addEventListener('dragenter', onDragEnter);
    dropZoneElement.addEventListener('dragleave', onDragLeave);
    dropZoneElement.addEventListener('dragover', onDragOver);

    dropZoneElement.addEventListener('mousemove', onMouseMove)
    
    addInitialItemsToDropZoneByLength(10)

})()