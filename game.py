import pygame
import random
import math
import numpy as np
import asyncio
import platform

# --- Constantes Globais ---
LARGURA_TELA = 800
ALTURA_TELA = 600
FPS = 60
PIXEL_SCALE = 4

# Cores
FUNDO_ESPACO = (10, 10, 25)
PRETO_HUD = (20, 20, 30)
BRANCO = (230, 230, 230)
VERDE_JOGADOR = (0, 255, 128)
VERMELHO_ALIEN_PROJETIL = (255, 80, 80)
AZUL_JOGADOR_PROJETIL = (128, 200, 255)
COR_ALIEN_1 = [(255, 255, 255), (200, 255, 200), (255, 200, 200)]
COR_ALIEN_2 = [(255, 0, 255), (200, 100, 255), (255, 100, 200)]
COR_ALIEN_3 = [(255, 255, 0), (200, 200, 100), (255, 200, 100)]
COR_ALIEN_BOSS = [(255, 50, 50), (200, 50, 50)]
COR_ALIEN_STEALTH = [(100, 100, 150), (120, 120, 180)]
COR_BARREIRA = (0, 180, 0)
COR_EXPLOSAO_1 = [(255, 165, 0), (255, 255, 0), (255, 100, 0)]
COR_EXPLOSAO_2 = [(255, 255, 100), (255, 200, 50), (255, 150, 0)]
COR_TEXTO = BRANCO
COR_HUD_FUNDO = (40, 40, 60, 200)
COR_POWERUP_VIDA = (0, 255, 0)
COR_POWERUP_SHOOT = (0, 200, 255)
COR_POWERUP_SHIELD = (255, 255, 0)
COR_POWERUP_MULTI = (255, 0, 255)
COR_POWERUP_SPEED = (255, 165, 0)
COR_POWERUP_HOMING = (100, 255, 100)
COR_SHIELD = (100, 200, 255, 150)

COR_ESTRELA_1 = (200, 200, 220)
COR_ESTRELA_2 = (220, 220, 180)
COR_ESTRELA_3 = (180, 180, 220)
THRUSTER_COR_1 = (255, 100, 0)
THRUSTER_COR_2 = (255, 200, 0)
COR_SATURNO_PLANETA = (224, 208, 160)
COR_SATURNO_FAIXA_1 = (210, 190, 140)
COR_SATURNO_FAIXA_2 = (200, 180, 130)
COR_SATURNO_ANEL_EXTERNO = (200, 180, 140)
COR_SATURNO_ANEL_INTERNO = (160, 140, 110)
COR_SATURNO_SOMBRA = (100, 90, 70, 100)
COR_COMETA_CABECA = (220, 255, 255)
COR_COMETA_CAUDA_1 = (180, 220, 255)
COR_COMETA_CAUDA_2 = (100, 150, 220)
COR_NEBULA_1 = (120, 100, 150, 80)
COR_NEBULA_2 = (100, 120, 150, 60)
COR_NEBULA_3 = (150, 100, 120, 50)

# --- Funções Auxiliares ---
def desenhar_pixel_art(surface, pixel_map, cor, pos_x, pos_y, escala=PIXEL_SCALE):
    for r_idx, row in enumerate(pixel_map):
        for c_idx, pixel in enumerate(row):
            if pixel == '1':
                pygame.draw.rect(surface, cor, (pos_x + c_idx * escala, pos_y + r_idx * escala, escala, escala))

def criar_sprite_pixel_art(pixel_maps, cor, escala=PIXEL_SCALE, anim_delay=0.5):
    frames = []
    if not isinstance(pixel_maps, list) or not isinstance(pixel_maps[0], list):
        pixel_maps = [pixel_maps]
    for p_map in pixel_maps:
        map_largura = len(p_map[0]) * escala if p_map and p_map[0] else 0
        map_altura = len(p_map) * escala if p_map else 0
        frame_surface = pygame.Surface((map_largura, map_altura), pygame.SRCALPHA)
        frame_surface.fill((0,0,0,0))
        desenhar_pixel_art(frame_surface, p_map, cor, 0, 0, escala)
        frames.append(frame_surface)
    return frames, anim_delay

def screen_shake(offset, duration):
    return [(random.randint(-offset, offset), random.randint(-offset, offset)) for _ in range(duration)]

# --- Pixel Art Sprites ---
PLAYER_PIXEL_MAP_BASE = [
    "   111   ",
    "  11111  ",
    " 1111111 ",
    "111111111",
    "1 1 1 1 1",
    "  1 1 1  "
]
PLAYER_THRUSTER_MAPS = [
    [["   Ascending triangle 111   "], THRUSTER_COR_1],
    [[" 11111 "], THRUSTER_COR_2],
    [["1111111"], THRUSTER_COR_1],
    [[" 11111 "], THRUSTER_COR_2],
    [["  111  "], THRUSTER_COR_1]
]
ALIEN_1_PIXEL_MAPS = [
    [
        "  1111  ",
        " 111111 ",
        "11111111",
        "11 11 11",
        "1  11  1"
    ],
    [
        "  1111  ",
        " 111111 ",
        "11111111",
        "1 1111 1",
        " 1 11 1 "
    ]
]
ALIEN_2_PIXEL_MAPS = [
    [
        "  1111  ",
        " 111111 ",
        "11111111",
        "1 1111 1",
        "11    11"
    ],
    [
        "  1111  ",
        " 111111 ",
        "11111111",
        "11111111",
        "1 11 11 1"
    ]
]
ALIEN_3_PIXEL_MAPS = [
    [
        "   111   ",
        "  11111  ",
        " 1111111 ",
        "111111111",
        "1  1 1  1"
    ],
    [
        "   111   ",
        "  11111  ",
        " 1111111 ",
        "111111111",
        " 1 1 1 1 "
    ]
]
ALIEN_BOSS_PIXEL_MAPS = [
    [
        "  111111  ",
        " 11111111 ",
        "1111111111",
        "11 1111 11",
        "1  1111  1"
    ],
    [
        "  111111  ",
        " 11111111 ",
        "1111111111",
        "1 111111 1",
        " 1 1111 1 "
    ]
]
ALIEN_STEALTH_PIXEL_MAPS = [
    [
        "  11 11  ",
        " 1111111 ",
        "11 11 11 ",
        "1 1  1 1 ",
        " 1    1  "
    ],
    [
        "  11 11  ",
        " 1111111 ",
        "11 11 11 ",
        " 1 11 1  ",
        "  1  1   "
    ]
]
PROJETIL_PIXEL_MAP = [
    "11",
    "11",
    "11",
    "11"
]
LASER_PIXEL_MAPS = [
    [
        " 11 ",
        "1111",
        "1111",
        " 11 "
    ],
    [
        "11  ",
        "1111",
        "1111",
        "  11"
    ]
]
BARREIRA_SEGMENTO_PIXEL_MAP = [
    "1111",
    "1111",
    "1111"
]
EXPLOSAO_PIXEL_MAPS = [
    [
        " 1 1 ",
        "1 1 1",
        " 1 1 ",
        "1 1 1"
    ],
    [
        "1   1",
        " 1 1 ",
        "1 1 1",
        " 1 1 "
    ],
    [
        "11111",
        "1   1",
        "1 1 1",
        "1   1",
        "11111"
    ],
    [
        "1 1 1",
        " 1 1 ",
        "1 1 1",
        " 1 1 ",
        "1 1 1"
    ]
]
POWERUP_PIXEL_MAP = [
    " 11 ",
    "1111",
    "1111",
    " 11 "
]

# --- Classes ---
class Particle:
    def __init__(self, x, y, cor, speed, angle, lifespan, size_range=(1, 3)):
        self.pos_x = x
        self.pos_y = y
        self.cor = cor if isinstance(cor, tuple) else random.choice(cor)
        self.speed = speed
        self.angle = angle
        self.lifespan = lifespan
        self.current_life = lifespan
        self.size = random.randint(size_range[0], size_range[1]) * PIXEL_SCALE

    def update(self):
        self.pos_x += math.cos(self.angle) * self.speed
        self.pos_y += math.sin(self.angle) * self.speed
        self.current_life -= 1
        alpha = int(255 * (self.current_life / self.lifespan))
        return self.current_life > 0, alpha

    def draw(self, surface):
        temp_surf = pygame.Surface((self.size, self.size), pygame.SRCALPHA)
        pygame.draw.rect(temp_surf, (*self.cor[:3], self.current_life / self.lifespan * 255), (0, 0, self.size, self.size))
        surface.blit(temp_surf, (int(self.pos_x - self.size // 2), int(self.pos_y - self.size // 2)))

class Nebula(pygame.sprite.Sprite):
    def __init__(self, x, y, size):
        super().__init__()
        self.size = size
        self.image = pygame.Surface((size, size), pygame.SRCALPHA)
        self.image.fill((0, 0, 0, 0))
        colors = [COR_NEBULA_1, COR_NEBULA_2, COR_NEBULA_3]
        num_circles = random.randint(20, 40)
        for _ in range(num_circles):
            radius = random.randint(size // 10, size // 4)
            cx = random.randint(radius, size - radius)
            cy = random.randint(radius, size - radius)
            color = random.choice(colors)
            pygame.draw.circle(self.image, color, (cx, cy), radius)
        self.rect = self.image.get_rect(center=(x, y))
        self.vel_y = 0.02

    def update(self):
        self.rect.y += self.vel_y
        if self.rect.top > ALTURA_TELA:
            self.rect.bottom = -self.size
            self.rect.centerx = random.randint(self.size // 2, LARGURA_TELA - self.size // 2)

class Estrela(pygame.sprite.Sprite):
    def __init__(self, camada):
        super().__init__()
        self.camada = camada
        if self.camada == 0:
            self.tamanho_pixel = 1
            self.velocidade = 0.2
            self.cor_base = COR_ESTRELA_3
            self.chance_piscar = 0.001
        elif self.camada == 1:
            self.tamanho_pixel = random.choice([1, 2])
            self.velocidade = 0.5
            self.cor_base = COR_ESTRELA_2
            self.chance_piscar = 0.004
        else:
            self.tamanho_pixel = random.choice([2, 3])
            self.velocidade = 0.8
            self.cor_base = COR_ESTRELA_1
            self.chance_piscar = 0.01
        self.cor_atual = self.cor_base
        self.image = pygame.Surface((self.tamanho_pixel * PIXEL_SCALE, self.tamanho_pixel * PIXEL_SCALE))
        self.image.fill(self.cor_atual)
        self.rect = self.image.get_rect()
        self.rect.x = random.randrange(0, LARGURA_TELA)
        self.rect.y = random.randrange(0, ALTURA_TELA)
        self.piscando = False
        self.duracao_pisca = random.randint(3, 7)
        self.timer_pisca = 0

    def update(self):
        self.rect.y += self.velocidade
        if self.rect.top > ALTURA_TELA:
            self.rect.x = random.randrange(0, LARGURA_TELA)
            self.rect.y = random.randrange(-20 * PIXEL_SCALE, -5 * PIXEL_SCALE)
            if self.camada == 1: self.tamanho_pixel = random.choice([1, 2])
            elif self.camada == 2: self.tamanho_pixel = random.choice([2, 3])
            self.image = pygame.Surface((self.tamanho_pixel * PIXEL_SCALE, self.tamanho_pixel * PIXEL_SCALE))
            self.image.fill(self.cor_base)
        if self.piscando:
            self.timer_pisca -= 1
            if self.timer_pisca <= 0:
                self.piscando = False
                self.image.set_alpha(255)
            else:
                self.image.set_alpha(random.choice([80, 120, 180, 255]))
        elif random.random() < self.chance_piscar:
            self.piscando = True
            self.timer_pisca = self.duracao_pisca

class Planeta(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        self.raio_planeta = 20 * PIXEL_SCALE
        self.anel_largura = 50 * PIXEL_SCALE
        self.anel_altura = 10 * PIXEL_SCALE
        self.image_largura = self.anel_largura + 4 * PIXEL_SCALE
        self.image_altura = self.raio_planeta * 2 + self.anel_altura
        self.image = pygame.Surface((self.image_largura, self.image_altura), pygame.SRCALPHA)
        self.image.fill((0, 0, 0, 0))
        centro_x = self.image_largura // 2
        centro_y = self.image_altura // 2

        # Desenhar anéis traseiros
        for y in range(centro_y - self.anel_altura // 2, centro_y):
            width = int(self.anel_largura * math.sqrt(1 - ((y - centro_y) / (self.anel_altura / 2)) ** 2))
            x_start = centro_x - width // 2
            if y < centro_y - self.anel_altura // 4:
                pygame.draw.line(self.image, COR_SATURNO_ANEL_EXTERNO, (x_start, y), (x_start + width, y), PIXEL_SCALE)
            elif y < centro_y - self.anel_altura // 5:
                pass  # Cassini Division (gap)
            else:
                pygame.draw.line(self.image, COR_SATURNO_ANEL_INTERNO, (x_start, y), (x_start + width, y), PIXEL_SCALE)

        # Desenhar planeta com faixas de nuvens
        for y in range(centro_y - self.raio_planeta, centro_y + self.raio_planeta):
            width = int(2 * self.raio_planeta * math.sqrt(1 - ((y - centro_y) / self.raio_planeta) ** 2))
            x_start = centro_x - width // 2
            if abs(y - centro_y) < self.raio_planeta // 3:
                color = COR_SATURNO_FAIXA_1
            elif abs(y - centro_y) < 2 * self.raio_planeta // 3:
                color = COR_SATURNO_FAIXA_2
            else:
                color = COR_SATURNO_PLANETA
            pygame.draw.line(self.image, color, (x_start, y), (x_start + width, y), PIXEL_SCALE)

        # Desenhar sombra dos anéis no planeta
        shadow_y_start = centro_y - self.raio_planeta // 2
        for y in range(shadow_y_start, shadow_y_start + self.raio_planeta // 4):
            width = int(2 * self.raio_planeta * math.sqrt(1 - ((y - centro_y) / self.raio_planeta) ** 2))
            x_start = centro_x - width // 2
            pygame.draw.line(self.image, COR_SATURNO_SOMBRA, (x_start, y), (x_start + width, y), PIXEL_SCALE // 2)

        # Desenhar anéis frontais
        for y in range(centro_y, centro_y + self.anel_altura // 2):
            width = int(self.anel_largura * math.sqrt(1 - ((y - centro_y) / (self.anel_altura / 2)) ** 2))
            x_start = centro_x - width // 2
            if y > centro_y + self.anel_altura // 4:
                pygame.draw.line(self.image, COR_SATURNO_ANEL_EXTERNO, (x_start, y), (x_start + width, y), PIXEL_SCALE)
            elif y > centro_y + self.anel_altura // 5:
                pass  # Cassini Division (gap)
            else:
                pygame.draw.line(self.image, COR_SATURNO_ANEL_INTERNO, (x_start, y), (x_start + width, y), PIXEL_SCALE)

        self.rect = self.image.get_rect()
        self.rect.centerx = x
        self.rect.centery = y
        self.velocidade_y = 0.05

    def update(self):
        self.rect.y += self.velocidade_y
        if self.rect.top > ALTURA_TELA:
            self.rect.bottom = -self.image_altura
            self.rect.centerx = random.randint(self.image_largura // 2, LARGURA_TELA - self.image_largura // 2)

class Cometa(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.largura_max_cauda = 8 * PIXEL_SCALE
        self.altura_max_cauda = 2 * PIXEL_SCALE
        self.comprimento_cauda = random.randint(12, 24) * PIXEL_SCALE
        self.image_dim = int(self.comprimento_cauda * 1.5)
        self.image = pygame.Surface((self.image_dim, self.image_dim), pygame.SRCALPHA)
        self.image.fill((0,0,0,0))
        self.rect = self.image.get_rect()
        self.angle = random.uniform(math.radians(200), math.radians(340))
        self.speed = random.uniform(2.0, 4.0) * PIXEL_SCALE / 4
        self.wobble = random.uniform(0.1, 0.3)
        start_side = random.choice(["top", "left", "right"])
        if start_side == "top":
            self.pos_x = random.uniform(0, LARGURA_TELA)
            self.pos_y = -self.image_dim
        elif start_side == "left":
            self.pos_x = -self.image_dim
            self.pos_y = random.uniform(0, ALTURA_TELA / 2)
            self.angle = random.uniform(math.radians(280), math.radians(350))
        else:
            self.pos_x = LARGURA_TELA + self.image_dim
            self.pos_y = random.uniform(0, ALTURA_TELA / 2)
            self.angle = random.uniform(math.radians(190), math.radians(260))
        self.rect.topleft = (int(self.pos_x), int(self.pos_y))
        self.vel_x = math.cos(self.angle) * self.speed
        self.vel_y = math.sin(self.angle) * self.speed
        self.time = 0
        self._desenhar_cometa()

    def _desenhar_cometa(self):
        self.image.fill((0,0,0,0))
        cabeca_x_local = self.image_dim // 2
        cabeca_y_local = self.image_dim // 2
        raio_cabeca = 2 * PIXEL_SCALE
        pygame.draw.circle(self.image, COR_COMETA_CABECA, (cabeca_x_local, cabeca_y_local), raio_cabeca)
        pygame.draw.circle(self.image, BRANCO, (cabeca_x_local, cabeca_y_local), raio_cabeca // 2)
        for i in range(1, int(self.comprimento_cauda / PIXEL_SCALE)):
            dist_da_cabeca = i * PIXEL_SCALE * 0.8
            wobble_offset = math.sin(self.time + i * 0.5) * self.wobble * PIXEL_SCALE
            offset_x = -math.cos(self.angle) * dist_da_cabeca + wobble_offset
            offset_y = -math.sin(self.angle) * dist_da_cabeca
            segmento_x = cabeca_x_local + int(offset_x)
            segmento_y = cabeca_y_local + int(offset_y)
            fator_diminuicao = (1 - (i * PIXEL_SCALE / self.comprimento_cauda))
            tamanho_segmento = max(1 * PIXEL_SCALE, int((2 * PIXEL_SCALE) * fator_diminuicao**2))
            cor_segmento = COR_COMETA_CAUDA_1 if fator_diminuicao > 0.5 else COR_COMETA_CAUDA_2
            alpha = int(200 * fator_diminuicao)
            cor_com_alpha = (*cor_segmento, alpha)
            temp_surf_seg = pygame.Surface((tamanho_segmento, tamanho_segmento), pygame.SRCALPHA)
            temp_surf_seg.fill((0,0,0,0))
            pygame.draw.circle(temp_surf_seg, cor_com_alpha, (tamanho_segmento//2, tamanho_segmento//2), tamanho_segmento//2)
            self.image.blit(temp_surf_seg, (segmento_x - tamanho_segmento//2, segmento_y - tamanho_segmento//2))

    def update(self):
        self.time += 0.1
        self.pos_x += self.vel_x
        self.pos_y += self.vel_y
        self.rect.x = int(self.pos_x)
        self.rect.y = int(self.pos_y)
        self._desenhar_cometa()
        if self.rect.right < -self.image_dim or \
           self.rect.left > LARGURA_TELA + self.image_dim or \
           self.rect.bottom < -self.image_dim or \
           self.rect.top > ALTURA_TELA + self.image_dim:
            self.kill()

class PowerUp(pygame.sprite.Sprite):
    def __init__(self, x, y, tipo):
        super().__init__()
        self.tipo = tipo
        cor = {
            'vida': COR_POWERUP_VIDA,
            'shoot': COR_POWERUP_SHOOT,
            'shield': COR_POWERUP_SHIELD,
            'multi': COR_POWERUP_MULTI,
            'speed': COR_POWERUP_SPEED,
            'homing': COR_POWERUP_HOMING
        }[tipo]
        self.frames, _ = criar_sprite_pixel_art(POWERUP_PIXEL_MAP, cor, escala=PIXEL_SCALE)
        self.image = self.frames[0]
        self.rect = self.image.get_rect(center=(x, y))
        self.vel_y = 2
        self.pulse_timer = 0
        self.pulse_direction = 1
        self.glow_surface = pygame.Surface((self.rect.width + 10, self.rect.height + 10), pygame.SRCALPHA)
        pygame.draw.rect(self.glow_surface, (*cor[:3], 100), (0, 0, self.rect.width + 10, self.rect.height + 10), border_radius=5)

    def update(self):
        self.rect.y += self.vel_y
        self.pulse_timer += 0.05
        scale = 1 + 0.1 * math.sin(self.pulse_timer)
        self.image = pygame.transform.scale(self.frames[0], (int(self.frames[0].get_width() * scale), int(self.frames[0].get_height() * scale)))
        self.rect = self.image.get_rect(center=self.rect.center)
        if self.rect.top > ALTURA_TELA:
            self.kill()

class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.base_frames, _ = criar_sprite_pixel_art(PLAYER_PIXEL_MAP_BASE, VERDE_JOGADOR)
        self.base_image = self.base_frames[0]
        self.thruster_anim_frames = []
        for p_map, cor in PLAYER_THRUSTER_MAPS:
            frames, _ = criar_sprite_pixel_art(p_map, cor, escala=PIXEL_SCALE)
            self.thruster_anim_frames.append(frames[0])
        self.thruster_frame_atual = 0
        self.thruster_anim_delay = 0.06
        self.thruster_ultimo_update = pygame.time.get_ticks()
        self.altura_base = self.base_image.get_height()
        self.altura_thruster_max = max(f.get_height() for f in self.thruster_anim_frames)
        self.largura_total = self.base_image.get_width()
        self.altura_total = self.altura_base + self.altura_thruster_max
        self.image = pygame.Surface((self.largura_total, self.altura_total + PIXEL_SCALE), pygame.SRCALPHA)
        self.rect = self.image.get_rect()
        self.rect.centerx = LARGURA_TELA // 2
        self.rect.bottom = ALTURA_TELA - 20
        self.velocidade = 8
        self.cooldown_tiro = 300
        self.ultimo_tiro = pygame.time.get_ticks()
        self.shield_active = False
        self.shield_duration = 5000
        self.shield_start = 0
        self.shield_cooldown = 15000
        self.shield_last_used = -self.shield_cooldown
        self.multi_shot_active = False
        self.multi_shot_duration = 10000
        self.multi_shot_start = 0
        self.speed_boost_active = False
        self.speed_boost_duration = 10000
        self.speed_boost_start = 0
        self.homing_active = False
        self.homing_duration = 10000
        self.homing_start = 0
        self.particles = []
        self.combo = 0
        self._atualizar_imagem_composta()

    def _atualizar_imagem_composta(self):
        self.image.fill((0,0,0,0))
        pos_base_x = (self.largura_total - self.base_image.get_width()) // 2
        self.image.blit(self.base_image, (pos_base_x, 0))
        if self.thruster_anim_frames:
            thruster_img_atual = self.thruster_anim_frames[self.thruster_frame_atual]
            pos_thruster_x = (self.largura_total - thruster_img_atual.get_width()) // 2
            pos_thruster_y = self.altura_base
            self.image.blit(thruster_img_atual, (pos_thruster_x, pos_thruster_y))
        if self.shield_active:
            shield_surface = pygame.Surface((self.largura_total + 10, self.altura_total + 10), pygame.SRCALPHA)
            pygame.draw.ellipse(shield_surface, COR_SHIELD, (0, 0, self.largura_total + 10, self.altura_total + 10))
            self.image.blit(shield_surface, (-5, -5))
        for particle in self.particles[:]:
            alive, alpha = particle.update()
            if not alive:
                self.particles.remove(particle)
            else:
                particle.draw(self.image)

    def update(self):
        teclas = pygame.key.get_pressed()
        velocidade = self.velocidade * 1.5 if self.speed_boost_active else self.velocidade
        if teclas[pygame.K_LEFT] and self.rect.left > 0:
            self.rect.x -= velocidade
        if teclas[pygame.K_RIGHT] and self.rect.right < LARGURA_TELA:
            self.rect.x += velocidade
        if teclas[pygame.K_s] and not self.shield_active:
            agora = pygame.time.get_ticks()
            if agora - self.shield_last_used > self.shield_cooldown:
                self.shield_active = True
                self.shield_start = agora
                self.shield_last_used = agora
        agora = pygame.time.get_ticks()
        if self.shield_active and agora - self.shield_start > self.shield_duration:
            self.shield_active = False
        if self.multi_shot_active and agora - self.multi_shot_start > self.multi_shot_duration:
            self.multi_shot_active = False
        if self.speed_boost_active and agora - self.speed_boost_start > self.speed_boost_duration:
            self.speed_boost_active = False
        if self.homing_active and agora - self.homing_start > self.homing_duration:
            self.homing_active = False
        if agora - self.thruster_ultimo_update > self.thruster_anim_delay * 1000:
            self.thruster_ultimo_update = agora
            self.thruster_frame_atual = (self.thruster_frame_atual + 1) % len(self.thruster_anim_frames)
            self._atualizar_imagem_composta()
        if random.random() < 0.1:
            particle_x = self.rect.centerx
            particle_y = self.rect.bottom
            self.particles.append(Particle(particle_x, particle_y, THRUSTER_COR_1, random.uniform(1, 3), random.uniform(math.radians(90), math.radians(270)), 20))

    def atirar(self, todos_sprites, grupo_projeteis_jogador, aliens):
        agora = pygame.time.get_ticks()
        if agora - self.ultimo_tiro > self.cooldown_tiro:
            self.ultimo_tiro = agora
            pos_tiro_y = self.rect.top + (self.altura_base * 0.2)
            if self.multi_shot_active:
                offsets = [-15, 0, 15]
                for offset in offsets:
                    projetil = Projetil(self.rect.centerx + offset, pos_tiro_y, AZUL_JOGADOR_PROJETIL, -12, is_homing=self.homing_active, aliens=aliens)
                    todos_sprites.add(projetil)
                    grupo_projeteis_jogador.add(projetil)
            else:
                projetil = Projetil(self.rect.centerx, pos_tiro_y, AZUL_JOGADOR_PROJETIL, -12, is_homing=self.homing_active, aliens=aliens)
                todos_sprites.add(projetil)
                grupo_projeteis_jogador.add(projetil)

class Alien(pygame.sprite.Sprite):
    def __init__(self, x, y, tipo):
        super().__init__()
        mapa_pixels_alien_data = {
            1: (ALIEN_1_PIXEL_MAPS, random.choice(COR_ALIEN_1), 0.5, 10, 0.1),
            2: (ALIEN_2_PIXEL_MAPS, random.choice(COR_ALIEN_2), 0.4, 20, 0.15),
            3: (ALIEN_3_PIXEL_MAPS, random.choice(COR_ALIEN_3), 0.3, 30, 0.2),
            4: (ALIEN_BOSS_PIXEL_MAPS, random.choice(COR_ALIEN_BOSS), 0.6, 100, 0.05),  # Boss
            5: (ALIEN_STEALTH_PIXEL_MAPS, random.choice(COR_ALIEN_STEALTH), 0.5, 15, 0.3)  # Stealth
        }[tipo]
        self.frames, self.anim_delay = criar_sprite_pixel_art(mapa_pixels_alien_data[0], mapa_pixels_alien_data[1], anim_delay=mapa_pixels_alien_data[2])
        self.frame_atual = 0
        self.image = self.frames[self.frame_atual]
        self.rect = self.image.get_rect()
        self.rect.topleft = (x, y)
        self.ultimo_update_anim = pygame.time.get_ticks()
        self.pontos = mapa_pixels_alien_data[3]
        self.is_swooping = random.random() < mapa_pixels_alien_data[4] * tipo
        self.swoop_angle = 0
        self.swoop_speed = 2 if self.is_swooping else 0
        self.tipo = tipo
        self.vida = 3 if tipo == 4 else 1  # Boss tem mais vida
        self.is_cloaked = False if tipo != 5 else True
        self.cloak_timer = 0
        self.cloak_interval = random.randint(100, 200)

    def update(self, vel_x_alien, vel_y_alien):
        if self.tipo == 4:  # Boss movement
            self.rect.x += math.sin(pygame.time.get_ticks() / 1000) * 2
            self.rect.y += vel_y_alien * 0.5
        elif self.tipo == 5:  # Stealth movement
            self.cloak_timer += 1
            if self.cloak_timer > self.cloak_interval:
                self.is_cloaked = not self.is_cloaked
                self.cloak_timer = 0
                self.image.set_alpha(100 if self.is_cloaked else 255)
            self.rect.x += vel_x_alien * 1.5
            self.rect.y += vel_y_alien
        elif self.is_swooping:
            self.swoop_angle += 0.05
            self.rect.y += math.sin(self.swoop_angle) * self.swoop_speed
            self.rect.x += vel_x_alien
        else:
            self.rect.x += vel_x_alien
            self.rect.y += vel_y_alien
        agora = pygame.time.get_ticks()
        if agora - self.ultimo_update_anim > self.anim_delay * 1000:
            self.ultimo_update_anim = agora
            self.frame_atual = (self.frame_atual + 1) % len(self.frames)
            self.image = self.frames[self.frame_atual]
            if self.tipo == 5 and self.is_cloaked:
                self.image.set_alpha(100)

class Projetil(pygame.sprite.Sprite):
    def __init__(self, x, y, cor, velocidade_y, is_homing=False, aliens=None):
        super().__init__()
        self.frames, self.anim_delay = criar_sprite_pixel_art(LASER_PIXEL_MAPS, cor, anim_delay=0.1)
        self.frame_atual = 0
        self.image = self.frames[self.frame_atual]
        self.rect = self.image.get_rect()
        self.rect.centerx = x
        self.rect.centery = y
        self.velocidade_y = velocidade_y
        self.ultimo_update = pygame.time.get_ticks()
        self.is_homing = is_homing
        self.aliens = aliens
        self.target = None
        self.particles = []
        self.particle_timer = 0

    def update(self):
        agora = pygame.time.get_ticks()
        if agora - self.ultimo_update > self.anim_delay * 1000:
            self.ultimo_update = agora
            self.frame_atual = (self.frame_atual + 1) % len(self.frames)
            self.image = self.frames[self.frame_atual]
        self.particle_timer += 1
        if self.particle_timer > 5:
            self.particle_timer = 0
            self.particles.append(Particle(self.rect.centerx, self.rect.bottom, AZUL_JOGADOR_PROJETIL, random.uniform(1, 2), math.radians(90), 10, size_range=(1, 2)))
        if self.is_homing and self.aliens:
            if not self.target or self.target not in self.aliens:
                self.target = min(self.aliens, key=lambda a: math.hypot(a.rect.centerx - self.rect.centerx, a.rect.centery - self.rect.centery), default=None)
            if self.target:
                dx = self.target.rect.centerx - self.rect.centerx
                dy = self.target.rect.centery - self.rect.centery
                dist = math.hypot(dx, dy)
                if dist > 0:
                    self.rect.x += (dx / dist) * 2
                    self.rect.y += (dy / dist) * 2
        else:
            self.rect.y += self.velocidade_y
        self.particles = [p for p in self.particles if p.update()[0]]
        if self.rect.bottom < 0 or self.rect.top > ALTURA_TELA:
            self.kill()

    def draw(self, surface):
        surface.blit(self.image, self.rect)
        for particle in self.particles:
            particle.draw(surface)

class BarreiraSegmento(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        self.frames, _ = criar_sprite_pixel_art(BARREIRA_SEGMENTO_PIXEL_MAP, COR_BARREIRA, escala=PIXEL_SCALE * 2)
        self.image = self.frames[0]
        self.rect = self.image.get_rect()
        self.rect.topleft = (x, y)
        self.vida = 4

    def atingido(self):
        self.vida -= 1
        if self.vida <= 0:
            self.kill()
        else:
            alpha = max(50, 255 * (self.vida / 4))
            self.image.set_alpha(int(alpha))

class Explosao(pygame.sprite.Sprite):
    def __init__(self, center, tamanho='pequeno'):
        super().__init__()
        # Escolher uma única cor para cada frame da explosão
        if tamanho == 'pequeno':
            colors = COR_EXPLOSAO_1
            num_particles = 15
            self.anim_delay = 0.05
        else:
            colors = COR_EXPLOSAO_2
            num_particles = 30
            self.anim_delay = 0.06
        self.frames = []
        for i, p_map in enumerate(EXPLOSAO_PIXEL_MAPS):
            # Usar uma cor diferente para cada frame, ciclando pela lista de cores
            cor = colors[i % len(colors)]
            frame, _ = criar_sprite_pixel_art([p_map], cor, anim_delay=self.anim_delay)
            self.frames.append(frame[0])
        self.frame_atual = 0
        self.image = self.frames[self.frame_atual]
        self.rect = self.image.get_rect(center=center)
        self.ultimo_update = pygame.time.get_ticks()
        # Escolher uma única cor para as partículas
        particle_color = random.choice(colors)
        self.particles = [Particle(center[0], center[1], particle_color, 
                                  random.uniform(2, 6), random.uniform(0, 2*math.pi), random.randint(15, 25), 
                                  size_range=(2, 4) if tamanho == 'grande' else (1, 3)) for _ in range(num_particles)]

    def update(self):
        agora = pygame.time.get_ticks()
        if agora - self.ultimo_update > self.anim_delay * 1000:
            self.ultimo_update = agora
            self.frame_atual += 1
            if self.frame_atual == len(self.frames):
                self.kill()
            else:
                center = self.rect.center
                self.image = self.frames[self.frame_atual]
                self.rect = self.image.get_rect(center=center)
        self.particles = [p for p in self.particles if p.update()[0]]

class Game:
    def __init__(self):
        pygame.init()
        self.tela = pygame.display.set_mode((LARGURA_TELA, ALTURA_TELA))
        pygame.display.set_caption("Space Invaders Pixel Remix")
        self.fonte_hud = pygame.font.Font(None, 30)
        self.fonte_titulo = pygame.font.Font(None, 74)
        self.fonte_media = pygame.font.Font(None, 50)
        self.rodando = True
        self.estado_jogo = "tela_inicio"
        self.todos_sprites = pygame.sprite.Group()
        self.grupo_estrelas = pygame.sprite.Group()
        self.grupo_elementos_distantes = pygame.sprite.Group()
        self.grupo_cometas = pygame.sprite.Group()
        self.grupo_nebulas = pygame.sprite.Group()
        self.aliens = pygame.sprite.Group()
        self.projeteis_jogador = pygame.sprite.Group()
        self.projeteis_aliens = pygame.sprite.Group()
        self.barreiras = pygame.sprite.Group()
        self.powerups = pygame.sprite.Group()
        self.jogador = None
        self.pontuacao = 0
        self.vidas = 3
        self.nivel = 1
        self.vel_x_alien_base = 1.5 * PIXEL_SCALE / 2
        self.vel_x_alien = self.vel_x_alien_base
        self.vel_y_alien_descida = 12 * PIXEL_SCALE / 4
        self.chance_tiro_alien = 0.002
        self.alien_move_timer_max = 50
        self.alien_move_timer = 0
        self.alien_direcao_descida_pendente = False
        self.chance_spawn_cometa = 0.008
        self.max_cometas_na_tela = 3
        self.combo = 0
        self.combo_timer = 0
        self.score_flash = 0
        self.shake_offset = (0, 0)
        self.shake_frames = []
        self.criar_cenario_detalhado()
        self.background = self.criar_background()

    def criar_background(self):
        background = pygame.Surface((LARGURA_TELA, ALTURA_TELA))
        background.fill(FUNDO_ESPACO)
        gradient = pygame.Surface((LARGURA_TELA, ALTURA_TELA // 2), pygame.SRCALPHA)
        for y in range(ALTURA_TELA // 2):
            alpha = int(50 * (1 - y / (ALTURA_TELA // 2)))
            pygame.draw.line(gradient, (100, 100, 150, alpha), (0, y), (LARGURA_TELA, y))
        background.blit(gradient, (0, 0))
        return background

    def criar_cenario_detalhado(self):
        self.grupo_estrelas.empty()
        self.grupo_elementos_distantes.empty()
        self.grupo_cometas.empty()
        self.grupo_nebulas.empty()
        num_estrelas_camada_0 = 80
        num_estrelas_camada_1 = 60
        num_estrelas_camada_2 = 40
        for _ in range(num_estrelas_camada_0): self.grupo_estrelas.add(Estrela(camada=0))
        for _ in range(num_estrelas_camada_1): self.grupo_estrelas.add(Estrela(camada=1))
        for _ in range(num_estrelas_camada_2): self.grupo_estrelas.add(Estrela(camada=2))
        saturno = Planeta(LARGURA_TELA // 4, ALTURA_TELA // 3)
        self.grupo_elementos_distantes.add(saturno)
        for _ in range(3):
            size = random.choice([200, 300, 400])
            x = random.randint(size // 2, LARGURA_TELA - size // 2)
            y = random.randint(size // 2, ALTURA_TELA - size // 2)
            nebula = Nebula(x, y, size)
            self.grupo_nebulas.add(nebula)
        self.grupo_nebulas.add(nebula)

    def gerenciar_cometas(self):
        if len(self.grupo_cometas) < self.max_cometas_na_tela and random.random() < self.chance_spawn_cometa:
            cometa = Cometa()
            self.grupo_cometas.add(cometa)

    def resetar_jogo_completo(self):
        self.pontuacao = 0
        self.vidas = 3
        self.nivel = 1
        self.combo = 0
        self.combo_timer = 0
        self.criar_cenario_detalhado()
        self.iniciar_nova_onda()
        self.estado_jogo = "jogando"

    def iniciar_nova_onda(self):
        self.todos_sprites.empty()
        self.aliens.empty()
        self.projeteis_jogador.empty()
        self.projeteis_aliens.empty()
        self.barreiras.empty()
        self.powerups.empty()
        self.jogador = Player()
        self.todos_sprites.add(self.jogador)
        self.criar_aliens()
        self.criar_barreiras()
        self.vel_x_alien = self.vel_x_alien_base + (self.nivel - 1) * 0.3
        self.chance_tiro_alien = 0.002 + (self.nivel - 1) * 0.0008
        self.alien_move_timer_max = max(10, 50 - (self.nivel - 1) * 5)

    def criar_aliens(self):
        num_linhas = 5
        num_colunas = 11
        espacamento_x = len(ALIEN_1_PIXEL_MAPS[0][0]) * PIXEL_SCALE * 1.8
        espacamento_y = len(ALIEN_1_PIXEL_MAPS[0]) * PIXEL_SCALE * 1.5
        offset_x = (LARGURA_TELA - (num_colunas - 1) * espacamento_x) / 2
        offset_y = 60 + 40
        if self.nivel % 5 == 0:  # Boss level
            x = LARGURA_TELA // 2
            y = offset_y
            alien = Alien(x, y, 4)  # Boss
            self.todos_sprites.add(alien)
            self.aliens.add(alien)
        else:
            for linha in range(num_linhas):
                for coluna in range(num_colunas):
                    x = offset_x + coluna * espacamento_x
                    y = offset_y + linha * espacamento_y
                    tipo_alien = 5 if random.random() < 0.1 else (3 if linha < 1 else 2 if linha < 3 else 1)
                    alien = Alien(x, y, tipo_alien)
                    self.todos_sprites.add(alien)
                    self.aliens.add(alien)

    def criar_barreiras(self):
        num_barreiras = 4
        largura_barreira_total = LARGURA_TELA / (num_barreiras + 1)
        segmento_largura = len(BARREIRA_SEGMENTO_PIXEL_MAP[0]) * PIXEL_SCALE * 2
        segmento_altura = len(BARREIRA_SEGMENTO_PIXEL_MAP) * PIXEL_SCALE * 2
        y_base_barreira = ALTURA_TELA - 130
        for i in range(num_barreiras):
            centro_x_barreira = (i + 1) * largura_barreira_total
            for col_idx in range(4):
                for lin_idx in range(3):
                    if not (lin_idx == 0 and col_idx in [1, 2]):
                        x_offset_multiplicador = col_idx - 1.5
                        x = centro_x_barreira + (x_offset_multiplicador * segmento_largura)
                        y = y_base_barreira - ((2 - lin_idx) * segmento_altura)
                        segmento = BarreiraSegmento(x, y)
                        self.todos_sprites.add(segmento)
                        self.barreiras.add(segmento)

    def mover_aliens(self):
        self.alien_move_timer += 1
        multiplicador_velocidade = max(0.1, len(self.aliens) / (5.0 * 11.0)) + 0.3 if self.aliens else 1.0
        if self.alien_move_timer < self.alien_move_timer_max * multiplicador_velocidade:
            return
        self.alien_move_timer = 0
        current_vel_x = 0
        current_vel_y = 0
        if self.alien_direcao_descida_pendente:
            current_vel_y = self.vel_y_alien_descida
            self.vel_x_alien *= -1
            self.alien_direcao_descida_pendente = False
        else:
            current_vel_x = self.vel_x_alien
            mover_para_baixo_neste_ciclo = False
            for alien in self.aliens:
                next_x = alien.rect.x + current_vel_x
                if (next_x + alien.rect.width > LARGURA_TELA - PIXEL_SCALE*2 and current_vel_x > 0) or \
                   (next_x < PIXEL_SCALE*2 and current_vel_x < 0):
                    mover_para_baixo_neste_ciclo = True
                    break
            if mover_para_baixo_neste_ciclo:
                self.alien_direcao_descida_pendente = True
                current_vel_x = 0
        for alien in self.aliens:
            alien.update(current_vel_x, current_vel_y)

    def aliens_atiram(self):
        for alien in self.aliens:
            chance_base = self.chance_tiro_alien * (2 if alien.tipo == 4 else 1)
            modificador_quantidade = (1 + ((5*11) - len(self.aliens)) / (5*11.0)) * 2
            if random.random() < chance_base * modificador_quantidade:
                projetil = Projetil(alien.rect.centerx, alien.rect.bottom, VERMELHO_ALIEN_PROJETIL, 6)
                self.todos_sprites.add(projetil)
                self.projeteis_aliens.add(projetil)

    def checar_colisoes(self):
        atingidos = pygame.sprite.groupcollide(self.aliens, self.projeteis_jogador, False, True)
        for alien_atingido, projeteis in atingidos.items():
            if alien_atingido.tipo == 5 and alien_atingido.is_cloaked:
                continue  # Ignore hits on cloaked stealth aliens
            alien_atingido.vida -= len(projeteis)
            if alien_atingido.vida <= 0:
                alien_atingido.kill()
                self.combo += 1
                self.combo_timer = pygame.time.get_ticks()
                multiplier = min(self.combo // 5 + 1, 5)
                self.pontuacao += alien_atingido.pontos * multiplier
                self.score_flash = 30
                tamanho = 'grande' if alien_atingido.tipo == 4 else 'pequeno'
                expl = Explosao(alien_atingido.rect.center, tamanho)
                self.todos_sprites.add(expl)
                self.shake_frames = screen_shake(5, 10) if tamanho == 'grande' else []
                if random.random() < 0.15:
                    tipo_powerup = random.choice(['vida', 'shoot', 'shield', 'multi', 'speed', 'homing'])
                    powerup = PowerUp(alien_atingido.rect.centerx, alien_atingido.rect.centery, tipo_powerup)
                    self.todos_sprites.add(powerup)
                    self.powerups.add(powerup)
            if not self.aliens:
                self.nivel += 1
                self.mostrar_mensagem_temporaria(f"Nível {self.nivel}!", 1.5)
                self.iniciar_nova_onda()
                return

        if self.jogador:
            powerup_hits = pygame.sprite.spritecollide(self.jogador, self.powerups, True)
            for powerup in powerup_hits:
                if powerup.tipo == 'vida':
                    self.vidas = min(self.vidas + 1, 5)
                elif powerup.tipo == 'shoot':
                    self.jogador.cooldown_tiro = max(100, self.jogador.cooldown_tiro - 50)
                elif powerup.tipo == 'shield':
                    self.jogador.shield_active = True
                    self.jogador.shield_start = pygame.time.get_ticks()
                elif powerup.tipo == 'multi':
                    self.jogador.multi_shot_active = True
                    self.jogador.multi_shot_start = pygame.time.get_ticks()
                elif powerup.tipo == 'speed':
                    self.jogador.speed_boost_active = True
                    self.jogador.speed_boost_start = pygame.time.get_ticks()
                elif powerup.tipo == 'homing':
                    self.jogador.homing_active = True
                    self.jogador.homing_start = pygame.time.get_ticks()

            if not self.jogador.shield_active and pygame.sprite.spritecollide(self.jogador, self.projeteis_aliens, True):
                self.vidas -= 1
                self.combo = 0
                expl = Explosao(self.jogador.rect.center, 'grande')
                self.todos_sprites.add(expl)
                self.shake_frames = screen_shake(5, 10)
                for _ in range(20):
                    self.jogador.particles.append(Particle(self.jogador.rect.centerx, self.jogador.rect.centery, VERDE_JOGADOR, random.uniform(2, 6), random.uniform(0, 2*math.pi), 30))
                if self.vidas <= 0:
                    self.estado_jogo = "game_over"
                    if self.jogador: self.jogador.kill()
                else:
                    self.jogador.rect.centerx = LARGURA_TELA // 2
                    self.mostrar_mensagem_temporaria(f"Vidas restantes: {self.vidas}", 1)

        pygame.sprite.groupcollide(self.projeteis_jogador, self.barreiras, True, False, collided=lambda p,b: self.colisao_projetil_barreira(p,b))
        pygame.sprite.groupcollide(self.projeteis_aliens, self.barreiras, True, False, collided=lambda p,b: self.colisao_projetil_barreira(p,b))
        if pygame.sprite.groupcollide(self.aliens, self.barreiras, False, True):
            pass
        if self.jogador and not self.jogador.shield_active:
            aliens_collided = pygame.sprite.spritecollide(self.jogador, self.aliens, False)
            for alien in aliens_collided:
                if alien.tipo == 5 and alien.is_cloaked:
                    continue
                self.vidas = 0
                expl = Explosao(self.jogador.rect.center, 'grande')
                self.todos_sprites.add(expl)
                self.shake_frames = screen_shake(5, 10)
                for _ in range(20):
                    self.jogador.particles.append(Particle(self.jogador.rect.centerx, self.jogador.rect.centery, VERDE_JOGADOR, random.uniform(2, 6), random.uniform(0, 2*math.pi), 30))
                self.estado_jogo = "game_over"
                if self.jogador: self.jogador.kill()
            for alien in self.aliens:
                if self.jogador and alien.rect.bottom > self.jogador.rect.top:
                    self.vidas = 0
                    self.estado_jogo = "game_over"
                    expl_jogador = Explosao(self.jogador.rect.center, 'grande')
                    self.todos_sprites.add(expl_jogador)
                    self.shake_frames = screen_shake(5, 10)
                    for _ in range(20):
                        self.jogador.particles.append(Particle(self.jogador.rect.centerx, self.jogador.rect.centery, VERDE_JOGADOR, random.uniform(2, 6), random.uniform(0, 2*math.pi), 30))
                    if self.jogador: self.jogador.kill()
                    for a_restante in self.aliens:
                        expl_a = Explosao(a_restante.rect.center, 'pequeno')
                        self.todos_sprites.add(expl_a)
                        a_restante.kill()
                    break

    def colisao_projetil_barreira(self, projetil, barreira_segmento):
        barreira_segmento.atingido()
        # Usar uma única cor para a explosão da barreira
        expl = Explosao(projetil.rect.center, 'pequeno')
        expl.frames, expl.anim_delay = criar_sprite_pixel_art([["1"]], COR_BARREIRA, escala=PIXEL_SCALE, anim_delay=0.05)
        self.todos_sprites.add(expl)
        return True

    def desenhar_hud(self):
        hud_altura = 50
        hud_surface = pygame.Surface((LARGURA_TELA, hud_altura), pygame.SRCALPHA)
        pygame.draw.rect(hud_surface, COR_HUD_FUNDO, (0, 0, LARGURA_TELA, hud_altura), border_radius=10)
        self.tela.blit(hud_surface, (0, 0))
        pygame.draw.line(self.tela, BRANCO, (0, hud_altura), (LARGURA_TELA, hud_altura), 2)
        score_color = (255, 255, 0) if self.score_flash > 0 else COR_TEXTO
        self.score_flash = max(0, self.score_flash - 1)
        texto_score = self.fonte_hud.render(f"PONTOS: {self.pontuacao}", True, score_color)
        self.tela.blit(texto_score, (20, 15))
        if self.combo > 0:
            combo_text = self.fonte_hud.render(f"Combo: x{min(self.combo // 5 + 1, 5)}", True, (255, 100, 100))
            self.tela.blit(combo_text, (20, 35))
        vida_frames, _ = criar_sprite_pixel_art(PLAYER_PIXEL_MAP_BASE, VERDE_JOGADOR, escala=PIXEL_SCALE // 2)
        if vida_frames:
            vida_sprite = vida_frames[0]
            for i in range(self.vidas):
                self.tela.blit(vida_sprite, (LARGURA_TELA - (i + 1) * (vida_sprite.get_width() + 10) - 20, 15))
        texto_nivel = self.fonte_hud.render(f"NÍVEL: {self.nivel}", True, COR_TEXTO)
        self.tela.blit(texto_nivel, ((LARGURA_TELA - texto_nivel.get_width()) // 2, 15))
        if self.jogador:
            if self.jogador.shield_active:
                shield_text = self.fonte_hud.render("Escudo Ativo!", True, COR_SHIELD)
                self.tela.blit(shield_text, (LARGURA_TELA - shield_text.get_width() - 20, 35))
            if self.jogador.multi_shot_active:
                multi_text = self.fonte_hud.render("Multi-Shot!", True, COR_POWERUP_MULTI)
                self.tela.blit(multi_text, (LARGURA_TELA - multi_text.get_width() - 20, 55))
            if self.jogador.speed_boost_active:
                speed_text = self.fonte_hud.render("Speed Boost!", True, COR_POWERUP_SPEED)
                self.tela.blit(speed_text, (LARGURA_TELA - speed_text.get_width() - 20, 75))
            if self.jogador.homing_active:
                homing_text = self.fonte_hud.render("Homing Missiles!", True, COR_POWERUP_HOMING)
                self.tela.blit(homing_text, (LARGURA_TELA - homing_text.get_width() - 20, 95))

    def mostrar_mensagem_temporaria(self, texto, duracao_segundos):
        tela_anterior = self.tela.copy()
        s = pygame.Surface((LARGURA_TELA, ALTURA_TELA), pygame.SRCALPHA)
        s.fill((0,0,0,128))
        self.tela.blit(s, (0,0))
        texto_surf = self.fonte_media.render(texto, True, BRANCO)
        texto_rect = texto_surf.get_rect(center=(LARGURA_TELA / 2, ALTURA_TELA / 2))
        self.tela.blit(texto_surf, texto_rect)
        pygame.display.flip()
        pygame.time.wait(int(duracao_segundos * 1000))
        self.tela.blit(tela_anterior, (0,0))

    def tela_de_inicio(self):
        temp_estrelas = pygame.sprite.Group()
        temp_nebulas = pygame.sprite.Group()
        for _ in range(60): temp_estrelas.add(Estrela(random.randint(0,2)))
        for _ in range(2):
            size = random.choice([200, 300])
            x = random.randint(size // 2, LARGURA_TELA - size // 2)
            y = random.randint(size // 2, ALTURA_TELA - size // 2)
            temp_nebulas.add(Nebula(x, y, size))
        temp_planeta = Planeta(LARGURA_TELA * 0.7, ALTURA_TELA * 0.3)
        esperando_input = True
        while esperando_input and self.rodando:
            for evento in pygame.event.get():
                if evento.type == pygame.QUIT: self.rodando = False
                if evento.type == pygame.KEYDOWN:
                    if evento.key == pygame.K_RETURN:
                        self.resetar_jogo_completo()
                        esperando_input = False
                    if evento.key == pygame.K_ESCAPE: self.rodando = False
            self.tela.blit(self.background, (0, 0))
            temp_nebulas.update()
            temp_nebulas.draw(self.tela)
            temp_planeta.update()
            self.tela.blit(temp_planeta.image, temp_planeta.rect)
            temp_estrelas.update()
            temp_estrelas.draw(self.tela)
            titulo = self.fonte_titulo.render("SPACE INVADERS", True, VERDE_JOGADOR)
            subtitulo = self.fonte_media.render("Pixel Remix", True, BRANCO)
            instrucao = self.fonte_hud.render("Pressione ENTER para começar, S para escudo", True, BRANCO)
            self.tela.blit(titulo, (LARGURA_TELA // 2 - titulo.get_width() // 2, ALTURA_TELA // 2 - 100))
            self.tela.blit(subtitulo, (LARGURA_TELA // 2 - subtitulo.get_width() // 2, ALTURA_TELA // 2 - 40))
            self.tela.blit(instrucao, (LARGURA_TELA // 2 - instrucao.get_width() // 2, ALTURA_TELA // 2 + 50))
            pygame.display.flip()
            pygame.time.wait(1000 // 15)

    def tela_game_over(self):
        temp_estrelas = pygame.sprite.Group()
        temp_nebulas = pygame.sprite.Group()
        for _ in range(60): temp_estrelas.add(Estrela(random.randint(0,2)))
        for _ in range(2):
            size = random.choice([200, 300])
            x = random.randint(size // 2, LARGURA_TELA - size // 2)
            y = random.randint(size // 2, ALTURA_TELA - size // 2)
            temp_nebulas.add(Nebula(x, y, size))
        temp_planeta = Planeta(LARGURA_TELA * 0.3, ALTURA_TELA * 0.6)
        esperando_input = True
        while esperando_input and self.rodando:
            for evento in pygame.event.get():
                if evento.type == pygame.QUIT: self.rodando = False
                if evento.type == pygame.KEYDOWN:
                    if evento.key == pygame.K_RETURN:
                        self.resetar_jogo_completo()
                        esperando_input = False
                    if evento.key == pygame.K_ESCAPE: self.rodando = False
            self.tela.blit(self.background, (0, 0))
            temp_nebulas.update()
            temp_nebulas.draw(self.tela)
            temp_planeta.update()
            self.tela.blit(temp_planeta.image, temp_planeta.rect)
            temp_estrelas.update()
            temp_estrelas.draw(self.tela)
            titulo = self.fonte_titulo.render("GAME OVER", True, VERMELHO_ALIEN_PROJETIL)
            score_final = self.fonte_media.render(f"Pontuação Final: {self.pontuacao}", True, BRANCO)
            instrucao = self.fonte_hud.render("Pressione ENTER para reiniciar", True, BRANCO)
            self.tela.blit(titulo, (LARGURA_TELA // 2 - titulo.get_width() // 2, ALTURA_TELA // 2 - 100))
            self.tela.blit(score_final, (LARGURA_TELA // 2 - score_final.get_width() // 2, ALTURA_TELA // 2 - 20))
            self.tela.blit(instrucao, (LARGURA_TELA // 2 - instrucao.get_width() // 2, ALTURA_TELA // 2 + 50))
            pygame.display.flip()
            pygame.time.wait(1000 // 15)

    async def loop_principal(self):
        while self.rodando:
            if self.estado_jogo == "tela_inicio":
                self.tela_de_inicio()
            elif self.estado_jogo == "jogando":
                for evento in pygame.event.get():
                    if evento.type == pygame.QUIT: self.rodando = False
                    if evento.type == pygame.KEYDOWN:
                        if evento.key == pygame.K_SPACE and self.jogador:
                            self.jogador.atirar(self.todos_sprites, self.projeteis_jogador, self.aliens)
                        if evento.key == pygame.K_ESCAPE: self.rodando = False
                if not self.rodando: break
                if self.jogador: self.jogador.update()
                self.grupo_nebulas.update()
                self.grupo_estrelas.update()
                self.grupo_elementos_distantes.update()
                self.gerenciar_cometas()
                self.grupo_cometas.update()
                self.projeteis_jogador.update()
                self.projeteis_aliens.update()
                self.powerups.update()
                for sprite in self.todos_sprites:
                    if isinstance(sprite, Explosao):
                        sprite.update()
                self.mover_aliens()
                self.aliens_atiram()
                self.checar_colisoes()
                if self.combo > 0 and pygame.time.get_ticks() - self.combo_timer > 2000:
                    self.combo = 0
                self.tela.blit(self.background, (0, 0))
                if self.shake_frames:
                    self.shake_offset = self.shake_frames.pop(0)
                else:
                    self.shake_offset = (0, 0)
                self.grupo_nebulas.draw(self.tela)
                self.grupo_elementos_distantes.draw(self.tela)
                self.grupo_estrelas.draw(self.tela)
                self.grupo_cometas.draw(self.tela)
                for sprite in self.todos_sprites:
                    sprite.rect.move_ip(self.shake_offset)
                    self.tela.blit(sprite.image, sprite.rect)
                    sprite.rect.move_ip(-self.shake_offset[0], -self.shake_offset[1])
                for sprite in self.todos_sprites:
                    if isinstance(sprite, Explosao):
                        for particle in sprite.particles:
                            particle.draw(self.tela)
                    elif isinstance(sprite, Projetil):
                        sprite.draw(self.tela)
                self.desenhar_hud()
                pygame.display.flip()
            elif self.estado_jogo == "game_over":
                self.tela_game_over()
            await asyncio.sleep(1.0 / FPS)
        pygame.quit()

async def main():
    jogo = Game()
    await jogo.loop_principal()

if platform.system() == "Emscripten":
    asyncio.ensure_future(main())
else:
    if __name__ == "__main__":
        asyncio.run(main())