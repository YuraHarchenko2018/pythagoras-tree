class Tree {

    constructor() {
        this.canvas = document.querySelector('#ctx')
        this.Drange = document.querySelector('#set_degr')
        this.ctx = this.canvas.getContext('2d')
        this.ctx.lineWidth = 1       // толщина линии
        this.ctx.fillStyle = 'black' // цвет    линии
        
        this.degrBase = 45
        this.degr = this.degrBase * 2

        this.set_default()
        this.handleRange()
    }

    set_default() {
        this.length = 160
        
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
        this.ctx.moveTo(this.baseX, this.baseY); //передвигаем перо
        this.ctx.lineTo(this.lineX, this.lineY); //рисуем линию

        for (let i = 0; i < 10; i++) {
            this.new_createBranch('right')
        }

        this.set_default()
        this.ctx.moveTo(this.lineX, this.lineY); //передвигаем перо
        this.degr = this.degrBase * 2

        for (let i = 0; i < 10; i++) {
            this.new_createBranch('left')
        }

        this.ctx.stroke()
        this.ctx.closePath()
    }

    new_createBranch(directionStatus) {
        this.degr -= this.degrBase
        if(this.degr <= 0) this.degr = 360 + this.degr

        if(this.degr > 0 && this.degr < 90) {
            if(directionStatus == 'right') {
                this.do_1_section()
            }
            if(directionStatus == 'left') {
                this.do_2_section()
            }
        }
        if(this.degr > 90 && this.degr < 180) {
            if(directionStatus == 'right') {
                this.do_2_section()
            }
            if(directionStatus == 'left') {
                this.do_1_section()
            }
        }
        if(this.degr > 180 && this.degr < 270) {
            if(directionStatus == 'right') {
                this.do_3_section()
            }
            if(directionStatus == 'left') {
                this.do_4_section()
            }
        }
        if(this.degr > 270 && this.degr < 360) {
            if(directionStatus == 'right') {
                this.do_4_section()
            }
            if(directionStatus == 'left') {
                this.do_3_section()
            }
        }

        if(this.degr == 90)  this.lineY -= this.length
        if(this.degr == 180) this.lineX -= this.length
        if(this.degr == 270) this.lineY += this.length
        if(this.degr == 360) this.lineX += this.length

        this.length = this.length / 2

        this.ctx.lineTo(this.lineX, this.lineY)

    }

    do_1_section() {
        let degr = this.degr
        let radian = degr * Math.PI / 180
    
        // if turn right
        let sin = Math.sin(radian)
        let cos = Math.cos(radian)
        let yLength = this.length * sin
        let xLength = this.length * cos
        
        this.lineX += xLength
        this.lineY -= yLength
    }

    do_2_section() {
        let degr = this.degr - 90
        let radian = degr * Math.PI / 180
    
        // if turn right
        let sin = Math.sin(radian)
        let cos = Math.cos(radian)
        let xLength = this.length * sin
        let yLength = this.length * cos
        
        this.lineX -= xLength
        this.lineY -= yLength
    }

    do_3_section() {
        let degr = this.degr - 180
        let radian = degr * Math.PI / 180
    
        // if turn right
        let sin = Math.sin(radian)
        let cos = Math.cos(radian)
        let yLength = this.length * sin
        let xLength = this.length * cos
        
        this.lineX -= xLength
        this.lineY += yLength
    }

    do_4_section() {
        let degr = this.degr - 270
        let radian = degr * Math.PI / 180
    
        // if turn right
        let sin = Math.sin(radian)
        let cos = Math.cos(radian)
        let xLength = this.length * sin
        let yLength = this.length * cos
        
        this.lineX += xLength
        this.lineY += yLength
    }

}

const Tree_ex = new Tree()
      Tree_ex.makeTree()