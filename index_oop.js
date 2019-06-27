class Tree {

    constructor() {
        this.canvas = document.querySelector('#ctx')
        this.Drange = document.querySelector('#set_degr')
        this.ctx = this.canvas.getContext('2d')
        this.ctx.lineWidth = 1       // толщина линии
        this.ctx.fillStyle = 'black' // цвет    линии
        
        this.degrBase = 30
        this.degr = this.degrBase

        this.set_default()
        this.handleRange()
    }

    set_default() {
        this.length = 160
        this.step_value = 10
        
        this.baseX = 600
        this.baseY = 720
        
        this.lineX = 600
        this.lineY = 500
    }

    handleRange() {
        this.Drange.addEventListener('mousemove', (e)=>{
            if(e.which == 1) {
                this.rangeFunc(e.target.value)
            }
        }, false)

        this.Drange.addEventListener('change', (e)=>{
                this.rangeFunc(e.target.value)
        }, false)
    }

    rangeFunc(value) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.set_default()

        let degrees_monitor = document.querySelector('.degrees_monitor')
            degrees_monitor.textContent = value

        this.degrBase = value
        this.degr = value
        this.makeTree()
    }

    makeTree() {
        this.ctx.beginPath()
        this.ctx.moveTo(this.baseX, this.baseY); // передвигаем перо
        this.ctx.lineTo(this.lineX, this.lineY); // рисуем линию

        this.direction = 'right'
        for (let i = 0; i < this.step_value; i++) {
            this.new_createBranch(i)
        }

        this.set_default()
        this.ctx.moveTo(this.lineX, this.lineY); // передвигаем перо
        this.degr = this.degrBase

        this.direction = 'left'
        for (let i = 0; i < this.step_value; i++) {
            this.new_createBranch(i)
        }

        this.ctx.stroke()
        this.ctx.closePath()
    }

    new_createBranch(i) {
        let degr_str = String(this.degrBase)
        let coefficient = 1
        if(degr_str.length > 1) {
            coefficient = degr_str.slice(0, 1)
        }
        
        if(i != 0) {
            this.degr -= Number(this.degrBase ) // / coefficient
        } else if(this.degr == 0) {
            this.degr -= Number(this.degrBase ) // / coefficient
        }

        this.count_angle()

        
        this.step_value--
        //this.direction = 'left'
        // for (let i = 0; i < this.step_value; i++) {
        //     this.new_createBranch(i)
        // }

        this.length = this.length / 2
    }

    count_angle() {
        if(this.degr <= 0) this.degr = 360 + this.degr

  
        if(this.degr > 0 && this.degr < 90) {
            this.do_1_section()
        }
        if(this.degr > 90 && this.degr < 180) {
            this.do_2_section()
        }
        if(this.degr > 180 && this.degr < 270) {
            this.do_3_section()
        }
        if(this.degr > 270 && this.degr < 360) {
            this.do_4_section()
        }


        /////////
        if(this.degr == 90)  this.lineY -= this.length

        if(this.degr == 180) {
            if(this.direction == "right") {
                this.lineX -= this.length
            }
            if(this.direction == "left") {
                this.lineX += this.length
            }
        }
        if(this.degr == 270) this.lineY += this.length

        if(this.degr == 360) {
            if(this.direction == "right") {
                this.lineX += this.length
            }
            if(this.direction == "left") {
                this.lineX -= this.length
            }
        }


        this.ctx.lineTo(this.lineX, this.lineY)
    }

    ///////
    do_1_section() {
        let degr = this.degr
        let radian = degr * Math.PI / 180
    
        // if turn right
        let sin = Math.sin(radian)
        let cos = Math.cos(radian)
        let yLength = this.length * sin
        let xLength = this.length * cos
        
        if(this.direction == "right") {
            this.lineX += xLength
            this.lineY -= yLength
        }
        if(this.direction == "left") {
            this.lineX -= xLength
            this.lineY -= yLength
        }
    }

    do_2_section() {
        let degr = this.degr - 90
        let radian = degr * Math.PI / 180
    
        // if turn right
        let sin = Math.sin(radian)
        let cos = Math.cos(radian)
        let xLength = this.length * sin
        let yLength = this.length * cos
        
        if(this.direction == "right") {
            this.lineX -= xLength
            this.lineY -= yLength
        }
        if(this.direction == "left") {
            this.lineX += xLength
            this.lineY -= yLength
        }
    }

    do_3_section() {
        let degr = this.degr - 180
        let radian = degr * Math.PI / 180
    
        // if turn right
        let sin = Math.sin(radian)
        let cos = Math.cos(radian)
        let yLength = this.length * sin
        let xLength = this.length * cos
        
        if(this.direction == "right") {
            this.lineX -= xLength
            this.lineY += yLength
        }
        if(this.direction == "left") {
            this.lineX += xLength
            this.lineY += yLength
        }
    }

    do_4_section() {
        let degr = this.degr - 270
        let radian = degr * Math.PI / 180
    
        // if turn right
        let sin = Math.sin(radian)
        let cos = Math.cos(radian)
        let xLength = this.length * sin
        let yLength = this.length * cos
        
        if(this.direction == "right") {
            this.lineX += xLength
            this.lineY += yLength
        }
        if(this.direction == "left") {
            this.lineX -= xLength
            this.lineY += yLength
        }
    }

}

const Tree_ex = new Tree()
      Tree_ex.makeTree()

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}