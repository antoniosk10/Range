class Range {
    constructor(options) {
        if (options.containerClass && options.maxValue && options.minValue && options.inputMaxValue && options.inputMinValue) {
            this.containerClass = options.containerClass;
            this.maxValue = options.maxValue;
            this.minValue = options.minValue;
            this.inputMaxValue = document.querySelector(options.inputMaxValue);
            this.inputMinValue = document.querySelector(options.inputMinValue);
            this.callback = options.callback;
            this.init();
        } else {
            throw Error("Error init Range");
        }
    }

    init() {
        this.appendLayoutRange(this.containerClass);
        this.addEventMouseDownToToggle(this.toggleLeft, this.inputMinValue, "left");
        this.addEventMouseDownToToggle(this.toggleRight, this.inputMaxValue, "right");
    }

    appendLayoutRange(containerClass) {
        const container = document.querySelector("." + containerClass);
        container.append(this.createLayoutRange());
    }

    createLayoutRange() {
        this.field = document.createElement("div");
        this.toggleLeft = document.createElement("div");
        this.toggleRight = document.createElement("div");

        this.field.classList.add("range-field");
        this.toggleLeft.classList.add("range-toggle", "range-toggle--left");
        this.toggleRight.classList.add("range-toggle", "range-toggle--right");
        this.field.append(this.toggleLeft, this.toggleRight);
        return this.field;
    }

    addEventMouseDownToToggle(toggle, input, side) {
        const _this = this;
        toggle.onmousedown = function(event) {
            event.preventDefault();
            const shiftWidthToggle = toggle.offsetWidth / 2;
            let shiftX = event.clientX - toggle.getBoundingClientRect().left;

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

            function onMouseMove(event) {

                let newLeft = event.clientX - shiftX - _this.field.getBoundingClientRect().left - shiftWidthToggle;

                if (newLeft < -shiftWidthToggle) {
                    newLeft = -shiftWidthToggle;
                }
                let rightEdge = _this.field.offsetWidth - toggle.offsetWidth + shiftWidthToggle;
                if (newLeft > rightEdge) {
                    newLeft = rightEdge;
                }

                if (side === "left") {

                    if (newLeft + toggle.offsetWidth < _this.toggleRight.offsetLeft) {
                        toggle.style.left = newLeft + 'px';
                    }
                } else {
                    if (newLeft > _this.toggleLeft.offsetLeft + toggle.offsetWidth) {
                        toggle.style.left = newLeft + 'px';
                    }
                }

                _this.calcValue(toggle, input);
            }

            function onMouseUp() {
                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('mousemove', onMouseMove);
                if (_this.callback) _this.callback();

            }

        };
    }

    calcValue(elem, input) {
        input.value = Math.round(((elem.offsetLeft + (elem.offsetWidth / 2)) * this.maxValue) / this.field.offsetWidth);
    }

}