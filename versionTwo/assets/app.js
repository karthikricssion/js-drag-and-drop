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

    var droppedItems = []
    var dropZoneElement = document.querySelector('#dropZone')

    var onDragStart = function(e) {
        // this.classList.add('on-drag-start')
        // event.dataTransfer.setDragImage(this, e.clientX, e.clientY);

        e.dataTransfer.setData('text/plain', this.getAttribute('data-type'));
        
        // console.log(
        //     'width:' + this.offsetWidth + ', Height:' + this.offsetHeight, 
        //     'page: ' + e.pageX + ',' + e.pageY,
        //     'client: ' + e.clientX + ',' + e.clientY,
        //     'screen: ' + e.screenX + ',' + e.screenY)
    }

    var onDragEnd = function(e) {
        // this.classList.remove('on-drag-start')
    }

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
    }

    var itemTemplate = function(id, type, pos) {
        var droppedItem = getFormElementByType(type)
        droppedItem['id'] = 'item'+id

        var itemEle = document.createElement('div')
        itemEle.classList.add('form-item')
        itemEle.id = 'item'+id


        itemEle.appendChild(itemChildTempate(type))
        droppedItems.push(droppedItem)
        
        return itemEle
    }

    var getDropPosition = function($this, e) {
        console.log($this.offsetLeft, e.clientX)
    }
    
    dropZoneElement.addEventListener('drop', function(e) {
        e.preventDefault();
        debugger

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