(function() {
    var formElements = [
        {
            type: 'text',
            label: 'Header',
            imageIconName: 'heading'
        },
        {
            type: 'inputText',
            label: 'Text Field',
            imageIconName: 'text-input'
        },
        {
            type: 'button',
            label: 'Button',
            imageIconName: 'button'
        }
    ]

    var dropItemMeasurement = {
        width: 234,
        height: 45
    }
    var droppedItems = []
    var dropZoneElement = document.querySelector('#dropZone')

    var onDragStart = function(e) {
        var selectedDivBoundingBox = this.getBoundingClientRect()
        e.dataTransfer.setData('text/plain', JSON.stringify({
            isNew: true,
            type: this.getAttribute('data-type'),
            mousePosition: {
                y: (selectedDivBoundingBox.height - ((selectedDivBoundingBox.top + selectedDivBoundingBox.height) - e.clientY)),
                x: (selectedDivBoundingBox.width -  ((selectedDivBoundingBox.left + selectedDivBoundingBox.width ) - e.clientX))
            }
        }));

        // console.log(
        //     'page: ' + e.pageX + ',' + e.pageY,
        //     'client: ' + e.clientX + ',' + e.clientY,
        //     'screen: ' + e.screenX + ',' + e.screenY
        // )
    };

    var onDragEnd = function(e) {
        // this.classList.remove('on-drag-start')
    };

    var createFormElements = function() {
        let formElementDiv = document.querySelector('#formElements')
        let createListHolderElement = document.createElement('ul')
        createListHolderElement.classList.add('form-control-box')

        formElements.forEach((item) => {
            let createListElement = document.createElement('li')
            createListElement.setAttribute("data-type", item.type);

            let createImageElement = document.createElement('img')
            createImageElement.classList.add('img-responsive')
            createImageElement.src = './assets/'+ item.imageIconName +'.png'

            let createSpanElement = document.createElement('span')
            createSpanElement.innerText = item.label

            createListElement.draggable = true

            createListElement.addEventListener('dragstart', onDragStart)
            createListElement.addEventListener('dragend', onDragEnd)

            createListElement.appendChild(createImageElement)
            createListElement.appendChild(createSpanElement)
            createListHolderElement.appendChild(createListElement)
        })

        formElementDiv.appendChild(createListHolderElement)
    };

    var getFormElementByType = function(type) {
        return formElements.find((item => item.type === type))
    };

    var getItemById = function(id) {
        return droppedItems.find((item => item.id === id))
    }

    var itemChildTempate = function(type) {
        var childEle;
        if(type === 'text') {
            childEle = document.createElement('label')
            childEle.innerText = 'Header'
        } else if(type === 'inputText') {
            childEle = document.createElement('input')
            childEle.type = 'text'
        } else {
            childEle = document.createElement('button')
            childEle.innerText = 'Button'
        }

        return childEle
    };

    var positionDropedItem = function(itemEle, itemPos, droppedBoxPos, droppedItem) {
        var xPosition = (droppedBoxPos.x - itemPos.x)
        var yPosition = (droppedBoxPos.y - itemPos.y )

        if(xPosition < 0) {
            xPosition = 8
        } else if((xPosition + dropItemMeasurement.width) > droppedBoxPos.width) {
            xPosition = droppedBoxPos.width - dropItemMeasurement.width - 8
        }

        if(yPosition < 0) {
            yPosition = 8
        } else if((yPosition + dropItemMeasurement.height) > droppedBoxPos.height) {
            yPosition = droppedBoxPos.height - dropItemMeasurement.height - 8
        }

        itemEle.style.left = xPosition + 'px'
        itemEle.style.top =  yPosition + 'px'

        droppedItem['pos'] = {
            x: xPosition,
            y: yPosition
        }

        droppedItems.push(droppedItem)
        return itemEle
    };

    var onDropZoneItemDragStart = function(e) {
        var selectedDivBoundingBox = this.getBoundingClientRect()
        e.dataTransfer.setData('text/plain', JSON.stringify({
            isNew: false,
            type: this.getAttribute('id'),
            mousePosition: {
                y: (selectedDivBoundingBox.height - ((selectedDivBoundingBox.top + selectedDivBoundingBox.height) - e.clientY)),
                x: (selectedDivBoundingBox.width -  ((selectedDivBoundingBox.left + selectedDivBoundingBox.width ) - e.clientX))
            }
        }));
    };

    var onDropZoneItemDragEnd = function(e) {
        console.log(e)
    }

    var itemTemplate = function(id, data, pos) {
        var selectedItemData = JSON.parse(data)
        if(selectedItemData.isNew) {
            var droppedItem = getFormElementByType(selectedItemData.type)
            droppedItem['id'] = 'item'+id

            var itemEle = document.createElement('div')
            itemEle.draggable = true
            itemEle.classList.add('form-item')
            itemEle.id = 'item'+id

            itemEle.addEventListener('dragstart', onDropZoneItemDragStart)
            itemEle.addEventListener('dragend', onDropZoneItemDragEnd)

            itemEle.appendChild(itemChildTempate(selectedItemData.type))
            return positionDropedItem(itemEle, selectedItemData.mousePosition, pos, droppedItem)
        } else {
            var dragEle = document.querySelector('#'+selectedItemData.type)
            var dragEleData = getItemById(selectedItemData.type)

            return positionDropedItem(dragEle, selectedItemData.mousePosition, pos, dragEleData)
        }
    };

    var getDropPosition = function($this, e) {
        return {
            x: e.clientX - $this.offsetLeft, 
            y: e.clientY - $this.offsetTop,
            width: $this.offsetWidth,
            height: $this.offsetHeight,
            left: $this.offsetLeft,
            top: $this.offsetTop
        }
    };
    
    dropZoneElement.addEventListener('drop', function(e) {
        e.preventDefault();

        this.appendChild(itemTemplate(droppedItems.length + 1, e.dataTransfer.getData('text'), getDropPosition(this, e)))
        e.dataTransfer.clearData();
    });

    dropZoneElement.addEventListener('dragenter', function(e) {
        e.preventDefault();
        // console.log('drop enter')
    });

    dropZoneElement.addEventListener('dragleave', function(e) {
        e.preventDefault();
        // console.log('drop leave')
    });

    dropZoneElement.addEventListener('dragover', function(e) {
        e.preventDefault();
        // console.log('drop over')
    });

    createFormElements()
})()