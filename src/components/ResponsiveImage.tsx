interface ResponsiveImageProps {
    mobileSrc: string;
    desktopSrc: string;
}

const ResponsiveImage = ({ mobileSrc, desktopSrc }: ResponsiveImageProps) => {
    const isMobile = window.innerWidth <= 768; // Determine if the device is a mobile screen
    // Choose the appropriate image source based on the screen resolution
    const imageSrc = isMobile ? mobileSrc : desktopSrc;

    return (
        <img src={imageSrc} />
    );
};

export default ResponsiveImage;
