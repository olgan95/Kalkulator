import Calculator from "./Calculator";

class DecCalculator extends Calculator {

    changeNumber(root) {
        const input = root.firstElementChild;
        input.contentEditable = true;
        input.focus();
        this.showToolTip("Use plus to see the result")
    }

    constructor(selectorName) {
        super(selectorName);
        this.tooltip = this.$calculatorDOMElement.querySelector(".popover");
    }

    showToolTip(text) {
        this.tooltip.children[1].innerText = text;
        this.tooltip.classList.add("show");
    }

    hideToolTip(){
        this.tooltip.classList.remove("show");
    }

    add(numberX, numberY) {
        let result = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        if (numberX.every(el => {
            return el <= 9 && el >=0 && typeof el ==="number"
        })) {
            for (let i = numberX.length - 1; i >= 0; i--) {

                let carryBit = numberX[i] + numberY[i] + result[i];
                if (carryBit > 9) {
                    result[i] = carryBit-10;
                    result[i - 1] = 1;
                } else {
                    result[i] = carryBit;
                }
            }
            return result;
        } else {
            this.showToolTip("You can use only numbers 0-9")
        }

    }


    initEvents() {
        super.initEvents();
        const operationSign = this.$calculatorDOMElement.querySelector(".operator-bar");
        operationSign.addEventListener("click", event => {
            this.checkNumber()
            if(this.resultNumberArray !== undefined) {
                this.updateResult();
            }
            this.hideToolTip();
        });
    }
}

export default DecCalculator;