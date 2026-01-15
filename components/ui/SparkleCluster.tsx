import Image from "next/image";
import { CSSProperties, memo } from "react";

export const SparkleCluster = memo(function SparkleCluster({ className, delay = 0 }: { className?: string; delay?: number }) {

    const getStyle = (extraDelay: number): CSSProperties => ({
        animationDelay: `${delay + extraDelay}s`,
    });

    return (
        <div className={`absolute ${className} pointer-events-none z-30 will-change-transform`}>
            <div className="relative w-20 h-20">

                {/* BIG */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 animate-shine" style={getStyle(0)}>
                    <Image src="/images/sparkle.png" alt="star" fill className="object-contain" />
                </div>

                {/* MID */}
                <div className="absolute top-[60%] left-[5%] w-10 h-10 animate-shine" style={getStyle(0.4)}>
                    <Image src="/images/sparkle.png" alt="star" fill className="object-contain" />
                </div>

                {/* SMALL */}
                <div className="absolute top-[30%] right-[80%] w-5 h-5 animate-shine" style={getStyle(0.7)}>
                    <Image src="/images/sparkle.png" alt="star" fill className="object-contain" />
                </div>

            </div>
        </div>
    );
});