import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { floorPlanOutline, floorPlanRooms } from '../data/site'
import useResponsive from '../hooks/useResponsive'

export default function FloorPlanMenu({ onClose }: { onClose: () => void }) {
  const [hovered, setHovered] = useState<string | null>(null)
  const { isSmallerDevice } = useResponsive()
  const pathRef = useRef<SVGPathElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!pathRef.current) return

    gsap.fromTo(
      pathRef.current,
      { pathLength: 0, opacity: 0.2 },
      {
        pathLength: 1,
        opacity: 0.4,
        duration: 2,
        ease: 'power2.inOut',
      },
    )
  }, [])

  useEffect(() => {
    if (!infoRef.current) return
    gsap.fromTo(
      infoRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: hovered ? 1 : 0,
        y: hovered ? 0 : 10,
        duration: 0.25,
        ease: 'power2.out',
      },
    )
  }, [hovered])

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
      <div className="relative w-[95vw] h-[80vh] md:w-[90vw] md:h-[80vh] xl:w-[80vw] xl:h-[80vh]">
        <svg
          viewBox={isSmallerDevice ? '-5 -5 600 1170' : '-5 -5 1152 600'}
          className="w-full h-full"
        >
          <defs>
            <pattern
              id="blueprint-pattern"
              width="12"
              height="12"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="12"
                stroke="rgba(248, 215, 162, 0.25)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <g
            transform={
              isSmallerDevice
                ? 'translate(-272.5, 285) rotate(90, 567.5, 295)'
                : undefined
            }
          >
            <path
              ref={pathRef}
              d={floorPlanOutline}
              stroke="#ffffff"
              strokeWidth="1"
              fill="none"
              className="opacity-40"
            />
            {floorPlanRooms.map((room) => (
              <g
                key={room.id}
                onMouseEnter={() => setHovered(room.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => {
                  event.stopPropagation()
                  onClose()
                }}
                className="cursor-pointer group"
              >
                <rect
                  x={room.x}
                  y={room.y}
                  width={room.w}
                  height={room.h}
                  fill={hovered === room.id ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0)'}
                  stroke={hovered === room.id ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.6)'}
                  strokeWidth="1"
                  className="transition-all duration-300"
                  style={{ opacity: 1 }}
                />
                {hovered === room.id && (
                  <rect
                    x={room.x}
                    y={room.y}
                    width={room.w}
                    height={room.h}
                    fill="url(#blueprint-pattern)"
                    className="pointer-events-none"
                  />
                )}
                <text
                  x={room.labelPos.x}
                  y={room.labelPos.y}
                  transform={
                    isSmallerDevice
                      ? `rotate(-90, ${room.labelPos.x}, ${room.labelPos.y})`
                      : undefined
                  }
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="pointer-events-none select-none uppercase font-medium transition-all duration-300"
                  style={{
                    opacity: hovered === room.id ? 1 : 0.4,
                    fill:
                      hovered === room.id ? 'var(--secondary)' : '#ffffff',
                    fontSize: isSmallerDevice ? 22 : '0.8vw',
                    letterSpacing: '0.1em',
                  }}
                >
                  {isSmallerDevice &&
                  (room.id === 'wellness' || room.id === 'room') ? (
                    <>
                      <tspan x={room.labelPos.x} dy="-0.5em">
                        {room.id === 'wellness' ? 'Wellness' : 'Rooms'}
                      </tspan>
                      <tspan x={room.labelPos.x} dy="1.2em">
                        {room.id === 'wellness' ? '& Spa' : '& Suites'}
                      </tspan>
                    </>
                  ) : (
                    room.name
                  )}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>

      {hovered && (
        <div
          ref={infoRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none whitespace-nowrap"
        >
          <span className="text-secondary text-[4vw] md:text-[2vw] xl:text-[1vw] tracking-[0.2em] uppercase">
            Exploring: {floorPlanRooms.find((room) => room.id === hovered)?.name}
          </span>
        </div>
      )}
      <div className="absolute bottom-0 md:bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <p className="text-white/60 text-[3vw] md:text-[1.6vw] xl:text-[0.6vw] uppercase tracking-widest">
          {isSmallerDevice ? 'Tap' : 'Click'} on room to navigate to that page
        </p>
      </div>
    </div>
  )
}
