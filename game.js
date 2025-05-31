// --- Constantes Globais ---
const LARGURA_TELA = 800;
const ALTURA_TELA = 600;
const FPS = 60;
const PIXEL_SCALE = 4;

const FUNDO_ESPACO = "rgb(10, 10, 25)";
const PRETO_HUD = "rgb(20, 20, 30)";
const BRANCO = "rgb(230, 230, 230)";
const VERDE_JOGADOR = "rgb(0, 255, 128)";
const VERMELHO_ALIEN_PROJETIL = "rgb(255, 80, 80)";
const AZUL_JOGADOR_PROJETIL = "rgb(128, 200, 255)";
const COR_ALIEN_1 = ["rgb(255, 255, 255)", "rgb(200, 255, 200)", "rgb(255, 200, 200)"];
const COR_ALIEN_2 = ["rgb(255, 0, 255)", "rgb(200, 100, 255)", "rgb(255, 100, 200)"];
const COR_ALIEN_3 = ["rgb(255, 255, 0)", "rgb(200, 200, 100)", "rgb(255, 200, 100)"];
const COR_ALIEN_BOSS = ["rgb(255, 50, 50)", "rgb(200, 50, 50)"];
const COR_ALIEN_STEALTH = ["rgb(100, 100, 150)", "rgb(120, 120, 180)"];
const COR_BARREIRA = "rgb(0, 180, 0)";
const COR_EXPLOSAO_1 = ["rgb(255, 165, 0)", "rgb(255, 255, 0)", "rgb(255, 100, 0)"];
const COR_EXPLOSAO_2 = ["rgb(255, 255, 100)", "rgb(255, 200, 50)", "rgb(255, 150, 0)"];
const COR_TEXTO = BRANCO;
const COR_HUD_FUNDO = "rgba(40, 40, 60, 0.78)";
const COR_POWERUP_VIDA = "rgb(0, 255, 0)";
const COR_POWERUP_SHOOT = "rgb(0, 200, 255)";
const COR_POWERUP_SHIELD = "rgb(255, 255, 0)";
const COR_POWERUP_MULTI = "rgb(255, 0, 255)";
const COR_POWERUP_SPEED = "rgb(255, 165, 0)";
const COR_POWERUP_HOMING = "rgb(100, 255, 100)";
const COR_SHIELD = "rgba(100, 200, 255, 0.59)";
const COR_ESCUDO_DOURADO_OVO = "rgba(255, 215, 0, 0.45)";

const COR_ESTRELA_1 = "rgb(200, 200, 220)";
const COR_ESTRELA_2 = "rgb(220, 220, 180)";
const COR_ESTRELA_3 = "rgb(180, 180, 220)";
const THRUSTER_COR_1 = "rgb(255, 100, 0)";
const THRUSTER_COR_2 = "rgb(255, 200, 0)";
const COR_SATURNO_PLANETA = "rgb(224, 208, 160)";
const COR_SATURNO_FAIXA_1 = "rgb(210, 190, 140)";
const COR_SATURNO_FAIXA_2 = "rgb(200, 180, 130)";
const COR_SATURNO_ANEL_EXTERNO = "rgb(200, 180, 140)";
const COR_SATURNO_ANEL_INTERNO = "rgb(160, 140, 110)";
const COR_SATURNO_SOMBRA = "rgba(100, 90, 70, 0.39)";
const COR_COMETA_CABECA = "rgb(220, 255, 255)";
const COR_COMETA_CAUDA_1 = "rgb(180, 220, 255)";
const COR_COMETA_CAUDA_2 = "rgb(100, 150, 220)";
const COR_NEBULA_1 = "rgba(120, 100, 150, 0.31)";
const COR_NEBULA_2 = "rgba(100, 120, 150, 0.24)";
const COR_NEBULA_3 = "rgba(150, 100, 120, 0.20)";


// --- Funções Auxiliares ---
function desenharPixelArt(ctx, pixelMap, cor, posX, posY, escala = PIXEL_SCALE) {
    ctx.fillStyle = cor;
    for (let rIdx = 0; rIdx < pixelMap.length; rIdx++) {
        const row = pixelMap[rIdx];
        for (let cIdx = 0; cIdx < row.length; cIdx++) {
            if (row[cIdx] === '1') {
                ctx.fillRect(posX + cIdx * escala, posY + rIdx * escala, escala, escala);
            }
        }
    }
}

function criarSpritePixelArt(pixelMaps, cor, escala = PIXEL_SCALE, animDelay = 0.5) {
    const frames = [];
    if (!Array.isArray(pixelMaps) || !Array.isArray(pixelMaps[0])) {
        pixelMaps = [pixelMaps];
    }
    for (const pMap of pixelMaps) {
        const mapLargura = pMap[0] ? pMap[0].length * escala : 0;
        const mapAltura = pMap.length * escala;
        const frameCanvas = document.createElement('canvas');
        frameCanvas.width = mapLargura;
        frameCanvas.height = mapAltura;
        const frameCtx = frameCanvas.getContext('2d');
        desenharPixelArt(frameCtx, pMap, cor, 0, 0, escala);
        frames.push(frameCanvas);
    }
    return { frames, animDelay };
}

function screenShake(offset, duration) {
    const shakes = [];
    for (let i = 0; i < duration; i++) {
        shakes.push([
            Math.floor(Math.random() * (offset * 2 + 1)) - offset,
            Math.floor(Math.random() * (offset * 2 + 1)) - offset
        ]);
    }
    return shakes;
}

// --- Pixel Art Sprites ---
const PLAYER_PIXEL_MAP_BASE = [
    "   111   ", "  11111  ", " 1111111 ", "111111111", "1 1 1 1 1", "  1 1 1  ", "   111   ", "         "
];
const PLAYER_THRUSTER_MAPS = [
    { map: ["   111   "], cor: THRUSTER_COR_1 }, { map: ["  11111  "], cor: THRUSTER_COR_2 },
    { map: [" 1111111 "], cor: THRUSTER_COR_1 }, { map: ["  11111  "], cor: THRUSTER_COR_2 },
    { map: ["   111   "], cor: THRUSTER_COR_1 }
];
const ALIEN_1_PIXEL_MAPS = [ ["  1111  ", " 111111 ", "11111111", "11 11 11", "1  11  1"], ["  1111  ", " 111111 ", "11111111", "1 1111 1", " 1 11 1 "] ];
const ALIEN_2_PIXEL_MAPS = [ ["  1111  ", " 111111 ", "11111111", "1 1111 1", "11    11"], ["  1111  ", " 111111 ", "11111111", "11111111", "1 11 11 1"] ];
const ALIEN_3_PIXEL_MAPS = [ ["   111   ", "  11111  ", " 1111111 ", "111111111", "1  1 1  1"], ["   111   ", "  11111  ", " 1111111 ", "111111111", " 1 1 1 1 "] ];
const ALIEN_BOSS_PIXEL_MAPS = [ ["  111111  ", " 11111111 ", "1111111111", "11 1111 11", "1  1111  1"], ["  111111  ", " 11111111 ", "1111111111", "1 111111 1", " 1 1111 1 "] ];
const ALIEN_STEALTH_PIXEL_MAPS = [ ["  11 11  ", " 1111111 ", "11 11 11 ", "1 1  1 1 ", " 1    1  "], ["  11 11  ", " 1111111 ", "11 11 11 ", " 1 11 1  ", "  1  1   "] ];
const LASER_PIXEL_MAPS = [ [" 11 ", "1111", "1111", " 11 "], ["11  ", "1111", "1111", "  11"] ];
const BARREIRA_SEGMENTO_PIXEL_MAP = [ "1111", "1111", "1111" ];
const EXPLOSAO_PIXEL_MAPS = [ [" 1 1 ", "1 1 1", " 1 1 ", "1 1 1"], ["1   1", " 1 1 ", "1 1 1", " 1 1 "], ["11111", "1   1", "1 1 1", "1   1", "11111"], ["1 1 1", " 1 1 ", "1 1 1", " 1 1 ", "1 1 1"] ];
const POWERUP_PIXEL_MAP = [ " 11 ", "1111", "1111", " 11 " ];


// --- Classes ---
class Particle {
    constructor(x, y, cor, speed, angle, lifespan, sizeRange = [1, 3]) {
        this.posX = x;
        this.posY = y;
        this.cor = Array.isArray(cor) ? cor[Math.floor(Math.random() * cor.length)] : cor;
        this.speed = speed;
        this.angle = angle; 
        this.lifespan = lifespan;
        this.currentLife = lifespan;
        this.size = (Math.floor(Math.random() * (sizeRange[1] - sizeRange[0] + 1)) + sizeRange[0]) * PIXEL_SCALE;
    }

    update() {
        this.posX += Math.cos(this.angle) * this.speed;
        this.posY += Math.sin(this.angle) * this.speed;
        this.currentLife--;
        return this.currentLife > 0;
    }

    draw(ctx) {
        const alpha = Math.max(0, this.currentLife / this.lifespan);
        let baseCor = this.cor;
        if (baseCor.startsWith("rgb(")) {
            baseCor = baseCor.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
        } else if (baseCor.startsWith("rgba(")) { 
             baseCor = baseCor.replace(/,[^,]+?\)$/, `, ${alpha})`);
        }
        ctx.fillStyle = baseCor;
        ctx.fillRect(
            Math.floor(this.posX - this.size / 2),
            Math.floor(this.posY - this.size / 2),
            this.size, this.size
        );
    }
}

class Nebula {
    constructor(x, y, size) {
        this.size = size;
        this.image = document.createElement('canvas');
        this.image.width = size;
        this.image.height = size;
        const ctx = this.image.getContext('2d');
        
        const colors = [COR_NEBULA_1, COR_NEBULA_2, COR_NEBULA_3];
        const numCircles = Math.floor(Math.random() * 21) + 20;
        for (let i = 0; i < numCircles; i++) {
            const radius = Math.floor(Math.random() * (size / 4 - size / 10 + 1)) + size / 10;
            const cx = Math.floor(Math.random() * (size - 2 * radius)) + radius;
            const cy = Math.floor(Math.random() * (size - 2 * radius)) + radius;
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fill();
        }
        this.rect = { x: x - size / 2, y: y - size / 2, width: size, height: size, centerx: x, centery: y };
        this.velY = 0.02; 
    }

    update() {
        this.rect.y += this.velY;
        this.rect.centery += this.velY;
        if (this.rect.y > ALTURA_TELA) {
            this.rect.y = -this.size - this.rect.height;
            this.rect.x = Math.floor(Math.random() * (LARGURA_TELA - this.size)) + this.size / 2 - this.rect.width/2;
            this.rect.centerx = this.rect.x + this.rect.width/2;
            this.rect.centery = this.rect.y + this.rect.height/2;
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.rect.x, this.rect.y);
    }
}

class Estrela {
    constructor(camada) {
        this.camada = camada;
        if (this.camada === 0) {
            this.tamanhoPixel = 1;
            this.velocidade = 0.2;
            this.corBase = COR_ESTRELA_3;
            this.chancePulsar = 0.001;
        } else if (this.camada === 1) {
            this.tamanhoPixel = Math.random() < 0.5 ? 1 : 2;
            this.velocidade = 0.5;
            this.corBase = COR_ESTRELA_2;
            this.chancePulsar = 0.004;
        } else {
            this.tamanhoPixel = Math.random() < 0.5 ? 2 : 3;
            this.velocidade = 0.8;
            this.corBase = COR_ESTRELA_1;
            this.chancePulsar = 0.01;
        }
        this.corAtual = this.corBase;
        this.width = this.tamanhoPixel * PIXEL_SCALE;
        this.height = this.tamanhoPixel * PIXEL_SCALE;
        this.x = Math.floor(Math.random() * LARGURA_TELA);
        this.y = Math.floor(Math.random() * ALTURA_TELA);
        this.pulsando = false;
        this.duracaoPulsar = Math.floor(Math.random() * 5) + 3; 
        this.timerPulsar = 0;
        this.alpha = 1.0;
    }

    update() {
        this.y += this.velocidade;
        if (this.y > ALTURA_TELA) {
            this.x = Math.floor(Math.random() * LARGURA_TELA);
            this.y = Math.floor(Math.random() * (-20 * PIXEL_SCALE + 5 * PIXEL_SCALE + 1)) - 5 * PIXEL_SCALE;
            if (this.camada === 1) this.tamanhoPixel = Math.random() < 0.5 ? 1 : 2;
            else if (this.camada === 2) this.tamanhoPixel = Math.random() < 0.5 ? 2 : 3;
            this.width = this.tamanhoPixel * PIXEL_SCALE;
            this.height = this.tamanhoPixel * PIXEL_SCALE;
        }

        if (this.pulsando) {
            this.timerPulsar--;
            if (this.timerPulsar <= 0) {
                this.pulsando = false;
                this.alpha = 1.0;
            } else {
                this.alpha = [0.31, 0.47, 0.7, 1.0][Math.floor(Math.random() * 4)]; 
            }
        } else if (Math.random() < this.chancePulsar) {
            this.pulsando = true;
            this.timerPulsar = this.duracaoPulsar;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.corAtual;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}

class Planeta {
    constructor(x, y) {
        this.raioPlaneta = 20 * PIXEL_SCALE;
        this.anelLargura = 50 * PIXEL_SCALE;
        this.anelAltura = 10 * PIXEL_SCALE;
        this.imageLargura = this.anelLargura + 4 * PIXEL_SCALE;
        this.imageAltura = this.raioPlaneta * 2 + this.anelAltura;

        this.image = document.createElement('canvas');
        this.image.width = this.imageLargura;
        this.image.height = this.imageAltura;
        const pCtx = this.image.getContext('2d');

        const centroX = this.imageLargura / 2;
        const centroY = this.imageAltura / 2;

        for (let yOffset = centroY - this.anelAltura / 2; yOffset < centroY; yOffset += PIXEL_SCALE/2) {
            const normalizedY = (yOffset - centroY) / (this.anelAltura / 2);
            if (Math.abs(normalizedY) > 1) continue;
            const width = this.anelLargura * Math.sqrt(1 - normalizedY * normalizedY);
            const xStart = centroX - width / 2;
            let color;
            if (yOffset < centroY - this.anelAltura / 4) color = COR_SATURNO_ANEL_EXTERNO;
            else if (yOffset < centroY - this.anelAltura / 5) continue; 
            else color = COR_SATURNO_ANEL_INTERNO;
            pCtx.strokeStyle = color;
            pCtx.lineWidth = PIXEL_SCALE;
            pCtx.beginPath();
            pCtx.moveTo(xStart, yOffset);
            pCtx.lineTo(xStart + width, yOffset);
            pCtx.stroke();
        }

        for (let yOffset = centroY - this.raioPlaneta; yOffset < centroY + this.raioPlaneta; yOffset+=PIXEL_SCALE/2) {
            const normalizedY = (yOffset - centroY) / this.raioPlaneta;
            if (Math.abs(normalizedY) > 1) continue;
            const width = 2 * this.raioPlaneta * Math.sqrt(1 - normalizedY * normalizedY);
            const xStart = centroX - width / 2;
            let color;
            if (Math.abs(yOffset - centroY) < this.raioPlaneta / 3) color = COR_SATURNO_FAIXA_1;
            else if (Math.abs(yOffset - centroY) < 2 * this.raioPlaneta / 3) color = COR_SATURNO_FAIXA_2;
            else color = COR_SATURNO_PLANETA;
            pCtx.strokeStyle = color;
            pCtx.lineWidth = PIXEL_SCALE;
            pCtx.beginPath();
            pCtx.moveTo(xStart, yOffset);
            pCtx.lineTo(xStart + width, yOffset);
            pCtx.stroke();
        }

        const shadowYStart = centroY - this.raioPlaneta / 2;
        for (let yOffset = shadowYStart; yOffset < shadowYStart + this.raioPlaneta / 4; yOffset+=PIXEL_SCALE/4) {
            const normalizedY = (yOffset - centroY) / this.raioPlaneta;
            if (Math.abs(normalizedY) > 1) continue;
            const width = 2 * this.raioPlaneta * Math.sqrt(1 - normalizedY * normalizedY);
            const xStart = centroX - width / 2;
            pCtx.strokeStyle = COR_SATURNO_SOMBRA;
            pCtx.lineWidth = PIXEL_SCALE / 2;
            pCtx.beginPath();
            pCtx.moveTo(xStart, yOffset);
            pCtx.lineTo(xStart + width, yOffset);
            pCtx.stroke();
        }
        
        for (let yOffset = centroY; yOffset < centroY + this.anelAltura / 2; yOffset+=PIXEL_SCALE/2) {
            const normalizedY = (yOffset - centroY) / (this.anelAltura / 2);
             if (Math.abs(normalizedY) > 1) continue;
            const width = this.anelLargura * Math.sqrt(1 - normalizedY * normalizedY);
            const xStart = centroX - width / 2;
            let color;
            if (yOffset > centroY + this.anelAltura / 4) color = COR_SATURNO_ANEL_EXTERNO;
            else if (yOffset > centroY + this.anelAltura / 5) continue; 
            else color = COR_SATURNO_ANEL_INTERNO;
            pCtx.strokeStyle = color;
            pCtx.lineWidth = PIXEL_SCALE;
            pCtx.beginPath();
            pCtx.moveTo(xStart, yOffset);
            pCtx.lineTo(xStart + width, yOffset);
            pCtx.stroke();
        }

        this.rect = { x: x - this.imageLargura / 2, y: y - this.imageAltura / 2, width: this.imageLargura, height: this.imageAltura };
        this.velocidadeY = 0.05; 
    }

    update() {
        this.rect.y += this.velocidadeY;
        if (this.rect.y > ALTURA_TELA) {
            this.rect.y = -this.imageAltura;
            this.rect.x = Math.floor(Math.random() * (LARGURA_TELA - this.imageLargura));
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.rect.x, this.rect.y);
    }
}


class Cometa {
    constructor() {
        this.comprimentoCauda = (Math.floor(Math.random() * 13) + 12) * PIXEL_SCALE; 
        this.imageDim = Math.floor(this.comprimentoCauda * 1.5);
        
        this.image = document.createElement('canvas');
        this.image.width = this.imageDim;
        this.image.height = this.imageDim;
        this.ctx = this.image.getContext('2d');

        this.angle = Math.random() * (Math.PI * 340/180 - Math.PI * 200/180) + Math.PI * 200/180;
        this.speed = (Math.random() * 2.0 + 2.0) * PIXEL_SCALE / 4;
        this.wobble = Math.random() * 0.2 + 0.1;
        
        const startSide = ["top", "left", "right"][Math.floor(Math.random()*3)];
        if (startSide === "top") {
            this.posX = Math.random() * LARGURA_TELA;
            this.posY = -this.imageDim;
        } else if (startSide === "left") {
            this.posX = -this.imageDim;
            this.posY = Math.floor(Math.random() * (ALTURA_TELA / 2));
            this.angle = Math.random() * (Math.PI * 350/180 - Math.PI * 280/180) + Math.PI * 280/180;
        } else { 
            this.posX = LARGURA_TELA + this.imageDim;
            this.posY = Math.floor(Math.random() * (ALTURA_TELA / 2));
            this.angle = Math.random() * (Math.PI * 260/180 - Math.PI * 190/180) + Math.PI * 190/180;
        }
        
        this.rect = { x: Math.floor(this.posX), y: Math.floor(this.posY), width: this.imageDim, height: this.imageDim };
        this.velX = Math.cos(this.angle) * this.speed;
        this.velY = Math.sin(this.angle) * this.speed;
        this.time = 0;
        this.alive = true;
        this._desenharCometa();
    }

    _desenharCometa() {
        this.ctx.clearRect(0, 0, this.imageDim, this.imageDim);
        const cabecaXLocal = this.imageDim / 2;
        const cabecaYLocal = this.imageDim / 2;
        const raioCabeca = 2 * PIXEL_SCALE;

        this.ctx.fillStyle = COR_COMETA_CABECA;
        this.ctx.beginPath();
        this.ctx.arc(cabecaXLocal, cabecaYLocal, raioCabeca, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = BRANCO;
        this.ctx.beginPath();
        this.ctx.arc(cabecaXLocal, cabecaYLocal, raioCabeca / 2, 0, Math.PI * 2);
        this.ctx.fill();

        for (let i = 1; i < Math.floor(this.comprimentoCauda / PIXEL_SCALE); i++) {
            const distDaCabeca = i * PIXEL_SCALE * 0.8;
            const wobbleOffset = Math.sin(this.time + i * 0.5) * this.wobble * PIXEL_SCALE;
            const offsetX = -Math.cos(this.angle) * distDaCabeca + wobbleOffset;
            const offsetY = -Math.sin(this.angle) * distDaCabeca;
            const segmentoX = cabecaXLocal + Math.floor(offsetX);
            const segmentoY = cabecaYLocal + Math.floor(offsetY);
            
            const fatorDiminuicao = (1 - (i * PIXEL_SCALE / this.comprimentoCauda));
            const tamanhoSegmento = Math.max(1 * PIXEL_SCALE, Math.floor((2 * PIXEL_SCALE) * fatorDiminuicao**2));
            const corSegmento = fatorDiminuicao > 0.5 ? COR_COMETA_CAUDA_1 : COR_COMETA_CAUDA_2;
            const alpha = Math.floor(200 * fatorDiminuicao) / 255;

            let corComAlpha = corSegmento;
             if (corComAlpha.startsWith("rgb(")) {
                corComAlpha = corComAlpha.replace("rgb(", "rgba(").replace(")", `, ${alpha.toFixed(2)})`);
            } else if (corComAlpha.startsWith("rgba(")) {
                 corComAlpha = corComAlpha.replace(/,[^,]+?\)$/, `, ${alpha.toFixed(2)})`);
            }
            
            this.ctx.fillStyle = corComAlpha;
            this.ctx.beginPath();
            this.ctx.arc(segmentoX, segmentoY, tamanhoSegmento / 2, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    update() {
        this.time += 0.1;
        this.posX += this.velX;
        this.posY += this.velY;
        this.rect.x = Math.floor(this.posX);
        this.rect.y = Math.floor(this.posY);
        this._desenharCometa();

        if (this.rect.x + this.rect.width < -this.imageDim ||
            this.rect.x > LARGURA_TELA + this.imageDim ||
            this.rect.y + this.rect.height < -this.imageDim ||
            this.rect.y > ALTURA_TELA + this.imageDim) {
            this.alive = false;
        }
    }
    draw(mainCtx) {
        mainCtx.drawImage(this.image, this.rect.x, this.rect.y);
    }
}

class PowerUp {
    constructor(x, y, tipo) {
        this.tipo = tipo;
        const corMap = {
            'vida': COR_POWERUP_VIDA, 'shoot': COR_POWERUP_SHOOT, 'shield': COR_POWERUP_SHIELD,
            'multi': COR_POWERUP_MULTI, 'speed': COR_POWERUP_SPEED, 'homing': COR_POWERUP_HOMING
        };
        this.cor = corMap[tipo];
        const spriteData = criarSpritePixelArt(POWERUP_PIXEL_MAP, this.cor, PIXEL_SCALE);
        this.baseFrame = spriteData.frames[0];
        this.image = this.baseFrame; 
        this.rect = { 
            x: x - this.image.width / 2, y: y - this.image.height / 2, 
            width: this.image.width, height: this.image.height, 
            centerx: x, centery: y 
        };
        this.velY = 2;
        this.pulseTimer = 0;
        this.alive = true;

        this.glowWidth = this.rect.width + 10;
        this.glowHeight = this.rect.height + 10;
        let glowCor = this.cor;
        if (glowCor.startsWith("rgb(")) {
            glowCor = glowCor.replace("rgb(", "rgba(").replace(")", ", 0.39)"); 
        } else if (glowCor.startsWith("rgba(")) {
             glowCor = glowCor.replace(/,[^,]+?\)$/, ", 0.39)");
        }
        this.glowColor = glowCor;
    }

    update() {
        this.rect.y += this.velY;
        this.rect.centery += this.velY;
        
        this.pulseTimer += 0.05;
        const scale = 1 + 0.1 * Math.sin(this.pulseTimer);
        const newWidth = Math.floor(this.baseFrame.width * scale);
        const newHeight = Math.floor(this.baseFrame.height * scale);

        if (this.image.width !== newWidth || this.image.height !== newHeight) {
            this.image = document.createElement('canvas');
            this.image.width = newWidth;
            this.image.height = newHeight;
        }
        const ctx = this.image.getContext('2d');
        ctx.clearRect(0,0,newWidth, newHeight);
        ctx.drawImage(this.baseFrame, 0, 0, newWidth, newHeight);
        
        this.rect.x = this.rect.centerx - newWidth / 2;
        this.rect.width = newWidth;
        this.rect.height = newHeight;

        if (this.rect.y > ALTURA_TELA) {
            this.alive = false;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.rect.x, this.rect.y);
    }
}


class Player {
    constructor(game) { 
        this.game = game; 
        const baseSpriteData = criarSpritePixelArt(PLAYER_PIXEL_MAP_BASE, VERDE_JOGADOR);
        this.baseImage = baseSpriteData.frames[0];
        
        this.thrusterAnimFrames = [];
        PLAYER_THRUSTER_MAPS.forEach(item => {
            const framesData = criarSpritePixelArt(item.map, item.cor);
            this.thrusterAnimFrames.push(framesData.frames[0]);
        });
        this.thrusterFrameAtual = 0;
        this.thrusterAnimDelay = 0.06 * 1000; 
        this.thrusterUltimoUpdate = performance.now();

        this.alturaBase = this.baseImage.height;
        this.alturaThrusterMax = this.thrusterAnimFrames.length > 0 ? Math.max(...this.thrusterAnimFrames.map(f => f.height)) : 0;
        this.larguraTotal = this.baseImage.width;
        this.alturaTotal = this.alturaBase + this.alturaThrusterMax;

        this.image = document.createElement('canvas'); 
        this.image.width = this.larguraTotal;
        this.image.height = this.alturaTotal + PIXEL_SCALE; 
        this.ctx = this.image.getContext('2d');

        this.rect = {
            width: this.larguraTotal, height: this.alturaTotal,
            x: LARGURA_TELA / 2 - this.larguraTotal / 2,
            y: ALTURA_TELA - 20 - this.alturaTotal - 60, 
        };
        this.rect.centerx = this.rect.x + this.rect.width/2;
        this.rect.bottom = this.rect.y + this.rect.height;

        this.velocidadeBase = 8;
        this.cooldownTiroBase = 300; 
        this.cooldownTiro = this.cooldownTiroBase;
        this.ultimoTiro = 0;

        this.shieldActive = false;
        this.shieldDuration = 5000; 
        this.shieldStart = 0;
        this.shieldCooldown = 15000; 
        this.shieldLastUsed = -this.shieldCooldown;

        this.multiShotActive = false;
        this.multiShotDuration = 10000;
        this.multiShotStart = 0;

        this.speedBoostActive = false;
        this.speedBoostDuration = 10000;
        this.speedBoostStart = 0;

        this.homingActive = false;
        this.homingDuration = 10000;
        this.homingStart = 0;
        
        this.particles = []; 
        this.combo = 0;

        this.isHit = false;
        this.hitFlashDuration = 300; 
        this.hitTimer = 0; 
        this.invulnerabilityDuration = 1500; 
        this.invulnerableUntil = 0; 

        this._atualizarImagemComposta();
    }

    // Dentro da classe Player

    // Dentro da classe Player

    _atualizarImagemComposta() {
        this.ctx.clearRect(0, 0, this.image.width, this.image.height);
        const posBaseX = (this.larguraTotal - this.baseImage.width) / 2;
        this.ctx.drawImage(this.baseImage, posBaseX, 0);

        if (this.thrusterAnimFrames.length > 0) {
            const thrusterImgAtual = this.thrusterAnimFrames[this.thrusterFrameAtual];
            const posThrusterX = (this.larguraTotal - thrusterImgAtual.width) / 2;
            const posThrusterY = this.alturaBase;
            this.ctx.drawImage(thrusterImgAtual, posThrusterX, posThrusterY);
        }

        // ---> INÍCIO DO TRECHO DO ESCUDO VISUAL REFINADO <---
        if (this.shieldActive) {
            this.ctx.fillStyle = COR_ESCUDO_DOURADO_OVO; // "rgba(255, 215, 0, 0.45)"
            this.ctx.beginPath();
            
            const centroXElipse = this.image.width / 2;
            const centroYElipse = this.image.height / 2;

            // 1. Definir uma altura visual para o escudo, garantindo que seja maior que a nave.
            //    Adiciona um padding vertical generoso.
            let alturaVisualEscudo = this.alturaTotal + (15 * PIXEL_SCALE); // Ex: 15 pixels de padding em escala

            // 2. Definir uma largura desejada para o escudo para que pareça um ovo (mais estreito que alto).
            //    Por exemplo, 70% da altura visual.
            let larguraDesejadaOvo = alturaVisualEscudo * 0.70;

            // 3. Calcular a largura mínima necessária para cobrir a nave horizontalmente.
            //    Adiciona um padding horizontal mínimo.
            let larguraMinimaCobertura = this.larguraTotal + (8 * PIXEL_SCALE); // Ex: 8 pixels de padding em escala

            // 4. A largura final do escudo será o maior valor entre a largura desejada para o "ovo"
            //    e a largura mínima para cobrir a nave. Isso garante cobertura.
            let larguraFinalEscudo = Math.max(larguraDesejadaOvo, larguraMinimaCobertura);

            // 5. Os raios da elipse são metade dessas dimensões finais.
            let raioHorizontal = larguraFinalEscudo / 2;
            let raioVertical = alturaVisualEscudo / 2; // A altura é a prioritária para o formato "ovo"

            this.ctx.ellipse(
                centroXElipse,
                centroYElipse,
                raioHorizontal,
                raioVertical,
                0,                            // rotação
                0,                            // ângulo inicial
                Math.PI * 2                   // ângulo final
            );
            this.ctx.fill(); 
        }
        // ---> FIM DO TRECHO DO ESCUDO VISUAL REFINADO <---
        
        this.particles.forEach(p => p.draw(this.ctx)); 
    }

    update(keysPressed) { 
        const agora = performance.now();
        const velocidade = this.speedBoostActive ? this.velocidadeBase * 1.5 : this.velocidadeBase;

        if (keysPressed['ArrowLeft'] && this.rect.x > 0) {
            this.rect.x -= velocidade;
        }
        if (keysPressed['ArrowRight'] && this.rect.x + this.rect.width < LARGURA_TELA) {
            this.rect.x += velocidade;
        }
        this.rect.centerx = this.rect.x + this.rect.width/2;
        this.rect.bottom = this.rect.y + this.rect.height;

        if (keysPressed['s'] && !this.shieldActive) { // 's' ou botão de escudo pressionado
            if (agora - this.shieldLastUsed > this.shieldCooldown) {
                this.shieldActive = true;
                this.shieldStart = agora;
                this.shieldLastUsed = agora;
                this.game.playSound('shield_up'); 
            }
        }
        
        if (this.shieldActive && agora - this.shieldStart > this.shieldDuration) {
            this.shieldActive = false;
            this.game.playSound('shield_down'); 
        }
        if (this.multiShotActive && agora - this.multiShotStart > this.multiShotDuration) {
            this.multiShotActive = false;
        }
        if (this.speedBoostActive && agora - this.speedBoostStart > this.speedBoostDuration) {
            this.speedBoostActive = false;
        }
        if (this.homingActive && agora - this.homingStart > this.homingDuration) {
            this.homingActive = false;
        }

        if (this.isHit && (agora - this.hitTimer > this.hitFlashDuration)) {
            this.isHit = false;
        }

        if (agora - this.thrusterUltimoUpdate > this.thrusterAnimDelay) {
            this.thrusterUltimoUpdate = agora;
            this.thrusterFrameAtual = (this.thrusterFrameAtual + 1) % this.thrusterAnimFrames.length;
        }

        if (Math.random() < 0.1) {
            const particleX = this.larguraTotal / 2; 
            const particleY = this.alturaTotal;    
            this.particles.push(new Particle(
                particleX, particleY, THRUSTER_COR_1, 
                Math.random() * 2 + 1, Math.random() * Math.PI + Math.PI/2, 
                20));
        }
        this.particles = this.particles.filter(p => p.update());

        this._atualizarImagemComposta(); 
    }

    atirar(grupoProjetilJogador, aliens) { 
        const agora = performance.now();
        if (agora - this.ultimoTiro > this.cooldownTiro) {
            this.ultimoTiro = agora;
            const posTiroY = this.rect.y + (this.alturaBase * 0.2);
            const posTiroX = this.rect.x + this.larguraTotal / 2;
            this.game.playSound('player_shoot'); 

            if (this.multiShotActive) {
                const offsets = [-15, 0, 15];
                offsets.forEach(offset => {
                    const projetil = new Projetil(posTiroX + offset, posTiroY, AZUL_JOGADOR_PROJETIL, -12, this.homingActive, aliens);
                    grupoProjetilJogador.push(projetil);
                });
            } else {
                const projetil = new Projetil(posTiroX, posTiroY, AZUL_JOGADOR_PROJETIL, -12, this.homingActive, aliens);
                grupoProjetilJogador.push(projetil);
            }
        }
    }
    
    draw(mainCtx) {
        if (this.isHit) {
            if (Math.floor(performance.now() / 80) % 2 === 0) { 
                return; 
            }
        }
        mainCtx.drawImage(this.image, this.rect.x, this.rect.y);
    }

    takeHit() {
        const agora = performance.now();
        if (agora > this.invulnerableUntil) {
            this.isHit = true;
            this.hitTimer = agora;
            this.invulnerableUntil = agora + this.invulnerabilityDuration;
            return true; 
        }
        return false; 
    }
}


class Alien {
    constructor(x, y, tipo, game) { 
        this.game = game; 
        this.tipo = tipo;
        let mapaPixelsData, corBase, animDelayBase, pontosBase, swoopChanceBase;

        switch (tipo) {
            case 1: [mapaPixelsData, corBase, animDelayBase, pontosBase, swoopChanceBase] = [ALIEN_1_PIXEL_MAPS, COR_ALIEN_1, 0.5, 10, 0.1]; break;
            case 2: [mapaPixelsData, corBase, animDelayBase, pontosBase, swoopChanceBase] = [ALIEN_2_PIXEL_MAPS, COR_ALIEN_2, 0.4, 20, 0.15]; break;
            case 3: [mapaPixelsData, corBase, animDelayBase, pontosBase, swoopChanceBase] = [ALIEN_3_PIXEL_MAPS, COR_ALIEN_3, 0.3, 30, 0.2]; break;
            case 4: [mapaPixelsData, corBase, animDelayBase, pontosBase, swoopChanceBase] = [ALIEN_BOSS_PIXEL_MAPS, COR_ALIEN_BOSS, 0.6, 100, 0.05]; break;
            case 5: [mapaPixelsData, corBase, animDelayBase, pontosBase, swoopChanceBase] = [ALIEN_STEALTH_PIXEL_MAPS, COR_ALIEN_STEALTH, 0.5, 15, 0.3]; break;
            default: throw new Error("Tipo de alien inválido");
        }
        
        const cor = Array.isArray(corBase) ? corBase[Math.floor(Math.random() * corBase.length)] : corBase;
        const spriteData = criarSpritePixelArt(mapaPixelsData, cor, PIXEL_SCALE, animDelayBase);
        this.frames = spriteData.frames;
        this.animDelay = spriteData.animDelay * 1000; 
        this.frameAtual = 0;
        this.image = this.frames[0]; 
        this.rect = { x, y, width: this.image.width, height: this.image.height };
        this.ultimoUpdateAnim = performance.now();
        this.pontos = pontosBase;
        this.isSwooping = Math.random() < swoopChanceBase * tipo;
        this.swoopAngle = 0;
        this.swoopSpeed = this.isSwooping ? 2 : 0;
        this.vida = (tipo === 4) ? 3 : 1;
        this.isCloaked = (tipo === 5);
        this.cloakTimer = 0;
        this.cloakInterval = Math.floor(Math.random() * 101) + 100; 
        this.alpha = 1.0; 
        this.alive = true;

        if (this.isCloaked) this.alpha = 100/255;
    }

    update(velXAlien, velYAlien) {
        const agora = performance.now();
        if (this.tipo === 4) { 
            this.rect.x += Math.sin(agora / 1000) * 2;
            this.rect.y += velYAlien * 0.5;
        } else if (this.tipo === 5) { 
            this.cloakTimer++;
            if (this.cloakTimer > this.cloakInterval) {
                this.isCloaked = !this.isCloaked;
                this.cloakTimer = 0;
                this.alpha = this.isCloaked ? 100/255 : 1.0;
            }
            this.rect.x += velXAlien * 1.5;
            this.rect.y += velYAlien;
        } else if (this.isSwooping) {
            this.swoopAngle += 0.05;
            this.rect.y += Math.sin(this.swoopAngle) * this.swoopSpeed;
            this.rect.x += velXAlien;
        } else {
            this.rect.x += velXAlien;
            this.rect.y += velYAlien;
        }

        if (agora - this.ultimoUpdateAnim > this.animDelay) {
            this.ultimoUpdateAnim = agora;
            this.frameAtual = (this.frameAtual + 1) % this.frames.length;
            this.image = this.frames[this.frameAtual];
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(this.image, this.rect.x, this.rect.y);
        ctx.restore();
    }
    
    hit() {
        this.vida--;
        if (this.vida <= 0) {
            this.alive = false;
        }
    }
}

class Projetil {
    constructor(x, y, cor, velocidadeY, isHoming = false, aliens = null) {
        const spriteData = criarSpritePixelArt(LASER_PIXEL_MAPS, cor, PIXEL_SCALE, 0.1);
        this.frames = spriteData.frames;
        this.animDelay = spriteData.animDelay * 1000; 
        this.frameAtual = 0;
        this.image = this.frames[0];
        this.rect = { 
            x: x - this.image.width / 2, y: y - this.image.height / 2, 
            width: this.image.width, height: this.image.height,
            centerx: x, centery: y
        };
        this.velocidadeY = velocidadeY;
        this.ultimoUpdate = performance.now();
        this.isHoming = isHoming;
        this.aliens = aliens; 
        this.target = null;
        this.particles = [];
        this.particleTimer = 0;
        this.alive = true;
    }

    update() {
        const agora = performance.now();
        if (agora - this.ultimoUpdate > this.animDelay) {
            this.ultimoUpdate = agora;
            this.frameAtual = (this.frameAtual + 1) % this.frames.length;
            this.image = this.frames[this.frameAtual];
        }

        this.particleTimer++;
        if (this.particleTimer >= 5) {
            this.particleTimer = 0;
            this.particles.push(new Particle(this.rect.centerx, this.rect.centery, AZUL_JOGADOR_PROJETIL, 
                                             Math.random() + 1, Math.PI / 2, 10, [1,2]));
        }
        this.particles = this.particles.filter(p => p.update());


        if (this.isHoming && this.aliens && this.aliens.length > 0) {
            if (!this.target || !this.target.alive) { 
                let closestAlien = null;
                let minDistSq = Infinity;
                this.aliens.forEach(alien => {
                    if (!alien.alive) return; 
                    const dx = (alien.rect.x + alien.rect.width/2) - this.rect.centerx;
                    const dy = (alien.rect.y + alien.rect.height/2) - this.rect.centery;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < minDistSq) {
                        minDistSq = distSq;
                        closestAlien = alien;
                    }
                });
                this.target = closestAlien;
            }
            if (this.target) {
                const targetCenterX = this.target.rect.x + this.target.rect.width/2;
                const targetCenterY = this.target.rect.y + this.target.rect.height/2;
                const dx = targetCenterX - this.rect.centerx;
                const dy = targetCenterY - this.rect.centery;
                const dist = Math.hypot(dx, dy);
                const homingSpeed = Math.abs(this.velocidadeY * 0.75); 
                if (dist > 0) {
                    this.rect.x += (dx / dist) * homingSpeed;
                    this.rect.y += (dy / dist) * homingSpeed;
                }
            } else { 
                 this.rect.y += this.velocidadeY;
            }
        } else {
            this.rect.y += this.velocidadeY;
        }
        
        this.rect.centerx = this.rect.x + this.rect.width/2;
        this.rect.centery = this.rect.y + this.rect.height/2;

        if (this.rect.y + this.rect.height < 0 || this.rect.y > ALTURA_TELA) {
            this.alive = false;
        }
    }

    draw(ctx) { 
        ctx.drawImage(this.image, this.rect.x, this.rect.y);
        this.particles.forEach(particle => particle.draw(ctx));
    }
}


class BarreiraSegmento {
    constructor(x, y) {
        const spriteData = criarSpritePixelArt(BARREIRA_SEGMENTO_PIXEL_MAP, COR_BARREIRA, PIXEL_SCALE * 2);
        this.frames = spriteData.frames; 
        this.image = this.frames[0];
        this.rect = { x, y, width: this.image.width, height: this.image.height };
        this.vida = 4;
        this.alive = true;
        this.originalImage = this.image; 
    }

    atingido() {
        this.vida--;
        if (this.vida <= 0) {
            this.alive = false;
        } else {
            const alpha = Math.max(50 / 255, this.vida / 4);
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = this.originalImage.width;
            tempCanvas.height = this.originalImage.height;
            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.globalAlpha = alpha;
            tempCtx.drawImage(this.originalImage, 0, 0);
            this.image = tempCanvas;
        }
    }
    draw(ctx){
        ctx.drawImage(this.image, this.rect.x, this.rect.y);
    }
}

class Explosao {
    constructor(center, tamanho = 'pequeno') {
        let colors, numParticles;
        this.animDelay = (tamanho === 'pequeno' ? 0.05 : 0.06) * 1000; 

        if (tamanho === 'pequeno') {
            colors = COR_EXPLOSAO_1;
            numParticles = 12;
        } else {
            colors = COR_EXPLOSAO_2;
            numParticles = 20;
        }

        this.frames = [];
        EXPLOSAO_PIXEL_MAPS.forEach((pMap, i) => {
            const color = colors[i % colors.length];
            const frameData = criarSpritePixelArt([pMap], color, PIXEL_SCALE, this.animDelay / 1000);
            this.frames.push(frameData.frames[0]);
        });

        this.frameAtual = 0;
        this.image = this.frames[0];
        this.rect = { 
            width: this.image.width, height: this.image.height,
            x: center.x - this.image.width / 2, 
            y: center.y - this.image.height / 2
        };
        this.ultimoUpdate = performance.now();
        this.alive = true;
        
        this.particles = [];
        const particleColor = colors[Math.floor(Math.random()*colors.length)];
        for (let i = 0; i < numParticles; i++) {
            this.particles.push(new Particle(
                center.x, center.y, particleColor,
                Math.random() * 4 + 2, 
                Math.random() * Math.PI * 2, 
                Math.floor(Math.random() * 11) + 15, 
                tamanho === 'grande' ? [2, 4] : [1, 3]
            ));
        }
    }

    update() {
        const agora = performance.now();
        if (agora - this.ultimoUpdate > this.animDelay) {
            this.ultimoUpdate = agora;
            this.frameAtual++;
            if (this.frameAtual >= this.frames.length) {
                this.alive = false; 
            } else {
                const currentCenter = { 
                    x: this.rect.x + this.rect.width / 2,
                    y: this.rect.y + this.rect.height / 2
                };
                this.image = this.frames[this.frameAtual];
                this.rect.width = this.image.width;
                this.rect.height = this.image.height;
                this.rect.x = currentCenter.x - this.rect.width / 2;
                this.rect.y = currentCenter.y - this.rect.height / 2;
            }
        }
        this.particles = this.particles.filter(p => p.update());
    }

    draw(ctx) {
        if (this.alive) { 
             ctx.drawImage(this.image, this.rect.x, this.rect.y);
        }
        this.particles.forEach(particle => particle.draw(ctx));
    }
}


class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = LARGURA_TELA;
        this.canvas.height = ALTURA_TELA;

        this.fonteHud = "16px PressStart2P, sans-serif";
        this.fonteTitulo = "32px PressStart2P, sans-serif";
        this.fonteMedia = "24px PressStart2P, sans-serif";
        
        this.rodando = true;
        this.estadoJogo = "tela_inicio"; 
        
        this.grupoEstrelas = [];
        this.grupoElementosDistantes = [];
        this.grupoCometas = [];
        this.grupoNebulas = [];
        this.aliens = [];
        this.projeteisJogador = [];
        this.projeteisAliens = [];
        this.barreiras = [];
        this.powerups = [];
        this.explosoes = []; 

        this.jogador = null;
        this.pontuacao = 0;
        this.vidas = 3;
        this.nivel = 1;
        
        this.velXAlienBase = 2.0 * PIXEL_SCALE / 4;
        this.velXAlien = this.velXAlienBase;
        this.velYAlienDescida = 12 * PIXEL_SCALE / 4;
        this.chanceTiroAlien = 0.002;
        this.alienMoveTimerMax = 30; 
        this.alienMoveTimer = 0;
        this.alienDirecaoDescidaPendente = false;
        
        this.chanceSpawnCometa = 0.008;
        this.maxCometas = 3;
        
        this.combo = 0;
        this.comboTimer = 0; 
        this.scoreFlash = 0; 
        
        this.shakeOffsetX = 0;
        this.shakeOffsetY = 0;
        this.shakeFrames = [];

        this.keysPressed = {};
        this.setupKeyboardListeners();    // RENOMEADO
        this.setupTouchButtonListeners(); // RENOMEADO e chamado aqui
        this.setupCanvasEventListeners(); // NOVO: Listener para toques/cliques no canvas


        this.background = this._criarBackground();
        this.criarCenario(); 
        
        this.mensagemTemporaria = null; 
        this.highScores = this.getHighScores(); 

        this.loopPrincipal = this.loopPrincipal.bind(this);
    }

    playSound(soundName) {
        console.log(`AUDIO: Tocar som -> ${soundName}`);
    }

    getHighScores() {
        try {
            const scores = localStorage.getItem('codeverseHighScores_v2');
            return scores ? JSON.parse(scores) : [];
        } catch (e) {
            console.error("Erro ao carregar high scores:", e);
            return [];
        }
    }

    saveHighScore(score) { 
        try {
            let scores = this.getHighScores();
            scores.push({ name: "PLY", score: score, date: new Date().toLocaleDateString("pt-BR") }); 
            scores.sort((a, b) => b.score - a.score);
            scores = scores.slice(0, 5); 
            localStorage.setItem('codeverseHighScores_v2', JSON.stringify(scores));
            this.highScores = scores; 
        } catch (e) {
            console.error("Erro ao salvar high score:", e);
        }
    }

    // RENOMEADO de setupInputListeners
    setupKeyboardListeners() {
        window.addEventListener('keydown', (e) => {
            this.keysPressed[e.key] = true;
            if ([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 's', 'S', 'Enter', 'Escape'].includes(e.key)) {
                e.preventDefault();
            }

            if (this.estadoJogo === "tela_inicio" || this.estadoJogo === "game_over") {
                if (e.key === 'Enter') {
                    this.resetar();
                }
            } else if (this.estadoJogo === "jogando") {
                if (e.key === 'Escape') {
                    console.log("Jogo pausado (funcionalidade a ser implementada)");
                }
            }
        });
        window.addEventListener('keyup', (e) => {
            this.keysPressed[e.key] = false;
        });
    }

    // RENOMEADO de setupTouchControls
    setupTouchButtonListeners() {
        const btnLeft = document.getElementById('btnLeft');
        const btnRight = document.getElementById('btnRight');
        const btnShoot = document.getElementById('btnShoot');
        const btnShield = document.getElementById('btnShield');

        if (!btnLeft || !btnRight || !btnShoot || !btnShield) {
            console.warn("Botões de toque não encontrados no DOM. Controles de toque podem não funcionar.");
            return;
        }

        const setupButtonEvents = (buttonElement, keyName) => {
            const startListener = (e) => {
                e.preventDefault();
                this.keysPressed[keyName] = true;
                buttonElement.style.backgroundColor = 'rgba(90, 90, 120, 0.9)';
            };
            const endListener = (e) => {
                e.preventDefault();
                this.keysPressed[keyName] = false;
                buttonElement.style.backgroundColor = 'rgba(70, 70, 90, 0.7)';
            };

            buttonElement.addEventListener('touchstart', startListener, { passive: false });
            buttonElement.addEventListener('touchend', endListener, { passive: false });
            buttonElement.addEventListener('touchcancel', endListener, { passive: false }); 

            buttonElement.addEventListener('mousedown', startListener);
            buttonElement.addEventListener('mouseup', endListener);
            buttonElement.addEventListener('mouseleave', endListener); 
        };

        setupButtonEvents(btnLeft, 'ArrowLeft');
        setupButtonEvents(btnRight, 'ArrowRight');
        setupButtonEvents(btnShoot, ' '); 
        setupButtonEvents(btnShield, 's');  
    }

    // NOVO MÉTODO para lidar com toques/cliques no canvas para iniciar/reiniciar
    setupCanvasEventListeners() {
        const canvasInteractionHandler = (e) => {
            if (this.estadoJogo === "tela_inicio" || this.estadoJogo === "game_over") {
                e.preventDefault(); 
                this.resetar();
                // this.playSound('ui_confirm'); // Descomente se tiver um som de UI
            }
        };

        this.canvas.addEventListener('click', canvasInteractionHandler);
        this.canvas.addEventListener('touchstart', canvasInteractionHandler, { passive: false });
    }


    _criarBackground() {
        const bgCanvas = document.createElement('canvas');
        bgCanvas.width = LARGURA_TELA;
        bgCanvas.height = ALTURA_TELA;
        const bgCtx = bgCanvas.getContext('2d');
        bgCtx.fillStyle = FUNDO_ESPACO;
        bgCtx.fillRect(0, 0, LARGURA_TELA, ALTURA_TELA);

        for (let y = 0; y < ALTURA_TELA / 2; y++) {
            const alpha = (50 * (1 - y / (ALTURA_TELA / 2))) / 255;
            bgCtx.strokeStyle = `rgba(100, 100, 150, ${alpha.toFixed(2)})`;
            bgCtx.beginPath();
            bgCtx.moveTo(0, y);
            bgCtx.lineTo(LARGURA_TELA, y);
            bgCtx.stroke();
        }
        return bgCanvas;
    }

    criarCenario() {
        this.grupoEstrelas = [];
        this.grupoElementosDistantes = [];
        this.grupoNebulas = [];
        
        const numEstrelasCamada = [80, 60, 40];
        for (let camada = 0; camada < 3; camada++) {
            for (let i = 0; i < numEstrelasCamada[camada]; i++) {
                this.grupoEstrelas.push(new Estrela(camada));
            }
        }
        
        this.grupoElementosDistantes.push(new Planeta(LARGURA_TELA / 4, ALTURA_TELA / 3));
         this.grupoElementosDistantes.push(new Planeta(LARGURA_TELA * 0.75, ALTURA_TELA * 0.6)); 

        for (let i = 0; i < 3; i++) {
            const size = [200, 300, 400][Math.floor(Math.random()*3)];
            const x = Math.floor(Math.random() * (LARGURA_TELA - size)) + size / 2;
            const y = Math.floor(Math.random() * (ALTURA_TELA - size)) + size / 2;
            this.grupoNebulas.push(new Nebula(x, y, size));
        }
    }
    
    gerenciarCometas() {
        if (this.grupoCometas.length < this.maxCometas && Math.random() < this.chanceSpawnCometa) {
            this.grupoCometas.push(new Cometa());
        }
        this.grupoCometas = this.grupoCometas.filter(c => c.alive);
    }

    resetar() {
        this.pontuacao = 0;
        this.vidas = 3;
        this.nivel = 1;
        this.combo = 0;
        this.comboTimer = 0;
        this.iniciarNovaOnda();
        this.estadoJogo = "jogando";
        this.playSound('game_start'); 
    }

    iniciarNovaOnda() {
        this.aliens = [];
        this.projeteisJogador = [];
        this.projeteisAliens = [];
        this.barreiras = [];
        this.powerups = [];
        this.explosoes = [];

        this.jogador = new Player(this); 

        this.criarAliens();
        this.criarBarreiras();
        
        this.velXAlien = this.velXAlienBase + (this.nivel - 1) * 0.3;
        this.chanceTiroAlien = 0.002 + (this.nivel - 1) * 0.0008;
        this.alienMoveTimerMax = Math.max(10, 30 - (this.nivel - 1) * 3);
    }

    criarAliens() {
        const numLinhas = 5;
        const numColunas = 11;
        const sampleMap = ALIEN_1_PIXEL_MAPS[0];
        const espacoX = sampleMap[0].length * PIXEL_SCALE * 1.8;
        const espacoY = sampleMap.length * PIXEL_SCALE * 1.5;
        const offsetX = (LARGURA_TELA - (numColunas - 1) * espacoX) / 2;
        const offsetY = 60;

        if (this.nivel % 5 === 0) { 
            const x = LARGURA_TELA / 2 - (ALIEN_BOSS_PIXEL_MAPS[0][0].length * PIXEL_SCALE / 2);
            const y = offsetY;
            this.aliens.push(new Alien(x, y, 4, this)); 
        } else {
            for (let linha = 0; linha < numLinhas; linha++) {
                for (let coluna = 0; coluna < numColunas; coluna++) {
                    const x = offsetX + coluna * espacoX;
                    const y = offsetY + linha * espacoY;
                    let tipoAlien;
                    if (Math.random() < 0.1) tipoAlien = 5; 
                    else if (linha < 1) tipoAlien = 3;
                    else if (linha < 3) tipoAlien = 2;
                    else tipoAlien = 1;
                    this.aliens.push(new Alien(x, y, tipoAlien, this)); 
                }
            }
        }
    }

    criarBarreiras() {
        const numBarreiras = 4;
        const yBaseBarreira = ALTURA_TELA - 130 - 60; // Sobe barreiras para dar espaço aos controles de toque
        const larguraBarreiraTotal = LARGURA_TELA / (numBarreiras + 1);
        const segmentoLargura = BARREIRA_SEGMENTO_PIXEL_MAP[0].length * PIXEL_SCALE * 2;
        const segmentoAltura = BARREIRA_SEGMENTO_PIXEL_MAP.length * PIXEL_SCALE * 2;
        

        for (let i = 0; i < numBarreiras; i++) {
            const centroXBarreira = (i + 1) * larguraBarreiraTotal;
            for (let colIdx = 0; colIdx < 4; colIdx++) { 
                for (let rowIdx = 0; rowIdx < 3; rowIdx++) { 
                    if (!(rowIdx === 0 && (colIdx === 1 || colIdx === 2))) { 
                        const xOffsetMultiplicador = colIdx - 1.5; 
                        const x = centroXBarreira + (xOffsetMultiplicador * segmentoLargura);
                        const y = yBaseBarreira - ((2 - rowIdx) * segmentoAltura);
                        this.barreiras.push(new BarreiraSegmento(x, y));
                    }
                }
            }
        }
    }

    moverAliens() {
        this.alienMoveTimer++;
        const multiplicadorVelocidade = this.aliens.length > 0 ? Math.max(0.1, this.aliens.filter(a=>a.alive).length / (5.0 * 11.0)) + 0.3 : 1.0;

        if (this.alienMoveTimer < this.alienMoveTimerMax * multiplicadorVelocidade) {
            return;
        }
        this.alienMoveTimer = 0;

        let currentVelX = 0;
        let currentVelY = 0;

        if (this.alienDirecaoDescidaPendente) {
            currentVelY = this.velYAlienDescida;
            this.velXAlien *= -1;
            this.alienDirecaoDescidaPendente = false;
        } else {
            currentVelX = this.velXAlien;
            let moverParaBaixoNesteCiclo = false;
            for (const alien of this.aliens) {
                if (!alien.alive) continue;
                const nextX = alien.rect.x + currentVelX;
                if ((nextX + alien.rect.width > LARGURA_TELA - PIXEL_SCALE * 2 && currentVelX > 0) ||
                    (nextX < PIXEL_SCALE * 2 && currentVelX < 0)) {
                    moverParaBaixoNesteCiclo = true;
                    break;
                }
            }
            if (moverParaBaixoNesteCiclo) {
                this.alienDirecaoDescidaPendente = true;
                currentVelX = 0; 
            }
        }
        this.aliens.forEach(alien => {
            if (alien.alive) alien.update(currentVelX, currentVelY);
        });
    }

    aliensAtiram() {
        this.aliens.forEach(alien => {
            if (!alien.alive) return;
            const chanceBase = this.chanceTiroAlien * (alien.tipo === 4 ? 2 : 1);
            const modificadorQuantidade = (1 + ((5 * 11) - this.aliens.filter(a=>a.alive).length) / (5 * 11.0)) * 2;
            if (Math.random() < chanceBase * modificadorQuantidade) {
                this.projeteisAliens.push(new Projetil(
                    alien.rect.x + alien.rect.width / 2,
                    alien.rect.y + alien.rect.height,
                    VERMELHO_ALIEN_PROJETIL, 6
                ));
                this.playSound('alien_shoot'); 
            }
        });
    }
    
    checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }

    checarColisoes() {
        this.projeteisJogador.forEach(proj => {
            if (!proj.alive) return;
            this.aliens.forEach(alien => {
                if (!alien.alive || !proj.alive) return; 
                if (alien.tipo === 5 && alien.isCloaked) return;

                if (this.checkCollision(proj.rect, alien.rect)) {
                    proj.alive = false; 
                    alien.hit(); 
                    if (!alien.alive) { 
                        this.combo++;
                        this.comboTimer = performance.now();
                        const multiplier = Math.min(Math.floor(this.combo / 5) + 1, 5);
                        this.pontuacao += alien.pontos * multiplier;
                        this.scoreFlash = 30; 
                        const tamanhoExplosao = alien.tipo === 4 ? 'grande' : 'pequeno';
                        this.explosoes.push(new Explosao({x: alien.rect.x + alien.rect.width/2, y: alien.rect.y + alien.rect.height/2}, tamanhoExplosao));
                        this.playSound(tamanhoExplosao === 'grande' ? 'explosion_large' : 'explosion_small'); 

                        if (tamanhoExplosao === 'grande') this.shakeFrames = screenShake(5, 10);

                        if (Math.random() < 0.15) { 
                            const tipoPowerup = ['vida', 'shoot', 'shield', 'multi', 'speed', 'homing'][Math.floor(Math.random()*6)];
                            this.powerups.push(new PowerUp(alien.rect.x + alien.rect.width/2, alien.rect.y + alien.rect.height/2, tipoPowerup));
                        }
                    }
                }
            });
        });

        if (this.aliens.filter(a => a.alive).length === 0 && this.estadoJogo === "jogando") { 
            this.nivel++;
            this.mostrarMensagemTemporaria(`Nível ${this.nivel}!`, 1.5);
            this.iniciarNovaOnda();
            return; 
        }

        if (this.jogador) {
            this.powerups.forEach(powerup => {
                if (!powerup.alive) return;
                if (this.checkCollision(this.jogador.rect, powerup.rect)) {
                    powerup.alive = false;
                    this.playSound('powerup_collect'); 
                    if (powerup.tipo === 'vida') this.vidas = Math.min(this.vidas + 1, 5);
                    else if (powerup.tipo === 'shoot') this.jogador.cooldownTiro = Math.max(100, this.jogador.cooldownTiro - 50);
                    else if (powerup.tipo === 'shield') {
                        this.jogador.shieldActive = true;
                        this.jogador.shieldStart = performance.now();
                        this.playSound('shield_up'); 
                    } else if (powerup.tipo === 'multi') {
                        this.jogador.multiShotActive = true;
                        this.jogador.multiShotStart = performance.now();
                    } else if (powerup.tipo === 'speed') {
                        this.jogador.speedBoostActive = true;
                        this.jogador.speedBoostStart = performance.now();
                    } else if (powerup.tipo === 'homing') {
                        this.jogador.homingActive = true;
                        this.jogador.homingStart = performance.now();
                    }
                }
            });
        }
        
        if (this.jogador && !this.jogador.shieldActive) {
            this.projeteisAliens.forEach(proj => {
                if (!proj.alive) return;
                if (this.checkCollision(this.jogador.rect, proj.rect)) {
                    proj.alive = false;
                    if (this.jogador.takeHit()) {
                        this.vidas--;
                        this.combo = 0;
                        this.playSound('player_hit'); 
                        this.explosoes.push(new Explosao({x: this.jogador.rect.x + this.jogador.rect.width/2, y: this.jogador.rect.y + this.jogador.rect.height/2}, 'grande'));
                        this.shakeFrames = screenShake(5, 10);
                        
                        if (this.vidas <= 0) {
                            this.playSound('game_over_sound'); 
                            this.saveHighScore(this.pontuacao); 
                            this.estadoJogo = "game_over";
                            this.jogador = null; 
                        } else {
                            this.mostrarMensagemTemporaria(`Vidas restantes: ${this.vidas}`, 1);
                        }
                    }
                }
            });
        }

        const allProjectiles = [...this.projeteisJogador, ...this.projeteisAliens];
        allProjectiles.forEach(proj => {
            if (!proj.alive) return;
            this.barreiras.forEach(barreira => {
                if (!barreira.alive || !proj.alive) return;
                if (this.checkCollision(proj.rect, barreira.rect)) {
                    proj.alive = false;
                    barreira.atingido();
                    this.playSound('barrier_hit'); 
                    const expl = new Explosao({x: proj.rect.centerx, y: proj.rect.centery}, 'pequeno');
                    expl.frames = criarSpritePixelArt([["1"]], COR_BARREIRA, PIXEL_SCALE).frames; 
                    expl.animDelay = 0.05 * 1000;
                    this.explosoes.push(expl);
                }
            });
        });
        
        this.aliens.forEach(alien => {
            if(!alien.alive) return;
            this.barreiras.forEach(barreira => {
                if(!barreira.alive) return;
                if(this.checkCollision(alien.rect, barreira.rect)) {
                    barreira.alive = false; 
                    this.playSound('barrier_destroyed'); 
                }
            });
        });


        if (this.jogador && this.estadoJogo === "jogando") { 
            let gameOverByAlien = false;
            this.aliens.forEach(alien => {
                if (!alien.alive || gameOverByAlien) return;
                 if (alien.tipo === 5 && alien.isCloaked && this.checkCollision(this.jogador.rect, alien.rect)) {
                 } else if (this.checkCollision(this.jogador.rect, alien.rect) && !(alien.tipo === 5 && alien.isCloaked)) {
                    if (this.jogador.takeHit()) { 
                        if(this.vidas <= 0) gameOverByAlien = true; 
                    }
                }
                if (alien.rect.y + alien.rect.height > this.jogador.rect.y + this.jogador.rect.height * 0.8) { 
                     if (this.jogador.takeHit()) {
                        if(this.vidas <= 0) gameOverByAlien = true;
                    }
                }
            });

            if (gameOverByAlien) { 
                this.playSound('game_over_sound'); 
                if(this.jogador) { 
                    this.explosoes.push(new Explosao({x: this.jogador.rect.x + this.jogador.rect.width/2, y: this.jogador.rect.y + this.jogador.rect.height/2}, 'grande'));
                }
                this.shakeFrames = screenShake(5, 10);
                this.saveHighScore(this.pontuacao); 
                this.estadoJogo = "game_over";
                this.jogador = null;

                this.aliens.forEach(a => {
                    if (a.alive) {
                        this.explosoes.push(new Explosao({x: a.rect.x + a.rect.width/2, y: a.rect.y + a.rect.height/2}, 'pequeno'));
                        a.alive = false;
                    }
                });
            }
        }
        
        this.aliens = this.aliens.filter(s => s.alive);
        this.projeteisJogador = this.projeteisJogador.filter(s => s.alive);
        this.projeteisAliens = this.projeteisAliens.filter(s => s.alive);
        this.barreiras = this.barreiras.filter(s => s.alive);
        this.powerups = this.powerups.filter(s => s.alive);
        this.explosoes = this.explosoes.filter(s => s.alive || s.particles.length > 0);
    }

    drawTimerBar(x, y, width, height, percentage, color) {
        this.ctx.fillStyle = '#333'; 
        this.ctx.fillRect(x, y, width, height);
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width * percentage, height);
        this.ctx.strokeStyle = BRANCO; 
        this.ctx.strokeRect(x, y, width, height);
    }

    desenharHud() {
        const hudAltura = 70; 
        this.ctx.fillStyle = COR_HUD_FUNDO;
        this.ctx.fillRect(0, 0, LARGURA_TELA, hudAltura);
        this.ctx.strokeStyle = BRANCO;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, hudAltura);
        this.ctx.lineTo(LARGURA_TELA, hudAltura);
        this.ctx.stroke();

        this.ctx.font = this.fonteHud;
        const scoreColor = this.scoreFlash > 0 ? "rgb(255,255,0)" : COR_TEXTO;
        this.scoreFlash = Math.max(0, this.scoreFlash - 1);
        
        this.ctx.fillStyle = scoreColor;
        this.ctx.fillText(`PONTOS: ${this.pontuacao}`, 20, 30);

        if (this.combo > 0) {
            this.ctx.fillStyle = "rgb(255,100,100)";
            this.ctx.fillText(`Combo: x${Math.min(Math.floor(this.combo / 5) + 1, 5)}`, 20, 55); 
        }
        
        const vidaSpriteData = criarSpritePixelArt(PLAYER_PIXEL_MAP_BASE, VERDE_JOGADOR, PIXEL_SCALE / 2);
        const vidaSprite = vidaSpriteData.frames[0];
        for (let i = 0; i < this.vidas; i++) {
            this.ctx.drawImage(vidaSprite, LARGURA_TELA - (i + 1) * (vidaSprite.width + 10) - 20, 15);
        }

        this.ctx.fillStyle = COR_TEXTO;
        const textoNivel = `NÍVEL: ${this.nivel}`;
        const nivelMetrics = this.ctx.measureText(textoNivel);
        this.ctx.fillText(textoNivel, (LARGURA_TELA - nivelMetrics.width) / 2, 30);

        let powerupTextY = 15; 
        let powerupBarX = (LARGURA_TELA - nivelMetrics.width) / 2 - 120; 
        if(powerupBarX < 200) powerupBarX = 200; 


        if (this.jogador) {
            const agora = performance.now();
            if (this.jogador.shieldActive) {
                this.ctx.fillStyle = COR_POWERUP_SHIELD.replace(/[^,]+?\)$/, '1)');
                this.ctx.fillText("Escudo:", powerupBarX - 70, powerupTextY + 10);
                const timeLeft = this.jogador.shieldDuration - (agora - this.jogador.shieldStart);
                const percentage = Math.max(0, timeLeft / this.jogador.shieldDuration);
                this.drawTimerBar(powerupBarX, powerupTextY, 100, 10, percentage, COR_POWERUP_SHIELD);
                powerupTextY += 20;
            }
            if (this.jogador.multiShotActive) {
                this.ctx.fillStyle = COR_POWERUP_MULTI.replace(/[^,]+?\)$/, '1)');
                this.ctx.fillText("Multi:", powerupBarX - 70, powerupTextY + 10);
                const timeLeft = this.jogador.multiShotDuration - (agora - this.jogador.multiShotStart);
                const percentage = Math.max(0, timeLeft / this.jogador.multiShotDuration);
                this.drawTimerBar(powerupBarX, powerupTextY, 100, 10, percentage, COR_POWERUP_MULTI);
                powerupTextY += 20;
            }
             if (this.jogador.speedBoostActive) {
                this.ctx.fillStyle = COR_POWERUP_SPEED.replace(/[^,]+?\)$/, '1)');
                this.ctx.fillText("Veloc.:", powerupBarX - 70, powerupTextY + 10);
                const timeLeft = this.jogador.speedBoostDuration - (agora - this.jogador.speedBoostStart);
                const percentage = Math.max(0, timeLeft / this.jogador.speedBoostDuration);
                this.drawTimerBar(powerupBarX, powerupTextY, 100, 10, percentage, COR_POWERUP_SPEED);
                powerupTextY += 20;
            }
             if (this.jogador.homingActive && powerupTextY < hudAltura - 5) { 
                this.ctx.fillStyle = COR_POWERUP_HOMING.replace(/[^,]+?\)$/, '1)');
                this.ctx.fillText("Homing:", powerupBarX - 70, powerupTextY + 10);
                const timeLeft = this.jogador.homingDuration - (agora - this.jogador.homingStart);
                const percentage = Math.max(0, timeLeft / this.jogador.homingDuration);
                this.drawTimerBar(powerupBarX, powerupTextY, 100, 10, percentage, COR_POWERUP_HOMING);
             }
        }
    }

    mostrarMensagemTemporaria(texto, duracaoSegundos) {
        this.mensagemTemporaria = {
            text: texto,
            endTime: performance.now() + duracaoSegundos * 1000
        };
    }

    desenharMensagemTemporaria() {
        if (this.mensagemTemporaria) {
            if (performance.now() > this.mensagemTemporaria.endTime) {
                this.mensagemTemporaria = null;
            } else {
                this.ctx.fillStyle = "rgba(0,0,0,0.5)";
                this.ctx.fillRect(0, 0, LARGURA_TELA, ALTURA_TELA);
                this.ctx.font = this.fonteMedia;
                this.ctx.fillStyle = BRANCO;
                this.ctx.textAlign = "center";
                this.ctx.fillText(this.mensagemTemporaria.text, LARGURA_TELA / 2, ALTURA_TELA / 2);
                this.ctx.textAlign = "left"; 
            }
        }
    }
    
    telaDeInicio() {
        this.ctx.drawImage(this.background, 0, 0);
        this.grupoNebulas.forEach(n => n.draw(this.ctx));
        this.grupoElementosDistantes.forEach(e => e.draw(this.ctx));
        this.grupoEstrelas.forEach(s => s.draw(this.ctx));


        this.ctx.textAlign = "center";
        this.ctx.font = this.fonteTitulo;
        this.ctx.fillStyle = VERDE_JOGADOR;
        this.ctx.fillText("CODEVERSE GAME", LARGURA_TELA / 2, ALTURA_TELA / 2 - 100);
        
        this.ctx.font = this.fonteMedia;
        this.ctx.fillStyle = BRANCO;
        this.ctx.fillText("Criado por João Marcelo Detomini", LARGURA_TELA / 2, ALTURA_TELA / 2 - 40);
        
        this.ctx.font = this.fonteHud;
        this.ctx.fillText("TOQUE NA TELA ou ENTER para começar", LARGURA_TELA / 2, ALTURA_TELA / 2 + 50);
        this.ctx.fillText("Setas/Botões para mover, ESPAÇO/Botão para atirar, S/Botão para escudo", LARGURA_TELA / 2, ALTURA_TELA / 2 + 80);
        this.ctx.textAlign = "left"; 
    }

    telaGameOver() {
        this.ctx.drawImage(this.background, 0, 0);
        this.grupoNebulas.forEach(n => n.draw(this.ctx));
        this.grupoElementosDistantes.forEach(e => e.draw(this.ctx));
        this.grupoEstrelas.forEach(s => s.draw(this.ctx));

        this.ctx.textAlign = "center";
        this.ctx.font = this.fonteTitulo;
        this.ctx.fillStyle = VERMELHO_ALIEN_PROJETIL;
        this.ctx.fillText("GAME OVER", LARGURA_TELA / 2, ALTURA_TELA / 2 - 120);
        
        this.ctx.font = this.fonteMedia;
        this.ctx.fillStyle = BRANCO;
        this.ctx.fillText(`Pontuação Final: ${this.pontuacao}`, LARGURA_TELA / 2, ALTURA_TELA / 2 - 60);
        
        this.ctx.font = this.fonteHud;
        this.ctx.fillText("TOQUE NA TELA ou ENTER para reiniciar", LARGURA_TELA / 2, ALTURA_TELA / 2 + 160);

        this.ctx.font = this.fonteMedia;
        this.ctx.fillStyle = "rgb(255, 215, 0)"; 
        this.ctx.fillText("Melhores Pontuações:", LARGURA_TELA / 2, ALTURA_TELA / 2 - 10);
        this.ctx.font = this.fonteHud;
        this.highScores.forEach((entry, index) => {
            this.ctx.fillText(`${index + 1}. ${entry.name} - ${entry.score} (${entry.date})`, LARGURA_TELA / 2, ALTURA_TELA / 2 + 30 + (index * 25));
        });

        this.ctx.textAlign = "left"; 
    }


    loopPrincipal() {
        if (!this.rodando) {
            console.log("Jogo encerrado.");
            return; 
        }

        const agora = performance.now();

        this.ctx.save();
        if (this.shakeFrames.length > 0) {
            const [shakeX, shakeY] = this.shakeFrames.shift();
            this.ctx.translate(shakeX, shakeY);
        }
        
        this.ctx.drawImage(this.background, 0, 0); 

        if (this.estadoJogo === "tela_inicio") {
            this.telaDeInicio();
            this.grupoNebulas.forEach(n => n.update()); // Movimento sutil no fundo
            this.grupoEstrelas.forEach(s => s.update());
            this.grupoElementosDistantes.forEach(e => e.update());
        } else if (this.estadoJogo === "game_over") {
            this.telaGameOver();
            this.grupoNebulas.forEach(n => n.update()); // Movimento sutil no fundo
            this.grupoEstrelas.forEach(s => s.update());
            this.grupoElementosDistantes.forEach(e => e.update());
        } else if (this.estadoJogo === "jogando") {
            this.grupoNebulas.forEach(n => n.update());
            this.grupoEstrelas.forEach(s => s.update());
            this.grupoElementosDistantes.forEach(e => e.update());
            this.gerenciarCometas();
            this.grupoCometas.forEach(c => c.update());

            if (this.jogador) {
                this.jogador.update(this.keysPressed);
                if (this.keysPressed[' ']) { 
                    this.jogador.atirar(this.projeteisJogador, this.aliens);
                }
            }
            
            this.moverAliens(); 
            this.aliensAtiram();

            this.projeteisJogador.forEach(p => p.update());
            this.projeteisAliens.forEach(p => p.update());
            this.powerups.forEach(p => p.update());
            this.explosoes.forEach(e => e.update());

            this.checarColisoes();

            if (this.combo > 0 && agora - this.comboTimer > 2000) { 
                this.combo = 0;
            }

            this.grupoNebulas.forEach(n => n.draw(this.ctx));
            this.grupoElementosDistantes.forEach(e => e.draw(this.ctx));
            this.grupoEstrelas.forEach(s => s.draw(this.ctx));
            this.grupoCometas.forEach(c => c.draw(this.ctx));
            
            this.barreiras.forEach(b => b.draw(this.ctx));
            this.powerups.forEach(p => p.draw(this.ctx));
            this.aliens.forEach(a => a.draw(this.ctx));
            this.projeteisJogador.forEach(p => p.draw(this.ctx));
            this.projeteisAliens.forEach(p => p.draw(this.ctx));
            if (this.jogador) this.jogador.draw(this.ctx);
            this.explosoes.forEach(e => e.draw(this.ctx));
            
            this.desenharHud();
            this.desenharMensagemTemporaria();
        }
        
        this.ctx.restore(); 
        requestAnimationFrame(this.loopPrincipal);
    }

    iniciar() {
        this.loopPrincipal();
    }
}

window.onload = () => {
    const jogo = new Game('gameCanvas');
    jogo.iniciar();
};