import type { RectCoordinates } from './RectCoordinates.type'
import type { MapMovable } from '../abstract/MapMovable.class'
import type { SpriteAnimation } from '../model/SpriteAnimation.class'

export interface Actor {
    getRect: () => RectCoordinates
    animation: SpriteAnimation
    movable: MapMovable
}
