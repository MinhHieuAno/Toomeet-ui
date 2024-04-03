"use client";
import React, { useCallback, useState } from "react";
import Carousel, { Modal, ModalGateway } from "react-images";
import { cn } from "@/lib/utils";
import { Button } from "./button";
type Props = {
    images: string[];
    className?: string;
    maxImage?: number;
    row?: number;
    col?: number;
};

const Gallery = ({
    images,
    className,
    maxImage = 4,
    row = 2,
    col = 2,
}: Props) => {
    const [currentImage, setCurrentImage] = useState<number>(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((index: number) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    return (
        <div
            className={cn(
                ` grid grid-cols-${Math.min(col, images.length)} grid-rows-${
                    row || images.length <= col ? "1" : row
                } gap-1 max-h-min`,
                className
            )}
        >
            {images.slice(0, maxImage).map((image, index) => {
                const last = index === maxImage - 1 && images.length > maxImage;

                return (
                    <div
                        key={index}
                        className="relative h-full cursor-pointer  rounded-lg overflow-hidden"
                        onClick={() => openLightbox(index)}
                    >
                        <img
                            className="w-full h-full object-cover rounded-[inherit]"
                            src={image}
                            alt=""
                        />
                        {last && (
                            <span className="abs-center w-full h-full flex justify-center items-center bg-slate-900 bg-opacity-80 font-semibold text-white text-lg rounded-[inherit]">
                                + {images.length - index - 1}
                            </span>
                        )}
                    </div>
                );
            })}
            {/* @ts-ignore */}
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={images.map((x) => ({
                                source: x,
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    );
};

export default Gallery;
